<template>
   <v-app id="bg">
  <div>

   <div class="center-content zoomer">
        <h1>Quote God & Pray</h1>
        <h3 class="mt-6 text-center" style="font-size: 16px;">
                "God does not lie or change his mind, and always follows through on his promises."
              </h3>
              <v-chip-group>
              <v-chip
              color="#F5F5DC"
              label
              size="x-small"
              text-color="black">
              <v-icon>mdi-book-cross</v-icon>
              Numbers 23:19
             </v-chip>
              </v-chip-group>
        <v-btn
            class="btn mt-14 mr-2 text-capitalize floater"
            :to="{ name: 'prayer'}"
            elevation="12"
          >
            Talk to him
          </v-btn>
    </div>

</div>
</v-app>
</template>
<style scoped>
 /**@import '@/assets/css/landing.css';*/

  @media only screen and (max-width: 768px) {
   
  }
  .btn  {
    padding: 8px 29px;
    color: #eee;
    font-weight: 500;
    font-size: 17px;
    letter-spacing: 1px;
    border-radius: 10px;
}
.btn :hover {
    background: #333;
}
    #bg {
            font-family: 'Nunito', sans-serif;
            background-image: url("https://cdn.pixabay.com/photo/2016/11/21/16/09/bible-1846174_960_720.jpg");
            background-size: cover;
            height: 100vh;
        }

        .center-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 60vh;
        }

        h1 {
            margin-bottom: 20px;
        }

        .button {
            padding: 10px 20px;
            background-color: #333;
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
 
 /*
=========
floater
=========
*/

.floater{
	animation-name: floater;
	-webkit-animation-name: floater;

	animation-duration: 1.5s;	
	-webkit-animation-duration: 1.5s;

	animation-iteration-count: infinite;
	-webkit-animation-iteration-count: infinite;

	visibility: visible !important;	
}

@keyframes floater {
	0% {
		transform: translateY(0%);	
	}
	50% {
		transform: translateY(8%);	
	}	
	100% {
		transform: translateY(0%);
	}			
}

@-webkit-keyframes floater {
	0% {
		-webkit-transform: translateY(0%);	
	}
	50% {
		-webkit-transform: translateY(8%);	
	}	
	100% {
		-webkit-transform: translateY(0%);
	}			
}

/*
==========
zoomer
==========
*/
.zoomer{
	animation-name: zoomer;
	-webkit-animation-name: zoomer;	

	animation-duration: 1s;	
	-webkit-animation-duration: 1s;

	animation-timing-function: cubic-bezier(0.5, 0.2, 0.3, 1.0);	
	-webkit-animation-timing-function: cubic-bezier(0.5, 0.2, 0.3, 1.0);

	-webkit-animation-iteration-count: 1;
    animation-iteration-count: 1;	

	visibility: visible !important;						
}
@-webkit-keyframes zoomer {
  0% {
    -webkit-transform: scale(.3);
  }
  100% {
    -webkit-transform: scale(1);
  }
}
@keyframes zoomer {
  0% {
    transform: scale(.3);
  }
  100% {
    transform: scale(1);
  }
}

</style>

<!-- Script section with data, methods, and mounted lifecycle hook -->
<script>
 import axios from 'axios';

export default {
  head() {
    return {
  title: "PrayerPath - Quote God & Pray",
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: "Get daily inspiration from the Bible with Quote God & Pray. Find randomly generated quotes about God's promises and prayers to help you stay focused on your faith."
    },
    {
      name: 'keywords',
      content: 'bible, quotes, promises, prayers, faith, inspiration, God, devotional, daily, motivation, religious'
    }
  ]
}

  },
  data() {
    return {
        category: '',
        categoryCount:'',
        imageUrls: [],
        openaiApiKey: this.$config.OPENAI_API_KEY,
        key: this.$config.BACKEND_API_KEY,
        backend_url: this.$config.BACKEND_APP_URL,
      };
    },
    methods: {
      async getImageUrls() {
        try {
          // Make the first API call
          const response = await axios.post('https://api.openai.com/v1/images/generations', {
            prompt: 'Show a person experiencing ' + this.category +' through their faith in God.',
            n: this.categoryCount,
            size: '256x256',
          }, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.openaiApiKey}`,
            },
          });
  
          // Save the received URLs in the component's data
          this.imageUrls = response.data.data.map(imageData => imageData.url);
          console.log('Images gotten');
  
          // Upload each image URL to Cloudinary
          const newUrls = [];
          for (const url of this.imageUrls) {
            try {
              const result = await this.$cloudinary.upload(url, {
                public_id: `image_${new Date().getTime()}`,
                upload_preset: 'ml_default',
                resource_type: 'auto',
              });
              newUrls.push(result.secure_url);
              console.log('New Cloudinary URLs:', newUrls);
            } catch (error) {
              console.error(`Error uploading image: ${error}`);
            }
          }
  
          // Make the second API call after the first one has completed
          const secondResponse = await axios.post(`${this.backend_url}/api/add-imageUrls`, {
            imageUrls: newUrls,
            category: this.category,
          }, {
            headers: {
              'Authorization': `Bearer ${this.key}`,
            },
          });
  
          // Check if the second API call was successful
          if (secondResponse.data === 1) {
            console.log('getImageUrls() ran and saved correctly for '+ this.category);
          } else {
            console.log('Failed to get or save generated img url to DB');
          }
        } catch (error) {
          console.error(error);
        }
      },


      async getImageUrlsChecker() {
      //check if need be to run getImageUrls
      var url = this.backend_url + '/api/check-imageurl';
      try {
        const response = await axios.get(url, {
          headers: {
            'Content-Type': 'application/json',
            'X-Authorization': this.key
          }
        });
        if (response.data !== 0) {

          this.category = response.data[0].category
          if(response.data[0].count > 10){
            this.categoryCount = 10
          }else{
            this.categoryCount = response.data[0].count
          }
          
          console.log('Ran the function to get imageUrl');
          this.getImageUrls();
        } else {
          console.log('No categories found to populate images');
          console.log('getImageUrls() did not run');
        }
      } catch (error) {
        console.log(error);
      }
    },


  },

  mounted() {
    //check if need be to run dall-e func
    this.getImageUrlsChecker()
    document.body.style.overflow = 'hidden';
  },

  beforeDestroy() {
    document.body.style.overflow = '';
  }

}

  </script>
<template>
   <v-app id="bg">
  <div>

   <div class="center-content">
        <h1>Quote God & Pray</h1>
        <h3 class=" mt-6 pl-10 pr-2" style="font-size: 16px;">
                "God does not lie or change his mind, and always follows through on his promises."
              </h3>
              <v-chip-group class="mt-3">
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
            class="btn mt-14 mr-2 text-capitalize"
            :to="{ name: 'home'}"
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
    background: #00BCD4;
    color: #eee;
    font-weight: 500;
    border: none;
    font-size: 17px;
    letter-spacing: 1px;
    border-radius: 0px;
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
            height: 70vh;
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
 
</style>

<!-- Script section with data, methods, and mounted lifecycle hook -->
<script>
 import axios from 'axios';

export default {
  data() {
    return {
        category: '',
        categoryCount:'',
        sentence: 'A good picture that potrays ',
        imageUrls: [],
        openaiApiKey: process.env.OPENAI_API_KEY,
        key: process.env.BACKEND_API_KEY,
        backend_url: process.env.BACKEND_APP_URL,
      };
    },
    methods: {
      async getImageUrls() {
        try {
          // Make the first API call
          const response = await axios.post('https://api.openai.com/v1/images/generations', {
            prompt: this.sentence + this.category,
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
            console.log('getImageUrls ran and saved correctly');
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
          
          console.log('ran imageUrl getter func');
          this.getImageUrls();
        } else {
          console.log('No categories found');
          console.log('getImageUrls did not run');
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
<template>
  <div class="bg-white" id="bg">

    <!-- App Header -->
    <div class="appHeader no-border transparent">
      <div class="left"></div>
      <div class="pageTitle">
        <img src="~/static/logo.png" alt="logo" class="logo"> PrayerPath
      </div>
      <div class="right"></div>
    </div>
    <!-- * App Header -->

    <!-- App Capsule -->
    <div id="appCapsule">
      <div class="error-page">
        <div class="mb-2"></div>
        <h1 class="title">Quote God & Pray</h1>
        <div class="text mb-3">
          "God does not lie or change his mind, and always follows through on his promises."
        </div>
        <div id="countDown" class="mb-5"></div>
        <div class="fixed-footer">
          <div class="row">
            <div class="col-12">
              <router-link to="/home" class="btn btn-primary btn-lg btn-block">Continue</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- * App Capsule -->
    
  </div>
</template>

<style scoped>
 /**@import '@/assets/css/landing.css';*/

  /* Apply styles only for screens smaller than 768px */
  @media only screen and (max-width: 768px) {

    #bg {
      /* Set background image to a specific URL */
      background-image: url("https://cdn.pixabay.com/photo/2019/05/05/00/41/bible-4179472_960_720.jpg");
      /* Set the size of the background image to cover the element */
      background-size: cover;
      /* Center the background image */
      background-position: center center;
      /* Set the height of the element to 100% of the viewport height */
      height: 100vh;
    }

    /* Override styles for the footer */
    .fixed-footer {
      background: none;
      min-height: 500px;
    }
  }
</style>

<script>
import axios from 'axios';

export default {
  head() {
    return {
      /* Set the title and meta tags for the page */
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
      /* Initialize the data properties used in the component */
      category: '',
      categoryCount: '',
      imageUrls: [],
      openaiApiKey: this.$config.OPENAI_API_KEY,
      key: this.$config.BACKEND_API_KEY,
      backend_url: this.$config.BACKEND_APP_URL,
    }
  },
  methods: {
    async getImageUrls() {
      try {
        /* Make a POST request to OpenAI API to generate images */
        const response = await axios.post('https://api.openai.com/v1/images/generations', {
          prompt: 'Show a person experiencing ' + this.category +' through their faith in God.',
          n: this.categoryCount,
          size: '512x512',
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.openaiApiKey}`,
          },
        });

        /* Save the received URLs in the component's data */
        this.imageUrls = response.data.data.map(imageData => imageData.url);
        console.log('Images gotten');

        /* Upload each image URL to Cloudinary */
        const newUrls = [];
        for (const url of this.imageUrls) {
          try {
            const result = await this.$cloudinary.upload(url, {
              public_id: `PrayerPath/image_${new Date().getTime()}`,
              upload_preset: 'ml_default',
              resource_type: 'auto',
            });
            newUrls.push(result.secure_url);
            // console.log('New Cloudinary URLs:', newUrls);
          } catch (error) {
            console.error(`Error uploading image: ${error}`);
          }
        }

        /* Make a second API call to save the URLs to the database */
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
          console.log('No categories found to populate images for');
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
   
},

 //Solved the modal overlay not leaving after route change issue
beforeRouteLeave(to, from, next) {
    document.body.classList.remove('modal-open');
    const modalBackdrop = document.querySelector('.modal-backdrop');
    if (modalBackdrop) {
      modalBackdrop.remove();
    }
    next();
  },

}
</script>
<template>
   <v-app style="background-color: black;">
  <div>
 
      <!-- banner -->
      <div class="banner layer" id="home">
        <div class="container">
          <div class="row banner-text">
            <div class="slider-info col-lg-8 animated tdExpandInBounce">
              <div class="agileinfo-logo mt-5">
                <h4 class="mb-16">
                  Quote God & Pray
                </h4>
              </div>
              <h3 class="txt-w3_agile mt-16" style="font-size: 16px;">
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
        <div id="fake-height"></div>
      </div>
    </div>
  </div>
  <!-- //banner -->

</div>
</v-app>
</template>
<style scoped>
  @import '@/assets/css/landing.css';

  @media only screen and (max-width: 768px) {
    #fake-height {
      height: 330px;
    }
  }
  body {
    overflow: hidden;
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
        sentence: 'A good picture of ',
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
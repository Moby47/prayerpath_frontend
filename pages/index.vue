<template>
  <div>
    <!-- header -->
    <header class="index-banner">
      <!-- banner -->
      <div class="banner layer" id="home">
        <div class="container">
          <div class="row banner-text">
            <div class="slider-info col-lg-8">
              <div class="agileinfo-logo mt-5">
                <h4 class="mb-16">
                  Quote God & Pray
                </h4>
              </div>
              <h3 class="txt-w3_agile mt-16" style="font-size: 16px;">
                "God does not lie or change his mind, and always follows through on his promises."
              </h3>
              <v-chip-group>
                <v-chip>Numbers 23:19</v-chip>
              </v-chip-group>

              <v-btn
            class="btn mt-4 mr-2 text-capitalize"
            href="#"
            :to="{ name: 'home'}"
            role="button"
          >
            Talk to him
          </v-btn>
        </div>
        <div id="fake-height"></div>
      </div>
    </div>
  </div>
  <!-- //banner -->
</header>
<!-- //header -->


</div>
</template>
<style scoped>
  @import '@/assets/css/landing.css';

  @media only screen and (max-width: 768px) {
    #fake-height {
      height: 250px;
    }
  }
</style>

<!-- Script section with data, methods, and mounted lifecycle hook -->
<script>
 import axios from 'axios';

export default {
  data() {
    return {
      sentence: 'A christian praying',
      imageUrls: [],
      openaiApiKey: process.env.OPENAI_API_KEY,
      key: process.env.BACKEND_API_KEY,
      backend_url: process.env.BACKEND_APP_URL,
    }
  },
  methods: {

    async getImageUrls() {
      try {
        // Make the first API call
        const response = await axios.post('https://api.openai.com/v1/images/generations', {
          prompt: this.sentence,
          n: 5,
          size: '256x256'
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.openaiApiKey}`
          }
        })

        // Save the received URLs in the component's data
        this.imageUrls = response.data.data.map(imageData => imageData.url);
        console.log(this.imageUrls);
        console.log("Images gotten");

        // Make the second API call after the first one has completed
        const secondResponse = await axios.post(this.backend_url+'/api/add-imageUrls', {
          imageUrls: this.imageUrls
        })

        // Check if the second API call was successful
        if (secondResponse.data == 1) {
          console.log("getImageUrls ran correct");
        } else {
          console.log("Failed to get or save generated img url to DB");
        }
      } catch (error) {
        console.error(error);
      }
    },


    getImageUrlsChecker() {
      //check if need be to run getImageUrls
      var url = this.backend_url + '/api/check-imageurl';
      fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': this.key
        }
      })
        .then(res => res.json())
        .then(res => {
          if (res == 1) {
            this.getImageUrls()
            console.log('ran imageUrl getter func')
          } else {
            console.log('getImageUrls did not run')
          }
        })
        .catch(error => {
          console.log(error)
        })
    },

  },

  mounted() {
    //check if need be to run dall-e func
    this.getImageUrlsChecker()
  },

}

  </script>
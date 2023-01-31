<template>

  <v-row justify="center" align="center" class="mt-16">
    <v-col>

      <template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card
        class="mx-auto"
        color="#ffffff"
        elevation="20"
        py-4 
        style="margin: 10px;"
        d-flex
      >

      <!--content-->
      <template>
  <v-card
    class="mx-auto my-12"
    style="background-color: whitesmoke; color:black !important;"
  >
     <v-img
      class="align-end text-white"
      height="300"
      src="https://cdn.pixabay.com/photo/2022/12/25/07/49/door-7676969_960_720.jpg"
      cover
    >
      <v-card-title>Quote God & Pray</v-card-title>
    </v-img>

   
      <v-card-subtitle>
        <span class="me-1" style="color:black !important;">
          "God is not human, that he should lie, not a human being, that he should change his mind. 
Does he speak and then not act? Does he promise and not fulfill?"
        </span>
      <v-chip-group>
        <v-chip>Numbers 23:19</v-chip>
      </v-chip-group>
      </v-card-subtitle>
    
  <hr>
    <v-card-actions>
      <v-btn
      color="#4a9ec1"
        variant="text"
        :to="{ name: 'home'}"
      >
        Start
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
    <!--content-->

      </v-card>
    </v-col>
  </v-row>

</template>
     


    </v-col>
  </v-row>


</template>


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
        try{
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


      getImageUrlsChecker(){
        //check if need be to run getImageUrls
    var url =  this.backend_url +'/api/check-imageurl';
    fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': this.key
    }
    })
    .then(res => res.json())
    .then(res=>{
      if (res == 1){
        this.getImageUrls()
        console.log('ran imageUrl getter func')
      }else{
        console.log('getImageUrls did not run')
      }
    })
    .catch(error =>{
      console.log(error)  
        })

      },
      //


    },

    mounted(){
   //check if need be to run dall-e func
   this.getImageUrlsChecker()
   },

  }
  </script>
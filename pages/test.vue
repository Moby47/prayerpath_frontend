<template>
    <div>
      <form @submit.prevent="submitSentence">
        <button type="submit">Submit</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        sentence: 'prayer',
        imageUrls: [],
        apiKey: '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',
      }
    },
    methods: {
      async submitSentence() {
        const response = await axios.post('https://api.openai.com/v1/images/generations', {
            prompt: this.sentence,
            n: 10,
            size: '256x256'
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`
          }
        })
        //this.imageUrl = response.data.imageUrl
        //console.log(response.data.data[0].url);
        this.imageUrls = response.data.data.map(imageData => imageData.url);
        console.log(this.imageUrls);

        axios.post('http://localhost:8000/api/add-imageUrls', {
          imageUrls: this.imageUrls
        })
        .then(response => {
         // console.log(response.data);
          if(response.data == 1){
            console.log('Yes')
          }else{
            console.log('Failed to get or save generated img url to DB')
          }
        })
        .catch(error => {
          console.error(error);
        });
      },


      getImageUrlsChecker(){
        //check if need be to run getImageUrls
        
      },
      //



    }
  }
  </script>
  
<template>
    <v-row justify="center" align="center">
      <v-col>
      
        <template>
  <div>
    <button class='blue' @click="getquotes">Go</button>
  </div>

  {{ quotes }}
</template>


        </v-col>
      </v-row>
    
    </template>
    
    
    <script>
//import axios from 'axios';

export default {
  
  data() {
    return {
     
      quotes: [],
     
      key: process.env.BACKEND_API_KEY,
      backed_url: process.env.BACKEND_APP_URL,
    }
  },

  methods: {

    getquotes() {
      var final_url = this.backed_url + '/api/quotes';
      fetch(final_url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': this.key
        }
      })
        .then(res => res.json())
        .then(res => {
          this.quotes = res.data;
        })
        .catch(error => {
          console.log(error)
        });
    },


},


mounted() {
   

  },

}




    </script>
    
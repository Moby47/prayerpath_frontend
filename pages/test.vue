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
import axios from 'axios';
import * as idb from 'idb-keyval'


export default {
  
  data() {
    return {
      quotes: [], // Store the quotes received from API
      key: process.env.BACKEND_API_KEY,
      backed_url: process.env.BACKEND_APP_URL,
    }
  },

  methods: {

async getquotes() {



}


},


mounted() {
   

  },

}




    </script>
    
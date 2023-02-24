<template>
    <div>
    <!--app bar-->
    <v-app-bar color="white" fixed app :elevation="0" :shadow="false" style="color: black;">
      <v-icon color="black">mdi-hands-pray</v-icon> 
      <v-toolbar-title>PrayerPath</v-toolbar-title>
      <v-spacer></v-spacer>
      <!--  <v-icon style="margin-right: 10px;" color="green">mdi-signal</v-icon>-->
      <v-app-bar-nav-icon style="color: black;" @click.stop="drawer = !drawer">
        <v-icon>mdi-menu</v-icon>
      </v-app-bar-nav-icon>
    </v-app-bar>
    <!--app bar-->
  
    <!-- right navigation drawer -->
    <v-navigation-drawer fixed app v-model="drawer">
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://cdn.pixabay.com/photo/2016/04/15/18/05/computer-1331579_960_720.png"></v-img>
        </v-list-item-avatar>
  
        <v-list-item-content>
          <v-list-item-title>Welcome</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
  
      <v-divider></v-divider>
  
      <v-list dense>
        <v-list-item
          link
          :to="'/'"
        >
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
  
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-list dense>
        <v-list-item
          link
          :to="'/prayer'"
        >
          <v-list-item-icon>
            <v-icon>mdi-book-cross</v-icon>
          </v-list-item-icon>
  
          <v-list-item-content>
            <v-list-item-title>All Prayers</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-list dense>
        <v-list-item
          link
          :to="'/favourite'"
        >
          <v-list-item-icon>
            <v-icon>mdi-heart</v-icon>
          </v-list-item-icon>
  
          <v-list-item-content>
            <v-list-item-title>Favourites</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      
<!--Emotions-->
      <v-list dense>
  <v-menu offset-y>
    <template v-slot:activator="{ on }">
      <v-list-item v-on="on">
        <v-list-item-icon>
          <v-icon>mdi-head-heart</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Emotions</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>

    <v-list v-if="emotions.length > 0">
      <v-list-item
        link
        :to="{ name: 'emotion', query: { emotion: emotion.emotion } }"
        v-for='emotion in emotions' 
       v-bind:key='emotion.id'
      >
        <v-list-item-title>{{emotion.emotion}}</v-list-item-title>
      </v-list-item>
    </v-list>

    <v-list v-if="emotionsOffline.length > 0">
      <v-list-item
        link
        v-for="emotion in emotionsOffline" 
        :key="emotion"
        :to="{ name: 'emotion', query: { emotion: emotion } }"
      >
        <v-list-item-title>{{emotion}}</v-list-item-title>
      </v-list-item>
    </v-list>

  </v-menu>
</v-list>
<!--Emotions-->
  
    <!--  <v-list dense>
        <v-list-item
          link
          :to="'/feature-request'"
        >
          <v-list-item-icon>
            <v-icon>mdi-feature-search</v-icon>
          </v-list-item-icon>
  
          <v-list-item-content>
            <v-list-item-title>Feature Request</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>-->
  
    </v-navigation-drawer>
    </div>
  </template>
  
  <script>

import axios from 'axios';
import * as idb from 'idb-keyval';

  export default {
    data() {
      return {
        drawer: false,
        emotions:[],
        emotionsOffline:[],
        key: this.$config.BACKEND_API_KEY,
      backend_url: this.$config.BACKEND_APP_URL,
      }
    },
    methods: {

      async getEmotions() {
     var final_url = this.backend_url + '/api/emotions';
     try {
       const response = await axios.get(final_url, {
         headers: {
           'Content-Type': 'application/json',
           'X-Authorization': this.key
         }
       });
       this.emotions = response.data.data;
     } catch (error) {
       console.log(error)

//get from indexeddb
try {
const savedQuotes = await idb.get('quotes');

if (savedQuotes) {
this.quotes = savedQuotes;
const emotions = [...new Set(savedQuotes.map(quote => quote.emotion))];

this.emotionsOffline = emotions;
console.log('emotionsOffline', this.emotionsOffline);
//this.offlineCategory = true

} else {
console.log("No emotions found.");
}

} catch (error) {
console.error(error);
}
//get from indexeddb
     }
   },

    },

    mounted() {
    
    this.getEmotions()

  },
  }
  </script>
  
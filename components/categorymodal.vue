<template>
    <div class="text-center">
      <v-dialog
        v-model="dialog">
        <v-card style="background-color: white !important;">
  
          <!-- Categories list --> <!-- For online use/display -->
          <template v-if="!offlineCategory">
            <div class="text-center" v-if="categories">
              <!-- Loop through categories and display each as a chip -->
              <v-chip
                class="ma-2"
                color="#ADD8E6"
                text-color="black"
                v-for='category in categories' 
                v-bind:key='category.id'
                @click="gotocat(category.category)"
              >
                {{category.category}}
              </v-chip>
            </div>
            <div class="text-center" style="color: black !important;" v-else>
             Nothing to see here.
            </div>
          </template>
  
          <!-- For offline use -->
          <template v-else>
            <div class="text-center" v-if="categories">
              <v-chip
                class="ma-2"
                color="#9AC0D1"
                text-color="black"
                v-for="category in categories" :key="category"
                @click="gotocat(category)"
              >
                {{category}}
              </v-chip>
            </div>
          </template>
  
        <!-- Close button -->
        <v-card-actions style="background-color: white !important; display: flex; justify-content: center; align-items: center;">
   <v-btn depressed  color="#F5F5DC" @click="dialog = false" style="color:black" v-if="categories.length > 0">Close</v-btn>
   <v-btn depressed  color="#F5F5DC" @click="dialog = false" style="color:black" v-if="categories.length === 0">Try again later - Refresh</v-btn>

  </v-card-actions>
  
      </v-card>
    </v-dialog>
    </div>
  </template>
  
  <script>

import axios from 'axios';
import * as idb from 'idb-keyval';

  export default {
    data() {
      return {
        dialog: false,
        categories: [],
        offlineCategory: false,
        key: this.$config.BACKEND_API_KEY,
      backend_url: this.$config.BACKEND_APP_URL,
      };
    },
    methods: {
      gotocat(category) {
        this.dialog = false
        this.$emit('category-selected', category);
      },


      async getCategories() {
     var final_url = this.backend_url + '/api/categories';
     try {
       const response = await axios.get(final_url, {
         headers: {
           'Content-Type': 'application/json',
           'X-Authorization': this.key
         }
       });
       this.categories = response.data.data;
     } catch (error) {
       console.log(error)

//get from indexeddb
try {
const savedQuotes = await idb.get('quotes');

if (savedQuotes) {
this.quotes = savedQuotes;
const categories = [...new Set(savedQuotes.map(quote => quote.category))];
this.categories = categories;
this.offlineCategory = true
//console.log('categories', this.categories);
} else {
console.log("No categories found.");
}

} catch (error) {
console.error(error);
}
//get from indexeddb
     }
   },
    },
    mounted() {
    
    this.getCategories()

  },
  };
  </script>
  
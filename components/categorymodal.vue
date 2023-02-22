<template>
    <div class="text-center">


      <v-dialog
        v-model="dialog"
        transition="dialog-top-transition">
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

              <v-chip
                class="ma-2"
                color="#000"
                text-color="white"
                @click="showMultiple()"
              >
               Multiple Categories
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

              <v-chip
                class="ma-2"
                color="#000"
                text-color="white"
                @click="showMultiple()"
              >
               Multiple Categories
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


    
    <!--Multiple selection modal-->
    <v-dialog
    transition="dialog-top-transition"
        v-model="multipleModal">
        <v-card style="background-color: white !important;">
  
          <!-- Categories list --> <!-- For online use/display -->
          <template v-if="!offlineCategory">
            <div class="text-center" v-if="categories">
              <!-- Loop through categories and display each as a switch -->
  <v-card flat style="background-color: black;">
    <v-card-text>
      <v-container fluid>
        <v-row>
          <v-col
            cols="12"
            sm="4"
            md="4"
            v-for='category in categories' 
            v-bind:key='category.id'
          >
            <v-switch
              v-model="multipleCategories"
              :label="category.category"
              color="#ADD8E6"
              :value="category.category"
              hide-details
            ></v-switch>
          </v-col>
         
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>


            </div>
            <div class="text-center" style="color: black !important;" v-else>
             Nothing to see here.
            </div>
          </template>
  
          <!-- For offline use -->
          <template v-else>
            <div class="text-center" v-if="categories">
              <div class="text-center" style="color: black !important;">
          Feature offline
        </div>
            </div>
          </template>
  
        <!-- Close/find button -->
        <v-card-actions style="background-color: white !important; display: flex; justify-content: center; align-items: center;">

    <v-btn depressed  color="#F5F5DC"  @click="pushCategory()" style="color:black" v-if="categories.length > 0">Search</v-btn>

   <v-btn depressed  color="#F5F5DC" @click="multipleModal = false" style="color:black" v-if="categories.length > 0">Close</v-btn>
   <v-btn depressed  color="#F5F5DC" @click="multipleModal = false" style="color:black" v-if="categories.length === 0">Try again later - Refresh</v-btn>

  </v-card-actions>
      </v-card>
    </v-dialog>
 <!--Multiple selection modal-->

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

      multipleModal:false,
      multipleCategories:[]
      };
    },
    methods: {
      gotocat(category) {
        this.dialog = false
        this.$emit('category-selected', category);
      },

      showMultiple() {
        this.dialog = false
        this.multipleModal = true
      },

      pushCategory(){
        this.multipleModal = false
        const route = {
        name: 'multplecategories',
        query: {
          categories: JSON.stringify(this.multipleCategories),
        },
      };
      this.$router.push(route)
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
  
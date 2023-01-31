<template>
  <v-row justify="center" align="center">
    <v-col>
      <!--app bar-->
      <v-app-bar color="#4a9ec1" :clipped-left="clipped" fixed app>
        <v-icon>mdi-hands-pray</v-icon>
        <v-toolbar-title>Quote & Pray</v-toolbar-title>
      </v-app-bar>
      <!--app bar-->

          <!--content and btn-->
  <template>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <v-card
          class="mx-auto"
          color="#1b5868"
          elevation="20"
          py-4
          style="margin: 10px;"
          d-flex
          v-for="quote in quotes"
          v-bind:key="quote.id"
        >
          <div class="d-flex justify-between">
            <v-card-actions class="flex-grow-1 flex-column align-start">
              <div class="text-h6">
                You said:
              </div>
              <div class="text-body-1" style="color: #F5F5F5; word-wrap: break-word;">
                {{quote.verse}}
              </div>
              <div class="text-caption font-weight-thin" style="background-color: #555; padding:2px; border-radius: 10px;" elevation="20">
                <a :href="quote.verse_url" target="_blank" style="color: #fff;">{{quote.reference}}</a>
              </div>
            </v-card-actions>

            <v-img
              v-if="quote.imageurl"
              contain
              height="70px"
              :lazy-src="quote.imageurl"
              :src="quote.imageurl"
              style="flex-basis: 80px"
              class="flex-grow-0 mr-1 mt-2"
            ></v-img>

            <v-img
              v-else
              contain
              height="70px"
              lazy-src="https://cdn.pixabay.com/photo/2014/04/02/10/44/hands-304398_960_720.png"
              src="https://cdn.pixabay.com/photo/2014/04/02/10/44/hands-304398_960_720.png"
              style="flex-basis: 80px"
              class="flex-grow-0 mr-1 mt-2"
            ></v-img>
          </div>

          <v-divider></v-divider>
          <v-card-actions class="text-body-2" style="color: #F5F5F5;">
            {{quote.prayer}}
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <div class="d-flex justify-center" style="margin-bottom: 65px;">
        <!-- Show reset button if showButton is true -->
        <v-btn color="#555" @click="getquotes()" v-if="showButton">Reset</v-btn>
      </div>
    </v-col>
  </v-row>
  </template>

  <!-- bottom nav -->
  <div>
    <v-bottom-navigation 
      :elevation="3" 
      fixed 
      style="background-color: #4a9ec1;">

      <!-- Home button -->
      <v-btn 
        value="nearby" 
        size="x-small" 
        style="color: white !important;"
        :to="{ name: 'index'}"
      >
        <v-icon>mdi-home</v-icon>
        Home
      </v-btn>

      <!-- Career button -->
      <v-btn 
        value="recent"  
        size="x-small" 
        style="color: white !important;"
        @click="getQuotesByCat('career')"
      >
        <v-icon>mdi-briefcase</v-icon>
        Career
      </v-btn>
<!-- Family button -->
<v-btn 
        value="favorites"  
        size="x-small" 
        style="color: white !important;"
        @click="getQuotesByCat('family')"
      >
        <v-icon>mdi-human-male-female-child</v-icon>
        Family
      </v-btn>

      <!-- Others button -->
      <v-btn 
        value="nearby" 
        size="x-small" 
        style="color: white !important;" 
        @click="dialog = true">
        <v-icon>mdi-dots-vertical</v-icon>
        Others
      </v-btn>
    </v-bottom-navigation>
  </div>

  <!-- Modal -->
  <template>
    <div class="text-center">
      <v-dialog
        v-model="dialog">
        <v-card style="background-color: white !important;">

          <!-- Categories list -->
          <template>
            <div class="text-center">
              <!-- Loop through categories and display each as a chip -->
              <v-chip
                class="ma-2"
                color="#4a9ec1"
                text-color="white"
                v-for='category in categories' 
                v-bind:key='category.id'
                @click="getQuotesByCat(category.category)"
              >
                {{category.category}}
              </v-chip>
            </div>
          </template>

        <!-- Close button -->
        <v-card-actions style="background-color: white !important;">
            <v-btn color="#555" block @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<!--Modal-->


  <!--Overlay-->
  <template>
        <div class="text-center">
          <v-overlay :value="overlay">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
            <br>
            Getting Ready...
          </v-overlay>
        </div>
        </template>
        <!--Overlay-->
  
      </v-col>
    </v-row>
  
  </template>
  
  
  <script>
//import axios from 'axios';

export default {
  head() {
    return {
      title: "Quote God & Pray",
      meta: [
        {
          hid: 'description6',
          name: 'description',
          content: 'The app that helps you keep your prayer life organized'
        },
        {
          name: 'keywords',
          content: 'app, pray, bible'
        }
      ]
    }
  },

  data() {
    return {
      clipped: false,
      fixed: false,
      quotes: [],
      loading: true,
      err: false,
      overlay: null,
      showButton: null,
      dialog: false,
      categories: [],
      key: process.env.BACKEND_API_KEY,
      backed_url: process.env.BACKEND_APP_URL,
    }
  },

  methods: {
    getquotes() {
      this.overlay = true;
      this.showButton = false;
      this.scrollTop();

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
          this.showButton = true;
          this.overlay = false;
        })
        .catch(error => {
          console.log(error)
          this.showButton = true;
          this.err = true;
          this.overlay = false;
        });
    },
    // getquotes method end

    scrollTop() {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    },

    getQuotesByCat(category) {
      //if called from modal
      this.dialog = false;

      this.overlay = true;
      this.showButton = false;
      this.scrollTop();

      var final_url = this.backed_url + '/api/quotes' + '/' + category;
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
          this.showButton = true;
          this.overlay = false

        })
        .catch(error =>{
          console.log(error)  
          this.showButton = true
          this.err = true
          this.overlay = false
        })
  },
  //end

  getCategories(){
     
    var   final_url =  this.backed_url +'/api/categories'
    fetch(final_url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Authorization': this.key
    }
    })
    .then(res => res.json())
    .then(res=>{
      this.categories = res.data;
    })
    .catch(error =>{
      console.log(error)  
        })
  },
  //end

         
  },
  //  method end
  
  mounted(){
   //get quotes
   this.getquotes()
   //get categories
   this.getCategories()
   },
            
  
   }
  
  </script>
  
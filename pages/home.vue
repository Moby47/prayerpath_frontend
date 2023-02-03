<template>
   <v-app style="background-color: white;">
      <v-container> <!--Gives the home page a centered look-->
  <v-row justify="center" align="center">
    <v-col>
    
      <!--app bar-->
      <v-app-bar color="#4a9ec1" fixed app>
        <NuxtLink  text-color="black" to="/"> <v-icon>mdi-hands-pray</v-icon> </NuxtLink>
        <v-toolbar-title>Quote</v-toolbar-title>
      </v-app-bar>
      <!--app bar-->

          <!-- Dynamic content and btn-->
  <template>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6" class="">
        <v-card
          class="mx-auto animated tdFadeIn"
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
                God's Word:
              </div>
              <div class="text-body-1" style="color: #F5F5F5; word-wrap: break-word;">
                {{quote.verse}}
              </div>
              
              <a :href="quote.verse_url" target="_blank" style="text-decoration: none;">
              <v-chip
              @click.prevent="promptRedirect(quote.verse_url)"
              color="#F5F5DC"
              label
              size="x-small"
              text-color="black">
              <v-icon>mdi-link</v-icon>
              {{quote.reference}}
              </v-chip>
            </a>
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
            <v-chip
            class="ma-2"
            label
            color="#9AC0D1"
            style=" font-size: 12px; padding: 3px;"
            text-color="black"
            >
            Prayer For {{quote.category}}
            </v-chip>
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
<!-- Dynamic content and btn-->


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
<!-- bottom nav -->


  <!-- Category Modal -->
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
                color="#9AC0D1"
                text-color="black"
                v-for='category in categories' 
                v-bind:key='category.id'
                @click="getQuotesByCat(category.category)"
              >
                {{category.category}}
              </v-chip>
            </div>
          </template>

        <!-- Close button -->
        <v-card-actions style="background-color: white !important; display: flex; justify-content: center; align-items: center;">
  <v-btn color="#555" @click="dialog = false">Close</v-btn>
</v-card-actions>

      </v-card>
    </v-dialog>
  </div>
</template>
<!-- Category Modal-->


  <!--Loading Overlay-->
    <template>
        <div class="text-center">
          <v-overlay :value="overlay">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
            <br>
            Getting Ready...
          </v-overlay>
        </div>
        </template>
        <!--Loading Overlay-->

  
        <!--Err snackbar-->
    <v-snackbar
    :timeout="3000"
    color="red"
      v-model="snackbar" >
      An error occured. Please again later.
      <template>
      </template>
    </v-snackbar>
    <!--Err snackbar-->

<!-- Verse url snackbar-->
<v-snackbar
    :timeout="5000"
    :value="showSnackbar"
    color="#555"
    v-model="showSnackbar"
  >
    This leads to biblegateway.
    <template v-slot:action="{ attrs }">
      <v-btn
        color="#F5F5DC"
        text
        @click="showSnackbar = false"
        v-bind="attrs"
      >
        Cancel
      </v-btn>
      <v-btn
        color="#F5F5DC"
        dark
        text
        @click="redirect"
        v-bind="attrs"
      >
        Continue
      </v-btn>
    </template>
  </v-snackbar>
<!-- Verse url snackbar-->

<template>
  <v-btn
    color="#555"
    fab
    fixed
    :bottom='true'
    small
    :right='true'
    @click="scrollTop()"
    v-if="showButton"
    :style="{ bottom: '70px', right: '30px' }"
  >
    <v-icon>mdi-arrow-up</v-icon>
  </v-btn>
</template>

      </v-col>
    </v-row>
  </v-container> <!--Gives the home page a centered look-->
</v-app>
  </template>
  
  
  <script>
import axios from 'axios';

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
      showButton: false,
      verse_url:'',
      showSnackbar: false,
      snackbar: false,
      fixed: false,
      quotes: [],
      loading: true,
      overlay: null,
      showButton: null,
      dialog: false,
      categories: [],
      key: process.env.BACKEND_API_KEY,
      backed_url: process.env.BACKEND_APP_URL,
    }
  },

  methods: {
    async getquotes() {
      try {
        this.overlay = true;
        this.showButton = false;
        this.scrollTop();
  
        var final_url = this.backed_url + '/api/quotes';
        const response = await axios.get(final_url, {
          headers: {
            'Content-Type': 'application/json',
            'X-Authorization': this.key
          }
        });
        this.quotes = response.data.data;
        this.showButton = true;
        this.overlay = false;
      } catch (error) {
        console.log(error)
        this.snackbar = true
        this.showButton = true;
        this.overlay = false;
      }
    },

    // getquotes method end

    scrollTop() {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    },

    async getQuotesByCat(category) {
      //if called from modal
      this.dialog = false;

      this.overlay = true;
      this.showButton = false;
      this.scrollTop();

      var final_url = this.backed_url + '/api/quotes' + '/' + category;
      try {
        const response = await axios.get(final_url, {
          headers: {
            'Content-Type': 'application/json',
            'X-Authorization': this.key
          }
        });
        this.quotes = response.data.data;
        this.showButton = true;
        this.overlay = false;
      } catch (error) {
        console.log(error)
        this.snackbar = true
        this.showButton = true
        this.err = true
        this.overlay = false
      }
  },

  //end

  async getCategories() {
      var final_url = this.backed_url + '/api/categories';
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
        this.snackbar = true
      }
    },

  //end

  promptRedirect(verse_url) {
        this.showSnackbar = true;
        this.verse_url = verse_url
    },
    redirect(event) {
     window.open(this.verse_url, "_blank");
    },

    handleScroll() {
      this.showButton = window.pageYOffset > 200;
    },
         
  },
  //  method end
  
  mounted(){
   //get quotes
   this.getquotes()
   //get categories
   this.getCategories()

   window.addEventListener("scroll", this.handleScroll);

   },

  beforeDestroy() {
  window.removeEventListener("scroll", this.handleScroll);
  },        
  
   }
  
  </script>
  
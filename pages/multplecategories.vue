<template>
  <v-app style="background-color: white;">
    <v-container> <!-- Centers the home page -->
      <v-row justify="center" align="center">
        <v-col>
          <!-- appbar Component -->
          <appbar />
 
  <h4 style="color:black">You are view for: {{ multipleCategories.join(', ') }} 😊</h4>
         <!-- QuoteCard Component -->
         <quotecard 
        :quotes="quotes"
        :showLoadButton="showLoadButton"
        @load-more="loadMore"
        @prompt-redirect="promptRedirect"
      />

      <!-- Bottom Navigation -->
      <div>
        <v-bottom-navigation 
          fixed 
          style="background-color: white; box-shadow: none; border: none;">

          <v-btn 
            value="nearby" 
            size="x-small" 
            style="color: black !important;"
            :to="{ name: 'prayer'}"
          >
            <v-icon>mdi-book-cross</v-icon>
            All
          </v-btn>

          <!-- Career button -->
          <v-btn 
            value="recent"  
            size="x-small" 
            style="color: black !important;"
            @click="gotocat('Career')"
          >
            <v-icon>mdi-briefcase</v-icon>
            Career
          </v-btn>

          <!-- Family button -->
          <v-btn 
            value="Favourites"  
            size="x-small" 
            style="color: black !important;"
            @click="gotocat('Family')"
          >
            <v-icon>mdi-human-male-female-child</v-icon>
            Family
          </v-btn>

          <!-- Others button -->
          <v-btn 
            value="nearby" 
            size="x-small" 
            style="color: black !important;" 
            @click="openCategoryModal()">
            <v-icon>mdi-dots-vertical</v-icon>
            Others
          </v-btn>
        </v-bottom-navigation>
      </div>

      <!-- CategoryModal Component -->
      <categorymodal ref="categorymodal" @category-selected="gotocat"/>

      <!-- LoadingOverlay Component -->
      <loadinglayer :overlay="overlay"/>

      <!-- messagebar Component -->
      <messagebar :timeout="5000" :snackText="snackText"  ref="messagebar" />

      <!-- Verse URL Snackbar -->
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

          <!-- Home button -->
          <template>
            <v-btn
              color="#F5F5DC"
              depressed
              fab
              fixed
              :bottom="true"
              small
              :left="true"
              :to="{ name: 'index'}"
              :style="{ bottom: '70px', right: '30px' }"
            >
              <v-icon color="black">mdi-home</v-icon>
            </v-btn>
          </template>
          <!-- Scroll to top button -->
          <template>
            <v-btn
              color="#F5F5DC"
              depressed
              fab
              fixed
              :bottom="true"
              small
              :right="true"
              @click="scrollTop()"
              v-if="showButton"
              :style="{ bottom: '70px', right: '30px' }"
            >
              <v-icon color="black">mdi-arrow-up</v-icon>
            </v-btn>
          </template>
          <!-- Close container -->
          </v-col>
          </v-row>
          </v-container> <!-- Gives the page a centered look -->
          <!-- Close v-app -->
          </v-app>
          </template>
            
   <style scoped>
  
  .verse-font {
    font-family: 'Lato', sans-serif !important;
  }
  .prayer-font {
    font-family: Georgia, 'Times New Roman', Times, serif !important;
  }
  
  .others-font {
    font-family: Verdana, Geneva, Tahoma, sans-serif !important;
  }
  
  </style>
  
  <script>

import appbar from "~/components/appbar.vue";
import categorymodal from "~/components/categorymodal.vue";
import loadinglayer from "~/components/loadinglayer.vue";
import messagebar from "~/components/messagebar.vue";
import quotecard from "~/components/quotecard.vue";

//import { appbar } from '@/components/appbar.vue'
//import appbar from '/components/appbar.vue'


import axios from 'axios';
import * as idb from 'idb-keyval';

export default {
  components: {
    appbar,
    categorymodal,
    loadinglayer,
    messagebar,
    quotecard,
  },

  head() {
    return {
      title: "PrayerPath - Quote God & Pray",
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: "Get daily inspiration from the Bible with Quote God & Pray. Find randomly generated quotes about God's promises and prayers to help you stay focused on your faith."
        },
        {
          name: 'keywords',
          content: 'bible, quotes, promises, prayers, faith, inspiration, God, devotional, daily, motivation, religious'
        }
      ]
    }
  },

  data() {
    return {
      category: '',
      quotes: [],
      key: this.$config.BACKEND_API_KEY,
      backend_url: this.$config.BACKEND_APP_URL,
      current_offset: 0,
      load_more_limit: 4, //determines how many is fetched initially
      offlineCategory: false,
      snackText: '',
      verse_url: '',
      showSnackbar: false,
      snackbar: false,
      fixed: false,
      quotes: [],
      loading: true,
      overlay: null,
      showButton: null,
      categories: [],
      fromLoadMore: null,
      showLoadButton: null,
      drawer: false,

      multipleCategories: [],
    };
  },

  methods: {
    openCategoryModal() {
      this.$refs.categorymodal.dialog = true;
    },

    async getQuotesByCats() {
  //if called from modal
  this.dialog = false;

  this.overlay = true;
  this.showButton = false;
  this.showLoadButton = false;

  if (this.fromLoadMore != true) {
    this.scrollTop();
  }
  //kill from loadmore
  this.fromLoadMore = null;

  const categories = this.multipleCategories.join(',');
  const final_url = `${this.backend_url}/api/quotes-categories/${categories}?offset=${this.current_offset}&limit=${this.load_more_limit}`;

  try {
    const response = await axios.get(final_url, {
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': this.key,
      },
    });
    this.quotes = this.quotes.concat(response.data.data);
    this.showButton = true;
    this.overlay = false;
    this.showLoadButton = true;

    if (response.data.data.length === 0) {
      this.snackText = "Trust in the Lord to fill the void - That's all for " + categories;
      this.$refs.messagebar.snackbar = true;
    }
  } catch (error) {
    this.$refs.messagebar.snackbar = true;
    this.showButton = true;
    this.overlay = false;
    this.showLoadButton = true;

    //get from indexeddb

    try {
      const savedQuotes = await idb.get('quotes');

      if (savedQuotes) {
        this.quotes = savedQuotes.filter(quote => this.multipleCategories.includes(quote.category));
        if (this.quotes.length) {
          this.$refs.messagebar.snackbar = true;
          this.snackText = "Offline mode saves the day - Data found for " + categories;
          this.showLoadButton = false;
        } else {
          console.log("No saved quotes found for the specified categories");
          this.snackText = "Offline - No results for " + categories + ", keep the faith!";
          this.$refs.messagebar.snackbar = true;
          this.showLoadButton = false;
        }
      } else {
        console.log("No saved quotes found");
        this.snackText = "All else fails? Trust in God - Offline mode: No results found for " + categories;
        this.$refs.messagebar.snackbar = true;
        this.showLoadButton = false;
      }
    } catch (error) {
      console.error(error);
    }
    //get from indexeddb
  }
},


    loadMore() {
        this.fromLoadMore = true;
        this.current_offset += this.load_more_limit;
        this.getQuotesByCats();
    },
    scrollTop() {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    },
    promptRedirect(verse_url,version) {
        this.showSnackbar = true;
        if(version == 'NIV'){
            this.verse_url = verse_url;
        }else{
            let updatedUrl = verse_url.slice(0, -3);
            this.verse_url = updatedUrl + version;
        }
    },
    redirect(event) {
        window.open(this.verse_url, "_blank");
    },
    handleScroll() {
        this.showButton = window.pageYOffset > 200;
    },
    gotocat(category){
        this.$router.push({
            path: '/category',
            query: {
                category: category
            }
        });
    },
  },

  mounted() {
    this.getQuotesByCats()
    window.addEventListener("scroll", this.handleScroll);
  },

  created() {
      const categories = this.$route.query.categories;
      if (categories) {
        this.multipleCategories = JSON.parse(categories);
      }
    },

  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },

  watch: {
    $route(to, from) {
      const categories = to.query.categories;
    if (categories) {
      this.multipleCategories = JSON.parse(categories);
    }
        this.current_offset = 0;
        this.quotes = [];
        this.getQuotesByCats();
    },
  },

};

  </script>
  
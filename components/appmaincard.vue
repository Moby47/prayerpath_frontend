<template>
  <div>
    <!-- Your template code here -->
      <!--card-->
      <div class="section mt-1 mb-2"
      v-for="quote in quotes"
      v-bind:key="quote.id"
      >
          <div class="card">
              <div class="card-body">
                  <h5>God's word:</h5>
                  <p class="card-text">
                    {{quote.verse}}
                      <small> <i class='badge'> {{quote.reference}} - NIV</i></small>
                  </p>

                <apptranslation :quote="quote"/>
          
    <div 
    v-if="quote.imageurl"
    style="position: relative; height: auto; display: flex; flex-direction: column;" 
    :style="{ backgroundImage: `url(${quote.imageurl})` }"
    class="card card-img-overlay prayer"
    >
  <div style="background-color: rgba(0,0,0,0.65); position: absolute; top: 0; left: 0; height: 100%; width: 100%;"></div>
  <p style="position: relative; z-index: 1;" class="card-text">
    {{quote.prayer}}
  </p>
</div>

<div 
v-else
    style="position: relative; height: auto; display: flex; flex-direction: column;" 
    :style="{ backgroundImage: `url(https://cdn.pixabay.com/photo/2019/05/05/00/41/bible-4179472_960_720.jpg)` }"
    class="card card-img-overlay prayer"
    >
  <div style="background-color: rgba(0,0,0,0.65); position: absolute; top: 0; left: 0; height: 100%; width: 100%;"></div>
  <p style="position: relative; z-index: 1;" class="card-text">
    {{quote.prayer}}
  </p>
</div>

<p class="card-text"><small><i class='badge'>Prayer For {{quote.category}}</i></small></p>
<div class="section full">
          <div class="wide-block pt-2 pb-1">

              <div class="row">
                  <div class="col-2">
                     
                  </div>
                  <div class="col-2">
                       <v-icon class="color-black" @click="showSermon(quote)">mdi-book-cross</v-icon>
                  </div>
                  <div class="col-2">
                    <v-icon class="color-red" @click="saveQuote(quote)">mdi-heart</v-icon>
                  </div>
                  <div class="col-2">
                       <v-icon  @click="copyContent(quote)">mdi-content-copy</v-icon>
                  </div>
                  <div class="col-2">
                    <router-link
                      :to="{ name: 'discussion', query: { id: quote.id } }"
                      tag="span"
                    >
                       <v-icon class="color-app">mdi-comment-multiple</v-icon>
                       </router-link>
                  </div>
                  <div class="col-2">

                      <appshare :quote="quote"/>

                  </div>
              </div>

          </div>
      </div>


       <!-- Content Action Sheet -->
       <div class="modal fade action-sheet" id="actionSheetContent" tabindex="-1" role="dialog">
          <div class="modal-dialog" role="document">
              <div class="modal-content">
                  <div class="modal-header">
                      <h5 class="modal-title">Sermon</h5>
                  </div>
                  <div class="modal-body">
                      <div class="action-sheet-content">
                          <p>
                            {{ sermon }}
                          </p>
                          <a href="#" class="btn btn-outline-primary btn-block btn-lg" data-dismiss="modal">Close</a>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      <!-- * Content Action Sheet -->

      

      

              </div>
          </div>
      </div>
      <!--card-->

<div class="section full d-flex justify-content-center">
<div>
  <button type="button" class="btn btn-outline-primary mb-1" @click="loadMore()" v-if="showLoadButton">Load more</button>
</div>
</div>


  </div>
</template>

<style>
.prayer {
  background-position: center !important;
  background-size: cover !important;
}
</style>

<script>
// Define your component using the Vue.js API

import apptranslation from "~/components/apptranslation.vue";

import * as idb from 'idb-keyval'

export default {
  // Add data properties here
  components: {
  apptranslation,
},
  props: {
    quotes: {
      type: Array,
      required: true,
    },
    showLoadButton: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // Your data properties here
      sermon:'',
      current_offset: 0,
  load_more_limit: 10, //determines how many is fetched initially
    }
  },
  // Add methods here
  methods: {
    // Your methods here

    showSermon(quote) {
      this.sermon = quote.sermon
  $('#actionSheetContent').modal('toggle');
  },

  async saveQuote(quote) {
      this.$nuxt.$loading.start()

    let savedQuotes = await idb.get('fav') || [];
    if (savedQuotes.length >= 5) {
     // this.snackText = 'Lo and behold, only 5 quotes may be saved. View Favourites?'
     // this.showSnackbar = true
      this.$nuxt.$loading.finish()
      return;
    }
    let key = quote.id;
    let existingQuote = savedQuotes.find(q => q.id === key);
    if (existingQuote) {
     // this.snackText = 'Verily, verily, this quote is already amongst thy Favourites. View now?'
     // this.showSnackbar = true
      this.$nuxt.$loading.finish()
      return;
    }
    savedQuotes.push(quote);
    await idb.set('fav', savedQuotes);
    //this.snackText = 'Quote added to thy Favourites. View now?'
    //  this.showSnackbar = true
    this.$nuxt.$loading.finish()
  },

  async copyContent(quote) {
    const sentence1 = quote.verse
    const sentence2 = quote.prayer
    const text = sentence1 + "\n" + "\n" + sentence2; // concatenate sentences with a newline character
    try {
      await navigator.clipboard.writeText(text);
     // this.snackText = 'Quote and Prayer copied.'
     // this.copySnackbar = true
    } catch (err) {
      console.error("Failed to copy sentences: ", err);
     // this.snackText = 'Copying to clipboard is not supported in this browser. Please copy the Quote and prayer manually.'
     // this.copySnackbar = true
    }
  },

  loadMore() {
      this.$emit("load-more");
    },

  },
  // The mounted hook is called after the component is mounted to the DOM
  mounted() {
    // Your mounted code here
  }
}
</script>

<template>
    <v-app style="background-color: white;">
      <v-container> <!-- Provides centered look for the page -->
        <v-row justify="center" align="center">
          <v-col>
            <!-- appbar Component -->
            <appbar />
      
            <!--  Quote -->
            <template>
    <div>
        <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6" class="others-font">
      <v-card
        class="mx-auto animated tdFadeIn"
        color="#ADD8E6"
        :elevation="0" :shadow="false"
        py-4
        style="margin: 10px;"
        v-for="quote in quote"
        v-bind:key="quote.id"
      >
        <div class="d-flex justify-between">
          
          <v-card-actions class="flex-grow-1 flex-column align-start">
    <div class="text-h6" style="color: #000;">
      God's Word:
    </div>
    <div class=" verse-font" style="color: #000; word-wrap: break-word;">
      {{quote.verse}}
    </div>
    
      <v-chip
        @click.prevent="promptRedirect(quote.verse_url,'NIV')"
        color="#F5F5DC"
        label
        size="x-small"
        text-color="black"
      >
       
        {{quote.reference}}<b>&nbsp NIV</b>
      </v-chip>
  
      <div style="display: flex; flex-direction: row;" class="mt-1">
      
        <v-chip
          @click.prevent="promptRedirect(quote.verse_url,'KJV')"
          color="#F5F5DC"
          label
          size="x-small"
          text-color="black"
          class="mr-1"
        >
          
          KJV
        </v-chip>
        <v-chip
          @click.prevent="promptRedirect(quote.verse_url,'NKJV')"
          color="#F5F5DC"
          label
          size="x-small"
          text-color="black"
          class="mr-1"
        >
          
          NKJV
        </v-chip>
  
        <v-chip
          @click.prevent="promptRedirect(quote.verse_url,'NLT')"
          color="#F5F5DC"
          label
          size="x-small"
          text-color="black"
          class="mr-1"
        >
          
          NLT
        </v-chip>
      
  
    </div>
   
  </v-card-actions>
  
          <v-img
            v-if="quote.imageurl"
            contain
            height="50px"
            :lazy-src="quote.imageurl"
            :src="quote.imageurl"
            style="flex-basis: 80px"
            class="flex-grow-0 mr-1 mt-2"
          ></v-img>
  
          <v-img
            v-else
            contain
            height="50px"
            lazy-src="https://cdn.pixabay.com/photo/2014/04/02/10/44/hands-304398_960_720.png"
            src="https://cdn.pixabay.com/photo/2014/04/02/10/44/hands-304398_960_720.png"
            style="flex-basis: 80px"
            class="flex-grow-0 mr-1 mt-2"
          ></v-img>
        </div>
  
        <v-divider></v-divider>
  
        <v-card-actions class="text-body-2 prayer-font" style="color: #000;">
          {{quote.prayer}}
          
        </v-card-actions>
        
   <v-card-actions class="d-flex">
  <v-chip
    label
    color="#9AC0D1"
    style=" font-size: 12px; padding: 3px;"
    text-color="black"
  >
    Prayer For {{quote.category}}
  </v-chip>

  <div style="flex: 1;"></div>

  <v-icon  
  class="mr-3"
  color="red"
  >
  mdi-heart</v-icon>

  <v-icon  
  class="mr-3"
  color="#000"
  >
  mdi-content-copy</v-icon>

  <v-icon  
  class="mr-3"
  color="green"
  >
  mdi-share-variant</v-icon>

</v-card-actions>



      
      </v-card>
    </v-col>
  </v-row>






    </div>
  </template>
  

  <!--Disqus-->
  <template>
    <div>
        <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6" class="others-font">
     
        <p style='color:blue;'>  {{ url }} {{id}}</p>
  
            <template>
  <div class="comments">
    <Disqus shortname="prayerpath" :url="url" :identifier="id"/>
  </div>
</template>

    </v-col>
  </v-row>

    </div>
  </template>

            <!-- Bottom navigation bar with buttons for Strength, Career, Family and Others categories -->
            <div>
              <v-bottom-navigation 
                fixed 
                style="background-color: white; box-shadow: none; border: none;">
                
                <!-- Strength category button -->
                <v-btn 
                value="nearby" 
                size="x-small" 
                style="color: black !important;"
                :to="{ name: 'prayer'}"
            >
                <v-icon>mdi-select-all</v-icon>
                All
            </v-btn>
                
                <!-- Career category button -->
                <v-btn 
                  value="recent"  
                  size="x-small" 
                  style="color: black !important;"
                  @click="gotocat('Career')"
                >
                  <v-icon>mdi-briefcase</v-icon>
                  Career
                </v-btn>
                
                <!-- Family category button -->
                <v-btn 
                  value="favorites"  
                  size="x-small" 
                  style="color: black !important;"
                  @click="gotocat('Family')"
                >
                  <v-icon>mdi-human-male-female-child</v-icon>
                  Family
                </v-btn>
                
                <!-- Others category button -->
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
  
  
  import axios from 'axios';
  import * as idb from 'idb-keyval'
  
  export default {
    components: {
      appbar,
      categorymodal,
      loadinglayer,
      messagebar,
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
       offlineCategory: false,
       snackText:'',
       verse_url:'',
       showSnackbar: false,
       snackbar: false,
       fixed: false,
      
       loading: true,
       overlay: null,
       showButton: true,
       dialog: false,
       categories: [],
       key: this.$config.BACKEND_API_KEY,
       backend_url: this.$config.BACKEND_APP_URL,
      drawer: false,

      id:'',
      quote: [],
      url:'',
      app_url: this.$config.APP_URL,
     }
   },
  
   methods: {
  
    openCategoryModal () {
      this.$refs.categorymodal.dialog = true;
    },
  
  async getquote() {
  
   this.overlay = true;
   this.showButton = false;
   
  
  var final_url = `${this.backend_url}/api/quote/${this.id}`;
  
  try {
  const res = await axios.get(final_url, {
  headers: {
  'Content-Type': 'application/json',
  'X-Authorization': this.key
  }
  });
  
  this.quote = this.quote.concat(res.data.data);
  
  this.showButton = true;
  this.overlay = false;
  
  if (res.data.data.length === 0) {
         this.snackText = "Alas, our search has come up empty - let's ask the Lord for a miracle!"
         this.$refs.messagebar.snackbar = true;
        }
  /*
  //add to indexeddb
  let savedQuotes = await idb.get('quotes') || [];
  if (savedQuotes.length + res.data.data.length > 100) {
   savedQuotes = savedQuotes.slice(0, 100 - res.data.data.length);
  }
  for (let i = 0; i < res.data.data.length; i++) {
   let quote = res.data.data[i];
   let key = quote.id;
   let existingQuote = savedQuotes.find(q => q.id === key);
   if (existingQuote) {
     continue;
   }
   savedQuotes.push(quote);
  }
  await idb.set('quotes', savedQuotes);
  */
  //add to indexeddb
  
  } catch (error) {
  
  console.error(error);
  this.showButton = true;
  this.overlay = false;
  
  /*
  //get from indexeddb
  try {
  const savedQuotes = await idb.get('quotes');
  
  if (savedQuotes) {
  this.quotes = savedQuotes;
  //console.log('retrieved',savedQuotes)
  this.$refs.messagebar.snackbar = true;
  this.snackText = "Off the grid? Don't fret, God's got us - Offline mode."
  this.showLoadButton=false
  } else {
  console.log("No cached record/quotes found");
  this.snackText = "Blackout? Trust in God - No saved records found."
  this.$refs.messagebar.snackbar = true;
  this.showLoadButton=false
  }
  
  } catch (error) {
  console.error(error);
  }
  //get from indexeddb
  */
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
  
  
   //end
  
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
  
  //get only categories from indexeddb
  try {
  const savedQuotes = await idb.get('quotes');
  
  if (savedQuotes) {
  this.quotes = savedQuotes;
  const categories = [...new Set(savedQuotes.map(quote => quote.category))];
  this.categories = categories;
  this.offlineCategory = true
  console.log('categories', this.categories);
  } else {
  console.log("No categories found.");
  }
  
  } catch (error) {
  console.error(error);
  }
  //get from indexeddb
       }
     },
  
   //end
  
  
     handleScroll() {
       this.showButton = window.pageYOffset > 200;
     },
  
     gotocat(category){
        this.$router.push({
        path: '/category',
        query: {
          category: category
        }
      })
    },
          
   },
   //  method end
   
   mounted(){

   this.id = this.$route.query.id
   this.url = this.app_url + '/discussion?id=' + this.id;

    //get quote
    this.getquote()

    //get categories
    this.getCategories()
  
    window.addEventListener("scroll", this.handleScroll);
  
    },
  
   beforeDestroy() {
   window.removeEventListener("scroll", this.handleScroll);
   },        
   
    }
   
   </script>
   
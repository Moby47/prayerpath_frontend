<template>
    <v-app style="background-color: white;">
       <v-container> <!--Gives the home page a centered look-->
   <v-row justify="center" align="center">
     <v-col>
     
   <appbar></appbar>
  
  
  <template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6" class="others-font">
      <v-card
        class="mx-auto animated tdFadeIn"
        color="#ADD8E6"
        :elevation="0" :shadow="false"
        py-4
        style="margin: 10px;"
        v-for="quote in quotes"
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
      <div class="
  d-flex justify-center" style="margin-bottom: 65px;">
         <!-- Show reset button if showButton is true -->
         <v-btn color="#F5F5DC" style="color:#000;" @click="loadMore()" v-if="showLoadButton" depressed>More</v-btn>
       </div>
     </v-col>
   </v-row>
   </template>
  <!-- Dynamic content and btn-->
  
  
   <!-- bottom nav -->
   <div>
     <v-bottom-navigation 
       fixed 
       style="background-color: white; box-shadow: none; border: none;">
  
     <!-- Home button 
 <v-btn 
   value="nearby" 
   size="x-small" 
   style="color: black !important;"
   :to="{ name: 'index'}"
 >
   <v-icon>mdi-home</v-icon>
   Home
 </v-btn>-->

 <v-btn 
   value="nearby" 
   size="x-small" 
   style="color: black !important;"
   @click="gotocat('Strength')"
 >
   <v-icon>mdi-weight-lifter</v-icon>
   Strength
 </v-btn>
  <!--
   <v-btn 
     value="nearby" 
     size="x-small" 
     style="color: black !important;"
     @click="getquotes()"
   >
     <v-icon>mdi-select-all</v-icon>
     All
   </v-btn>-->
  
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
     value="favorites"  
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
             <div class="text-center" style="color: black !important;" v-else>
              Nothing to see here.
             </div>
           </template>
  
         <!-- Close button -->
         <v-card-actions style="background-color: white !important; display: flex; justify-content: center; align-items: center;">
   <v-btn depressed  color="#F5F5DC" @click="dialog = false" style="color:black">Close</v-btn>
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
             <v-progress-linear indeterminate size="64" color="#F5F5DC"  height="10"></v-progress-linear>
             <br>
             Loading...
           </v-overlay>
         </div>
         </template>
         <!--Loading Overlay-->
  
   
         <!--Err snackbar-->
     <v-snackbar
     :timeout="4500"
     shaped
     color="#555"
       v-model="snackbar" >
       {{errSnackText}}
       <template v-slot:action="{ attrs }">
         <v-btn
         color="#F5F5DC"
           text
           v-bind="attrs"
           @click="snackbar = false"
         >
           Ok
         </v-btn>
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
     color="#F5F5DC"
     depressed
     fab
     fixed
     :bottom='true'
     small
     :left='true'
     :to="{ name: 'prayer'}"
     v-if="showButton"
     :style="{ bottom: '70px', right: '30px' }"
   >
     <v-icon color="black">mdi-refresh</v-icon>
   </v-btn>
  </template>


  <template>
   <v-btn
     color="#F5F5DC"
     depressed
     fab
     fixed
     :bottom='true'
     small
     :right='true'
     @click="scrollTop()"
     v-if="showButton"
     :style="{ bottom: '70px', right: '30px' }"
   >
     <v-icon color="black">mdi-arrow-up</v-icon>
   </v-btn>
  </template>
  
       </v-col>
     </v-row>
   </v-container> <!--Gives the  page a centered look-->
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
import axios from 'axios';
import * as idb from 'idb-keyval';

export default {
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
     errSnackText:'',
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
     fromLoadMore:null,
     showLoadButton:null,
     drawer: false,
    };
  },

  methods: {
    async getQuotesByCat() {

        //if called from modal
     this.dialog = false;

    this.overlay = true;
    this.showButton = false
    this.showLoadButton=false

    if(this.fromLoadMore != true){
        this.scrollTop();
    }
    //kill from loadmor
    this.fromLoadMore = null
    

      var final_url = `${this.backend_url}/api/quotes-category/${this.category}?offset=${this.current_offset}&limit=${this.load_more_limit}`;

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
       this.showLoadButton=true

        if (response.data.data.length === 0) {
         this.errSnackText = "No more results? Trust in the Lord to fill the void - That's all for "+this.category
         this.snackbar = true
        }
      } catch (error) {
        this.snackbar = true
       this.showButton = true
       this.overlay = false
       this.showLoadButton=true

 //get from indexeddb
try {
const savedQuotes = await idb.get('quotes');

if (savedQuotes) {
this.quotes = savedQuotes.filter(quote => quote.category == category);
//console.log('retrieved',savedQuotes)
this.snackbar = true
this.errSnackText = "Praise the Lord, offline mode saves the day - Data found for "+category
} else {
console.log("No saved quotes found");
this.errSnackText = "All else fails? Trust in God - Offline mode: No results found for "+category
}

} catch (error) {
console.error(error);
}
//get from indexeddb
      }
    },

    loadMore() {
        this.fromLoadMore = true
      this.current_offset += this.load_more_limit;

      this.getQuotesByCat();
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
        this.verse_url = verse_url
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
    })
  },

  },
//meth end

  mounted() {
    this.category = this.$route.query.category;
    this.getQuotesByCat();

    this.getCategories()

  window.addEventListener("scroll", this.handleScroll);

  /*
  var online = navigator.onLine; 
  if(!online){
  console.log('Not online')
   }else{
   console.log('online')
   }
*/
  },

  beforeDestroy() {
 window.removeEventListener("scroll", this.handleScroll);
 },      

  watch: {
    $route(to, from) {
      const category = to.query.category;
      this.category = category;
      this.current_offset = 0;
      this.quotes = [];
      this.getQuotesByCat();
    },
  },

};

  </script>
  
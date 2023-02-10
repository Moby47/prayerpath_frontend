<template>
  <v-app style="background-color: white;">
    <v-container> <!-- Provides centered look for the page -->
      <v-row justify="center" align="center">
        <v-col>
          <!-- App bar component -->
          <AppBar/>

          <!-- Quote card component with quotes, showLoadButton properties and load-more, prompt-redirect events -->
          <QuoteCard
            :quotes="quotes"
            :showLoadButton="showLoadButton"
            @load-more="loadMore"
            @prompt-redirect="promptRedirect"
          />

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
                @click="gotocat('Strength')"
              >
                <v-icon>mdi-weight-lifter</v-icon>
                Strength
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
          
          <!-- Category modal component -->
          <CategoryModal ref="categoryModal" @category-selected="gotocat"/>

          <!-- Loading overlay component -->
          <LoadingOverlay :overlay="overlay"/>

          <!-- Message snackbar component -->
          <MessageSnackBar :timeout="5000" :snackText="snackText"  ref="MessageSnackBar" />

          <!-- Snackbar for verse url -->
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
import axios from 'axios';
import * as idb from 'idb-keyval'

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
     offlineCategory: false,
     snackText:'',
     verse_url:'',
     showSnackbar: false,
     snackbar: false,
     fixed: false,
     quotes: [],
     loading: true,
     overlay: null,
     showButton: true,
     dialog: false,
     categories: [],
     key: this.$config.BACKEND_API_KEY,
     backend_url: this.$config.BACKEND_APP_URL,
     current_offset: 0,
    load_more_limit: 10, //determines how many is fetched initially
    fromLoadMore:null,
    showLoadButton:null,
    drawer: false,
   }
 },

 methods: {

  openCategoryModal () {
    this.$refs.categoryModal.dialog = true;
  },

async getquotes() {

 this.overlay = true;
 this.showButton = false;
 

 if(this.fromLoadMore != true){
      this.scrollTop();
  }
  //kill from loadmor
  this.fromLoadMore = null
  

//var final_url = this.backend_url + '/api/quotes';
var final_url = `${this.backend_url}/api/quotes?offset=${this.current_offset}&limit=${this.load_more_limit}`;

try {
const res = await axios.get(final_url, {
headers: {
'Content-Type': 'application/json',
'X-Authorization': this.key
}
});

this.quotes = this.quotes.concat(res.data.data);

this.showButton = true;
this.showLoadButton=true
this.overlay = false;

if (res.data.data.length === 0) {
       this.snackText = "Alas, our search has come up empty - let's ask the Lord for a miracle!"
       this.$refs.MessageSnackBar.snackbar = true;
      }

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

//console.log('saved quotes', savedQuotes)
//add to indexeddb

} catch (error) {

console.error(error);
this.showButton = true;
this.showLoadButton=true
this.overlay = false;

//get from indexeddb
try {
const savedQuotes = await idb.get('quotes');

if (savedQuotes) {
this.quotes = savedQuotes;
//console.log('retrieved',savedQuotes)
this.$refs.MessageSnackBar.snackbar = true;
this.snackText = "Off the grid? Don't fret, God's got us - Offline mode."
this.showLoadButton=false
} else {
console.log("No cached record/quotes found");
this.snackText = "Blackout? Trust in God - No saved records found."
this.$refs.MessageSnackBar.snackbar = true;
this.showLoadButton=false
}

} catch (error) {
console.error(error);
}
//get from indexeddb

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

   loadMore() {
      this.fromLoadMore = true
    this.current_offset += this.load_more_limit;

    this.getquotes();
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
 
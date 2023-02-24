<template>
    <v-app style="background-color: white;">
      <v-container> <!-- Provides centered look for the page -->
        <v-row justify="center" align="center">
          <v-col>
            <!-- appbar Component -->
            <appbar />

            <h4 style="color:black">Favourites ❤️️</h4>

            <v-card-title style="color:black" v-if="quotes.id">Your Favourites</v-card-title>
           
            <!-- QuoteCard  -->
            <template>
    <div>
        <v-row justify="center" align="center" class="mb-10">
    <v-col cols="12" sm="8" md="6" class="others-font mb-10">
      <v-card
        class="mx-auto animated tdFadeIn mb-5"
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
    <div class="verse" style="color: #000; word-wrap: break-word;">
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
  
  <v-btn
  icon
  class="d-flex justify-center align-center mt-1 mr-1"
  style="width: 50px; height: 50px; border-radius: 50%; background-color: #F5F5DC;"
  @click="showSermon(quote)"
>
  <v-icon
    color="#000"
    size="25"
    class="pulse"
  >
    mdi-book-cross
  </v-icon>
</v-btn>

      <v-dialog v-model="showDialog" max-width="500">
      <v-card>
        <v-card-title>Sermon</v-card-title>
        <v-card-text>
          {{sermon}}
        </v-card-text>
        <v-card-actions>
        <!--  <v-btn color="primary" text @click="showDialog = false">Close</v-btn>-->
        </v-card-actions>
      </v-card>
    </v-dialog>

        </div>
        <v-divider></v-divider>
  
        <v-card-actions v-if="quote.imageurl" class="prayer" style="color: #fff; position: relative; height: auto; display: flex; flex-direction: column;" :style="{ backgroundImage: `url(${quote.imageurl})` }">
  <div style="background-color: rgba(0,0,0,0.65); position: absolute; top: 0; left: 0; height: 100%; width: 100%;"></div>
  <span style="position: relative; z-index: 1;">{{quote.prayer}}</span>
</v-card-actions>

<v-card-actions v-else class="prayer" style="color: #fff; position: relative; height: auto; display: flex; flex-direction: column;" :style="{ backgroundImage: `url(${backgroundImage})` }">
  <div style="background-color: rgba(0,0,0,0.65); position: absolute; top: 0; left: 0; height: 100%; width: 100%;"></div>
  <span style="position: relative; z-index: 1;">{{quote.prayer}}</span>
</v-card-actions>
        
   <v-card-actions class="d-flex">
  <v-chip
    label
    color="#9AC0D1"
    style=" font-size: 12px; padding: 3px;"
    text-color="black"
    @click="gotocat(quote.category)"
  >
    Prayer For {{quote.category}}
  </v-chip>

  <div style="flex: 1;"></div>

  <v-icon  
  class="mr-3"
  color="#f91605"
  @click="deleteQuote(quote.id)"
  >
  mdi-delete</v-icon>

  <v-icon  
  class="mr-3"
  color="#000"
  @click="copyContent(quote)"
  >
  mdi-content-copy</v-icon>

  <router-link
  :to="{ name: 'discussion', query: { id: quote.id } }"
  tag="span"
>
      <v-icon
        class="mr-3"
        color="blue"
      >
        mdi-comment-multiple
      </v-icon>
</router-link>

  <!--Social Share-->
<share :quote="quote"/>

</v-card-actions>
      
      </v-card>

      <h4 style="color:black">{{ redirectMessage }} {{ countdown }}</h4>

    </v-col>
  </v-row>
    </div>
  </template>

  <!--copy snackbar-->
  <template>
    <v-snackbar
      :timeout="5000"
      shaped
      top
      color="#555"
      v-model="copySnackbar"
    >
      {{ snackText }}
      <template v-slot:action="{ attrs }">
        <v-btn color="#F5F5DC" text v-bind="attrs" @click="copySnackbar = false">
          Ok
        </v-btn>
      </template>
    </v-snackbar>
  </template>
  
            <!-- Bottom navigation bar with buttons for Peace, Family and Others categories -->
            <div>
              <v-bottom-navigation 
                fixed 
                style="background-color: white; box-shadow: none; border: none;">
                
                <!-- home  button -->
                <v-btn 
            value="nearby" 
            size="x-small" 
            style="color: black !important;"
            :to="{ name: 'prayer'}"
          >
            <v-icon>mdi-book-cross</v-icon>
            All
          </v-btn>
                
                <!-- Peace category button -->
                <v-btn 
                  value="recent"  
                  size="x-small" 
                  style="color: black !important;"
                  @click="gotocat('Peace')"
                >
                  <v-icon>mdi-peace</v-icon>
                  Peace
                </v-btn>
                
                <!-- Family category button -->
                <v-btn 
                  value="Favourites"  
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
  
  </style>
   
   <script>
  
  import appbar from "~/components/appbar.vue";
  import categorymodal from "~/components/categorymodal.vue";
  import loadinglayer from "~/components/loadinglayer.vue";
  import messagebar from "~/components/messagebar.vue";
  import quotecard from "~/components/quotecard.vue";
  
  import share from '@/components/share.vue'
  
  import axios from 'axios';
  import * as idb from 'idb-keyval'
  
  export default {
    components: {
      appbar,
      categorymodal,
      loadinglayer,
      messagebar,
      quotecard,
      share,
    },
  
   head() {
     return {
      title: "PrayerPath - Favourite Prayers",
      meta: [
      {
      hid: 'description',
      name: 'description',
      content: "Access your favourite prayers anytime with PrayerPath. Save your favourite quotes and prayers from the Bible to stay inspired on your spiritual journey."
      },
      {
      name: 'keywords',
      content: 'favourite prayers, bible, quotes, faith, inspiration, God, devotional, daily, motivation, religious'
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
      drawer: false,

      countdown: '',
      redirectMessage: '',
      backgroundImage: 'https://cdn.pixabay.com/photo/2019/05/05/00/41/bible-4179472_960_720.jpg',
      showDialog: false,
      sermon:'',

      copySnackbar:false
    };
  },
   
    methods: {

      async copyContent(quote) {
      const sentence1 = quote.verse
      const sentence2 = quote.prayer
      const text = sentence1 + "\n" + "\n" + sentence2; // concatenate sentences with a newline character
      try {
        await navigator.clipboard.writeText(text);
        this.snackText = 'Quote and Prayer copied.'
        this.copySnackbar = true
      } catch (err) {
        console.error("Failed to copy sentences: ", err);
        this.snackText = 'Copying to clipboard is not supported in this browser. Please copy the Quote and prayer manually.'
        this.copySnackbar = true
      }
    },

      showSermon(quote){
        this.sermon = quote.sermon
        this.showDialog = true
      },
  
    openCategoryModal () {
      this.$refs.categorymodal.dialog = true;
    },
  
  async getquotes() {
  //get from indexeddb
 // this.$nuxt.$loading.start()
try {
const savedQuotes = await idb.get('fav');

if (savedQuotes && savedQuotes.length > 0) {
this.quotes = savedQuotes;
} else {
console.log("No fav record found");
this.snackText = "Thy favourites list is barren, like the desert sands."
 this.$refs.messagebar.snackbar = true;

 //timeout to prayer page
 this.redirectMessage = 'Redirecting in'
 this.countdown = 5
 this.timer = setInterval(() => {
      this.countdown--;
      if (this.countdown === 0) {
        clearInterval(this.timer);
        this.$router.push('/prayer');
      }
    }, 1000);

}

} catch (error) {
console.error(error);
}
//this.$nuxt.$loading.finish()
//get from indexeddb
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

    async deleteQuote(id) {
      this.$nuxt.$loading.start()

      let savedQuotes = await idb.get('fav') || [];
      let index = savedQuotes.findIndex(q => q.id === id);
      if (index !== -1) {
        savedQuotes.splice(index, 1);
        await idb.set('fav', savedQuotes);
      }
      
 this.snackText = "The quote hath been removed!"
 this.$refs.messagebar.snackbar = true;

      this.$nuxt.$loading.finish()
      this.getquotes()
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
   
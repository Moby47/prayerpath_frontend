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
  
         
        </div>
  
        <v-divider></v-divider>
  
        <v-card-actions v-if="quote.imageurl" class="prayer" style="color: #fff; position: relative; height: auto; display: flex; flex-direction: column;" :style="{ backgroundImage: `url(${quote.imageurl})` }">
  <div style="background-color: rgba(0,0,0,0.60); position: absolute; top: 0; left: 0; height: 100%; width: 100%;"></div>
  <span style="position: relative; z-index: 1;">{{quote.prayer}}</span>
</v-card-actions>

<v-card-actions v-else class="prayer" style="color: #fff; position: relative; height: auto; display: flex; flex-direction: column;" :style="{ backgroundImage: `url(${backgroundImage})` }">
  <div style="background-color: rgba(0,0,0,0.60); position: absolute; top: 0; left: 0; height: 100%; width: 100%;"></div>
  <span style="position: relative; z-index: 1;">{{quote.prayer}}</span>
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
  @click="saveQuote(quote)"
  >
  mdi-heart</v-icon>

  <v-icon  
  class="mr-3"
  color="#000"
  >
  mdi-content-copy</v-icon>

  <!--Social Share-->
<share :quote="quote"/>

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
     
      
  <!--Disqus-->
<template>
  <div style="margin-bottom: 85px;">
    <div id="disqus_thread"></div>
  </div>
</template>
  <!--Disqus-->


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
  
        <v-snackbar
        :timeout="5000"
        :value="showSnackbar"
        color="#555"
        v-model="showSnackbar"
        top
      >
        {{snackText}}
        <template v-slot:action="{ attrs }">
          <v-btn
            color="#F5F5DC"
            text
            @click="showSnackbar = false"
            v-bind="attrs"
          >
            No
          </v-btn>
          <v-btn
          color="#F5F5DC"
          dark
          text
          :to="{ name: 'favourite'}"
          v-bind="attrs"
          >
          Yes
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
  
  import share from '@/components/share.vue'

  import axios from 'axios';
  import * as idb from 'idb-keyval'
  
  export default {
    components: {
      appbar,
      categorymodal,
      loadinglayer,
      messagebar,
      share,
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

      snackText: '',
      showSnackbar: false,

      backgroundImage: 'https://cdn.pixabay.com/photo/2019/05/05/00/41/bible-4179472_960_720.jpg',
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
  
  } catch (error) {
  
  console.error(error);
  this.showButton = true;
  this.overlay = false;
  
  
  //get from indexeddb
  try {
  const savedQuotes = await idb.get('quotes');
  
  if (savedQuotes) {
  this.quote = savedQuotes.filter(quote => quote.id == this.id);
  if (this.quote.length) {
    this.$refs.messagebar.snackbar = true;
    this.snackText = "Praise the Lord, offline mode saves the day - Data found";
  } else {
    console.log("No data found");
    this.snackText = "God's got you, offline too - No results found, keep the faith!"
    this.$refs.messagebar.snackbar = true;
  }
} else {
  console.log("No saved quote found");
  this.snackText = "All else fails? Trust in God - Offline mode: No results found";
  this.$refs.messagebar.snackbar = true;
}

  } catch (error) {
  console.error(error);
  }
  //get from indexeddb
  
  }
  },

  async saveQuote(quote) {
        this.$nuxt.$loading.start()

      let savedQuotes = await idb.get('fav') || [];
      if (savedQuotes.length >= 5) {
        this.snackText = 'Lo and behold, only 5 quotes may be saved. View Favourites?'
        this.showSnackbar = true
        this.$nuxt.$loading.finish()
        return;
      }
      let key = quote.id;
      let existingQuote = savedQuotes.find(q => q.id === key);
      if (existingQuote) {
        this.snackText = 'Verily, verily, this quote is already amongst thy Favourites. View now?'
        this.showSnackbar = true
        this.$nuxt.$loading.finish()
        return;
      }
      savedQuotes.push(quote);
      await idb.set('fav', savedQuotes);
      
      this.$nuxt.$loading.finish()
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
 
   //load up disqus
  const disqus_config = function () {
    this.page.url = window.location.href;
    this.page.identifier = this.id;
  };
  const script = document.createElement('script');
  script.src = 'https://prayerpath.disqus.com/embed.js';
  script.setAttribute('data-timestamp', +new Date());
  (document.head || document.body).appendChild(script);


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
   
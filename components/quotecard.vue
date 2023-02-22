<template>
    <div>
        <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6" class="others-font">
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
    <div class="verse mb-1" style="color: #000; word-wrap: break-word;">
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
  
      <!--    <v-img
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
          ></v-img>-->
          <v-img
          contain
          height="50px"
          lazy-src="https://cdn.pixabay.com/photo/2016/12/13/21/34/preacher-1905176_960_720.jpg"
          src="https://cdn.pixabay.com/photo/2016/12/13/21/34/preacher-1905176_960_720.jpg"
          style="flex-basis: 50px; border-radius: 50%;"
          class="mr-2 mt-4 pulse"
          @click="showSermon(quote)"
        ></v-img>

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
  color="red"
  @click="saveQuote(quote)"
  >
  mdi-heart</v-icon>

  
  <v-icon  
  class="mr-3"
  color="#000"
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
        mdi-comment
      </v-icon>
</router-link>

 <!--Social Share-->
<share :quote="quote"/>

</v-card-actions>
      
      </v-card>
    </v-col>
  </v-row>

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


  <v-row justify="center">
    <v-col cols="12" sm="8" md="6">
      <div class="
  d-flex justify-center" style="margin-bottom: 65px;">
         <!-- Show reset button if showButton is true -->
         <v-btn color="#F5F5DC" style="color:#000;" @click="loadMore()" v-if="showLoadButton" depressed>More</v-btn>
       </div>
     </v-col>
   </v-row>
    </div>
  </template>
  
  <style>
  .prayer {
    background-position: center;
    background-size: cover;
    font-family: Georgia, 'Times New Roman', Times, serif;
    font-size: 18px;
  }
  .verse {
  font-family: 'Lato', sans-serif;
  font-size: 18px;
}

.others-font {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}

/*
==========
pulse
==========
*/
.pulse{
	animation-name: pulse;
	-webkit-animation-name: pulse;	

	animation-duration: 2s;	
	-webkit-animation-duration: 2s;

	animation-timing-function: linear;	
	-webkit-animation-timing-function: linear;

	animation-iteration-count: infinite;
	-webkit-animation-iteration-count: infinite;

	visibility: visible !important;	
}

@keyframes pulse {
	0% {
		transform: scale(0.9);
		opacity: 0.9;		
	}
	50% {
		transform: scale(1);
		opacity: 1;	
	}	
	100% {
		transform: scale(0.9);
		opacity: 0.9;	
	}			
}

@-webkit-keyframes pulse {
	0% {
		-webkit-transform: scale(0.95);
		opacity: 0.9;		
	}
	50% {
		-webkit-transform: scale(1);
		opacity: 1;	
	}	
	100% {
		-webkit-transform: scale(0.95);
		opacity: 0.9;	
	}			
}


  </style>

  <script>

import share from '@/components/share.vue'

import * as idb from 'idb-keyval'

  export default {
    components: {
      share
  },
    name: "QuoteCard",
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
      snackText: '',
      showSnackbar: false,
      backgroundImage: 'https://cdn.pixabay.com/photo/2019/05/05/00/41/bible-4179472_960_720.jpg',
      showDialog: false,
      sermon:'',
    };
  },
   
    methods: {

      showSermon(quote){
        this.sermon = quote.sermon
        this.showDialog = true
      },

      loadMore() {
        this.$emit("load-more");
      },
      promptRedirect(url, version) {
        this.$emit("prompt-redirect", url, version);
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
      this.snackText = 'Quote added to thy Favourites. View now?'
        this.showSnackbar = true
      this.$nuxt.$loading.finish()
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
  };
  </script>
  
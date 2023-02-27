<template>
    <div>

      <apploader v-if="fetching"/>
   
   <appheader/>
   
   <span v-if="!fetching">

    <!-- App Capsule -->
    <div id="appCapsule">

        <div class="header-large-title">
            <h4 class="subtitle">You are viewing: {{ multipleCategories.join(', ') }} 😊</h4>
        </div>

        <appmaincard :quotes="quotes" @load-more="loadMore" :showLoadButton="showLoadButton"/>
     

      <appfooter/>

   <!-- Multi purpose modal-->
   <div id="multiModal" class="notification-box">
                  <div class="notification-dialog ios-style">
                      <div class="notification-header">
                          <div class="right">
                              <span>just now</span>
                          </div>
                      </div>
                      <div class="notification-content">
                          <div class="in">
                              <h3 class="subtitle">{{notificationTitle}}</h3>
                              <div class="text">
                                  {{notificationMessage}}
                              </div>
                          </div>
    <img :src="notificationImg" alt="image" class="imaged w64">
                      </div>
                  </div>
              </div>
            <!-- Multi purpose modal-->

    </div>
    <!-- * App Capsule -->
  </span>

  <appbottommenu/>


  <appsidebar/>

    </div>
</template>

<script>

import appsidebar from "~/components/appsidebar.vue";
import appshare from "~/components/appshare.vue";
import appmaincard from "~/components/appmaincard.vue";
import apploader from "~/components/apploader.vue";
import appheader from "~/components/appheader.vue";
import appfooter from "~/components/appfooter.vue";
import appbottommenu from "~/components/appbottommenu.vue";

import axios from 'axios';
import * as idb from 'idb-keyval'

export default {
  components: {
    appsidebar,
    appshare,
    appmaincard,
    apploader,
    appheader,
    appfooter,
    appbottommenu,
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
      key: this.$config.BACKEND_API_KEY,
 backend_url: this.$config.BACKEND_APP_URL,
 current_offset: 0,
load_more_limit: 10, //determines how many is fetched initially
showLoadButton:true,
quotes: [],
fetching:true,

notificationTitle:'',
    notificationMessage:'',
    notificationImg:'',

    category: '',
    categories: [],
    multipleCategories: [],
    }
  },
  methods: {
   
    async getQuotesByCats() {

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
    this.fetching = false

    if (response.data.data.length === 0) {
      this.showNotification('multiModal', 'Notice', "Trust in the Lord to fill the void - That's all for " + categories, 'https://media4.giphy.com/media/6zdkYKBBTHTITFQ4xA/200w.webp?cid=ecf05e47grsch9ryn9j0ldj03vq6q47kiumx06fbham06lyw&rid=200w.webp&ct=g');
      }
  } catch (error) {

    //get from indexeddb

    try {
      const savedQuotes = await idb.get('quotes');
this.fetching = false

      if (savedQuotes) {
        this.quotes = savedQuotes.filter(quote => this.multipleCategories.includes(quote.category));
        if (this.quotes.length) {
         this.showNotification('multiModal', 'Notice', "Offline mode saves the day - Data found for " + categories, 'https://media4.giphy.com/media/5BaJ6438Qp6RJQRRQn/100.webp?cid=ecf05e47mc7k8z4093hl7pwdluibbvvstlf1ydvbbimaxriw&rid=100.webp&ct=g');

        } else {
          console.log("No saved quotes found for the specified categories");
         this.showNotification('multiModal', 'Notice', "Offline - No results for " + categories + ", keep the faith!", 'https://media4.giphy.com/media/5BaJ6438Qp6RJQRRQn/100.webp?cid=ecf05e47mc7k8z4093hl7pwdluibbvvstlf1ydvbbimaxriw&rid=100.webp&ct=g');

        }
      } else {
        console.log("No saved quotes found");
       this.showNotification('multiModal', 'Notice', "Offline mode: No results found for " + categories, 'https://media4.giphy.com/media/5BaJ6438Qp6RJQRRQn/100.webp?cid=ecf05e47mc7k8z4093hl7pwdluibbvvstlf1ydvbbimaxriw&rid=100.webp&ct=g');
       
      }
    } catch (error) {
      console.error(error);
    }
    //get from indexeddb
  }
},

loadMore() {
  this.$nuxt.$loading.start()
        this.current_offset += this.load_more_limit;
        this.getQuotesByCats();
        this.$nuxt.$loading.finish()
    },

    showNotification(notificationId,notificationTitle,notificationMessage,notificationImg) {

this.notificationTitle = notificationTitle
this.notificationMessage = notificationMessage
this.notificationImg = notificationImg

var a = "#" + notificationId;
var time = 4500;
$(".notification-box").removeClass("show");
setTimeout(() => {
$(a).addClass("show");
}, 300);
if (time) {
time = time + 300;
setTimeout(() => {
    $(".notification-box").removeClass("show");
}, time);
}
},

  },


  mounted() {
    this.getQuotesByCats()
    },

    created() {
      const categories = this.$route.query.categories;
      if (categories) {
        this.multipleCategories = JSON.parse(categories);
      }
    },

    watch: {
    $route(to, from) {
      const categories = to.query.categories;
    if (categories) {
      this.fetching = true
      this.multipleCategories = JSON.parse(categories);
    }
        this.current_offset = 0;
        this.quotes = [];
        this.getQuotesByCats();
    },
  },

  beforeRouteLeave(to, from, next) {
    document.body.classList.remove('modal-open');
    const modalBackdrop = document.querySelector('.modal-backdrop');
    if (modalBackdrop) {
      modalBackdrop.remove();
    }
    next();
  },

}
</script>
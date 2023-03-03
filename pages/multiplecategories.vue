<template>
  <div>
    <apploader v-if="fetching" />

    <appheader />

    <span v-if="!fetching">
      <!-- App Capsule -->
      <div id="appCapsule">
        <div class="header-large-title">
          <h4 class="subtitle"
            >You are viewing: {{ multipleCategories.join(', ') }} 😊</h4
          >
        </div>

        <appmaincard
          :quotes="quotes"
          @load-more="loadMore"
          :showLoadButton="showLoadButton"
          :spinner="spinner"
        />

        <appfooter />

        <!-- Multi purpose modal-->
        <div id="multiplcatMmultiModal" class="notification-box">
          <div class="notification-dialog ios-style">
            <div class="notification-header">
              <div class="right">
                <span>just now</span>
              </div>
            </div>
            <div class="notification-content">
              <div class="in">
                <h3 class="subtitle">{{notificationTitle}}</h3>
                <div class="text">{{notificationMessage}}</div>
              </div>
              <img :src="notificationImg" alt="image" class="imaged w64" />
            </div>
          </div>
        </div>
        <!-- Multi purpose modal-->
      </div>
      <!-- * App Capsule -->
    </span>

    <appbottommenu />

    <appsidebar />
  </div>
</template>


<script>
import appsidebar from "~/components/appsidebar.vue";
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
    appmaincard,
    apploader,
    appheader,
    appfooter,
    appbottommenu,
  },
  head() {
    // Setting the head section of the page
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

      spinner:false,
    }
  },
  methods: {
   
    async getQuotesByCats() {
      // Getting quotes by categories
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

        this.spinner = false

        if (response.data.data.length === 0) {
          this.showNotification('multiplcatMmultiModal', 'Notice', "That's all for " + categories, 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExY2Q0MWI3ZjJiODlkN2Q4NjU2MzhhNzIwYzc5YzFmNTU4NzljODMwNiZjdD1n/6zdkYKBBTHTITFQ4xA/giphy.gif');
        }
      } catch (error) {
        // get from indexeddb if there's an error
        try {
          const savedQuotes = await idb.get('quotes');
          this.fetching = false
          this.spinner = false

          if (savedQuotes) {
        this.quotes = savedQuotes.filter(quote => this.multipleCategories.includes(quote.category));
        if (this.quotes.length) {
         this.showNotification('multiplcatMmultiModal', 'Notice', "Offline mode saves the day - Data found for " + categories, 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOTA5ZDAwZmQwNjlkOTQ2YTAwOTUwMDE4ZjY5YzYyNmMyNjZhNzU0YiZjdD1n/5BaJ6438Qp6RJQRRQn/giphy.gif');

        } else {
          console.log("No saved quotes found for the specified categories");
         this.showNotification('multiplcatMmultiModal', 'Notice', "Offline - No results for " + categories + ", keep the faith!", 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOTA5ZDAwZmQwNjlkOTQ2YTAwOTUwMDE4ZjY5YzYyNmMyNjZhNzU0YiZjdD1n/5BaJ6438Qp6RJQRRQn/giphy.gif');

        }
      } else {
        console.log("No saved quotes found");
       this.showNotification('multiplcatMmultiModal', 'Notice', "Offline mode: No results found for " + categories, 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOTA5ZDAwZmQwNjlkOTQ2YTAwOTUwMDE4ZjY5YzYyNmMyNjZhNzU0YiZjdD1n/5BaJ6438Qp6RJQRRQn/giphy.gif');
       
      }
    } catch (error) {
      console.error(error);
    }
    //get from indexeddb
  }
},

    loadMore() {
      this.spinner = true
        this.current_offset += this.load_more_limit;
        this.getQuotesByCats();
    },

    showNotification(notificationId,notificationTitle,notificationMessage,notificationImg) {

    this.notificationTitle = notificationTitle
    this.notificationMessage = notificationMessage
    this.notificationImg = notificationImg

    var a = "#" + notificationId;
    var time = 4000;
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

   //Solved the modal overlay not leaving after route change issue
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
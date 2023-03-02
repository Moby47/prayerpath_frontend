<template>
  <div>
    <appnotification :notificationMessage="notificationMessage"/>

    <apploader v-if="fetching"/>

    <appheader/>

    <span v-if="!fetching">
      <!-- App Capsule -->
      <div id="appCapsule">
        <div class="header-large-title">
          <h4 class="subtitle">All categories 🎉</h4>
        </div>

        <appmaincard :quotes="quotes" @load-more="loadMore" :showLoadButton="showLoadButton" :spinner="spinner"/>
      
        <appfooter/>
      </div>
      <!-- * App Capsule -->

      <appsidebar/>
    </span>

    <appbottommenu/>
  </div>
</template>


<script>
import appsidebar from "~/components/appsidebar.vue";
import appmaincard from "~/components/appmaincard.vue";
import apploader from "~/components/apploader.vue";
import appheader from "~/components/appheader.vue";
import appfooter from "~/components/appfooter.vue";
import appbottommenu from "~/components/appbottommenu.vue";
import appnotification from "~/components/appnotification.vue";
import axios from 'axios';
import * as idb from 'idb-keyval'

export default {
  components: {
    appsidebar,
    appmaincard,
    apploader,
    appheader,
    appfooter,
    appnotification,
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
      showLoadButton: true,
      quotes: [],
      notificationMessage: '',
      fetching: true,
      spinner: false,
    }
  },
  methods: {
    async getquotes() {
      var final_url = `${this.backend_url}/api/quotes?offset=${this.current_offset}&limit=${this.load_more_limit}`;
      try {
        const res = await axios.get(final_url, {
          headers: {
            'Content-Type': 'application/json',
            'X-Authorization': this.key
          }
        });
        this.quotes = this.quotes.concat(res.data.data);
        this.fetching = false;
        this.spinner = false;
        if (res.data.data.length === 0) {
          //Notify user
          this.notificationMessage = "Alas, our search has come up empty - let's ask the Lord for a miracle!"
          appnotification.methods.showNotification('noRecord')
          //Notify user
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
        this.showLoadButton = false;
        //get from indexeddb
        try {
          const savedQuotes = await idb.get('quotes');
          this.fetching = false;
          this.spinner = false;
          if (savedQuotes) {
            this.quotes = savedQuotes;
            //console.log('retrieved',savedQuotes)
            //Notify user
this.notificationMessage = "Off the grid? Don't fret, God's got you."
appnotification.methods.showNotification('info')
//Notify user

} else {
console.log("No cached record/quotes found");
//Notify user
this.notificationMessage = "Blackout? Trust in God."
appnotification.methods.showNotification('noRecord')
//Notify user
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
  this.getquotes();
},

},


mounted() {
 //get quotes
this.getquotes()

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
<template>
    <div>
    
      <apploader v-if="fetching"/>
     
     <appheader/>
     
     <span v-if="!fetching">

    <!-- App Capsule -->
    <div id="appCapsule">

        <div class="header-large-title">
            <h4 class="subtitle">Favourites 👍 </h4>
        </div>

      <appmaincardfav :quotes="quotes" @quote-deleted="handleQuoteDeleted"/>
     

      <appfooter v-if="quotes.length > 0"/>

        <div v-if="quotes.length < 1">
          <div class="wide-block pt-2 pb-2">
            <div class="alert alert-outline-primary text-center" role="alert">
        Thy favourites list is barren, like the desert sands. <br> <router-link to="/home">Go Home</router-link>
      </div>
      </div>
        </div>

    </div>
    <!-- * App Capsule -->
  </span>

  <appbottommenu/>


  <appsidebar/>

    
 <!-- Multi purpose modal-->
 <div id="favMultiModal" class="notification-box">
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
                <!-- *  Multi purpose modal -->

    </div>
</template>

<script>

import appsidebar from "~/components/appsidebar.vue";
import appshare from "~/components/appshare.vue";
import appmaincardfav from "~/components/appmaincardfav.vue";
import apploader from "~/components/apploader.vue";
import appheader from "~/components/appheader.vue";
import appfooter from "~/components/appfooter.vue";
import appbottommenu from "~/components/appbottommenu.vue";

//import axios from 'axios';
import * as idb from 'idb-keyval'

export default {
  components: {
    appsidebar,
    appshare,
    appmaincardfav,
    apploader,
    appheader,
    appfooter,
    appbottommenu,
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
      fetching:true,
      quotes:[],
      notificationTitle:'',
      notificationMessage:'',
      notificationImg:'',
    }
  },
  methods: {
   
    async getquotes() {

  //get from indexeddb
try {
const savedQuotes = await idb.get('fav');

if (savedQuotes && savedQuotes.length > 0) {
this.quotes = savedQuotes;
this.fetching = false

} else {
console.log("No fav record found");
this.fetching = false

//Notify user
this.showNotification('favMultiModal', 'Hello', "Thy favourites list is barren, like the desert sands.", 'https://media0.giphy.com/media/j7wBU7aHcKf7y/200w.webp?cid=ecf05e472wktn63dtdp5cuqay6cjx1hxl6fcsyait3rky198&rid=200w.webp&ct=g');
  //Notify user
 
}

} catch (error) {
console.error(error);
}
//get from indexeddb

  },

  handleQuoteDeleted(id) {
      // Remove the deleted quote from the quotes array
      this.quotes = this.quotes.filter(q => q.id !== id);
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
   
//get quotes
  this.getquotes()

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
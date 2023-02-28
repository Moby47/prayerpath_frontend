<template>
    <div>
    
      <apploader v-if="fetching"/>
     
     <appheader/>
     
     <span v-if="!fetching">

    <!-- App Capsule -->
    <div id="appCapsule">

        <div class="header-large-title">
            <h4 class="subtitle">Share your thoughts below 🤔</h4>
        </div>

      <appmaincardsin :quote="quote"/>
     

      <appfooter/>

       <!-- Multi purpose modal-->
 <div id="discussMultiModal" class="notification-box">
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
    <!-- * App Capsule -->
</span>

  <appbottommenu/>


  <appsidebar/>

    </div>
</template>

<script>

import appsidebar from "~/components/appsidebar.vue";
import appshare from "~/components/appshare.vue";
import appmaincardsin from "~/components/appmaincardsin.vue";
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
    appmaincardsin,
    apploader,
    appheader,
    appfooter,
    appbottommenu,
   
  },
  head() {
     return {
      title: "PrayerPath - Community Chat",
      meta: [
      {
      hid: 'description',
      name: 'description',
      content: "Connect with other believers and discuss the quotes and prayers that inspire you. Join the PrayerPath community chat and grow your faith together."
      },
      {
      name: 'keywords',
      content: 'community chat, bible, quotes, prayers, faith, inspiration, God, devotional, daily, motivation, religious, discussion'
     }
   ]
  }
  
   },
  data() {
    return {
      quote: [],
      key: this.$config.BACKEND_API_KEY,
       backend_url: this.$config.BACKEND_APP_URL,
       fetching:true,
       id:'',

       notificationTitle:'',
      notificationMessage:'',
      notificationImg:'',
    }
  },
  methods: {
   
    async getquote() {
  
 var final_url = `${this.backend_url}/api/quote/${this.id}`;
 
 try {
 const res = await axios.get(final_url, {
 headers: {
 'Content-Type': 'application/json',
 'X-Authorization': this.key
 }
 });
 
 this.quote = this.quote.concat(res.data.data);
 this.fetching = false
 
 if (res.data.data.length === 0) {
this.showNotification('discussMultiModal', 'Notice', "Alas, our search has come up empty - let's ask the Lord for a miracle!", 'https://media4.giphy.com/media/26hkhPJ5hmdD87HYA/200w.webp?cid=ecf05e47776z8ma1gmcw18fexuyv3hxq66umwybfhzn1ldjj&rid=200w.webp&ct=g');
        }
 
 } catch (error) {
 
 console.error(error);
 
 
 //get from indexeddb
 try {
 const savedQuotes = await idb.get('quotes');
 this.fetching = false
 
 if (savedQuotes) {
 this.quote = savedQuotes.filter(quote => quote.id == this.id);
 if (this.quote.length) {
  this.showNotification('discussMultiModal', 'Hurray!', "Praise the Lord, offline mode saves the day - Data found", 'https://media1.giphy.com/media/S3Ot3hZ5bcy8o/200.webp?cid=ecf05e47v6ksxhudtu2yf43mj98xett2bocz4bjmyf0448lh&rid=200.webp&ct=g');
 } else {
   console.log("No data found");
   this.showNotification('discussMultiModal', 'Notice', "Offline mode - No results found, keep the faith!", 'https://media4.giphy.com/media/26hkhPJ5hmdD87HYA/200w.webp?cid=ecf05e47776z8ma1gmcw18fexuyv3hxq66umwybfhzn1ldjj&rid=200w.webp&ct=g');
 }
} else {
 console.log("No saved quote found");
 this.showNotification('discussMultiModal', 'Notice', "All else fails? Trust in God - Offline mode: No results found", 'https://media4.giphy.com/media/26hkhPJ5hmdD87HYA/200w.webp?cid=ecf05e47776z8ma1gmcw18fexuyv3hxq66umwybfhzn1ldjj&rid=200w.webp&ct=g');
 }

 } catch (error) {
 console.error(error);
 }
 //get from indexeddb
 
 }
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
   
    this.id = this.$route.query.id
  //get quote
  this.getquote()
  
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
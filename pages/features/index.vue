<template>
    <div>
      
   <apploader v-if="fetching"/>
  
      <appheader/>
  
      <span v-if="!fetching">
        <!-- App Capsule -->
        <div id="appCapsule">
          <div class="header-large-title">
            <h4 class="subtitle">Feature Requests 👨‍💻</h4>
          </div>
  
          <div class="listview-title mt-2">We value and appreciate your feedback</div>
          
          <div class="section">
            <div class="pt-2 pb-2">

                <div v-if="reqs.length < 1">
          <div class="wide-block pt-2 pb-2">
            <div class="alert alert-outline-primary text-center" role="alert">
              Thy features request list is dry, like the desert sands. <br />
              <router-link to="/home">Go Home</router-link>
            </div>
          </div>
        </div>

                <!-- comment block -->
                <div class="comment-block mb-3"
                v-for="req in reqs"
                v-bind:key="req.id"
                >
                    <!--item -->
                    <div class="item">
                      
                        <!--feature req-->
                        <div class="in">
                            <div class="comment-header">
                                <h4 class="title">{{req.name}}</h4>
                             <span class="time">{{ $luxon.fromISO(req.created_at).toRelative() }}</span>
                            </div>
                            <div class="text">
                                {{ req.comments.length > 120 ? req.comments.slice(0, 120) + "..." : req.comments }}
                            </div>
                            <div class="comment-footer">
                                <router-link :to="`features/${req.id}`" class="comment-button">
                                    <v-icon class="color-app">mdi-comment-multiple</v-icon>
                                   <span class="ml-1"> Leave a comment</span>
                                </router-link>
                            </div>
                        </div>
                        <!--feature req-->
                    </div>
                </div>
                <!-- * comment block -->

    <div class="section full d-flex justify-content-center mt-4">
<div>
  <button type="button" class="btn btn-outline-primary mb-1" @click="loadMore()" v-if="reqs.length > 0">
   Load More
    <span class="spinner-border spinner-border-sm mr-05 ml-1" role="status" aria-hidden="true" v-if="spinner"></span>
  </button>

</div>
</div>

            </div>
        </div>

          <appfooter v-if="reqs.length > 0" />

        </div>
        <!-- * App Capsule -->
  
          <!-- Multi purpose modal-->
    <div id="reqMultiModal" class="notification-box">
      <div class="notification-dialog ios-style">
        <div class="notification-header">
          <div class="right">
            <span>just now</span>
          </div>
        </div>
        <div class="notification-content">
          <div class="in">
            <h3 class="subtitle">Notice</h3>
            <div class="text">{{ notificationMessage }}</div>
          </div>
          <img :src="notificationImg" alt="image" class="imaged w64" />
        </div>
      </div>
    </div>
    <!-- *  Multi purpose modal -->

     <!-- Modal Form -->
     <div class="modal fade modalbox" id="featureModalForm" data-backdrop="static" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Feature Request</h5>
                        <a href="javascript:;" data-dismiss="modal">Close</a>
                    </div>
                    <div class="modal-body">
                        <div class="login-form">
                            <div class="section mt-2">
                                <h4>Help us improve our product by submitting your feature requests</h4>
                            </div>
                            <div class="section mt-4 mb-5">
                                <form @submit.prevent="submitForm">
                                    <div class="form-group basic">
                                        <div class="input-wrapper">
                                            <label class="label" for="name">Name</label>
                                            <input type="text" class="form-control" id="name" v-model="name"
                                                placeholder="Your Name" required>
                                        </div>
                                    </div>
                                    <div class="form-group basic">
                                        <div class="input-wrapper">
                                            <label class="label" for="email1">E-mail</label>
                                            <input type="email" class="form-control" id="email1" v-model="email"
                                                placeholder="Your e-mail" required>
                                        </div>
                                    </div>

                                    <div class="form-group basic">
                        <div class="input-wrapper">
                            <label class="label" for="address4">Comments</label>
                            <textarea id="address4" rows="2" class="form-control" required v-model="comments"></textarea>
                        </div>
                     
                    </div>                            
                                    <div class="mt-2">
                                        <button type="submit" class="btn btn-outline-primary btn-block btn-lg">
                                          Send
                                        </button>
                                    </div>

                                </form>
                            </div>
                            <small>
                          Please provide a detailed description of the feature you would like to see added to our product.<br>
                          How important is this feature to you?<br>
                          How urgently do you need this feature? <br>
                          What is your use case or scenario for this feature?
                        </small>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        <!-- * Modal Form -->

        <!-- top right -->
<div class="fab-button animate top-right dropdown">
  <a class="fab" data-toggle="dropdown" @click="showFeaturesModal()">
    <v-icon style="color:white">mdi-folder-plus</v-icon>
  </a>
  <div class="dropdown-menu"></div>
</div>
<!-- * top right -->


        <appsidebar/>
      </span>
  
      <appbottommenu/>
    </div>
  </template>
  
  
  <script>
  import appsidebar from "~/components/appsidebar.vue";
  import apploader from "~/components/apploader.vue";
  import appheader from "~/components/appheader.vue";
  import appfooter from "~/components/appfooter.vue";
  import appbottommenu from "~/components/appbottommenu.vue";

  import axios from 'axios';
  import * as idb from 'idb-keyval'
  
  export default {
    components: {
      appsidebar,
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
        load_more_limit: 5, //determines how many is fetched initially
        showLoadButton: true,
        reqs: [],
        app_url: this.$config.APP_URL,
        fetching: true,
        spinner: false,
        notificationMessage: '',
      notificationImg: '',
      name: '',
      email: '',
      comments: '',
      }
    },

    methods: {

        showFeaturesModal() {
      $('#featureModalForm').modal('toggle');
      },

        submitForm() {
        this.fetching = true;

      axios.post(`${this.backend_url}/api/add-feature`, {
        name: this.name,
        email: this.email,
        comments: this.comments
      }, {
          headers: {
            'Authorization': `Bearer ${this.key}`,
          },
        })
      .then(response => {
        // Handle successful response
        $('#featureModalForm').modal('toggle');
        this.fetching = false;
        this.$router.push({ path: `/features/${response.data.id}` })

      })
      .catch(error => {
        // Handle error
        console.error(error)
        $('#featureModalForm').modal('toggle');

        alert('An error occured. Please try again later.')
        this.fetching = false;
      })
    },


      async getfeatureReq() {

        var final_url = `${this.backend_url}/api/feature-requests?offset=${this.current_offset}&limit=${this.load_more_limit}`;
        try {
          const res = await axios.get(final_url, {
            headers: {
              'Content-Type': 'application/json',
              'X-Authorization': this.key
            }
          });
          this.reqs = this.reqs.concat(res.data.data);
          this.fetching = false;
          this.spinner = false;
          if (res.data.data.length === 0) {
            //Notify user
           this.showNotification('reqMultiModal', "Alas, our search has come up empty", 'https://media.giphy.com/media/PwWDPvnQdLv8vcZkx5/giphy.gif');    
          }
          /*
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
          */
        } catch (error) {
          console.error(error);
          this.showLoadButton = false;
          this.fetching = false;
          this.spinner = false;
/*
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
   */

  }
  },
  
  showNotification(notificationId, notificationMessage, notificationImg) {
      this.notificationMessage = notificationMessage
      this.notificationImg = notificationImg

      var a = "#" + notificationId;
      var time = 3000;
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

  loadMore() {
  this.spinner = true
    this.current_offset += this.load_more_limit;
    this.getfeatureReq();
  },
  
  },
  
  
  mounted() {
   //get quotes
  this.getfeatureReq()
  
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
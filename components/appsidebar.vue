<template>
    <div>

      <apploader v-if="isLoading"/>

      <!-- App Sidebar -->
      <div class="modal fade panelbox panelbox-left" id="sidebarPanel" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-body p-0">
              <!-- profile box -->
              <div class="profileBox">
                <div class="image-wrapper">
                  <img src="https://cdn.pixabay.com/photo/2016/04/15/18/05/computer-1331579_960_720.png" alt="image" class="imaged rounded">
                </div>
                <div class="in">
                  <strong>Welcome</strong>
                </div>
                <a href="#" class="close-sidebar-button" data-dismiss="modal">
                  <v-icon>mdi-close</v-icon>
                </a>
              </div>
              <!-- * profile box -->
  
              <ul class="listview flush transparent no-line image-listview mt-2">
                <li>
                  <router-link to="/home" class="item">
                    <div class="icon-box">
                      <v-icon>mdi-home</v-icon>
                    </div>
                    <div class="in">
                      Home
                    </div>
                  </router-link>
                </li>
                <li>
                  <router-link to="/favourite" class="item">
                    <div class="icon-box">
                      <v-icon>mdi-heart</v-icon>
                    </div>
                    <div class="in">
                      Favourites
                    </div>
                  </router-link>
                </li>
                <li>
                  <span @click="showEmotion()" class="item">
                    <div class="icon-box">
                      <v-icon>mdi-head-heart</v-icon>
                    </div>
                    <div class="in">
                      <div>Emotions</div>
                    </div>
                  </span>
                </li>
                <li>
                  <span  @click="showCat()" class="item">
                    <div class="icon-box">
                      <v-icon>mdi-layers</v-icon>
                    </div>
                    <div class="in">
                      <div>Categories</div>
                    </div>
                  </span>
                </li>
            <!--
                <li>
                  <router-link to="/features" class="item">
                    <div class="icon-box">
                      <v-icon>mdi-feature-search</v-icon>
                    </div>
                    <div class="in">
                      Feature Request
                    </div>
                  </router-link>
                </li>
          -->
          <li>
                  <router-link to="/bible" class="item">
                    <div class="icon-box">
                      <v-icon>mdi-book-cross</v-icon>
                    </div>
                    <div class="in">
                      Bible
                    </div>
                  </router-link>
                </li>

                   <li>
                  <router-link to="/feedback" class="item">
                    <div class="icon-box">
                      <v-icon>mdi-comment-quote</v-icon>
                    </div>
                    <div class="in">
                      Feedback
                    </div>
                  </router-link>
                </li>
               

                <li>
                  <a target="_blank" href="https://tawk.to/chat/5b092b0810b99c7b36d453f7/1gr3u6udm" class="item">
                    <div class="icon-box">
                      <v-icon>mdi-chat</v-icon>
                    </div>
                    <div class="in">
                      Contact Us
                    </div>
                  </a>
                </li>

                <li>
                <div class="item">
                  <div class="icon-box">
                      <v-icon>mdi-weather-night</v-icon>
                    </div>
                    <div class="in">
                        <div>Dark Mode</div>
                        <div class="custom-control custom-switch">
                      <input type="checkbox" class="custom-control-input dark-mode-switch" 
                      v-model="isChecked" id="darkmodesidebar" @change="logCheckedValue">
                      <label class="custom-control-label" for="darkmodesidebar"></label>
                    </div>
                    </div>
                </div>
            </li>
              </ul>
  
            </div>
  
                  <!-- sidebar buttons -->
                  <div class="sidebar-buttons">
                    <a href="#" class="button">

                        <appchangelog/>

                    </a>
                    <a href="#" class="button">
                      
                    </a>
                    <a href="#" class="button">
                      
                    </a>
                    <a href="#" class="button">
                     
                    </a>
                </div>
                <!-- * sidebar buttons -->

          </div>
        </div>
      </div>
      <!-- * App Sidebar -->

       

      <!-- Multi purpose modal-->
    <div id="sidebarMultiModal" class="notification-box" @click="hideNotification()">
      <div class="notification-dialog ios-style">
        <div class="notification-header">
          <div class="right">
            <span>just now</span>
          </div>
        </div>
        <div class="notification-content">
          <div class="in">
            <h3 class="subtitle">Mode</h3>
            <div class="text">{{ notificationMessage }}</div>
          </div>
          <img :src="notificationImg" alt="image" class="imaged w64" />
        </div>
      </div>
    </div>
    <!-- *  Multi purpose modal -->

    </div>
  </template>
  
  <script>
  // Define your component using the Vue.js API

  import appchangelog from "~/components/appchangelog.vue";

  //import axios from 'axios'

export default {

  components: {
    appchangelog,
  },

  data() {
    return {
      isLoading: false,
        isChecked: false,
        notificationMessage: '',
      notificationImg: '',
      showFeatureList: false,
      key: this.$config.BACKEND_API_KEY,
      backend_url: this.$config.BACKEND_APP_URL,
      app_url: this.$config.APP_URL,
      }
    },

    // Add methods here
    methods: {
      // Show category modal
      showCat() {
        $('#sidebarPanel').modal('toggle');
        $('#singleCategoryModal').modal('toggle');
      },
  
      // Show emotions modal
      showEmotion() {
        $('#sidebarPanel').modal('toggle');
        $('#EmotionsModal').modal('toggle');
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

    logCheckedValue() {
        console.log("isChecked value changed to:", this.isChecked);
        if(this.isChecked == true){
 this.showNotification('sidebarMultiModal', "Dark mode activated ????", 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNTFlMTc3NzRjMzUwYjk1MjNjMDFjYWVkZTVlMmI2NDA5ZThmMGNjOCZjdD1n/kiBcwEXegBTACmVOnE/giphy-downsized-large.gif');
        }
        if(this.isChecked == false){
 this.showNotification('sidebarMultiModal', "Into the light ??????", 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNjc2OGE0Y2ViZTQxMDVkNTI5ODUzMzNhYTlmMmYzZWRmNjEyYTg2YyZjdD1n/IzigK4GlBmchkTqIrG/giphy.gif');    
        }
      },

      hideNotification(){
        $(".notification-box").removeClass("show");
      }
  
    },
   
    mounted() {
  // retrieve dark mode state from local storage
  const isDarkMode = this.$storage.getUniversal("isDarkMode")
if(isDarkMode == 1){
  this.isChecked = true
  document.body.classList.add("dark-mode-active");
}else{
  this.isChecked = false
  document.body.classList.remove("dark-mode-active");
}
},



    watch: {
      isChecked(value) {
        if (value) {
          document.body.classList.add("dark-mode-active");
          this.$storage.setUniversal("isDarkMode", 1);
          } else {
          document.body.classList.remove("dark-mode-active");
          this.$storage.setUniversal("isDarkMode", 0);
         }
        //remove any menu or modal overlay
        document.body.classList.remove('modal-open');
        const modalBackdrop = document.querySelector('.modal-backdrop');
        if (modalBackdrop) {
          modalBackdrop.remove();
        }

      },
    },
  }
  </script>
  
  <!--For dark mode icon color - white-->
  <style>
  .v-icon {
    color: black;
  }
  
  .dark-mode-active .v-icon {
    color: white !important;
  }

  </style>
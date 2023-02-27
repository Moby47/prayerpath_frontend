<template>
    <div>
      <!-- Your template code here -->
        <!-- app footer -->
        <div class="appFooter">
            PrayerPath
            <div class="footer-title">
                Copyright © PrayerPath 2023. All Rights Reserved.
            </div>
            <div>Get daily inspiration from the Bible with Quote God & Pray.</div>
            Find randomly generated quotes about God's promises and prayers to help you stay focused on your faith.

            <div class="mt-2">
                <a href="#" class="btn btn-icon btn-sm btn-facebook">
                    <v-icon>mdi-facebook</v-icon>
                </a>
                <a href="#" class="btn btn-icon btn-sm btn-twitter">
                    <v-icon>mdi-twitter</v-icon>
                </a>
                <a href="#" class="btn btn-icon btn-sm btn-instagram">
                    <v-icon>mdi-instagram</v-icon>
                </a>
                <a href="#" class="btn btn-icon btn-sm btn-whatsapp">
                    <v-icon>mdi-whatsapp</v-icon>
                </a>
                <a href="#" class="btn btn-icon btn-sm btn-secondary">
                    <v-icon>mdi-arrow-up</v-icon>
                </a>
            </div>

        </div>
        <!-- * app footer -->

         <!-- bottom right -->
         <div class="fab-button animate bottom-right dropdown">
            <a href="#" class="fab" @click="scrollTop()">
              <v-icon>mdi-arrow-up</v-icon>
            </a>
        </div>
        <!-- * bottom right -->
        
    </div>
  </template>
  
  <script>
  // Define your component using the Vue.js API
  export default {
    // Add data properties here
    data() {
      return {
        // Your data properties here
      }
    },
    // Add methods here
    methods: {
      // Your methods here
    },
    // The mounted hook is called after the component is mounted to the DOM
    mounted() {
      // Your mounted code here
    }
  }
  </script>
  
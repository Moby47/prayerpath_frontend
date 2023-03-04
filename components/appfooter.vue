<template>
  <div>
    <!-- Your template code here -->
    <!-- app footer -->
    <div class="appFooter">
      PrayerPath
      <div class="footer-title">
        Copyright © PrayerPath 2023. All Rights Reserved.
      </div>
      <div>
        Get daily inspiration from the Bible with Quote God & Pray.
        Find randomly generated quotes about God's promises and prayers to help you stay focused on your faith.
      </div>

      <!--Footer-->
      <div class="mt-2">
        <a target="_blank" href='https://play.google.com/store/apps/details?id=org.prayerpath.twa' 
        class="btn btn-icon btn-sm" style="background-color:grey">
          <v-icon style="color:white">mdi-android</v-icon>
        </a>
        <span class="btn btn-icon btn-sm" style="background-color:grey" onclick="alert('The iOS version of this app is currently under construction.')">
        <v-icon style="color:white">mdi-apple</v-icon>
      </span>
      <span class="btn btn-icon btn-sm" style="background-color:grey" @click="shareApp">
        <v-icon style="color:white">mdi-share-variant-outline</v-icon>
      </span>

      </div>
   
    <!-- app footer -->
    </div>
    
    <!-- bottom right -->
    <template>
      <div class="fab-button animate bottom-right dropdown" :class="{ hide: !scrolled }">
        <a href="#" class="fab" @click.prevent="$scrollToTop()">
          <v-icon color="#fff">mdi-arrow-up</v-icon>
        </a>
      </div>
    </template>
    <!-- * bottom right -->
  </div>
</template>

<style scoped>
  .hide {
    display: none;
  }
</style>

<script>
// Define your component using the Vue.js API
export default {
  // Add data properties here
  data() {
    return {
      // Your data properties here
      scrolled: false
    }
  },
  // Add methods here
  methods: {
    // Your methods here
    handleScroll() {
      this.scrolled = window.scrollY > 0
    },
 
    shareApp() {
  const appUrl = this.$config.APP_URL;

  navigator.share({
    title: 'PrayerPath - Quote God & Pray',
    text: 'Stay focused on your faith with daily inspiration from the Bible. Find randomly generated quotes about God\'s promises and prayers in PrayerPath.',
    url: appUrl,
  })
    .then(() => console.log('Shared successfully.'))
    .catch((error) => console.error('Error sharing:', error));
},


  },
  // The mounted hook is called after the component is mounted to the DOM
  mounted() {
    // Your mounted code here
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

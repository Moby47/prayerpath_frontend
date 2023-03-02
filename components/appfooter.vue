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

      <!--Change the spans to <a>-->
      <div class="mt-2">
        <a target="_blank" href='https://www.facebook.com/' class="btn btn-icon btn-sm btn-facebook">
          <v-icon>mdi-facebook</v-icon>
        </a>
        <a target="_blank" href='https://twitter.com/' class="btn btn-icon btn-sm btn-twitter">
          <v-icon>mdi-twitter</v-icon>
        </a>
        <a target="_blank" href='https://www.instagram.com/' class="btn btn-icon btn-sm btn-instagram">
          <v-icon>mdi-slack</v-icon>
        </a>
        <a target="_blank" href='https://chat.whatsapp.com/FrvtEpF0tWT5Tm3Ow0M7gD' class="btn btn-icon btn-sm btn-whatsapp">
          <v-icon>mdi-whatsapp</v-icon>
        </a>
      </div>
    </div>
    <!-- * app footer -->

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
    }
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

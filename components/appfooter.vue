<template>
  <div>
    <!-- Your template code here -->
    <!-- app footer -->
    <div class="appFooter">
      PrayerPath
      <div class="footer-title mt-1">
        Copyright © PrayerPath 2023. All Rights Reserved.
      </div>
      <div>
        Get daily inspiration from the Bible with Quote God & Pray.
        Find randomly generated quotes about God's promises and prayers to help you stay focused on your faith.
      </div>

      <!--Footer-->
      <div class="mt-2">
        <a target="_blank" href='https://play.google.com/store/apps/details?id=org.prayerpath.twa' 
        class="btn btn-icon btn-sm" style="background-color:rgb(149 149 149 / 28%)">
          <v-icon style="color:#3DDC84">mdi-android</v-icon>
        </a>
        <span class="btn btn-icon btn-sm" style="background-color:rgb(149 149 149 / 28%)" 
        @click="iosInfo()">
        <v-icon style="color:black">mdi-apple</v-icon>
      </span>
      <span class="btn btn-icon btn-sm" style="background-color:rgb(149 149 149 / 28%)" @click="shareApp">
        <v-icon style="color:green">mdi-share-variant-outline</v-icon>
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

     <!-- Dialog Image -->
     <div class="modal fade dialogbox" id="iosMessageDialog" data-backdrop="static" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">

                  <div class="modal-icon">
                    <v-icon>mdi-apple-ios</v-icon>
                    </div>
                    <div class="modal-header">
                        <h5 class="modal-title">The iOS version of this app is currently under construction. </h5>
                    </div>
                    <div class="modal-body">
                        We have a temporary workaround for you here 🙂:<br>
                        <a target="_blank" href='https://support.apple.com/en-ng/guide/iphone/iph42ab2f3a7/ios#:~:text=You%20can%20add%20a%20website,Home%20Screen%20for%20quick%20access.&text=in%20the%20menu%20bar%2C%20scroll,device%20where%20you%20add%20it.&text=Helpful%3F'>
                          Add a shortcut to the Home Screen on iPhone or iPad (Article)</a>
                          <br>
                          OR
                          <br>
                          <a target="_blank" href='https://www.youtube.com/watch?v=B7fKs4dTeu0'>
                          Add a shortcut to the Home Screen on iPhone or iPad (Video)</a> 
                    </div>

                    <div class="modal-footer">
                        <div class="btn-inline">
                            <a href="#" class="btn btn-text-primary" data-dismiss="modal">CLOSE</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- * Dialog Image -->


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

  iosInfo(){
    $('#iosMessageDialog').modal('toggle');
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

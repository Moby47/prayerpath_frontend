<template>
    <div>
      <!-- Currently used only in the single page quote/prayer page.. -->
  
      <!-- Your template code here -->
      <v-icon class="color-green" @click="share()">mdi-share-variant</v-icon>
  
      <!-- Share Action Sheet -->
      <div class="modal fade action-sheet inset" id="actionSheetShare" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Share with</h5>
            </div>
            <div class="modal-body">
              <ul class="action-button-list">
                <li>
                  <a href="#" class="btn btn-list" data-dismiss="modal">
                    <span>
                      <v-icon color="#075e54">mdi-whatsapp</v-icon>
                      <ShareNetwork
                        network="whatsapp"
                        :url="`${app_url}/discussion?id=${quote.id}`"
                        title="Get your dose of divine inspiration with Quote God & Pray! 🙏🙌"
                        description="Stay focused on your faith with randomly generated quotes about God's promises and prayers."
                        style="text-decoration: none !important; color:#075e54;"
                      >
                        Whatsapp
                      </ShareNetwork>
                    </span>
                  </a>
                </li>
                <li>
                  <a href="#" class="btn btn-list" data-dismiss="modal">
                    <span>
                      <v-icon color="#3b5998">mdi-facebook</v-icon>
                      <ShareNetwork
                        network="facebook"
                        :url="`${app_url}/discussion?id=${quote.id}`"
                        title="Get your dose of divine inspiration with Quote God & Pray! 🙏🙌"
                        description="Stay inspired and connected with God's promises and prayers on the go."
                        quote="Stay inspired and connected with God's promises and prayers on the go. 🙌"
                        hashtags="faith, inspiration, dailydevotional, bibleverse, prayer, spiritualgrowth, christianapp, devotionals, godisgood, blessed"
                        style="text-decoration: none !important; color:#3b5998;"
                      >
                        Facebook
                      </ShareNetwork>
                    </span>
                  </a>
                </li>
                <li>
                  <a href="#" class="btn btn-list" data-dismiss="modal">
                    <span>
                      <v-icon color="#00acee">mdi-twitter</v-icon>
                      <ShareNetwork
                        network="twitter"
                        :url="`${app_url}/discussion?id=${quote.id}`"
                        title="Get inspired and stay faithful with Quote God & Pray! 🙏🙌"
                        hashtags="faith,quoteGod&Pray,dailydevotional"
                        style="text-decoration: none !important; color:#00acee;"
                      >
                        Twitter
                      </ShareNetwork>
                    </span>
                  </a>
                </li>
                <li>
                  <a href="#" class="btn btn-list" data-dismiss="modal">
                    <span>
                      <v-icon color="#0084ff">mdi-facebook-messenger</v-icon>
                      <ShareNetwork
                        network="messenger"
                        :url="`${app_url}/discussion?id=${quote.id}`"
                        style="text-decoration: none !important; color:#0084ff;"
                        title="Get your dose of divine inspiration with Quote God & Pray! 🙏🙌"
                      >
                        Messenger
                      </ShareNetwork>
                    </span>
                  </a>
  
                            </li>
                         
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!-- * Share Action Sheet -->

    </div>
  </template>
  
  <script>
  // Define your component using the Vue.js API
  export default {
    // Add data properties here
    props: {
    quote: {
      type: Object,
      required: true
    },
  },
    data() {
      return {
        app_url: this.$config.APP_URL,
      }
    },
    // Add methods here
    methods: {
      // Your methods here

      share(){
    $('#actionSheetShare').modal('toggle');
    },

    },
    // The mounted hook is called after the component is mounted to the DOM
    mounted() {
      // Your mounted code here
    }
  }
  </script>
  
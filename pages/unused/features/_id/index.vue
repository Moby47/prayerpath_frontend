<template>
  <div>
    <apploader v-if="fetching" />
  
    <appheader />

<span v-if="!fetching">
  <!-- App Capsule -->
  <div id="appCapsule">
    <div class="header-large-title">
      <h4 class="subtitle">Feature Request 👩‍💻</h4>
    </div>

    <div class="listview-title mt-2">We value and appreciate your feedback</div>

    <div class="section">
      <div class="pt-2 pb-2">
        <!-- comment block -->
        <div class="comment-block mb-3">
          <!--item -->
          <div class="item">
            <!--feature req-->
            <div class="in">
              <div class="comment-header">
                <h4 class="title">{{req.name}}</h4>
                <span class="time">{{ created_at }}</span>
              </div>
              <div class="text">
                {{ req.comments }}
              </div>
              <div class="comment-footer"></div>
            </div>
            <!--feature req-->
          </div>
        </div>
        <!-- * comment block -->

        <!--Disqus-->
        <appfeaturedisqus />
        <!--Disqus-->

      </div>
    </div>

    <appfooter />
  </div>
  <!-- * App Capsule -->

  <appsidebar />
</span>

<appbottommenu />

    </div>
  </template>
  
  <script>

import appfeaturedisqus from "~/components/appfeaturedisqus.vue";

  import axios from 'axios';

  export default {
    components: {
      appfeaturedisqus,
  },
    head() {
      return {
        title: "PrayerPath - Request New Feature",
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: "Help shape the Bible App by suggesting new features to enhance your study and exploration of God's Word. Share your ideas with the community and help us create the ultimate Bible resource."
          },
          {
            name: 'keywords',
            content: 'bible, scripture, faith, study, features, requests, suggestions, community, God, prayer, religious'
          }
        ]
      }
    },

    data() {
      return {
        // Your data properties here
        backend_url: this.$config.BACKEND_APP_URL,
        req:[],
        key: this.$config.BACKEND_API_KEY,
        created_at:'',
        fetching: true,
      }
    },

    methods: {
      async singleFeatureReq() {
        var final_url = `${this.backend_url}/api/single-feature-request/${this.$route.params.id}`;
        try {
          const res = await axios.get(final_url, {
            headers: {
              'Content-Type': 'application/json',
              'X-Authorization': this.key
            }
          });

          this.req = res.data.data;
          this.created_at = this.$luxon.fromISO(this.req.created_at).toRelative();
          this.fetching = false;
        } catch (error) {
          console.error(error);
          this.fetching = false;
          alert('Network error occured, please refresh page.')
        }
      },
    },

    mounted() {
      // Your mounted code here
      this.singleFeatureReq();
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

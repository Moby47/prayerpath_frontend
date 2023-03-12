<template>
    <div>
      <!-- Your template code here -->
      <!--card-->
      <div
        class="section mt-1 mb-2"
        v-for="quote in quotes"
        v-bind:key="quote.id"
      >
        <div class="card">
          <div class="card-body">
            <h5>God's word:</h5>
            <p class="card-text">
              {{quote.verse}}
              <small> <i class='badge'> {{quote.reference}} - NIV</i></small>
            </p>
  
              <!--Translation-->
         <div>
      <div class="pb-1">
        <!-- Translation dropdown menu -->
        <div class="dropdown">
          <button class="btn btn-outline-primary dropdown-toggle" type="button" data-toggle="dropdown">
            Translations
          </button>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="#" @click.prevent="showTranslation(quote.reference, 'kjv')">KJV</a>
            <a class="dropdown-item" href="#" @click.prevent="showTranslation(quote.reference, 'web')">WEB</a>
            <a class="dropdown-item" href="#" @click.prevent="showTranslation(quote.reference, 'bbe')">BBE</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#"  @click.prevent="promptRedirect(quote.verse_url,'NKJV')">NKJV</a>
            <a class="dropdown-item" href="#" @click.prevent="promptRedirect(quote.verse_url,'NLT')">NLT</a>
          </div>
        </div>
      </div>
    </div>
     <!--Translation-->
  
            <div
              v-if="quote.imageurl"
              style="
                position: relative;
                height: auto;
                display: flex;
                flex-direction: column;
              "
              :style="{ backgroundImage: `url(${quote.imageurl})` }"
              class="card card-img-overlay prayer"
            >
              <div
                style="
                  background-color: rgba(0, 0, 0, 0.75);
                  position: absolute;
                  top: 0;
                  left: 0;
                  height: 100%;
                  width: 100%;
                "
              ></div>
              <p style="position: relative; z-index: 1;" class="card-text">
                {{quote.prayer}}
              </p>
            </div>
  
            <div
              v-else
              style="
                position: relative;
                height: auto;
                display: flex;
                flex-direction: column;
              "
              :style="{ backgroundImage: `url(https://cdn.pixabay.com/photo/2019/05/05/00/41/bible-4179472_960_720.jpg)` }"
              class="card card-img-overlay prayer"
            >
              <div
                style="
                  background-color: rgba(0, 0, 0, 0.75);
                  position: absolute;
                  top: 0;
                  left: 0;
                  height: 100%;
                  width: 100%;
                "
              ></div>
              <p style="position: relative; z-index: 1;" class="card-text">
                {{quote.prayer}}
              </p>
            </div>
  
            <div class="row">
                <div class="col-6">
                  <p class="card-text"><small><i class='badge'>Category: {{quote.category}}</i></small></p>
                </div>
                <div class="col-6">
                  <p class="card-text"><small><i class='badge'>Added {{ $luxon.fromISO(quote.created_at).toRelative() }}</i></small></p>
                </div>
              </div>
              
            <div class="section full">
              <div class="wide-block pt-2 pb-1">
                <div class="row">
                  <div class="col-2"></div>
                  <div class="col-2">
                    <v-icon class="color-black" @click="showSermon(quote)"
                      >mdi-book-cross</v-icon
                    >
                  </div>
                  <div class="col-2">
                    <v-icon
                      class="color-red"
                      @click="deleteQuote(quote.id)"
                      >mdi-delete</v-icon
                    >
                  </div>
                  <div class="col-2">
                    <v-icon @click="copyContent(quote)">mdi-content-copy</v-icon>
                  </div>
                  <div class="col-2">
                    <router-link
                      :to="{ name: 'discussion', query: { id: quote.id } }"
                    >
                      <v-icon class="color-app">mdi-comment-multiple</v-icon>
                    </router-link>
                  </div>
                  <div class="col-2">
                    <v-icon class="color-green" @click="share(quote)">mdi-share-variant</v-icon>
                    </div>
                </div>

            </div>
        </div>
 

         <!-- Content Action Sheet -->
         <div class="modal fade action-sheet" id="actionSheetContent" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Sermon</h5>
                    </div>
                    <div class="modal-body">
                        <div class="action-sheet-content">
                            <p>
                                {{ sermon }}
                            </p>
                            <a href="#" class="btn btn-secondary btn-block btn-lg" data-dismiss="modal">Close</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- * Content Action Sheet -->

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
                                     :url="url"
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
                                    :url="url"
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
                                    :url="url"
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
                                     :url="url"
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

         <!--Translation modals-->
          <!-- API translation Panel Left -->
     <div class="modal fade panelbox panelbox-left" id="translationPanelLeft" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">{{reference}} - {{ translation }}</h4>
                        <a href="javascript:;" data-dismiss="modal" class="panel-close">
                            <v-icon>mdi-window-close</v-icon>
                        </a>
                    </div>
                    <div class="modal-body">
                        <p v-for="text in texts">
                          {{ text }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <!-- * API translation Panel Left -->
           <!-- Dialog for translation redirect -->
    <div class="modal fade dialogbox" id="DialogIconedButtonInline" data-backdrop="static" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Notice</h5>
          </div>
          <div class="modal-body">
            This leads to biblegateway.
          </div>
          <div class="modal-footer">
            <div class="btn-inline">
              <a href="#" class="btn btn-text-danger" data-dismiss="modal">
                <v-icon>mdi-close</v-icon>
                Cancel
              </a>
              <a href="#" class="btn btn-text-primary"  @click="redirect()">
                <v-icon>mdi-rocket-launch</v-icon>
                Continue
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- * Dialog for translation redirect -->
     <!--Translation modals-->

 <!-- Multi purpose modal-->
 <div id="favCardMultiModal" class="notification-box">
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
            </div>
        </div>
        <!--card-->


    </div>
  </template>
  
  <script>
  
  import * as idb from 'idb-keyval'
  import axios from 'axios';

  export default {
    props: {
      quotes: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {
        // Your data properties here
        sermon:'',
        notificationTitle:'',
        notificationMessage:'',
        notificationImg:'',
        app_url: this.$config.APP_URL,
        url:'',
        verse_url:'',
        texts:null,
        translation:'',
        reference:'',
      }
    },
    // Add methods here
    methods: {
      // Your methods here
      share(quote){
        this.url = this.app_url+'/discussion?id='+quote.id
        $('#actionSheetShare').modal('toggle');
      },
      async deleteQuote(id) {
        this.$nuxt.$loading.start()
        let savedQuotes = await idb.get('fav') || [];
        let index = savedQuotes.findIndex(q => q.id === id);
        if (index !== -1) {
          savedQuotes.splice(index, 1);
          await idb.set('fav', savedQuotes);
          // Emit an event to notify the parent component to remove the deleted quote from the quotes array
          this.$emit('quote-deleted', id);
        }
        // Notify user
        this.showNotification('favCardMultiModal', 'Notice', "The quote hath been removed!", 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZmQ5ZmU4ZmQyMDk3ZWU4ODIyYWNkNTlhMDg0ODYzYmE4MDYxNGZjOSZjdD1n/Oj7yTCLSZjSt2JMwi2/giphy.gif');
        // Notify user
        this.$nuxt.$loading.finish()
      },
      showSermon(quote) {
        this.sermon = quote.sermon
        $('#actionSheetContent').modal('toggle');
      },
      async copyContent(quote) {
        const sentence1 = quote.verse
        const sentence2 = quote.prayer
        const text = sentence1 + "\n" + "\n" + sentence2; // concatenate sentences with a newline character
        try {
          await navigator.clipboard.writeText(text);
          // Notify user
          this.showNotification('favCardMultiModal', 'Notice', "Quote and Prayer copied.", 'https://media.giphy.com/media/psmj7c3DbrJKkbRYFj/giphy.gif');
          // Notify user
        } catch (err) {
          console.error("Failed to copy sentences: ", err);
          alert('Copying to clipboard is not supported in this browser. Please copy the Quote and prayer manually.')
        }
      },
      showNotification(notificationId,notificationTitle,notificationMessage,notificationImg) {
        this.notificationTitle = notificationTitle
        this.notificationMessage = notificationMessage
        this.notificationImg = notificationImg
        var a = "#" + notificationId;
        var time = 3500;
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

      // Translation methods
showTranslation(reference, translation) {
      this.$nuxt.$loading.start()
      axios.get(`https://bible-api.com/${reference}?translation=${translation}`)
        .then(response => {
        //for bible use this.verses = response.data.verses;
          this.texts = response.data.verses.map(verse => verse.text);
          this.translation = translation.toUpperCase();
          this.reference = reference
          $('#translationPanelLeft').modal('toggle');
          this.$nuxt.$loading.finish()
         // console.log(translation,this.texts)
        })
        .catch(error => {
          console.error(error);
          this.$nuxt.$loading.finish()
          if (this.texts.length === 0) {
        alert('Error: Could not retrieve verses. Please try again later.');
      }
        });
      },

        // Prompt user to redirect to a Bible translation website
    promptRedirect(verse_url,version) {
      $('#DialogIconedButtonInline').modal('toggle');
      let updatedUrl = verse_url.slice(0, -3);
      this.verse_url = updatedUrl + version;
    },
    
    // Redirect user to the chosen Bible translation website
    redirect() {
      $('#DialogIconedButtonInline').modal('toggle');
      window.open(this.verse_url, "_blank");
    },
    // Translation methods

    },
    // The mounted hook is called after the component is mounted to the DOM
    mounted() {
      // Your mounted code here
    }
  }
</script>

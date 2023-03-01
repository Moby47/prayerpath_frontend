<template>
    <div>
      <!-- Your template code here -->
        <!--card-->
        <div class="section mt-1 mb-2"
        v-for="quote in quote"
        v-bind:key="quote.id"
        >
            <div class="card">
                <div class="card-body">
                    <h5>God's word:</h5>
                    <p class="card-text">
                        {{quote.verse}}
                        <small> <i class='badge'> {{quote.reference}} - NIV</i></small>
                    </p>

                    <apptranslation :quote="quote"/>

            
                    <div 
    v-if="quote.imageurl"
    style="position: relative; height: auto; display: flex; flex-direction: column;" 
    :style="{ backgroundImage: `url(${quote.imageurl})` }"
    class="card card-img-overlay prayer"
    >
  <div style="background-color: rgba(0,0,0,0.65); position: absolute; top: 0; left: 0; height: 100%; width: 100%;"></div>
  <p style="position: relative; z-index: 1;" class="card-text">
    {{quote.prayer}}
  </p>
</div>

<div 
v-else
    style="position: relative; height: auto; display: flex; flex-direction: column;" 
    :style="{ backgroundImage: `url(https://cdn.pixabay.com/photo/2019/05/05/00/41/bible-4179472_960_720.jpg)` }"
    class="card card-img-overlay prayer"
    >
  <div style="background-color: rgba(0,0,0,0.65); position: absolute; top: 0; left: 0; height: 100%; width: 100%;"></div>
  <p style="position: relative; z-index: 1;" class="card-text">
    {{quote.prayer}}
  </p>
</div>

  <p class="card-text"><small><i class='badge'>Prayer For {{quote.category}}</i></small></p>
  <div class="section full">
            <div class="wide-block pt-2 pb-1">

                <div class="row">
                    <div class="col-2">
                         
                        </div>
                    <div class="col-2">
                       
                    </div>
                    <div class="col-2">
                        <v-icon class="color-black" @click="showSermon(quote)">mdi-book-cross</v-icon>
                    </div>
                    <div class="col-2">
                        <v-icon class="color-red" @click="saveQuote(quote)">mdi-heart</v-icon>
                    </div>
                    <div class="col-2">
                         <v-icon @click="copyContent(quote)">mdi-content-copy</v-icon>
                    </div>
                    
                    <div class="col-2">

                        <appshare :quote="quote"/>

                    </div>
                </div>
            </div>
           
             <!--Disqus-->
<template>
  <div  class="mt-2">
    <div id="disqus_thread"></div>
  </div>
</template>
  <!--Disqus-->

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

        

          <!-- Multi purpose modal-->
 <div id="disMultiModal" class="notification-box">
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
  // Define your component using the Vue.js API
  import apptranslation from "~/components/apptranslation.vue";
  
  import * as idb from 'idb-keyval'
  
  export default {
    components: {
  apptranslation,
},
    props: {
    quote: {
      type: Array,
      required: true,
    },
  },
    data() {
      return {
        // Your data properties here
        sermon:'',
        id:'',

        notificationTitle:'',
      notificationMessage:'',
      notificationImg:'',
      }
    },
    // Add methods here
    methods: {
      // Your methods here

      showSermon(quote) {
      this.sermon = quote.sermon
    $('#actionSheetContent').modal('toggle');
    },

    async saveQuote(quote) {
      this.$nuxt.$loading.start()

    let savedQuotes = await idb.get('fav') || [];
    if (savedQuotes.length >= 5) {
      //Notify user
   this.showNotification('disMultiModal', 'Alert', "Lo and behold, only 5 quotes may be saved.", 'https://media.giphy.com/media/eKrgVyZ7zLvJrgZNZn/giphy.gif');
    //Notify user
      this.$nuxt.$loading.finish()
      return;
    }
    let key = quote.id;
    let existingQuote = savedQuotes.find(q => q.id === key);
    if (existingQuote) {
        //Notify user
   this.showNotification('disMultiModal', 'Notice', "This quote is already amongst thy Favourites.", 'https://media.giphy.com/media/3o7bui8qZJeSQuXgMo/giphy.gif');
    //Notify user
     
      this.$nuxt.$loading.finish()
      return;
    }
    savedQuotes.push(quote);
    await idb.set('fav', savedQuotes);
     //Notify user
     this.showNotification('disMultiModal', 'Notice', "Quote added to thy Favourites.", 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMTM1NzU3ZTEzNzE3NmZmYjk2ZmZlNWFlMjcxOGNkZWJhYzIzZDhkMSZjdD1n/9T3kjrLQH2JUQmMwsU/giphy.gif');
    //Notify user
     
    this.$nuxt.$loading.finish()
  },

  async copyContent(quote) {
    const sentence1 = quote.verse
    const sentence2 = quote.prayer
    const text = sentence1 + "\n" + "\n" + sentence2; // concatenate sentences with a newline character
    try {
      await navigator.clipboard.writeText(text);
        
  //Notify user
  this.showNotification('disMultiModal', 'Notice', "Quote and Prayer copied.", 'https://media.giphy.com/media/psmj7c3DbrJKkbRYFj/giphy.gif');
    //Notify user
      
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
var time = 5000;
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
    // The mounted hook is called after the component is mounted to the DOM
    mounted() {
      // Your mounted code here
      this.id = this.$route.query.id
 
    //load up disqus
    const disqus_config = function () {
    this.page.url = window.location.href;
    this.page.identifier = this.id;
    };
    const script = document.createElement('script');
    script.src = 'https://prayerpath.disqus.com/embed.js';
    script.setAttribute('data-timestamp', +new Date());
    (document.head || document.body).appendChild(script);

    }
  }
  </script>
  
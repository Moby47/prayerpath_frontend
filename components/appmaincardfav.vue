<template>
    <div>
      <!-- Your template code here -->
        <!--card-->
        <div class="section mt-1 mb-2"
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
                        <v-icon class="color-black" @click="showSermon(quote)">mdi-book-cross</v-icon>
                    </div>
                    <div class="col-2">
                         <v-icon class="color-red" @click="deleteQuote(quote.id)">mdi-delete</v-icon>
                    </div>
                    <div class="col-2">
                         <v-icon @click="copyContent(quote)">mdi-content-copy</v-icon>
                    </div>
                    <div class="col-2">
                        <router-link
                      :to="{ name: 'discussion', query: { id: quote.id } }"
                      tag="span"
                    >
                       <v-icon class="color-app">mdi-comment-multiple</v-icon>
                       </router-link>
                    </div>
                    <div class="col-2">

                        <appshare :quote="quote"/>


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
  import apptranslation from "~/components/apptranslation.vue";
  
  import * as idb from 'idb-keyval'
  
  export default {
    components: {
  apptranslation,
},
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
      }
    },
    // Add methods here
    methods: {
      // Your methods here


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
  
  //Notify user
  this.showNotification('favCardMultiModal', 'Notice', "The quote hath been removed!", 'https://media0.giphy.com/media/Oj7yTCLSZjSt2JMwi2/200w.webp?cid=ecf05e47mxx5m3gu5qspiov5begs9yfmr1duukxv8hqkp7km&rid=200w.webp&ct=g');
  //Notify user

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
        
  //Notify user
  this.showNotification('favCardMultiModal', 'Notice', "Quote and Prayer copied.", 'https://media3.giphy.com/media/XreQmk7ETCak0/200.webp?cid=ecf05e476vo82hj2u8g4g5n1bj05604v99hy4sclauhy7c9d&rid=200.webp&ct=g');
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
var time = 4500;
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
    }
  }
  </script>
  
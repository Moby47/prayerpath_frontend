<template>
    <div>
      <!-- Your template code here -->
        <!-- App Bottom Menu -->
    <div class="appBottomMenu">
       <router-link to="/home" class="item">
            <div class="col">
               <v-icon>mdi-home</v-icon>
               <strong>Home</strong>
            </div>
        </router-link>
       <router-link to="/favourite" class="item">
            <div class="col">
                <v-icon>mdi-heart</v-icon>
                <strong>Favourites</strong>
            </div>
        </router-link>
       <span  class="item">
            <div class="col">
                <v-icon @click="showEmotionsModal()">mdi-head-heart</v-icon>
                <strong>Emotions</strong>
            </div>
        </span>
       <span  class="item">
            <div class="col">
                <v-icon @click="showModal()">mdi-layers</v-icon>
                <strong>Categories</strong>
            </div>
        </span>
       <span class="item" data-toggle="modal" data-target="#sidebarPanel">
            <div class="col">
                <v-icon>mdi-menu</v-icon>
                <strong>Menu</strong>
            </div>
        </span>
    </div>
    <!-- * App Bottom Menu -->

    <!-- Category Modal Listview -->
    <div class="modal fade modalbox" id="ModalListview" data-backdrop="static" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Category Selection</h5>
                        <a href="javascript:;" data-dismiss="modal">Close</a>
                    </div>
                    <div class="modal-body p-0">

                            <div class="section full d-flex justify-content-center">
                        <div class="mt-2">
                           <button @click="multipleCats()" type="button" class="btn btn-primary mb-1"
                          >Multiple categories</button>
                         </div>
                        </div>

                        <ul class="listview image-listview flush mb-2">
                            <li
                            v-for='category in categories' 
                            v-bind:key='category.category'
                            >
                                <div class="item">
                                    <div class="in d-flex justify-content-center">
       <button type="button" @click="gotocat(category.category)" 
       class="btn btn-outline-primary mr-1 mb-1">{{category.category}}</button>
                                       
                                    </div>
                                </div>
                            </li>
                         
                        </ul>


                    </div>
                </div>
            </div>
        </div>
        <!-- * Category Modal Listview -->


         <!-- Modal Checkbox for multi category -->
         <div class="modal fade modalbox" id="ModalCheckbox" data-backdrop="static" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Select and Continue</h5>
                        <a href="javascript:;" data-dismiss="modal">Close</a>
                    </div>
                   
    <div id="appCapsule" class="full-height">
<ul class="listview simple-listview">
    <li
    v-for='category in categories' 
     v-bind:key='category.category'
    >
        <div>{{category.category}}</div>
        <div class="custom-control custom-switch">
            <input type="checkbox"  v-model="multipleCategories" :value="category.category" class="custom-control-input" :id="'customSwitch' + category.category">
            <label class="custom-control-label" :for="'customSwitch' + category.category"></label>
        </div>
    </li>
</ul>

<div class="section full d-flex justify-content-center mt-2">
  <div>
    <button type="button" class="btn btn-outline-primary mb-1" @click="gotoMultiCategory()">Continue</button>
  </div>
</div>

</div>


                </div>
            </div>
        </div>
        <!-- * Modal Checkbox -->


         <!-- emotion Modal Listview -->
    <div class="modal fade modalbox" id="EmotionsModal" data-backdrop="static" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Emotion Selection</h5>
                        <a href="javascript:;" data-dismiss="modal">Close</a>
                    </div>
                    <div class="modal-body p-0">

                        <ul class="listview image-listview flush mb-2">
                            <li
                            v-for='emotion in emotions' 
                             v-bind:key='emotion.emotion'
                            >
                                <div class="item">
                                    <div class="in d-flex justify-content-center">
       <router-link  :to="{ name: 'emotion', query: { emotion: emotion.emotion } }" 
       class="btn btn-outline-primary mr-1 mb-1">{{emotion.emotion}}</router-link>
                                       
                                    </div>
                                </div>
                            </li>
                         
                        </ul>


                    </div>
                </div>
            </div>
        </div>
        <!-- * Category Modal Listview -->
        <!-- Multi purpose modal-->
 <div id="bottomMultiModal" class="notification-box">
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
                <!-- * ios style -->

    </div>
  </template>
  
 

  <script>
  // Define your component using the Vue.js API

  import axios from 'axios';
import * as idb from 'idb-keyval'

  export default {
    // Add data properties here
    data() {
      return {
        // Your data properties here
        categories: [],
        key: this.$config.BACKEND_API_KEY,
      backend_url: this.$config.BACKEND_APP_URL,
      multipleCategories:[],

      notificationTitle:'',
      notificationMessage:'',
      notificationImg:'',

      emotions:[],
      }
    },
    // Add methods here
    methods: {
      // Your methods here

      gotoMultiCategory() {
      if (this.multipleCategories.length === 0) {
        this.showNotification('bottomMultiModal','Notice','Make a move, pick a groove! Please make a selection.','https://media1.giphy.com/media/15aGGXfSlat2dP6ohs/200w.webp?cid=ecf05e478eb354zt8dkrsxgryrqgj6gg8zef85brctt5hjv3&rid=200w.webp&ct=g')
        return;
      }

      $('#ModalCheckbox').modal('toggle');
      const route = {
        name: 'multiplecategories',
        query: {
          categories: JSON.stringify(this.multipleCategories),
        },
      };
      this.$router.push(route);
    },

      gotocat(category) {
        $('#ModalListview').modal('toggle');
        this.$router.push({
            path: '/category',
            query: {
                category: category
            }
        });
      },

      async getCategories() {
     var final_url = this.backend_url + '/api/categories';
     try {
       const response = await axios.get(final_url, {
         headers: {
           'Content-Type': 'application/json',
           'X-Authorization': this.key
         }
       });
       this.categories = response.data.data;
      // console.log('cat data',this.categories)
     } catch (error) {
       console.log(error)

//get from indexeddb
try {
    const savedQuotes = await idb.get('quotes');

if (savedQuotes) {
  const categories = [...new Set(savedQuotes.map(quote => quote.category))];
  const responseData = { data: categories.map(category => ({ category })) };
  this.categories = responseData.data;

} else {
  console.log("No categories found.");
}


} catch (error) {
console.error(error);
}
//get from indexeddb
     }
   },

      multipleCats(){
        //single
         $('#ModalListview').modal('toggle');
         //multi
         $('#ModalCheckbox').modal('toggle');
    },
    

    showModal(){
    $('#ModalListview').modal('toggle');
    },

    showEmotionsModal(){
    $('#EmotionsModal').modal('toggle');
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

    async getEmotions() {
     var final_url = this.backend_url + '/api/emotions';
     try {
       const response = await axios.get(final_url, {
         headers: {
           'Content-Type': 'application/json',
           'X-Authorization': this.key
         }
       });
       this.emotions = response.data.data;
  
     } catch (error) {
       console.log(error)

//get from indexeddb
try {
  const savedQuotes = await idb.get('quotes');
  if (savedQuotes) {
    const emotions = [...new Set(savedQuotes.map(quote => quote.emotion))];
    const responseData = emotions.map(emotion => ({ emotion })).filter(item => item.emotion);
    this.emotions = responseData;

    console.log(this.emotions);
  } else {
    console.log("No emotions found.");
  }
} catch (error) {
  console.error(error);
}


//get from indexeddb

     }
   },

    
    },
    // The mounted hook is called after the component is mounted to the DOM
    mounted() {
      // Your mounted code here
      this.getCategories()
      this.getEmotions()
    }
  }
  </script>
  
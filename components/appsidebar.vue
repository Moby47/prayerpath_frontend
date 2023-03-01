<template>
    <div>
      <!-- Your template code here -->

        <!-- App Sidebar -->
    <div class="modal fade panelbox panelbox-left" id="sidebarPanel" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-body p-0">

                    <!-- profile box -->
                    <div class="profileBox">
                        <div class="image-wrapper">
                            <img src="https://cdn.pixabay.com/photo/2016/04/15/18/05/computer-1331579_960_720.png" alt="image" class="imaged rounded">
                        </div>
                        <div class="in">
                            <strong>Welcome</strong>
                        </div>
                        <a href="#" class="close-sidebar-button" data-dismiss="modal">
                            <v-icon>mdi-close</v-icon>
                        </a>
                    </div>
                    <!-- * profile box -->

                    <ul class="listview flush transparent no-line image-listview mt-2">
                        <li>
                            <router-link to="/home" class="item">
                                <div class="icon-box">
                                    <v-icon>mdi-home</v-icon>
                                </div>
                                <div class="in">
                                    Home
                                </div>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/favourite" class="item">
                                <div class="icon-box">
                                    <v-icon>mdi-heart</v-icon>
                                </div>
                                <div class="in">
                                    Favourites
                                </div>
                            </router-link>
                        </li>
                        <li>
                            <a href="#" @click="showEmotion()" class="item">
                                <div class="icon-box">
                                    <v-icon>mdi-head-heart</v-icon>
                                </div>
                                <div class="in">
                                    <div>Emotions</div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="#" @click="showCat()" class="item">
                                <div class="icon-box">
                                    <v-icon>mdi-layers</v-icon>
                                </div>
                                <div class="in">
                                    <div>Categories</div>
                                </div>
                            </a>
                        </li>
                        
                    </ul>

                </div>

            </div>
        </div>
    </div>
    <!-- * App Sidebar -->

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

      showCat(){
        $('#sidebarPanel').modal('toggle');
        $('#singleCategoryModal').modal('toggle');
      },

      showEmotion(){
        $('#sidebarPanel').modal('toggle');
        $('#EmotionsModal').modal('toggle');
      },

    },
    // The mounted hook is called after the component is mounted to the DOM
    mounted() {
      // Your mounted code here
    }
  }
  </script>
  
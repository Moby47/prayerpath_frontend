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
       <router-link to="/emotion" class="item">
            <div class="col">
                <v-icon>mdi-head-heart</v-icon>
                <strong>Emotions</strong>
            </div>
        </router-link>
       <router-link to="#" class="item">
            <div class="col">
                <v-icon @click="showModal('id')">mdi-layers</v-icon>
                <strong>Categories</strong>
            </div>
        </router-link>
       <router-link to="#" class="item" data-toggle="modal" data-target="#sidebarPanel">
            <div class="col">
                <v-icon>mdi-menu</v-icon>
                <strong>Menu</strong>
            </div>
        </router-link>
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
                           <button @click="multipleCats()" type="button" class="btn btn-outline-primary mb-1"
                          >Multiple categories</button>
                         </div>
                        </div>

                        <ul class="listview image-listview flush mb-2">
                            <li>
                                <div class="item">
                                    <div class="in">
                                        <div>Frank Boehm</div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="item">
                                    <div class="in">
                                        <div>Sophie Asveld</div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="item">
                                    <div class="in">
                                        <div>Sophie Asveld</div>
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
    <li>
        <div>Toogle 1</div>
        <div class="custom-control custom-switch">
            <input type="checkbox" class="custom-control-input" id="customSwitch1">
            <label class="custom-control-label" for="customSwitch1"></label>
        </div>
    </li>
    <li>
        <div>Toogle 2</div>
        <div class="custom-control custom-switch">
            <input type="checkbox" class="custom-control-input" id="customSwitch2" checked />
            <label class="custom-control-label" for="customSwitch2"></label>
        </div>
    </li>
</ul>

<div class="section full d-flex justify-content-center mt-2">
  <div>
    <button type="button" class="btn btn-outline-primary mb-1">Continue</button>
  </div>
</div>

</div>


                </div>
            </div>
        </div>
        <!-- * Modal Checkbox -->

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

      multipleCats(){
         $('#ModalListview').modal('toggle');
         $('#ModalCheckbox').modal('toggle');
    },
    

    showModal(){
    $('#ModalListview').modal('toggle');
    },
    
    },
    // The mounted hook is called after the component is mounted to the DOM
    mounted() {
      // Your mounted code here
    }
  }
  </script>
  
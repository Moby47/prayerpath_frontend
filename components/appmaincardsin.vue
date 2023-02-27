<template>
    <div>
      <!-- Your template code here -->
        <!--card-->
        <div class="section mt-1 mb-2">
            <div class="card">
                <div class="card-body">
                    <h5>God's word:</h5>
                    <p class="card-text">
                        The Lord will guide you always; he will satisfy your needs in a sun-scorched 
                        land and will strengthen your frame. 
                        You will be like a well-watered garden, like a spring whose waters never fail.
                        <small> <i class='badge'> Galations 4:32 - NIV</i></small>
                    </p>

                    <div>
            <div class="pb-1">
                <div class="dropdown">
                    <button class="btn btn-outline-primary dropdown-toggle" type="button" data-toggle="dropdown">
                       Translations
                    </button>
                    <div class="dropdown-menu">
                        <a class="dropdown-item" href="#">KJV</a>
                        <a class="dropdown-item" href="#">NKJV</a>
                        <a class="dropdown-item" href="#">NLT</a>
                    </div>
                </div>

            </div>
        </div>

            
      <div 
      style="position: relative; height: auto; display: flex; flex-direction: column;" 
      :style="{ backgroundImage: `url(https://cdn.pixabay.com/photo/2018/06/30/10/06/jesus-3507364_960_720.jpg)` }"
      class="card card-img-overlay"
      >
    <div style="background-color: rgba(0,0,0,0.65); position: absolute; top: 0; left: 0; height: 100%; width: 100%;"></div>
    <p style="position: relative; z-index: 1;" class="card-text">
        Heavenly Father, I thank you for the promise of restoration and healing that you 
        have given us in your Word. Please help me to hold onto this promise in faith, even when 
        I am feeling discouraged or unwell. I trust that you are able to heal me in all aspects of my life, 
        and I pray that you would do so for your glory. In Jesus' name, Amen.
    </p>
  </div>
  <p class="card-text"><small><i class='badge'>Prayer category</i></small></p>
  <div class="section full">
            <div class="wide-block pt-2 pb-1">

                <div class="row">
                    <div class="col-2">
                         
                        </div>
                    <div class="col-2">
                       
                    </div>
                    <div class="col-2">
                        <v-icon class="color-black" @click="sermon()">mdi-book-cross</v-icon>
                    </div>
                    <div class="col-2">
                        <v-icon class="color-red">mdi-heart</v-icon>
                    </div>
                    <div class="col-2">
                         <v-icon>mdi-content-copy</v-icon>
                    </div>
                    
                    <div class="col-2">

                        <appshare/>

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
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc fermentum, urna eget
                                finibus fermentum, velit metus maximus erat, nec sodales elit justo vitae sapien. Sed
                                fermentum varius erat, et dictum lorem. Cras pulvinar vestibulum purus sed hendrerit.
                                Praesent et auctor dolor. Ut sed ultrices justo. Fusce tortor erat, scelerisque sit amet
                                diam rhoncus, cursus dictum lorem. Ut vitae arcu egestas, congue nulla at, gravida
                                purus.
                            </p>
                            <a href="#" class="btn btn-secondary btn-block btn-lg" data-dismiss="modal">Close</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- * Content Action Sheet -->

        

        

                </div>
            </div>
        </div>
        <!--card-->


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

      sermon() {
    $('#actionSheetContent').modal('toggle');
    },

    },
    // The mounted hook is called after the component is mounted to the DOM
    mounted() {
      // Your mounted code here
    }
  }
  </script>
  
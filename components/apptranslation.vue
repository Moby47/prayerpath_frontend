<template>
    <div>
     
        <div>
            <div class="pb-1">
                <div class="dropdown">
                    <button class="btn btn-outline-primary dropdown-toggle" type="button" data-toggle="dropdown">
                       Translations
                    </button>
                    <div class="dropdown-menu">
                        <a class="dropdown-item" href="#"  @click.prevent="promptRedirect(quote.verse_url,'KJV')">KJV</a>
                        <a class="dropdown-item" href="#"  @click.prevent="promptRedirect(quote.verse_url,'NKJV')">NKJV</a>
                        <a class="dropdown-item" href="#" @click.prevent="promptRedirect(quote.verse_url,'NLT')">NLT</a>
                    </div>
                </div>

            </div>
        </div>


           <!-- Dialog Iconed Inline -->
           <div class="modal fade dialogbox" id="DialogIconedButtonInline" data-backdrop="static" tabindex="-1"
            role="dialog">
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
        <!-- * Dialog Iconed Inline -->

    </div>
  </template>
  
  <script>
  // Define your component using the Vue.js API
  export default {
    // Add data properties here
    props: {
      quote: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        verse_url:'',
      }
    },
    // Add methods here
    methods: {
      // Your methods here
      promptRedirect(verse_url,version) {
       $('#DialogIconedButtonInline').modal('toggle');
        let updatedUrl = verse_url.slice(0, -3);
        this.verse_url = updatedUrl + version;
   },
    
   redirect(event) {
    $('#DialogIconedButtonInline').modal('toggle');
    window.open(this.verse_url, "_blank");
   },

    },
    // The mounted hook is called after the component is mounted to the DOM
    mounted() {
      // Your mounted code here
    }
  }
  </script>
  
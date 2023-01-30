<template>

  <v-row justify="center" align="center">
    <v-col>

      <template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card
        class="mx-auto"
        color="#1F7087"
        elevation="20"
        py-4 
        style="margin: 10px;"
        d-flex
        v-for='quote in quotes' v-bind:key='quote.id'
      >
        <div class="d-flex justify-between">
          <v-card-actions class="flex-grow-1 flex-column align-start">
            <div class="text-h6">
              You said:
            </div>
            <div class="text-body-1" style="color: #F5F5F5; word-wrap: break-word;"> {{quote.verse}}</div>
            
       <div class="text-caption font-weight-thin" style="background-color: #555; padding:2px; border-radius: 10px;">{{quote.reference}}</div>

          </v-card-actions>
          <v-img
            contain
            height="70px"
            lazy-src="https://cdn.vuetifyjs.com/images/cards/halcyon.png"
            src="https://cdn.vuetifyjs.com/images/cards/halcyon.png"
            style="flex-basis: 80px"
            class="flex-grow-0"
          ></v-img>
        </div>

        <v-divider></v-divider>
        <v-card-actions class="text-body-2" style="color: #F5F5F5;">
          {{quote.prayer}}
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
  <v-row justify="center">
    <v-col cols="12" sm="8" md="6">
      <div class="d-flex justify-center" style="margin-bottom: 65px;">
        <v-btn color="#555" @click="getquotes()" v-if="showButton">Refresh</v-btn>
      </div>
    </v-col>
  </v-row>
</template>
     
<!--Overlay-->
<template>
      <div class="text-center">
        <v-overlay :value="overlay">
          <v-progress-circular indeterminate size="64"></v-progress-circular>
          <br>
          Getting Ready...
        </v-overlay>
      </div>
      </template>
      <!--Overlay-->

    </v-col>
  </v-row>

</template>


<script>

//import axios from 'axios';

 export default {
          
   head(){
    return {
      title: "Web Development Portfolio",
      meta:[
        
  { hid: 'description6', name: 'description', content: 'web development and digital marketing services.' },
  { name: 'keywords', content: 'seo, web' },
        
      ]
    }
  },

  data () {

  return {
  quotes:[],
  loading: true,
  err: false,
  overlay:null,
  showButton:null,
  //pagination: [],
  }
  },

  methods: {

  getquotes(param_url){

    this.overlay = true
    this.showButton = false
    this.scrollTop();
/*
    if(param_url){
     this.$nuxt.$loading.start()
    }
*/
  var   final_url = param_url || 'http://localhost:8000/api/quotes';
  fetch(final_url, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'X-Authorization': '5KuSqmiUM8KDgsdGfr8AFU66VSZRFVVGAAFx8nwynYM0CS91nfRocfOag7A9F8ol'
  }
  })
  .then(res => res.json())
  .then(res=>{
    this.quotes = res.data;
    this.showButton = true
    this.overlay = false
   // console.log(this.quotes)
   // this.loading = false
    //this.$nuxt.$loading.finish()
   // this.makePagination(res.meta, res.links);
  })
  .catch(error =>{
    console.log(error)  
   // this.loading = false    
    //this.$nuxt.$loading.finish()
    this.err = true
    this.overlay = false
      })
},

// getquotes method end

scrollTop(){
  window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
},
       
},
//  method end

mounted(){
 //get quotes
 this.getquotes()
 },
          

 }

</script>

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
        <v-btn color="#555" @click="getquotes()">Load More</v-btn>
      </div>
    </v-col>
  </v-row>
</template>
     
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
  //pagination: [],
  }
  },

  methods: {

  getquotes(page_url){

    this.scrollTop();

    if(page_url){
     this.$nuxt.$loading.start()
    }

  var   page_url = page_url || 'http://localhost:8000/api/quotes';
  fetch(page_url, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'X-Authorization': '5KuSqmiUM8KDgsdGfr8AFU66VSZRFVVGAAFx8nwynYM0CS91nfRocfOag7A9F8ol'
  }
  })
  .then(res => res.json())
  .then(res=>{
    this.quotes = res.data;
   // console.log(this.quotes)
   // this.loading = false
    this.$nuxt.$loading.finish()
   // this.makePagination(res.meta, res.links);
  })
  .catch(error =>{
    console.log(error)  
   // this.loading = false    
    this.$nuxt.$loading.finish()
    this.err = true
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
/*
makePagination(meta, links){
var pagination = {
current_page: meta.current_page,
last_page: meta.last_page,
next_page_url: links.next,
prev_page_url: links.prev
}
document.body.scrollTop = 0;
document.documentElement.scrollTop = 0;
this.pagination = pagination;
},
       */         
},
//  method end

mounted(){
 //get quotes
 this.getquotes()
 },
          

 }

</script>

<template>

  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">

  <template>
  <v-card
    class="mx-auto"
    color="info"
    elevation="20"
    logo 
    py-4 
    style="margin: 10px;"
    d-flex
    v-for="n in 3" :key="n"
  >
  
    <div class="d-flex justify-between">
      <v-card-title class="flex-grow-1 flex-column align-start">
        <div class="text-h6">
          You said:
        </div>
        <div class="text-body-1 font-weight-thin">Ellie Goulding Ellie Goulding Ellie Goulding Ellie Goulding Ellie Goulding Ellie Goulding</div>

        <div class="text-caption font-weight-thin">(Gen 3:16)</div>
      </v-card-title>

      <v-img
        contain
        height="70px"
        src="https://cdn.vuetifyjs.com/images/cards/halcyon.png"
        style="flex-basis: 80px"
        class="flex-grow-0"
      ></v-img>
    </div>

    <v-divider></v-divider>

    <v-card-actions class="pa-2 text-body-2">
      Therefore: Ellie Goulding Ellie Goulding Ellie Goulding Ellie Goulding Ellie Goulding Ellie Goulding
      Ellie Goulding Ellie Goulding Ellie Goulding Ellie Goulding Ellie Goulding Ellie Goulding
    </v-card-actions>
  </v-card>
</template>

  <div class="d-flex align-center" style="margin-bottom: 55px;">
    <v-btn color="primary">More (On last pressed)</v-btn>
  </div>
     
    </v-col>
  </v-row>

</template>

<script>

import axios from 'axios';

export default {
  name: 'IndexPage',

  data () {
    return {
      
    }
  },
  methods: {
   
  }
}
</script>

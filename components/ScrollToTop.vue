<template>
    <v-btn
      color="#F5F5DC"
      depressed
      fab
      fixed
      :bottom="bottom"
      small
      :right="right"
      @click="scrollTop"
      v-if="showButton"
      :style="{ bottom: '70px', right: '30px' }"
    >
      <v-icon :color="color">{{ icon }}</v-icon>
    </v-btn>
  </template>
  
  <script>
  export default {
    props: {
      bottom: {
        type: Boolean,
        default: true
      },
      right: {
        type: Boolean,
        default: true
      },
      click: {
        type: Function,
        default: () => {
          window.scrollTo(0, 0);
        }
      },
      showButton: {
        type: Boolean,
        default: true
      },
      color: {
        type: String,
        default: 'black'
      },
      icon: {
        type: String,
        default: 'mdi-arrow-up'
      }
    },

       

    methods:{

      handleScroll() {
     this.showButton = window.pageYOffset > 200;
   },

   scrollTop() {
     window.scroll({
       top: 0,
       left: 0,
       behavior: 'smooth'
     });
   },
    },

    mounted(){

window.addEventListener("scroll", this.handleScroll);

},

beforeDestroy() {
window.removeEventListener("scroll", this.handleScroll);
},    

  };
  </script>
  
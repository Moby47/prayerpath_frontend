<template>
    <v-btn
      color="#F5F5DC"
      depressed
      fab
      fixed
      :bottom="bottom"
      small
      :right="right"
      @click="click"
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
    }
  };
  </script>
  
<template>
    <div class="text-center">
      <v-overlay :value="overlay">
        <v-progress-linear indeterminate size="64" color="#F5F5DC" height="10"></v-progress-linear>
        <br>
        Loading...
      </v-overlay>
    </div>
  </template>
  
  <script>
  export default {
    name: 'LoadingOverlay',
    props: {
      overlay: {
        type: Boolean,
        default: false
      }
    }
  }
  </script>
  
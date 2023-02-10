<template>
    <v-snackbar
      :timeout="timeout"
      shaped
      top
      color="#555"
      v-model="snackbar"
    >
      {{ snackText }}
      <template v-slot:action="{ attrs }">
        <v-btn color="#F5F5DC" text v-bind="attrs" @click="snackbar = false">
          Ok
        </v-btn>
      </template>
    </v-snackbar>
  </template>
  
  <script>
  export default {
    props: {
      timeout: {
        type: Number,
        default: 4500,
      },
      snackText: {
        type: String,
        default: "",
      },
    },
    data() {
      return {
        snackbar: false,
      };
    },
  };
  </script>
  
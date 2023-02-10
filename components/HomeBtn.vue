<template>
  <v-btn
    color="#F5F5DC"
    depressed
    fab
    fixed
    :bottom="bottom"
    small
    :left="left"
    :to="to"
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
    left: {
      type: Boolean,
      default: true
    },
    to: {
      type: Object,
      default: () => ({ name: 'index' })
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
      default: 'mdi-home'
    }
  }
};
</script>

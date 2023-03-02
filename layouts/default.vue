<template>
  <!-- Main content container -->
  <v-main>
    <!-- Render the Nuxt component -->
    <Nuxt />
  </v-main>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.5s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}

/* Styles for primary outline button */
.btn-outline-primary {
  border-color: #3f51b5;
  color: #3f51b5;
}

/* Styles for profile box */
.profileBox {
  background: #3f51b5;
}

/* Color classes */
.color-red {
  color: red !important;
}

.color-app {
  color: #3f51b5 !important;
}

.color-green {
  color: #4caf50 !important;
}

.color-black {
  color: #000 !important;
}

/* Styles for links */
a {
  color: #3f51b5;
}

/* Styles for custom controls */
.custom-control .custom-control-input:checked ~ .custom-control-label:before {
  background: #3f51b5!important;
  border-color: #3f51b5 !important;
}

/* Styles for primary button */
.btn-primary {
  background: #3f51b5 !important;
  border-color: #3f51b5 !important;
  color: #ffffff !important;
}

/* Styles for primary badge */
.badge-primary, a.badge-primary {
  background: #3f51b5 !important;
}

/* Styles for floating action button */
.fab-button .fab {
  margin-bottom: 50px;
  background: #3f51b5;
  width: 40px;
  height: 40px;
}
</style>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      // No data to be declared
    }
  },
  // Add methods here
  methods: {
    // Your methods here
  }
}
</script>

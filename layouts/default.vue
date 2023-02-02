<template>
  <!-- Wrap the whole layout with a v-app component -->
  <v-app style="background-color: white;">

    <!-- Main content container -->
    <v-main>
      <v-container>
        <!-- Render the Nuxt component -->
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      // No data to be declared
    }
  }
}
</script>

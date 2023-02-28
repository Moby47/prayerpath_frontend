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

.btn-outline-primary{
  border-color:#3f51b5;
  color:#3f51b5;
}

.profileBox{
  background: #3f51b5;
}

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

a {
    color: #3f51b5;
}

.custom-control .custom-control-input:checked ~ .custom-control-label:before {
    background: #3f51b5!important;
    border-color: #3f51b5 !important;
}

.btn-primary {
    background: #3f51b5 !important;
    border-color: #3f51b5 !important;
    color: #ffffff !important;
}

.badge-primary, a.badge-primary {
    background: #3f51b5 !important;
}

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
  data () {
    return {
      // No data to be declared
    }
  },

 
 

}
</script>

<template>
  <div class="bg-white">

    <!-- App Header -->
    <div class="appHeader no-border transparent position-absolute">
        <div class="left">
        </div>
        <div class="pageTitle">
            <img src="~/static/logo.png" alt="logo" class="logo"> PrayerPath
        </div>
        <div class="right">
        </div>
    </div>
    <!-- * App Header -->

    <!-- App Capsule -->
    <div id="appCapsule">

        <div class="error-page">
            <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWI5ODZkMThmYTljNGQ0MjljOWVmNDM0YjYyODg2YTU3ZDFmYTMzOSZjdD1n/fLyf3Ag08wABnyqMNY/giphy.gif" alt="alt" class="imaged square w200">
            
            <div class="text mb-5">
              <h1 v-if="error.statusCode === 404">
         {{ pageNotFound }}
       </h1>
       <h1 v-else>
         {{ otherError }}
       </h1>
            </div>

            <div class="fixed-footer">
                <div class="row">
                    <div class="col-12">
                        <router-link :to="{ name: 'index'}" class="btn btn-primary btn-lg btn-block">To safety</router-link>
                    </div>
                </div>
            </div>
        </div>

    </div>
    <!-- * App Capsule -->

  </div>
</template>

<script>
export default {
  name: 'EmptyLayout',
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: 'Page Not Found',
      otherError: 'An error occurred'
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>
.fixed-footer{
    background: none;
    min-height:500px;
}
</style>

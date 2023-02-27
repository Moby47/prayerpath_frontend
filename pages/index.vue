<template>
    <div class="bg-white"  id="bg">
   
        <!-- loader 
    <div id="loader">
        <div class="spinner-border text-primary" role="status"></div>
    </div>
   loader -->

    <!-- App Header -->
    <div class="appHeader no-border transparent">
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
    <div class="mb-2">
    
    </div>
    <h1 class="title">Quote God & Pray</h1>
    <div class="text mb-3">
        "God does not lie or change his mind, and always follows through on his promises."
    </div>
    <div id="countDown" class="mb-5"></div>

    <div class="fixed-footer">
        <div class="row">
            <div class="col-12">
                <router-link to="/home" class="btn btn-primary btn-lg btn-block">Continue</router-link>
            </div>
        </div>
    </div>
</div>

</div>
<!-- * App Capsule -->
    
    </div>
</template>

<style scoped>
 /**@import '@/assets/css/landing.css';*/

  @media only screen and (max-width: 768px) {

#bg {
   background-image: url("https://cdn.pixabay.com/photo/2019/05/05/00/41/bible-4179472_960_720.jpg");
   /*https://cdn.pixabay.com/photo/2018/06/30/10/06/jesus-3507364_960_720.jpg*/
   background-size: cover;
   background-position: center center;
   height: 100vh;
}

.fixed-footer{
    background: none;
    min-height:500px;
}
  }

</style>

<script>
export default {
  data() {
    return {
    }
  },
  methods: {
   
  },
  mounted() {
    
   
}

}
</script>
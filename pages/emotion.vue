<template>
    <div>
    
        <!--
<apploader/>
-->
  
<appheader/>

    <!-- App Capsule -->
    <div id="appCapsule">

        <div class="header-large-title">
            <h4 class="subtitle">Feeling ....?</h4>
        </div>

      <appmaincard/>
     

      <appfooter/>

    </div>
    <!-- * App Capsule -->


  <appbottommenu/>


  <appsidebar/>

    </div>
</template>

<script>

import appsidebar from "~/components/appsidebar.vue";
import appshare from "~/components/appshare.vue";
import appmaincard from "~/components/appmaincard.vue";
import apploader from "~/components/apploader.vue";
import appheader from "~/components/appheader.vue";
import appfooter from "~/components/appfooter.vue";
import appbottommenu from "~/components/appbottommenu.vue";

import axios from 'axios';
import * as idb from 'idb-keyval'

export default {
  components: {
    appsidebar,
    appshare,
    appmaincard,
    apploader,
    appheader,
    appfooter,
    appbottommenu,
  },
  data() {
    return {
      
    }
  },
  methods: {
   


  },


  mounted() {
   

    },

  beforeRouteLeave(to, from, next) {
    document.body.classList.remove('modal-open');
    const modalBackdrop = document.querySelector('.modal-backdrop');
    if (modalBackdrop) {
      modalBackdrop.remove();
    }
    next();
  },

}
</script>
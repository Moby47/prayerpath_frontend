<template>
  <div>
    
    <apploader v-if="fetching" />

     <!-- App Capsule -->
     <div id="appCapsule">

<div>
<h4 class="subtitle mt-2 ml-1"><a target="_blank" href='https://prayerpath.canny.io'>Our Roadmap 👨‍💻</a> </h4>
</div>

    <appheader />

    <div data-canny />

  
    <appfooter/>
  </div>

  <appsidebar/>
  <appbottommenu/>

  </div>
</template>

<script>
import appsidebar from "~/components/appsidebar.vue";
import appheader from "~/components/appheader.vue";
import appfooter from "~/components/appfooter.vue";
import appbottommenu from "~/components/appbottommenu.vue";
import apploader from "~/components/apploader.vue";

export default {
  components: {
    appsidebar,
    appheader,
    apploader,
    appfooter,
    appbottommenu,
  },
  data() {
    return {
      fetching: true,
    };
  },
  mounted() {
    const BoardToken = 'c10a2028-de4f-a994-b10e-bc5053a4c035';
    (function(w,d,i,s){function l(){if(!d.getElementById(i)){var f=d.getElementsByTagName(s)[0],e=d.createElement(s);e.type="text/javascript",e.async=!0,e.src="https://canny.io/sdk.js",f.parentNode.insertBefore(e,f)}}if("function"!=typeof w.Canny){var c=function(){c.q.push(arguments)};c.q=[],w.Canny=c,"complete"===d.readyState?l():w.attachEvent?w.attachEvent("onload",l):w.addEventListener("load",l,!1)}})(window,document,"canny-jssdk","script");

    Canny('render', {
      boardToken: BoardToken,
      basePath: '/feedback',
      ssoToken: null
    });

    setTimeout(() => {
      this.fetching = false;
    }, 3000);
  },

  //Solved the modal overlay not leaving after route change issue
beforeRouteLeave(to, from, next) {
  document.body.classList.remove('modal-open');
  const modalBackdrop = document.querySelector('.modal-backdrop');
  if (modalBackdrop) {
    modalBackdrop.remove();
  }
  next();
},

};
</script>

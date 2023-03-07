<template>
    <div>
      <div id="disqus_thread"></div>
    </div>
  </template>
 
 
 <script>

   export default {
 
     data() {
       return {
         // Your data properties here
       }
     },
 
     methods: {
    
     },
 
     mounted() {
      
       // Load up Disqus
       const disqus_config = function () {
         this.page.url = window.location.href;
         this.page.identifier = this.$route.params.id;
       };
       const script = document.createElement('script');
       script.src = 'https://prayerpath-feature-request.disqus.com/embed.js';
       script.setAttribute('data-timestamp', +new Date());
       (document.head || document.body).appendChild(script);
     },
 
 
   }
 </script>
 
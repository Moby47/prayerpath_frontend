<template>
    <div>
      <v-icon data-canny-changelog role="img" class="md hydrated">mdi-new-box</v-icon>
    </div>
  </template>
  
  <script>
  export default {
    mounted() {
      // Load the Canny SDK script
      !function(w,d,i,s){
        function l(){
          if(!d.getElementById(i)){
            var f=d.getElementsByTagName(s)[0],e=d.createElement(s);
            e.type="text/javascript",e.async=!0,e.src="https://canny.io/sdk.js",f.parentNode.insertBefore(e,f)
          }
        }
        if("function"!=typeof w.Canny){
          var c=function(){c.q.push(arguments)};
          c.q=[],w.Canny=c,"complete"===d.readyState?l():w.attachEvent?w.attachEvent("onload",l):w.addEventListener("load",l,!1)
        }
      }(window,document,"canny-jssdk","script");
  
      // Initialize the Canny changelog
      Canny('initChangelog', {
        appID: '64052b7700642e4511005deb',
        position: 'bottom',
        align: 'left',
      });
    },
  };
  </script>
  
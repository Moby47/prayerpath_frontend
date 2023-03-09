<template>
    <div>
      <button @click="checkAndSubscribeUser">Subscribe</button>

<!--Dialog-->
<div class="modal fade dialogbox" id="messageDialog" data-backdrop="static" tabindex="-1"
            role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Great choice!</h5>
                    </div>
                    <div class="modal-body">
                      Enabling notifications is essential for the best experience with PrayerPath. 
                      Click 'Allow' after this message to start receiving notifications from us. We promise not to spam you! 😉
                    </div>
                    <div class="modal-footer">
                        <div class="btn-inline">
                            <a href="#" class="btn btn-text-primary" @click="runRegSubscription()">
                                <v-icon>mdi-emoticon-happy-outline</v-icon>
                                Continue
                            </a>
                            <a href="#" class="btn btn-text-danger" @click="canceled()">
                              <v-icon>mdi-emoticon-frown-outline</v-icon>
                                Cancel
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  <!--Dialog-->

       <!--notification-->
<div id="notificationModal" class="notification-box">
  <div class="notification-dialog ios-style">
    <div class="notification-header">
      <div class="right">
        <span>just now</span>
      </div>
    </div>
    <div class="notification-content">
      <div class="in">
        <h3 class="subtitle">{{notificationTitle}}</h3>
        <div class="text">{{notificationMessage}}</div>
      </div>
      <img :src="notificationImg" alt="image" class="imaged w64" />
    </div>
  </div>
</div>
  <!--notification-->

  
  <!-- DialogIconedInfo -->
  <div class="modal fade dialogbox" id="infoDialog" data-backdrop="static" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-icon">
                     <v-icon>mdi-wrench-cog</v-icon>
                    </div>
                    <div class="modal-header">
                        <h5 class="modal-title">Please turn on notifications for this app to receive important updates.</h5>
                    </div>
                    <div class="modal-body">
                     Helpful links:<br>

                     Mobile app (Android): <a target='_blank' href='https://support.google.com/android/answer/9079661?hl=en#zippy='>Click here</a><br>

Web app (Android): <a target='_blank' href='https://support.google.com/chrome/answer/3220216?hl=en&co=GENIE.Platform%3DAndroid&oco=0'>Click here</a><br>

Desktop: <a target='_blank' href='https://support.google.com/chrome/answer/3220216?hl=en&co=GENIE.Platform%3DDesktop&oco=0'>Click here</a><br>

iPhone & iPad: <a target='_blank' href='https://support.google.com/chrome/answer/3220216?hl=en&co=GENIE.Platform%3DiOS&oco=0'>Click here</a>
                    </div>
                    <div class="modal-footer">
                        <div class="btn-inline">
                            <a href="#" class="btn" @click="closeInfo()">CLOSE</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- * DialogIconedInfo -->
  


    </div>
  </template>

  

  <script>
  export default {

    data() {
    return {
      notificationTitle:'',
      notificationMessage:'',
      notificationImg:'',
    }
  },

    mounted() {
     // const script = document.createElement('script');
    //  script.src = 'https://cdn.onesignal.com/sdks/OneSignalSDK.js';
    //  document.head.appendChild(script);
    },

    methods: {

  async  checkAndSubscribeUser() {
  const permission = await window.OneSignal.getNotificationPermission();
  if (permission === 'default') {

    //show dialog. yes proceeds to reg, no goes to nothing
    $('#messageDialog').modal('toggle');
    
  } else if (permission === 'granted') {
    console.log('User is already subscribed');
    this.showNotification('notificationModal', 'Sweet!', "Notification is already on.", 'https://media.giphy.com/media/SVH9y2LQUVVCRcqD7o/giphy.gif');
  
  } else if (permission === 'denied') {
    console.warn('User has denied permission to receive notifications');
    this.showNotification('notificationModal', 'oops!', "You have Notifications blocked!", 'https://media.giphy.com/media/ZHkVpDiI3vIiY/giphy.gif');
    //show dialog with info on how to turn it back on
    $('#infoDialog').modal('toggle');

  }
},


async runRegSubscription(){
  $('#messageDialog').modal('toggle');
  try {
        const result = await window.OneSignal.registerForPushNotifications();
        if (result) {
          console.log('User subscribed successfully');
 this.showNotification('notificationModal', 'Awesome!', "Notification has been turned on.", 'https://media.giphy.com/media/l0MYCn3DDRBBqk6nS/giphy.gif');
        } else {
          console.error('Subscribtion failed: invalid result object');
        }
      } catch (error) {
        console.error('Failed to subscribe user', error);
        alert('An error occured. Please try again later')
      }
},


async canceled(){
  $('#messageDialog').modal('toggle');
  console.log('User did not allow again')
  this.showNotification('notificationModal', 'Alert', "Missing out! Please turn notifications on 🙏", 'https://media.giphy.com/media/qUIm5wu6LAAog/giphy.gif');
},

async closeInfo(){
  $('#infoDialog').modal('toggle');
 },


showNotification(notificationId,notificationTitle,notificationMessage,notificationImg) {
this.notificationTitle = notificationTitle
this.notificationMessage = notificationMessage
this.notificationImg = notificationImg

var a = "#" + notificationId;
var time = 3500;
$(".notification-box").removeClass("show");
setTimeout(() => {
$(a).addClass("show");
}, 300);
if (time) {
time = time + 300;
setTimeout(() => {
    $(".notification-box").removeClass("show");
}, time);
}
},


    }
  }
  </script>
  
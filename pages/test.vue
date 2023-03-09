<template>
    <div>
      <button @click="checkAndSubscribeUser">Subscribe</button>
    </div>
  </template>
  
  <script>
  export default {
    mounted() {
      const script = document.createElement('script');
      script.src = 'https://cdn.onesignal.com/sdks/OneSignalSDK.js';
      document.head.appendChild(script);
    },
    methods: {
        async  checkAndSubscribeUser() {
  const permission = await window.OneSignal.getNotificationPermission();
  if (permission === 'default') {
    const message = 'Get updates and alerts from our app. Click "Allow" after this message to receive notifications from us.';
    if (confirm(message)) {
      try {
        const result = await window.OneSignal.registerForPushNotifications();
        if (result && result.pushSubscription) {
          console.log('User subscribed successfully');
        } else {
          console.error('Failed to subscribe user: invalid result object');
        }
      } catch (error) {
        console.error('Failed to subscribe user', error);
      }
    }else{
        console.log('User did not allow again')
    }
  } else if (permission === 'granted') {
    console.log('User is already subscribed');
  } else if (permission === 'denied') {
    console.warn('User has denied permission to receive notifications');
    const message = 'Please turn on notifications for this app to receive important updates. To do this, go to your device settings, find this app, and turn on notifications.';
    if (confirm(message)) {
      // TODO: Open device settings
      /*
On Android:

Open the "Settings" app on your device.
Scroll down and select "Apps".
Find your app in the list and select it.
Select "Notifications".
Turn on the toggle switch for notifications.
On iOS:

Open the "Settings" app on your device.
Select "Notifications".
Find your app in the list and select it.
Turn on the toggle switch for notifications.
On Windows:

Open the "Settings" app on your device.
Select "System".
Select "Notifications & actions".
Find your app in the list and turn on the toggle switch for notifications.
      */
    }
  }
}




    }
  }
  </script>
  
#!/usr/bin/env node -r esm

console.log('entered reminder cron');

import axios from 'axios';

console.log('passed axios');

const data = {
  app_id: process.env.ONESIGNAL_APP_ID,
  contents: { en: '1 prayer a day is a good step.' },
  headings: { en: 'Reminder' },
  included_segments: ['Subscribed Users'],
  url: process.env.APP_URL,
  web_push_topic: 'tag',
  chrome_web_image: `https://cdn.pixabay.com/photo/2018/06/30/10/06/jesus-3507364_960_720.jpg`,
};

const headers = {
  'Authorization': 'Basic ZmU2OTU3OWQtMjI2Ny00NjJmLWIzZWQtZTRlOGMzNTUxNmY4',

      'Content-Type': 'application/json',
      'Accept': 'application/json',
};

axios.post('https://onesignal.com/api/v1/notifications', data, {headers})
.then(response => {
  console.log(response.data);
  console.log('Got response - Success');
  console.log('headers',headers);
})
.catch(error => {
  console.error(error.response.data);
  console.log('Got error');
  console.log('headers',headers);
});

/*
axios.get('https://restcountries.com/v2/alpha/pe')
  .then(response => {
    console.log(response.data);
    console.log('got response');
  })
  .catch(error => {
    console.error(error);
    console.log('got error');
  });

*/
/*
sendNotification().then(() => {
    console.log("sendNotification() completed");
  }).catch((error) => {
    console.error("sendNotification() failed to run successfully:", error);
  });

  async function sendNotification() {
    const data = {
      app_id: process.env.ONESIGNAL_APP_ID,
      contents: { en: '1 prayer a day is a good step.' },
      headings: { en: 'Reminder' },
      included_segments: ['Subscribed Users'],
      url: process.env.APP_URL,
      web_push_topic: 'tag',
      //chrome_web_image: `${process.env.APP_URL}/static/logo.png`, // 512 or >
      chrome_web_image: `https://cdn.pixabay.com/photo/2018/06/30/10/06/jesus-3507364_960_720.jpg`, // 512 or >
    };
  
    try {
      const response = await axios.post('https://onesignal.com/api/v1/notifications', data, {
        headers: {
          'Authorization': `Basic ${process.env.ONESIGNAL_BASIC_KEY}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
  
     // console.log('Notification sent', response.data);
      console.log('Notification sent');
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  }
  
*/
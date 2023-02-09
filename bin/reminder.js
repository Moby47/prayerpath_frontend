#!/usr/bin/env node -r esm

//start in server with: node bin/reminder.js

import axios from 'axios';

const data = {
  app_id: process.env.ONESIGNAL_APP_ID,
  contents: { en: '1 prayer a day is a good step, pray now.' },
  headings: { en: 'Reminder' },
  included_segments: ['Subscribed Users'],
  url: process.env.APP_URL,
  web_push_topic: 'tag',
  chrome_web_image: `https://cdn.pixabay.com/photo/2018/06/30/10/06/jesus-3507364_960_720.jpg`,
  chrome_web_badge: 'https://res.cloudinary.com/ddvotdlwm/image/upload/v1675935424/PrayerPath/ilsbobcrzemxhaihgwxs.png',// 72 or >
};

const headers = {
      'Authorization': `Basic ${process.env.ONESIGNAL_BASIC_KEY}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
};

axios.post('https://onesignal.com/api/v1/notifications', data, {headers})
.then(response => {
  console.log(response.data);
  console.log('Got response - Success');
})
.catch(error => {
  console.error(error.response.data);
  console.log('Got error');
});

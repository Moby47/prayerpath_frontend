//#!/usr/bin/env node -r esm

const fetch = require('node-fetch');

console.log('entered reminder cron');

async function sendNotification() {
  const data = {
    app_id: process.env.ONESIGNAL_APP_ID,
    contents: { en: '1 prayer a day is a good step.' },
    headings: { en: 'Reminder' },
    included_segments: ['Subscribed Users'],
    url: process.env.APP_URL,
    web_push_topic: 'tag',
    chrome_web_image: `https://cdn.pixabay.com/photo/2018/06/30/10/06/jesus-3507364_960_720.jpg`, // 512 or >
  };

  try {
    const response = await fetch('https://onesignal.com/api/v1/notifications', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${process.env.ONESIGNAL_BASIC_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log('Notification sent');
  } catch (error) {
    console.error('Error sending notification:', error);
  }
}

sendNotification().then(() => {
  console.log("sendNotification() completed");
}).catch((error) => {
  console.error("sendNotification() failed to run successfully:", error);
});

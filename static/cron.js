const cron = require('node-cron');
import axios from 'axios';

cron.schedule('0 21 * * *', () => {
  console.log('Running a task everyday at 9pm');

  sendNotification().then(() => {
    console.log("Notification sent successfully");
  }).catch((error) => {
    console.error("Error sending notification:", error);
  });
});

async function sendNotification() {
  const data = {
    app_id: process.env.ONESIGNAL_APP_ID,
    contents: { en: '1 prayer a day is fine' },
    headings: { en: 'Reminder' },
    included_segments: ['Subscribed Users'],
    url: process.env.APP_URL,
    web_push_topic: 'tag',
    chrome_web_image: `${process.env.APP_URL}/static/logo.png`, // 512 or >
  };

  try {
    const response = await axios.post('https://onesignal.com/api/v1/notifications', data, {
      headers: {
        'Authorization': `Basic ${process.env.ONESIGNAL_BASIC_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    console.log('Notification sent', response.data);
  } catch (error) {
    console.error('Error sending notification:', error);
  }
}


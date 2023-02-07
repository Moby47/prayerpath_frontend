const cron = require('node-cron');
import axios from 'axios';



// cron.schedule('0 8,20 * * *', () => { //main
//  console.log('Running a task at 8am and 8pm every day'); //main

cron.schedule('*/10 * * * * *', () => {
  console.log('Running a task every 10 seconds');
 // console.log(config.get("ONESIGNAL_APP_ID"),config.get("APP_URL"),config.get("ONESIGNAL_BASIC_KEY"));
 // console.log(process.env.NODE_ENV);

  /*sendNotification().then(() => {
    console.log("Notification sent successfully");
  }).catch((error) => {
    console.error("Error sending notification:", error);
  });
  */
});

async function sendNotification() {
  const data = {
    app_id: config.get("ONESIGNAL_APP_ID"),
    contents: { en: '1 prayer a day is a good step.' },
    headings: { en: 'Reminder' },
    included_segments: ['Subscribed Users'],
    url: config.get("APP_URL"),
    web_push_topic: 'tag',
    //chrome_web_image: `${config.get("APP_URL")}/static/logo.png`, // 512 or >
    chrome_web_image: `https://cdn.pixabay.com/photo/2018/06/30/10/06/jesus-3507364_960_720.jpg`, // 512 or >
  };

  try {
    const response = await axios.post('https://onesignal.com/api/v1/notifications', data, {
      headers: {
        'Authorization': `Basic ${config.get("ONESIGNAL_BASIC_KEY")}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    console.log('Notification sent', response.data);
  } catch (error) {
    console.error('Error sending notification:', error);
  }
}


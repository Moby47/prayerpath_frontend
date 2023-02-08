#!/usr/bin/env node -r esm

//start in server with: node bin/populate.js

import axios from 'axios';

generateAndSaveQuotes().then(category => {
  console.log("Quote generation and saving completed.");
  //send push notification
  sendNotification(category)
}).catch((error) => {
  console.error("Error getting/saving quotes", error);
});


async function generateAndSaveQuotes(){
const category = ['Family', 'Hope', 'Grace', 'Prosperity', 'Marriage', 'Health', 'Career', 'Peace', 'Protection', 'Guidance', 'Joy', 'Wisdom', 'Strength', 'Blessing', 'Salvation'][Math.floor(Math.random() * 15)];

const prompt = `Generate 1 Bible verses and prayer JSON data with reference, verse, prayer, category, and verse_url from biblegateway.com where God promised something good to humans and an associated prayer focused on holding God to that promise with firm belief and faith, for the '${category}' category. Just give me the JSON in this format: {"data": [{"reference": "...","verse": "...","prayer": "...","category": "...","verse_url": "..."},]}.`;
  
const response = await axios.post('https://api.openai.com/v1/completions', {
    prompt,
    model: 'text-davinci-003',
    temperature: 1,
    max_tokens: 2000,
  }, {
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    },
  });

  const data = response.data.choices[0].text;
// Format recieved: {"data": [{"reference": "Luke 18:27","verse": "What is impossible with man is possible with God.”","prayer": "Heavenly Father, thank you for being a God of the impossible. Help me to trust in You and never give up hope in Your ability to do the impossible things. I can rest in Your promise and confidently put my faith in Your power and Your goodness. In Your Name I pray. Amen.","category": "Grace","verse_url": "https://www.biblegateway.com/passage/?search=Luke+18%3A27&version=ESV"}]}
//console.log(data)
  
   // pass the data from api to your laravel backend
const responseFromBackend = await axios.post(process.env.BACKEND_APP_URL+'/api/save-quotes', {
    data: data
  },{
    headers: {
    'Authorization': `Bearer ${process.env.BACKEND_API_KEY}`,
   },
  });

   // check if the data was successfully saved
if(responseFromBackend.status === 200) {
  console.log("Data saved successfully! For category: "+ category)
}
else {
  console.error("Error saving data")
}

};


async function sendNotification() {
  const data = {
    app_id: process.env.ONESIGNAL_APP_ID,
    contents: { en: 'New quote added. Click to view.' },
    headings: { en: 'Update' },
    included_segments: ['Subscribed Users'],
    url: process.env.APP_URL+'/prayer',
    web_push_topic: 'tag',
    chrome_web_image: `https://cdn.pixabay.com/photo/2018/04/12/18/13/application-3314290_960_720.png`, // 512 or >
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
};


/* const cron = require('node-cron');
import axios from 'axios';

cron.schedule('0 6,19 * * *', () => {
console.log('Running a task at 6:00 AM and 7:00 PM every day');

generateAndSaveQuotes().then(() => {
    console.log("Quotes generated and saved successfully.");
    //send push notification
    sendNotification()
  }).catch((error) => {
    console.error("Error getting/saving quotes", error);
  });
});


async function generateAndSaveQuotes(){
    const category = ['Family', 'Hope', 'Grace', 'Prosperity', 'Marriage', 'Health', 'Career', 'Peace', 'Protection', 'Guidance', 'Joy', 'Wisdom', 'Strength', 'Blessing', 'Salvation'][Math.floor(Math.random() * 15)];
   const prompt = `Generate 1 Bible verses and prayer JSON data with reference, verse, prayer, category, and verse_url from biblegateway.com where God promised something good to humans and an associated prayer focused on holding God to that promise with firm belief and faith, for the '${category}' category. Just give me the JSON in this format: {"data": [{"reference": "...","verse": "...","prayer": "...","category": "...","verse_url": "..."},]}.`;
    const response = await axios.post('https://api.openai.com/v1/completions', {
      prompt,
      model: 'text-davinci-003',
      temperature: 1,
      max_tokens: 2000,
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    });
  
    const data = response.data.choices[0].text;
//{"data": [{"reference": "Luke 18:27","verse": "What is impossible with man is possible with God.”","prayer": "Heavenly Father, thank you for being a God of the impossible. Help me to trust in You and never give up hope in Your ability to do the impossible things. I can rest in Your promise and confidently put my faith in Your power and Your goodness. In Your Name I pray. Amen.","category": "Grace","verse_url": "https://www.biblegateway.com/passage/?search=Luke+18%3A27&version=ESV"}]}
 //console.log(data)
    
     // pass the data from api to your laravel backend
  const responseFromBackend = await axios.post(process.env.BACKEND_APP_URL+'/api/save-quotes', {
      data: data
    },{
      headers: {
      'Authorization': `Bearer ${process.env.BACKEND_API_KEY}`,
     },
    });

     // check if the data was successfully saved
  if(responseFromBackend.status === 200) {
    console.log("Data saved successfully!")
  }
  else {
    console.error("Error saving data")
  }

  };


  async function sendNotification() {
    const data = {
      app_id: process.env.ONESIGNAL_APP_ID,
      contents: { en: 'More quotes added to our database' },
      headings: { en: 'Update' },
      included_segments: ['Subscribed Users'],
      url: process.env.APP_URL+'/prayer',
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
  };

  */
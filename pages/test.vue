<template>
    <v-row justify="center" align="center">
      <v-col>
      
        <template>
  <div>
    <button class='blue' @click="makeApiCall">Go</button>
  </div>
</template>


        </v-col>
      </v-row>
    
    </template>
    
    
    <script>
import axios from 'axios';

export default {
  
  methods: {

    async makeApiCall(){
    const category = ['Family', 'Hope', 'Grace', 'Prosperity', 'Marriage', 'Health', 'Career', 'Peace', 'Protection', 'Guidance', 'Joy', 'Wisdom', 'Strength', 'Blessing', 'Salvation'][Math.floor(Math.random() * 15)];
  
   // const prompt = `Generate two random SQL statements in the format of: INSERT INTO quotes(reference, verse, verse_url (from biblegateway.com), prayer, category) VALUES(...),(...),(...) for Bible verses from biblegateway.com where God promised something good to humans and an associated prayer focused on holding God to that promise with strong belief and faith, for the '${category}' category.`;
    const prompt = `Generate 2 Bible verses and prayer JSON data with reference, verse, prayer, category, and verse_url from biblegateway.com where God promised something good to humans and an associated prayer focused on holding God to that promise with firm belief and faith, for the '${category}' category. Just give me the JSON in this format: {"data": [{"reference": "...","verse": "...","prayer": "...","category": "...","verse_url": "..."},]}.`;
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
    // const quotes = data.choices[0].text.split("VALUES")[1].split(");").map(item => `(${item})`).join(',');
     
     console.log(data)
    
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
    this.sendNotification()
  }
  else {
    console.error("Error saving data")
  }

  },


  async sendNotification() {
  const data = {
    app_id: process.env.ONESIGNAL_APP_ID,
    contents: { en: 'More quotes added to our database' },
    headings: { en: 'Update' },
    included_segments: ['Subscribed Users'],
    url: process.env.APP_URL+'/home',
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


    //method end

  },

  mounted() {
   

  },

}




    </script>
    
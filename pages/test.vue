<template>
    <v-row justify="center" align="center">
      <v-col>
      
        <template>
  <div>
    <button class='blue' @click="sendNotification">Send Notification</button>
  </div>
</template>


        </v-col>
      </v-row>
    
    </template>
    
    
    <script>

export default {
  methods: {
    
    async sendNotification() {
      // Initialize the OneSignal API
  fetch('https://onesignal.com/api/v1/notifications', {
   method: 'POST',
   headers: {
     'Authorization': 'Basic ZmU2OTU3OWQtMjI2Ny00NjJmLWIzZWQtZTRlOGMzNTUxNmY4',
     'Content-Type': 'application/json',
     'Accept': 'application/json'
   },
   body: JSON.stringify({
     'app_id':'1d73fcce-b49c-4e97-ad4a-b8d5c516797d',
     'contents': {'en': '1 prayer a day is fine'},
     'headings': {'en': 'Reminder'},
     'included_segments': ['Subscribed Users'],
     'url': 'http://localhost:3000',
     'web_push_topic': 'tag',
     'chrome_web_image':'http://localhost:8000/static/logo.png',//512 or >
   })
   })
   .then(res=> {
       console.log('pushed notifications');
   }) 
   .catch(error =>{
         console.log(error)    
         })
    }
    //method end

  }
}




    </script>
    
<template>
    <div>
      <textarea v-model="text"></textarea>
      <button @click="speak">Speak</button>
    </div>
  </template>
  
  <script>
  import Speak from 'speak-tts'
  
  export default {
    data() {
      return {
        text: 'Friends, did you hear what Jeremiah said? God has plans to prosper us and not to harm us. He wants to give us hope and a future!'
      }
    },
    methods: {
      speak() {
        const speak = new Speak()
  
        if (speak.hasBrowserSupport()) {
          speak.init({
            volume: 1,
            lang: 'en-US',
            rate: 1,
            pitch: 1,
            voice: 'Google UK English Female',
            splitSentences: true,
            listeners: {
              onvoiceschanged: voices => {
                console.log('Voices changed', voices)
              }
            }
          })
  
          speak.speak({
            text: this.text
          })
        }
      },


    }
  }
  </script>
  
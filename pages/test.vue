<template>
  <div>
    <div>
      <button class="btn btn-outline-primary" @click.prevent="showTranslation('KJV')">KJV</button>
      <button class="btn btn-outline-primary" @click.prevent="showTranslation('ESV')">ESV</button>
      <button class="btn btn-outline-primary" @click.prevent="showTranslation('NLT')">NLT</button>
      <button class="btn btn-outline-primary" @click.prevent="showTranslation('ASV')">ASV</button>
    </div>
    <div v-if="verse" class="mt-3">
      <h3>{{ book }} {{ chapterId }}:{{ verseId }}</h3>
      <p>{{ verse }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      verse: null,
      book: null,
      chapterId: null,
      verseId: null,
      translations: {
        'KJV': 'KJV',
        'ESV': 'ESV',
        'NLT': 'NLT',
        'ASV': 'ASV',
      },
    };
  },
  methods: {
    showTranslation(translation) {
      const reference = 'Genesis 1:2'; // or use this.quote.reference if available
      const translationId = this.translations[translation];

      axios.get(`https://cors-anywhere.herokuapp.com/https://bible-go-api.rkeplin.com/v1/books/1/chapters/1/1001002?translation=${translationId}`)
        .then(response => {
          this.verse = response.data.verse;
          this.book = response.data.book.name;
          this.chapterId = response.data.chapterId;
          this.verseId = response.data.verseId;
        })
        .catch(error => {
          console.error(error);
        });
    },
  },
};
</script>

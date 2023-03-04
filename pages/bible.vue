<template>
  <div>
    <h1>Bible Search</h1>
    <form @submit.prevent="getBibleVerses">
      <div class="form-group">
        <label for="book-select">Select a book:</label>
        <select id="book-select" v-model="selectedBook" class="form-control">
          <option v-for="book in books" :value="book">{{ book }}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="chapter-select">Select a chapter:</label>
        <select id="chapter-select" v-model="selectedChapter" class="form-control">
          <option v-for="chapter in chapters" :value="chapter">{{ chapter }}</option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary">Search</button>
    </form>
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <h2>{{ selectedBook }} {{ selectedChapter }}</h2>
      <div v-for="verse in verses" :key="verse.verse">
        <p><strong>{{ verse.book_name }} {{ verse.chapter }}:{{ verse.verse }}</strong> {{ verse.text }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      books: ["Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy", "Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel", "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles", "Ezra", "Nehemiah", "Esther", "Job", "Psalms", "Proverbs", "Ecclesiastes", "Song of Solomon", "Isaiah", "Jeremiah", "Lamentations", "Ezekiel", "Daniel", "Hosea", "Joel", "Amos", "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk", "Zephaniah", "Haggai", "Zechariah", "Malachi", "Matthew", "Mark", "Luke", "John", "Acts", "Romans", "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians", "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians", "1 Timothy", "2 Timothy", "Titus", "Philemon", "Hebrews", "James", "1 Peter", "2 Peter", "1 John", "2 John", "3 John", "Jude", "Revelation"],
    selectedBook: "Genesis",
    selectedChapter: "1",
    chapters: [],
    verses: [],
    isLoading: false,
    error: "",
  };
},
methods: {
  async getBibleVerses() {
    this.isLoading = true;
    this.error = "";
    try {
      const response = await fetch(`https://bible-api.com/${this.selectedBook} ${this.selectedChapter}?translation=kjv`);
      const data = await response.json();
      this.verses = data.verses;
    } catch (err) {
      this.error = "Error retrieving bible verses.";
    } finally {
      this.isLoading = false;
    }
  },
  updateChapterList() {
    const numChapters = this.getNumChapters();
    this.chapters = Array.from({ length: numChapters }, (_, i) => `${i+1}`);
    this.selectedChapter = this.chapters[0];
  },
  getNumChapters() {
    // Get the number of chapters in the selected book
    // TODO: Replace with actual data source
    const numChaptersMap = {
      "Genesis": 50,
      "Exodus": 40,
      "Leviticus": 27,
      "Numbers": 36,
      "Deuteronomy": 34,
      "Joshua": 24,
      "Judges": 21,
      "Ruth": 4,
      "1 Samuel": 31,
      "2 Samuel": 24,
      "1 Kings": 22,
      "2 Kings": 25,
      "1 Chronicles": 29,
      "2 Chronicles": 36,
      "Ezra": 10,
      "Nehemiah": 13,
      "Esther": 10,
      "Job": 42,
      "Psalms": 150,
      "Proverbs": 31,
      "Ecclesiastes": 12,
      "Song of Solomon": 8,
      "Isaiah": 66,
      "Jeremiah": 52,
      "Lamentations": 5,
      "Ezekiel": 48,
      "Daniel": 12,
"Hosea": 14,
"Joel": 3,
"Amos": 9,
"Obadiah": 1,
"Jonah": 4,
"Micah": 7,
"Nahum": 3,
"Habakkuk": 3,
"Zephaniah": 3,
"Haggai": 2,
"Zechariah": 14,
"Malachi": 4,
"Matthew": 28,
"Mark": 16,
"Luke": 24,
"John": 21,
"Acts": 28,
"Romans": 16,
"1 Corinthians": 16,
"2 Corinthians": 13,
"Galatians": 6,
"Ephesians": 6,
"Philippians": 4,
"Colossians": 4,
"1 Thessalonians": 5,
"2 Thessalonians": 3,
"1 Timothy": 6,
"2 Timothy": 4,
"Titus": 3,
"Philemon": 1,
"Hebrews": 13,
"James": 5,
"1 Peter": 5,
"2 Peter": 3,
"1 John": 5,
"2 John": 1,
"3 John": 1,
"Jude": 1,
"Revelation": 22
};
return numChaptersMap[this.selectedBook];
},
},
watch: {
selectedBook() {
this.updateChapterList();
},
},
mounted() {
this.updateChapterList();
},
};
</script>
<template>
  <div>
   <apploader v-if="isLoading"/>

    <appheader/>


      <!-- App Capsule -->
      <div id="appCapsule">
  

         <!-- Header Tabs -->
    <div class="extraHeader p-0">
        <ul class="nav nav-tabs lined" role="tablist">
            <li class="nav-item">
                <a class="nav-link active" data-toggle="tab" href="#find" role="tab">
                    Find
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="#searchId" role="tab">
                    Search
                </a>
            </li>
        <!--  <li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="#settings" role="tab">
                    Settings
                </a>
            </li>-->
        </ul>
    </div>
    <!-- * Header Tabs -->

    <!-- App Capsule -->
    <div id="appCapsule" class="extra-header-active">


        <div class="tab-content mt-1">

            <!-- find tab -->
            <div class="tab-pane fade show active" id="find" role="tabpanel">

                <div class="section full mt-1">
                    <div class="section full mt-1">
            <div class="section-title">Choose A Book/Chapter/Verse</div>

            <div class="wide-block pt-2 pb-2">

              <form @submit.prevent="getBibleVerses">

                <div class="dropdown">
                  <label class="label">Select a book</label><br>
                    <button class="btn btn-outline-primary dropdown-toggle custom-width" type="button" data-toggle="dropdown">
                      {{ selectedBook }}
                    </button>
                    <div class="dropdown-menu">
          <a class="dropdown-item" href="#" v-for="book in books" :key="book" :value="book" @click="runSelectedBook(book)">{{book}}</a>
                    </div>
                </div>

                <div class="dropdown mt-3">
                  <label class="label">Select a chapter</label><br>
                    <button class="btn btn-outline-primary dropdown-toggle custom-width" type="button" data-toggle="dropdown">
                      {{ selectedChapter }}
                    </button>
                    <div class="dropdown-menu">
          <a class="dropdown-item" href="#" v-for="chapter in chapters" :key="chapter" :value="chapter" @click="runSelectedchapter(chapter)">{{chapter}}</a>
                    </div>
                </div>

                <div class="form-group boxed mt-2">
                        <div class="input-wrapper">
                            <label class="label" for="verseInput">Enter verse or range</label>
          <input v-model="selectedVerse" pattern="^\d+(-\d+)?$" required type="text" class="form-control custom-width" id="verseInput" placeholder="Eg: 2 or 2-4">
          <small v-if="!isValidVerseInput">Examples: 1, 3, 12, 119, 2-5, 10-15</small>
        </div>
                    </div>

           <div class="mt-2">
            <button type="submit" class="btn btn-outline-primary mb-1">Find</button>
        </div>            

              </form>

            </div>
        </div>

                </div>

            </div>
            <!-- * find tab -->



            <!-- search tab -->
            <div class="tab-pane fade" id="searchId" role="tabpanel">

              <div class="section full mt-1">
                    <div class="section full mt-1">
            <div class="section-title">Search Bible Verses</div>

            <div class="wide-block pt-2 pb-2">

              <form @submit.prevent="searchBibleVerses">

                <div class="form-group boxed mt-2">
                        <div class="input-wrapper">
                            <label class="label" for="searchInput">Search</label>
          <input v-model="searchInput" required type="text" class="form-control" id="searchInput" 
          placeholder="Eg. John 3:16 or Genesis 1:1-5">
          <small v-if="searchInput && !isValidRefInput">
            Examples: Mark 2, 1 John 3, Mark 2:4, 1 Samuel 4-5, Genesis 2:3-5, and 2 Samuel 3:1-3</small>
        </div>
                    </div>

           <div class="mt-2">
            <button type="submit" class="btn btn-outline-primary mb-1">Search</button>
        </div>            

              </form>

            </div>
        </div>

                </div>


            </div>
            <!-- * search tab -->


            <!-- settings tab 
            <div class="tab-pane fade" id="settings" role="tabpanel">

                <div class="section full mt-1">
                    <div class="section-title">settings</div>
                    <div class="wide-block pt-2 pb-2">
                        This is an example text.
                    </div>
                </div>

            </div>
      settings tab -->

        </div>


          <!--Translation-->
<!-- top right -->
<div class="fab-button animate top-right dropdown">
  <a href="#" class="fab" data-toggle="dropdown">
    <v-icon class="fabBtn">mdi-translate</v-icon>
  </a>
  <div class="dropdown-menu">
    <a class="dropdown-item" href="#" @click="runSelectedTranslation('kjv')">
      <v-icon class="fabBtn">mdi-alpha-k</v-icon>
      <p>KJV</p>
    </a>
    <a class="dropdown-item" href="#" @click="runSelectedTranslation('web')">
      <v-icon class="fabBtn">mdi-alpha-w</v-icon>
      <p>WEB</p>
    </a>
    <a class="dropdown-item" href="#" @click="runSelectedTranslation('bbe')">
      <v-icon class="fabBtn">mdi-alpha-b</v-icon>
      <p>BBE</p>
    </a>
  </div>
</div>
<!-- * top right -->
<!--Translation-->


        <!-- Bible Panel Left -->
        <div class="modal fade panelbox panelbox-left" id="biblePanelLeft" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">{{panelTitle}}</h4>
                        <a href="javascript:;" data-dismiss="modal" class="panel-close">
                            <v-icon>mdi-close</v-icon>
                        </a>
                    </div>
                    <div class="modal-body">
                      <div v-for="verse in verses" :key="verse.verseId">
                        <p>
                          <strong>{{ verse.book_name }} {{ verse.chapter }}:{{ verse.verse }}</strong> {{ verse.text }}
                        </p>
                      </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- * Bible Panel Left -->



        <!-- Multi purpose notification modal-->
        <div id="bibleMultiModal" class="notification-box">
          <div class="notification-dialog ios-style">
            <div class="notification-header">
              <div class="right">
                <span>just now</span>
              </div>
            </div>
            <div class="notification-content">
              <div class="in">
                <h3 class="subtitle">{{notificationTitle}}</h3>
                <div class="text">
                  {{notificationMessage}}
                </div>
              </div>
              <img :src="notificationImg" alt="image" class="imaged w64">
            </div>
          </div>
        </div>
        <!-- Multi purpose notification modal -->

    </div>
    <!-- * App Capsule -->


        <appfooter/>


    <appbottommenu/>

    <appsidebar/>
  </div>

  </div>
</template>

<style scoped>
#appCapsule.extra-header-active {
    padding-top: 70px;
}

.custom-width {
    width: 53%;
}

.fab-button {
  z-index: 9999;
  margin-top: 50px;
}
.fab-button .fab {
    background: white;
}

.fab-button.dropdown.show .fab {
    background: #fff;
}

.fab-button .fab:hover, .fab-button .fab:active {
    background: #fff;
}

.fab-button .dropdown-menu .dropdown-item {
    background: #fff;
}

  .dark-mode-active .fabBtn {
    color: black !important;
  }
</style>

<script>

import appsidebar from "~/components/appsidebar.vue";
import appfooter from "~/components/appfooter.vue";
import appbottommenu from "~/components/appbottommenu.vue";

import axios from 'axios';

export default {
  components: {
    appsidebar,
    appfooter,
    appbottommenu,
  },
  data() {
    return {
      books: ["Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy", "Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel", "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles", "Ezra", "Nehemiah", "Esther", "Job", "Psalms", "Proverbs", "Ecclesiastes", "Song of Solomon", "Isaiah", "Jeremiah", "Lamentations", "Ezekiel", "Daniel", "Hosea", "Joel", "Amos", "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk", "Zephaniah", "Haggai", "Zechariah", "Malachi", "Matthew", "Mark", "Luke", "John", "Acts", "Romans", "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians", "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians", "1 Timothy", "2 Timothy", "Titus", "Philemon", "Hebrews", "James", "1 Peter", "2 Peter", "1 John", "2 John", "3 John", "Jude", "Revelation"],
      selectedBook: "Genesis",
      selectedChapter: "1",
      chapters: [],
      selectedVerse: "1",
      verses: [],
      isLoading: false,
      error: "",
      selectedTranslation: "kjv",

      searchInput: "",

      panelTitle:'',

      notificationTitle:'',
      notificationMessage:'',
      notificationImg:'',
    };
  },
  computed: {
    isValidVerseInput() {
      const inputRegex = new RegExp("^[0-9]+(-[0-9]+)?$");
      return inputRegex.test(this.selectedVerse);
    },

    isValidRefInput() {
      const regex = /^(?:(?:[1234]?\s)?[a-zа-я]+\s*)?\d+(?::\d+)?(?:-\d+(?::\d+)?)?$/i;
    return regex.test(this.searchInput);
    },

  },
  methods: {

    runSelectedBook(book){
      this.selectedBook = book
    },

    runSelectedchapter(chapter){
      this.selectedChapter = chapter
    },

    runSelectedTranslation(translation){
      this.selectedTranslation = translation
      this.showNotification('bibleMultiModal', 'Notice', "Bible translation changed to "+ this.selectedTranslation.toUpperCase() , 'https://media.giphy.com/media/LrG5hpEkf2XqjyK4AY/giphy.gif');

    },

    async searchBibleVerses() {

      if (!this.isValidRefInput) {
        console.log('invalid reference')
        //notify
        this.showNotification('bibleMultiModal', 'Alert', "Incorrect reference format. Please use a correct format." , 'https://media.giphy.com/media/YoYOhif8otaJI8uIMT/giphy.gif');
    return;
    }

    this.isLoading = true;
   
    try {
      const response = await axios.get(`https://bible-api.com/${this.searchInput}?translation=${this.selectedTranslation}`);
    const data = response.data;
    this.verses = data.verses.map((verse, index) => ({ ...verse, verseId: index }));
    if (!this.verses || this.verses.length === 0) {
      this.showNotification('bibleMultiModal', 'Notice', "No results found." , 'https://media.giphy.com/media/l0HlOBZcl7sbV6LnO/giphy.gif');
    } 

     //result found
     this.panelTitle = this.searchInput +' - '+this.selectedTranslation.toUpperCase()
    $('#biblePanelLeft').modal('toggle');

    } catch (err) {
         //notify err and
    this.showNotification('bibleMultiModal', 'Error', "Error retrieving bible verses. Is your verse correct? Try again." , 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYjFmMzhhZWFiODgyMzA4OTNiNjhmN2MyYTMxNDQwODg5NmQzMzk5NCZjdD1n/3osxY9kuM2NGUfvThe/giphy.gif');
      } finally {
      this.isLoading = false;
    }
  },




   async getBibleVerses() {
      this.isLoading = true;
      try {
        const response = await axios.get(`https://bible-api.com/${this.selectedBook} ${this.selectedChapter}:${this.selectedVerse}?translation=${this.selectedTranslation}`);
    const data = response.data;
    this.verses = data.verses.map((verse, index) => ({ ...verse, verseId: index }));
    if (!this.verses || this.verses.length === 0) {
      //notify info
      this.showNotification('bibleMultiModal', 'Notice', "No results found." , 'https://media.giphy.com/media/l0HlOBZcl7sbV6LnO/giphy.gif');
    } 

    //result found
    this.panelTitle = this.selectedBook +' '+ this.selectedChapter +':'+ this.selectedVerse +' - '+this.selectedTranslation.toUpperCase()
    $('#biblePanelLeft').modal('toggle');
    
      } catch (err) {
        //notify err and
        this.showNotification('bibleMultiModal', 'Error', "Error retrieving bible verses. Is your verse correct? Try again." , 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYjFmMzhhZWFiODgyMzA4OTNiNjhmN2MyYTMxNDQwODg5NmQzMzk5NCZjdD1n/3osxY9kuM2NGUfvThe/giphy.gif');
      } finally {
        this.isLoading = false;
      }
    },

 showNotification(notificationId,notificationTitle,notificationMessage,notificationImg) {

this.notificationTitle = notificationTitle
this.notificationMessage = notificationMessage
this.notificationImg = notificationImg

var a = "#" + notificationId;
var time = 4000;
$(".notification-box").removeClass("show");
setTimeout(() => {
$(a).addClass("show");
}, 300);
if (time) {
time = time + 300;
setTimeout(() => {
    $(".notification-box").removeClass("show");
}, time);
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

selectedTranslation() {
    this.$storage.setUniversal("selectedTranslation", this.selectedTranslation);
 },
  
},

mounted() {
this.updateChapterList();
this.selectedTranslation = this.$storage.getUniversal("selectedTranslation") || "kjv";
},

   //Solved the modal overlay not leaving after route change issue
   beforeRouteLeave(to, from, next) {
    document.body.classList.remove('modal-open');
    const modalBackdrop = document.querySelector('.modal-backdrop');
    if (modalBackdrop) {
      modalBackdrop.remove();
    }
    next();
  },


};
</script>

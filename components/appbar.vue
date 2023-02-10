<template>
    <div>
    <!--app bar-->
    <v-app-bar color="white" fixed app :elevation="0" :shadow="false" style="color: black;">
      <v-icon color="black">mdi-hands-pray</v-icon> 
      <v-toolbar-title>PrayerPath</v-toolbar-title>
      <v-spacer></v-spacer>
      <!--  <v-icon style="margin-right: 10px;" color="green">mdi-signal</v-icon>-->
      <v-app-bar-nav-icon style="color: black;" @click.stop="drawer = !drawer">
        <v-icon>mdi-menu</v-icon>
      </v-app-bar-nav-icon>
    </v-app-bar>
    <!--app bar-->
  
    <!-- right navigation drawer -->
    <v-navigation-drawer fixed app v-model="drawer">
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://cdn.pixabay.com/photo/2016/04/15/18/05/computer-1331579_960_720.png"></v-img>
        </v-list-item-avatar>
  
        <v-list-item-content>
          <v-list-item-title>Welcome</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
  
      <v-divider></v-divider>
  
      <v-list dense>
        <v-list-item
          link
          :to="'/favourites'"
        >
          <v-list-item-icon>
            <v-icon>mdi-heart</v-icon>
          </v-list-item-icon>
  
          <v-list-item-content>
            <v-list-item-title>Favourites</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
  
      <v-list dense>
        <v-list-item
          link
          :to="'/feature-request'"
        >
          <v-list-item-icon>
            <v-icon>mdi-feature-search</v-icon>
          </v-list-item-icon>
  
          <v-list-item-content>
            <v-list-item-title>Feature Request</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
  
    </v-navigation-drawer>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        drawer: false
      }
    }
  }
  </script>
  
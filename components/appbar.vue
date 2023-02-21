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
          :to="'/'"
        >
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
  
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-list dense>
        <v-list-item
          link
          :to="'/prayer'"
        >
          <v-list-item-icon>
            <v-icon>mdi-book-cross</v-icon>
          </v-list-item-icon>
  
          <v-list-item-content>
            <v-list-item-title>All Prayers</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-list dense>
        <v-list-item
          link
          :to="'/favourite'"
        >
          <v-list-item-icon>
            <v-icon>mdi-heart</v-icon>
          </v-list-item-icon>
  
          <v-list-item-content>
            <v-list-item-title>Favourites</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      
<!--Emotions-->
      <v-list dense>
  <v-menu offset-y>
    <template v-slot:activator="{ on }">
      <v-list-item v-on="on">
        <v-list-item-icon>
          <v-icon>mdi-head-heart</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Emotions</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>

    <v-list>
      <v-list-item
        link
        :to="'/emotions/1'"
      >
        <v-list-item-title>Option 1</v-list-item-title>
      </v-list-item>
      <v-list-item
        link
        :to="'/emotions/2'"
      >
        <v-list-item-title>Option 2</v-list-item-title>
      </v-list-item>
      <v-list-item
        link
        :to="'/emotions/3'"
      >
        <v-list-item-title>Option 3</v-list-item-title>
      </v-list-item>
      <v-list-item
        link
        :to="'/emotions/4'"
      >
        <v-list-item-title>Option 4</v-list-item-title>
      </v-list-item>
      <v-list-item
        link
        :to="'/emotions/5'"
      >
        <v-list-item-title>Option 5</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</v-list>
<!--Emotions-->
  
      <v-list dense>
        <v-list-item
          link
          :to="'/feature-request'"
        >
          <v-list-item-icon>
            <v-icon>mdi-feature-search</v-icon>
          </v-list-item-icon>
  
          <v-list-item-content>
            <v-list-item-title><!--Feature Request--> (Coming soon)</v-list-item-title>
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
  
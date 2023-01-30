<template>
  <v-app style="background-color: white;">
  
    <v-app-bar
     color="#4a9ec1"
      :clipped-left="clipped"
      fixed
      app
    >
    <v-icon>mdi-heart</v-icon>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      
    </v-app-bar>
    
    <v-main>
      <v-container>

        <Nuxt />

      </v-container>
    </v-main>
 
    
    <div>
  <v-bottom-navigation :elevation="3" fixed style="background-color: #4a9ec1;">
<v-btn value="recent"  size="x-small" style="color: white !important;">
  <v-icon>mdi-history</v-icon>
  Career
</v-btn>

<v-btn value="favorites"  size="x-small" style="color: white !important;">
  <v-icon>mdi-heart</v-icon>
  Family
</v-btn>

<v-btn 
value="nearby" size="x-small" style="color: white !important;">
  <v-icon>mdi-map-marker</v-icon>
  Random
</v-btn>

<v-btn 
value="nearby" size="x-small" style="color: white !important;">
  <v-icon>mdi-more</v-icon>
  More
</v-btn>
</v-bottom-navigation>
</div>


</v-app>
</template>

  

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Career',
          to: '/'
        },
        {
          icon: 'mdi-apps',
          title: 'Family',
          to: '/'
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Quote God'
    }
  }
}
</script>

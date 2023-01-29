<template>
  <v-app light>
   <!-- <v-navigation-drawer
    color="primary"
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>-->
    <v-app-bar
    color="primary"
      :clipped-left="clipped"
      fixed
      app
    >
    <!--
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
    -->
    <v-icon>mdi-heart</v-icon>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      
      
    </v-app-bar>
    
    <v-main>
      <v-container>

        <Nuxt />

      </v-container>
    </v-main>
 
    
    <div>
  <v-bottom-navigation :elevation="3" fixed>
<v-btn value="recent"  size="x-small">
  <v-icon>mdi-history</v-icon>
  Career
</v-btn>

<v-btn value="favorites"  size="x-small">
  <v-icon>mdi-heart</v-icon>
  Family
</v-btn>

<v-btn 
value="nearby" size="x-small">
  <v-icon>mdi-map-marker</v-icon>
  Random
</v-btn>

<v-btn 
value="nearby" size="x-small">
  <v-icon>mdi-map-marker</v-icon>
  Custom
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

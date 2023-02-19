<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on" icon>
        <v-icon class="mr-3" color="green">mdi-share-variant</v-icon>
      </v-btn>
    </template>

    <v-list>
      <v-list-item link>
        <v-list-item-icon>
          <v-icon color="#075e54">mdi-whatsapp</v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          <ShareNetwork
            network="whatsapp"
            :url="`${app_url}/discussion?id=${quote.id}`"
            title="Get your dose of divine inspiration with Quote God & Pray! 🙏🙌"
            description="Stay focused on your faith with randomly generated quotes about God's promises and prayers."
            style="text-decoration: none !important; color:#075e54;"
          >
            Whatsapp
          </ShareNetwork>
        </v-list-item-title>
      </v-list-item>
      <v-list-item link>
        <v-list-item-icon>
          <v-icon color="#3b5998">mdi-facebook</v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          <ShareNetwork
            network="facebook"
            :url="`${app_url}/discussion?id=${quote.id}`"
            title="Say hello to Quote God & Pray! 🙏👋"
            description="Stay inspired and connected with God's promises and prayers on the go."
            quote="Stay inspired and connected with God's promises and prayers on the go. 🙌"
            hashtags="faith, inspiration, dailydevotional, bibleverse, prayer, spiritualgrowth, christianapp, devotionals, godisgood, blessed"
            style="text-decoration: none !important; color:#3b5998;"
          >
            Facebook
          </ShareNetwork>
        </v-list-item-title>
      </v-list-item>

      <v-list-item link>
        <v-list-item-icon>
          <v-icon color="#075e54">mdi-facebook-messenger</v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          <ShareNetwork
            network="messenger"
            :url="`${app_url}/discussion?id=${quote.id}`"
            style="text-decoration: none !important; color:#0084ff;"
          >
          Messenger
          </ShareNetwork>
        </v-list-item-title>
      </v-list-item>

      <v-list-item link>
        <v-list-item-icon>
          <v-icon color="#00acee">mdi-twitter</v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          <ShareNetwork
            network="twitter"
            :url="`${app_url}/discussion?id=${quote.id}`"
            title="Get inspired and stay faithful with Quote God & Pray! 🙏🙌"
            hashtags="faith,quoteGod&Pray,dailydevotional"
            style="text-decoration: none !important; color:#00acee;"
          >
            Twitter
          </ShareNetwork>
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  props: {
    quote: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      app_url: this.$config.APP_URL,
    };
  },
}
</script>

<style scoped>
.v-list {
  background-color: #fff !important;
}
</style>

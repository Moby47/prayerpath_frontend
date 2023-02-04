<template>
  <v-app dark>
    <div id="bg">
 <div class="center-content" style="color:black;">
      <h1 v-if="error.statusCode === 404">
      {{ pageNotFound }}
    </h1>
    <h1 v-else>
      {{ otherError }}
    </h1>
      <v-btn :to="{ name: 'index'}" class="button">
      Home page
    </v-btn>
    </div>
  </div>
  </v-app>
</template>

<script>
export default {
  name: 'EmptyLayout',
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: 'Page Not Found',
      otherError: 'An error occurred'
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
#bg {
            font-family: 'Nunito', sans-serif;
            background-image: url("https://cdn.pixabay.com/photo/2016/09/16/19/15/gear-1674891_960_720.png");
            background-size: cover;
            height: 100vh;
        }

        .center-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
        }

        h1 {
            margin-bottom: 20px;
        }

        .button {
            padding: 10px 20px;
            background-color: #333;
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
</style>

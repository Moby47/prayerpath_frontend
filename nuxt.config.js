import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - Quote',
    title: 'Quote',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    script: [
      {
        src: 'https://cdn.onesignal.com/sdks/OneSignalSDK.js',
        async: true
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href:'https://fonts.googleapis.com/css?family=Poppins:300,400&display=swap'},
      { rel: 'stylesheet', href:'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css'},
      { rel: 'stylesheet', href:'https://cdn.jsdelivr.net/gh/shakrmedia/tuesday@v1.1.0/build/tuesday.min.css'},
    ]
  },

  /** Customize the progress-bar color
  */
  loading: { 
    color: '#1b5868',
    height: '5px',
    throttle: 0,
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/custom.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/dotenv',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/onesignal',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/cloudinary',
  ],

  // Options
oneSignal: {
  init: {
    appId: '1d73fcce-b49c-4e97-ad4a-b8d5c516797d',
    allowLocalhostAsSecureOrigin: true,
    persistNotification: false,
    welcomeNotification: {
      "title": "Quote App",
      "message": "Thanks for subscribing.",
      // "url": "" /* Leave commented for the notification to not open a window on Chrome and Firefox (on Safari, it opens to your webpage) */
    },
    promptOptions: {
      /* These prompt options values configure both the HTTP prompt and the HTTP popup. */
      /* actionMessage limited to 90 characters */
      actionMessage: "Keep your prayer life updated",
      /* acceptButtonText limited to 15 characters */
      acceptButtonText: "Ok",
      /* cancelButtonText limited to 15 characters */
      cancelButtonText: "Cancel"
      },
  }
},


  cloudinary: {
    // Cloudinary configuration options
    cloudName: 'ddvotdlwm',
    apiKey: '733671229438548',
    apiSecret: 'l_5eL-VRYweL5CluEaEZfilZJz4',
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    meta:{
      author: 'Henry Onyemaobi',
    },
    manifest: {
      lang: 'en',
      name: "Quote",
      short_name: "Quote",
      orientation: "portrait-primary",
      background_color: "#f6f6f6",
      theme_color: "#ffffff",
      description: "The app that helps you keep your prayer life organized",
      dir: "ltr",
    },
    icon: {
      fileName: 'logo.png',
      sizes: [64, 120, 144, 152, 192, 384, 512],
      purpose: 'any'
    },
  
  },

 
  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: null,
  },

  //for page transition
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
}

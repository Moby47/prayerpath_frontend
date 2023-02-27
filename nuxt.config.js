import colors from 'vuetify/es5/util/colors'

//import './bin/reminder.js'
//import './bin/populate.js'


export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s',
    title: 'PrayerPath',
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
      },
      {
        src: '/ui/js/lib/jquery-3.4.1.min.js'
      },
      {
        src: '/ui/js/lib/popper.min.js'
      },
      {
        src: '/ui/js/lib/bootstrap.min.js'
      },
      {
        src: '/ui/js/plugins/jquery-circle-progress/circle-progress.min.js'
      },
      {
        src: '/ui/js/base.js'
      },
    ],
    link: [
      {
        rel: 'stylesheet',
        href: '/ui/css/style.css'
      },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {rel: "apple-touch-startup-image", media: "screen and (device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)", href: "/ios_splash_screens/iPhone_14_Pro_Max_landscape.png"},
{rel: "apple-touch-startup-image", media: "screen and (device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)", href: "/ios_splash_screens/iPhone_14_Pro_landscape.png"},
{rel: "apple-touch-startup-image", media: "screen and (device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)", href: "/ios_splash_screens/iPhone_14_Plus__iPhone_13_Pro_Max__iPhone_12_Pro_Max_landscape.png"},
{rel: "apple-touch-startup-image", media: "screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)", href: "/ios_splash_screens/iPhone_14__iPhone_13_Pro__iPhone_13__iPhone_12_Pro__iPhone_12_landscape.png"},
{rel: "apple-touch-startup-image", media: "screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)", href: "/ios_splash_screens/iPhone_13_mini__iPhone_12_mini__iPhone_11_Pro__iPhone_XS__iPhone_X_landscape.png"},
{rel: "apple-touch-startup-image", media: "screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)", href: "/ios_splash_screens/iPhone_11_Pro_Max__iPhone_XS_Max_landscape.png"},
{rel: "apple-touch-startup-image", media: "screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)", href: "/ios_splash_screens/iPhone_11__iPhone_XR_landscape.png"},
{rel: "apple-touch-startup-image", media: "screen and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)", href: "/ios_splash_screens/iPhone_8_Plus__iPhone_7_Plus__iPhone_6s_Plus__iPhone_6_Plus_landscape.png"},
{rel: "apple-touch-startup-image", media: "screen and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)", href: "/ios_splash_screens/iPhone_8__iPhone_7__iPhone_6s__iPhone_6__4.7__iPhone_SE_landscape.png"},
{rel: "apple-touch-startup-image", media: "screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)", href: "/ios_splash_screens/4__iPhone_SE__iPod_touch_5th_generation_and_later_landscape.png"},
{rel: "apple-touch-startup-image", media: "screen and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)", href: "/ios_splash_screens/12.9__iPad_Pro_landscape.png"},
{rel: "apple-touch-startup-image", media: "screen and (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)", href: "/ios_splash_screens/11__iPad_Pro__10.5__iPad_Pro_landscape.png"},
{rel: "apple-touch-startup-image", media: "screen and (device-width: 820px) and (device-height: 1180px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)", href: "/ios_splash_screens/10.9__iPad_Air_landscape.png"},
{rel: "apple-touch-startup-image", media: "screen and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)", href: "/ios_splash_screens/10.5__iPad_Air_landscape.png"},
{rel: "apple-touch-startup-image", media: "screen and (device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)", href: "/ios_splash_screens/10.2__iPad_landscape.png"},
{rel: "apple-touch-startup-image", media: "screen and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)", href: "/ios_splash_screens/9.7__iPad_Pro__7.9__iPad_mini__9.7__iPad_Air__9.7__iPad_landscape.png"},
{rel: "apple-touch-startup-image", media: "screen and (device-width: 744px) and (device-height: 1133px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)", href: "/ios_splash_screens/8.3__iPad_Mini_landscape.png"},
{rel: "apple-touch-startup-image", media: "screen and (device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)", href: "/ios_splash_screens/iPhone_14_Pro_Max_portrait.png"},
{rel: "apple-touch-startup-image", media: "screen and (device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)", href: "/ios_splash_screens/iPhone_14_Pro_portrait.png"},
{rel: "apple-touch-startup-image", media: "screen and (device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)", href: "/ios_splash_screens/iPhone_14_Plus__iPhone_13_Pro_Max__iPhone_12_Pro_Max_portrait.png"},
{rel: "apple-touch-startup-image", media: "screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)", href: "/ios_splash_screens/iPhone_14__iPhone_13_Pro__iPhone_13__iPhone_12_Pro__iPhone_12_portrait.png"},
{rel: "apple-touch-startup-image", media: "screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)", href: "/ios_splash_screens/iPhone_13_mini__iPhone_12_mini__iPhone_11_Pro__iPhone_XS__iPhone_X_portrait.png"},
{rel: "apple-touch-startup-image", media: "screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)", href: "/ios_splash_screens/iPhone_11_Pro_Max__iPhone_XS_Max_portrait.png"},
{rel: "apple-touch-startup-image", media: "screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)", href: "/ios_splash_screens/iPhone_11__iPhone_XR_portrait.png"},
{rel: "apple-touch-startup-image", media: "screen and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)", href: "/ios_splash_screens/iPhone_8_Plus__iPhone_7_Plus__iPhone_6s_Plus__iPhone_6_Plus_portrait.png"},
{rel: "apple-touch-startup-image", media: "screen and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)", href: "/ios_splash_screens/iPhone_8__iPhone_7__iPhone_6s__iPhone_6__4.7__iPhone_SE_portrait.png"},
{rel: "apple-touch-startup-image", media: "screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)", href: "/ios_splash_screens/4__iPhone_SE__iPod_touch_5th_generation_and_later_portrait.png"},
{rel: "apple-touch-startup-image", media: "screen and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)", href: "/ios_splash_screens/12.9__iPad_Pro_portrait.png"},
{rel: "apple-touch-startup-image", media: "screen and (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)", href: "/ios_splash_screens/11__iPad_Pro__10.5__iPad_Pro_portrait.png"},
{rel: "apple-touch-startup-image", media: "screen and (device-width: 820px) and (device-height: 1180px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)", href: "/ios_splash_screens/10.9__iPad_Air_portrait.png"},
{rel: "apple-touch-startup-image", media: "screen and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)", href: "/ios_splash_screens/10.5__iPad_Air_portrait.png"},
{rel: "apple-touch-startup-image", media: "screen and (device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)", href: "/ios_splash_screens/10.2__iPad_portrait.png"},
{rel: "apple-touch-startup-image", media: "screen and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)", href:  "/ios_splash_screens/9.7__iPad_Pro__7.9__iPad_mini__9.7__iPad_Air__9.7__iPad_portrait.png"},
{rel: "apple-touch-startup-image", media: "screen and (device-width: 744px) and (device-height: 1133px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)", href: "/ios_splash_screens/8.3__iPad_Mini_portrait.png"}
  
    ]
  },

  /** Customize the progress-bar color
  */
  loading: { 
    color: '#000',
    height: '5px',
    throttle: 0,
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    //'@/assets/css/custom.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
   // '~/plugins/disqus',
   { src: '~/plugins/scrollToTop.js', mode: 'client' },
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
    'vue-social-sharing/nuxt',
  ],

  // Options
oneSignal: {
  init: {
    appId: process.env.ONESIGNAL_APP_ID,
    allowLocalhostAsSecureOrigin: true,
    persistNotification: false,
    welcomeNotification: {
      "title": "PrayerPath",
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
    cloudName: process.env.CLOUDINARY_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
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
      name: "PrayerPath",
      short_name: "PrayerPath",
      orientation: "portrait-primary",
      background_color: "#ffffff",
      theme_color: "#ffffff",
      description: "Get daily inspiration from the Bible with Quote God & Pray. Find randomly generated quotes about God's promises and prayers to help you stay focused on your faith.",
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


  
    publicRuntimeConfig: {
      BACKEND_APP_URL: process.env.BACKEND_APP_URL,

      APP_URL: process.env.APP_URL,

      BACKEND_API_KEY: process.env.BACKEND_API_KEY,

      OPENAI_API_KEY: process.env.OPENAI_API_KEY,

      ONESIGNAL_BASIC_KEY: process.env.ONESIGNAL_BASIC_KEY,
      ONESIGNAL_APP_ID: process.env.ONESIGNAL_APP_ID,
    },
  
}

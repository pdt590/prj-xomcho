const pkg = require('./package')

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Montserrat'}
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#000000', height: '4px', duration: 5000 },

  /*
  ** Global CSS
  */
  css: [
    'iview/dist/styles/iview.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/iview.js', ssr: true },
    { src: '~/plugins/breakpoints.js'},
    { src: '~/plugins/core-components.js'},
    { src: '~/plugins/date-filter.js'}
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios'
  ],
  axios: {
    baseURL: process.env.BASE_URL || "https://nuxt-blog-12734.firebaseio.com",
    credentials: false
  },

  /*
  ** Global env setting
  */
  env: {
    baseUrl: process.env.BASE_URL || "https://nuxt-blog-12734.firebaseio.com",
    fbAPIKey: 'AIzaSyC55Vd-gUnnC5VP9wlOzWBgUc61JvVBmCM'
  },

  /*
  ** Add middleware for all routes
  */
  // router: {
  //   middleware: ['check-auth', 'auth']
  // },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** Add a module/file inside the vendor bundle
    */
    vendor: [
      'js-cookie',
      '~/plugins/iview.js',
      '~/plugins/breakpoints.js',
      '~/plugins/core-components.js',
      '~/plugins/date-filter.js'
    ],

    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {

    }
  }
}

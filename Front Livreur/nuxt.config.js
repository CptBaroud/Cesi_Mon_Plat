export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - Livreur',
    title: 'Livreur',
    htmlAttrs: {
      lang: 'fr'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  router: {
  },

  env: {
    api_url: 'http://localhost:3000',
    client_url: 'http://127.0.0.4:8000'
  },

  server: {
    port: 8000, // par défaut: 3000,
    host: '127.0.0.4'
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/vueQR.js' },
    { src: '~/plugins/vueGmap.js' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/auth
    '@nuxtjs/auth',
    // https://nuxt-socket-io.netlify.app/
    'nuxt-socket-io',
    'vue-toastification/nuxt'
  ],

  // Socket configuration
  io: {
    // module options
    sockets: [
      {
        name: 'main',
        url: 'http://localhost:3000/',
        default: true
      }
    ]
  },

  /*
  ** Auth module configuration
  ** See https://axios.nuxtjs.org/options
  */
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/auth/?origin=delivery', method: 'post', propertyName: 'token' },
          logout: { url: '/auth/', method: 'delete' },
          user: { url: '/users/getUser', method: 'get', propertyName: 'user' }
        },
        tokenRequired: true,
        tokenType: 'Bearer'
      }
    },
    redirect: {
      login: '/login',
      logout: '/login',
      user: '/profile',
      callback: '/login',
      home: '/'
    }
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'http://localhost:3000'
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      options: {
        customProperties: true
      },
      dark: false,
      themes: {
        dark: {
          background: '#171614',
          secondary: '#151412',
          primary: '#F26419',
          accent: '#F6AE2D',
          info: '#33658A',
          warning: '#F48923',
          error: '#D64045',
          success: '#78BC61',
          textLight: '#FCFCFD',
          textDark: '#090A0B'
        },
        light: {
          background: '#E9ECEF',
          secondary: '#F8F9FA',
          primary: '#F26419',
          accent: '#F6AE2D',
          info: '#33658A',
          warning: '#F48923',
          error: '#D64045',
          success: '#78BC61',
          textLight: '#FCFCFD',
          textDark: '#090A0B'
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^vue2-google-maps($|\/)/]
  }
}

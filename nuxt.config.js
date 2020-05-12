module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://unpkg.com/purecss@1.0.1/build/grids-responsive-min.css' },
      { rel: 'stylesheet', href: 'https://unpkg.com/purecss@1.0.1/build/pure-min.css' }
    ],
    script: [
      { src: 'https://webapi.amap.com/maps?v=1.4.15&key=8d3bcf0bbcafd02bcd12506fdb566ac0' }
    ]
  },
  // router: {
  //   middleware: 'koaBody'
  // },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#00FFCC', height: '3px' },
  /*
  ** Global CSS
  */
  css: [
    'view-design/dist/styles/iview.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '@/plugins/iview', ssr: true },
    { src: '@/plugins/masonry', ssr: false },
    { src: '@/plugins/lazyload', ssr: false }
  ],
  /*
** Nuxt.js dev-modules
*/
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** Build configuration
  */
  build: {
    transpile: [/^element-ui/]
    /*
    ** You can extend webpack config here
    */
    // extend (config, ctx) {
    //   config.node = {
    //     fs: 'empty'
    //   }
    // }
  }
}

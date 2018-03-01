module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'blogyyz',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
  },
  plugins: [
    { src: '~/plugins/filters.js' },
    { src: '~/plugins/swiper.js', ssr: false },
    { src: '~/plugins/vue-loading.js' },
    { src: '~/plugins/vue-empty.js' },
    { src: '~/plugins/element-ui.js' }
  ],
  head: {
    title: 'icoding',
    titleTemplate: '%s ',
    htmlAttrs: {
      xmlns: 'http://www.w3.org/1999/xhtml',
      // manifest: 'surmon.me',
      lang: 'zh'
    },
    meta: [
      { charset: 'utf-8' },
      { 'http-equiv': 'cleartype', content: 'on' },
      { name: 'author', content: 'surmon@foxmail.com' },
      { name: 'MobileOptimized', content: '320' },
      { name: 'HandheldFriendly', content: 'True' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, user-scalable=no' },
      { hid: 'keywords', name: 'keywords', content: 'surmon,天随,金角大王,Vue教程,前端技术开发,javascript技术' },
      { hid: 'description', name: 'description', content: '凡心所向 素履所往 生如逆旅 一苇以航' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'author', type: 'text/plain', href: '/humans.txt' }
    ],
    script: [
      {
        // async: 'async',
        // defer: 'defer',
        // type: 'text/javascript',
        // src: '/scripts/clmtrackr.js'
        // innerHTML: ``
      }
    ],
    // __dangerouslyDisableSanitizers: ['script'],
    noscript: [
      { innerHTML: 'This website requires JavaScript.' }
    ]
  },
  css: [
    'swiper/dist/css/swiper.css',
    'highlight.js/styles/ocean.css',
    { src: '~assets/sass/app.scss', lang: 'sass' },
    'element-ui/lib/theme-chalk/index.css'
  ]
}

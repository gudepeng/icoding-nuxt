const axios = require('axios');

module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: 'icoding',
    titleTemplate: '%s ',
    htmlAttrs: {
      xmlns: 'http://www.w3.org/1999/xhtml',
      // manifest: 'surmon.me',
      lang: 'zh'
    },
    meta: [
      {charset: 'utf-8'},
      {'http-equiv': 'cleartype', content: 'on'},
      {name: 'baidu-site-verification', content: 'YuNKtUPquo'},
      {name: 'author', content: 'gudepeng@qq.com'},
      {name: 'MobileOptimized', content: '320'},
      {name: 'HandheldFriendly', content: 'True'},
      {name: 'apple-mobile-web-app-capable', content: 'yes'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1.0, user-scalable=no'},
      {hid: 'keywords', name: 'keywords', content: '我叫金角大王'},
      {hid: 'description', name: 'description', content: '我叫金角大王'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      {rel: 'author', type: 'text/plain', href: '/humans.txt'}
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
      {innerHTML: 'This website requires JavaScript.'}
    ]
  },
  /*
   ** Customize the progress bar color
   */
  loading: {color: '#3B8070'},
  /*
   ** Build configuration
   */
  build: {
  },
  plugins: [
    {src: '~/plugins/filters.js'},
    {src: '~/plugins/vue-loading.js'},
    {src: '~/plugins/vue-empty.js'},
    {src: '~/plugins/element-ui.js'}
  ],
  css: [
    'highlight.js/styles/ocean.css',
    {src: '~assets/sass/app.scss', lang: 'sass'},
    'element-ui/lib/theme-chalk/index.css'
  ],
  generate: {
    routes: function () {
      return axios.get('http://www.5icoding.top/api/article', {currentPage: 1, pageNumber: 10000})
        .then(res => {
          return res.data.result.data.map((article) => {
            return '/article/' + article.articleId
          })
        })
    }
  }
}

<template>
  <div class="index">
    <carrousel :article="article"></carrousel>
    <announcement :announcement="announcement" @clicktype="clickTypeArticle"></announcement>
    <article-list :article="article" @loadmore="loadmoreArticle"></article-list>
  </div>
</template>

<script>
  import Service from '~/plugins/axios'
  import Carrousel from '~/components/article/archive/carrousel'
  import announcement from '~/components/article/archive/announcement'
  import ArticleList from '~/components/article/archive/list'

  export default {
    name: 'index',
    fetch ({store}) {
      return Promise.all([
        store.dispatch('loadArticles'),
        store.dispatch('loadAnnouncements')
      ])
    },
    data() {
      return {
        ctype: null
      }
    },
    components: {
      Carrousel, announcement, ArticleList
    },
    computed: {
      article() {
        return this.$store.state.article.list
      },
      announcement() {
        return this.$store.state.announcement
      },
      nextPageParams() {
        return {
          currentPage: this.article.data.page.currentPage + 1,
          sortId: this.ctype
        }
      }
    },
    methods: {
      loadmoreArticle() {
        this.$store.dispatch('loadArticles', this.nextPageParams)
      },
      clickTypeArticle(data) {
        this.ctype = data
        this.$store.dispatch('loadArticles', {currentPage: 1, sortId: data})
      }
    }
  }
</script>

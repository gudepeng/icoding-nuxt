<template>
  <div class="indexmain">
    <div>
      <carrousel :article="article"></carrousel>
      <announcement :announcement="announcement" @clicktype="clickTypeArticle"></announcement>
      <article-list :article="article" @loadmore="loadmoreArticle"></article-list>
    </div>
    <transition name="aside">
      <keep-alive>
        <aside-view v-if="!mobileLayout"></aside-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
  import Service from '~/plugins/axios'
  import Carrousel from '~/components/article/archive/carrousel'
  import announcement from '~/components/article/archive/announcement'
  import ArticleList from '~/components/article/archive/list'
  import AsideView from '~/components/layout/aside.vue'

  export default {
    name: 'index',
    fetch ({store}) {
      return Promise.all([])
    },
    data() {
      return {
        ctype: null
      }
    },
    components: {
      Carrousel, announcement, ArticleList, AsideView
    },
    mounted: function () {
      this.$store.dispatch('loadArticles')
      this.$store.dispatch('loadHotArticles')
    },
    computed: {
      article()
      {
        return this.$store.state.article.list
      }
      ,
      announcement()
      {
        return this.$store.state.announcement
      }
      ,
      nextPageParams()
      {
        return {
          currentPage: this.article.data.page.currentPage + 1,
          sortId: this.ctype
        }
      }
      ,
      mobileLayout()
      {
        return this.$store.state.option.mobileLayout
      }
      ,
    }
    ,
    methods: {
      loadmoreArticle()
      {
        this.$store.dispatch('loadArticles', this.nextPageParams)
      }
      ,
      clickTypeArticle(data)
      {
        this.ctype = data
        this.$store.dispatch('loadArticles', {currentPage: 1, sortId: data})
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "~assets/sass/mixins";
  @import "~assets/sass/variables";

  .indexmain {
    width: 100%;
    & > div {
      width: 55em;
      float: left;
    }
  }
</style>

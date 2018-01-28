<template>
  <div class="article">
    <div class="tab">
      <a href="javascript:;">
        <div>我的博客</div>
      </a>
      <a href="javascript:;">
        <div>我的喜欢</div>
      </a>
    </div>
    <div class="article_list">
      <div v-for="(item,index) in articles.data.data" :key="index">
        <div class="title">
          <nuxt-link :to="{name:'article-id', params:{id:item.articleId}}">{{ item.articleTitle }}</nuxt-link>
        </div>
        <div class="time">
          {{item.articleTime | formatDate('yyyy-MM-dd')}}
        </div>
      </div>
    </div>
    <!-- 加载更多 -->
    <div class="article-load">
      <button class="btn-loadmore">
        <span>或许有更多</span>
        <span>加载中</span>
        <span>这是底线</span>
      </button>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Admin',
    layout: 'mycenter',
    fetch ({ redirect, store }) {
    },
    async mounted () {
      // 后台无需做ssr, 所以在mounted获取数据
      await this.$store.dispatch('loadArticles', this.page)
    },
    computed: {
      articles () {
        return this.$store.state.article.list
      },
      maxPage () {
        return 1
      },
      page () {
        return  1
      },
      hasMore () {
        return true
      }
    },
    methods: {
      edit (item) {
        this.$router.push({ name: 'publish-id', params: { id: item.articleId } })
      },
      async del (item) {
        await this.$store.dispatch('DEL_ARTICLE', item.date)
        await this.$store.dispatch('LIST_BY_ALL', this.page)
      },
      prevPage () {
        this.$router.push({
          params: {
            page: this.page - 1
          }
        })
      },
      nextPage () {
        this.$router.push({
          params: {
            page: this.page + 1
          }
        })
      }
    }
  }
</script>
<style lang="scss">
  @import '~assets/sass/mixins';
  @import '~assets/sass/variables';

  .article {
    background: #FFFFFF;

    .tab{
      height: 4em;
      display: flex;
      align-items: center;
      margin: 0 auto;
      max-width: 960px;
      white-space: nowrap;;
      & > a{
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        width: 7.5em;
        height: 100%;

        & > div{
          font-size: 1em;
          font-weight: 500;
          color: #31445b;
          cursor: pointer;
        }
      }
    }
    .article_list{
      & > div {
        height: 5em;
        & > .title {
          flex: 1 1 auto;
          min-width: 0;
          font-size: 1.333rem;
          font-weight: 600;
          color: #2e3135;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          float: left;
          height: 100%;
        }
        & > .time {
          float: right;
          height: 100%;
        }
      }
    }
  }
</style>

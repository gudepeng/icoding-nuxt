<template>
  <div class="announcement">
    <div>
      <span @click="$emit('clicktype',null)">推荐</span>
      <span v-for="(articleType, key, index) in articleTypes" @click="$emit('clicktype',key)">{{articleType}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'index-announcement',
    data() {
      return {
        articleTypes: this.$store.state.option.articleType
      }
    },
    props: {
    },
    methods: {
    }
  }
</script>

<style lang="scss">
  @import '~assets/sass/variables';
  @import '~assets/sass/mixins';
  .announcement {
    height: 3.2em;
    line-height: 3.2em;
    font-size: 1.1em;
    margin-bottom: 1em;
    overflow: hidden;
    position: relative;
    background-color: $module-bg;
    span{
      cursor: pointer;
      color: #666666;
      font-family: DINRegular, CenturyGothic;
      padding: 1em;
      &:hover{
        color: #000000;
      }
    }
  }
</style>

<template>
  <div class="announcement">
    <div>
      <span>前端</span>
      <span>后端</span>
      <span>手机端</span>
      <span>人工智能</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'index-announcement',
    data() {
      return {
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
      color: #666666;
      font-family: DINRegular, CenturyGothic;
      padding: 1em;
      &:hover{
        color: #000000;
      }
    }
  }
</style>

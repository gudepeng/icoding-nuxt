<template>
  <div id="app" v-cloak>
    <div id="app-main">
      <canvas class="global-emoji"
              ref="emoji"
              :class="{ active: emoji233333 && emoji233333.kichikuing }">
      </canvas>
      <background v-if="!mobileLayout"></background>
      <header-view v-if="!mobileLayout"></header-view>
      <main id="main" :class="{ 'mobile': mobileLayout, [$route.name]: true }">
        <div id="main-content"
             class="main-content"
             :class="{
               'mobile-layout': mobileLayout,
               [$route.name]: true
              }">
          <keep-alive>
            <nuxt></nuxt>
          </keep-alive>
        </div>
      </main>
      <tool-view v-if="!mobileLayout && !['app', 'music', 'service'].includes($route.name)"></tool-view>
      <footer-view v-if="!mobileLayout"></footer-view>
    </div>
  </div>
</template>

 <script>
 import EventBus from '~/utils/event-bus'
 import consoleSlogan from '~/utils/console-slogan'
 // 引用组件
 import Background from '~/components/layout/background.vue'
 import Header from '~/components/layout/header.vue'
 import Tool from '~/components/layout/tool.vue'

  import Footer from '~/components/layout/footer.vue'
 export default {
   name: 'app',
   head() {
      return !this.mobileLayout ? {} : {
        bodyAttrs: {
          class: 'mobile'
        }
      }
    },
    mounted () {

    },
     computed: {
      openWebrtc() {
        return this.$store.state.option.openWebrtc
      },
      emoji233333() {
        return EventBus.emoji233333
      },
      mobileLayout() {
        return this.$store.state.option.mobileLayout
      },
      mobileSidebar() {
        return this.$store.state.option.mobileSidebar
      }
    },
    components: {
      Background,
      HeaderView: Header,
      ToolView: Tool,
      FooterView: Footer
    }
 }
 </script>

<style lang="scss" scoped>
@import "~assets/sass/mixins";
@import "~assets/sass/variables";
#app {

  #app-main {

    &.open {
      transition: $mobile-aisde-transition;
      transform: translateX(68%);
    }

    > .global-emoji {
      position: fixed;
      z-index: -1;
      top: 0;
      left: 0;

      &.active {
        z-index: 99999;
      }
    }

    main {
      position: relative;

      &.service {
        width: 100%;
      }

      .main-content {
        float: left;
        width: 100%;
        position: relative;
        overflow: hidden;
        @include css3-prefix(transition, width 0.35s);

        &:-moz-full-screen {
          overflow-y: auto;
        }

        &:-webkit-full-screen {
          overflow-y: auto;
        }

        &:fullscreen {
          overflow-y: auto;
        }

        &.mobile-layout {
          width: 100%;
          margin: 0;
          padding: 1rem;
          padding-top: $navbar-height + 1;
        }

        &.service {
          width: 100%;
          margin: -1em 0;

          &.mobile-layout {
            margin: 0;
          }
        }
      }
    }
  }
}
</style>

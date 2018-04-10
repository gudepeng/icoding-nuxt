<template>
  <header class="header">
    <nav class="navbar">
      <div class="navbar-container container">
        <div class="navbar-header">
          <img src="/images/logo.svg" class="navbar-logo">
        </div>
        <div class="navbar-menu">
          <div>
            <span @click="$router.push('/')" class="navbar-slogan">首页</span>
            <span class="navbar-slogan">开源项目</span>
            <span class="navbar-slogan">分享资源</span>
            <span class="navbar-slogan">视频教程</span>
            <span class="navbar-slogan">{{ $store.state.login.authUser }}</span>
          </div>
        </div>
        <div class="navbar-longin">
          <div v-show="userInfo==null">
            <span @click="writearticle" class="navbar-slogan">写文章</span>
            <span class="navbar-slogan">|</span>
            <span class="navbar-slogan" @click="login(0)">登录</span>
            <span class="navbar-slogan">&</span>
            <span class="navbar-slogan" @click="login(1)">注册</span>
          </div>
          <div v-show="userInfo!=null">
            <span @click="$router.push('/publish')" class="navbar-slogan">写文章</span>
            <span class="navbar-slogan">|</span>
            <img @click="$router.push('/mycenter')" src="https://gold-cdn.xitu.io/v3/static/img/default-avatar.e30559a.svg"/>
          </div>
        </div>
      </div>
      <div class="pre-load">

        <img v-if="preload" src="/images/app-hot.png" alt="app-download">
        <img v-if="preload" src="/images/app-logo.png" alt="app-logo">
        <img v-if="preload" src="/images/service.jpg" alt="service">
        <img v-if="preload" src="/images/about-background-be-1.jpg" alt="background">
        <img v-if="preload" src="/images/about-background-be-2.jpg" alt="background">
        <img v-if="preload" src="/images/about-background-star-1.png" alt="background">
        <img v-if="preload" src="/images/about-background-star-2.png" alt="background">
      </div>
    </nav>
    <popup-modal ref="loginmodel" @loginSuccess="insertUserInfo">
    </popup-modal>
  </header>
</template>

<script>
  import EventBus from '~/utils/event-bus'
  import consoleSlogan from '~/utils/console-slogan'
  import PopupModal from './login-modal'

  export default {
    name: 'layout-header',
    data() {
      return {
        userInfo: null,
        preload: false,
      }
    },
    mounted() {
      this.userInfo = localStorage.getItem("userInfo");
    },
    computed:{

    },
    methods: {
      login(data) {
        this.$store.dispatch('SHOWLONGINTYPE', data)
      },
      insertUserInfo() {
          this.userInfo = localStorage.getItem("userInfo");
      },
      writearticle() {
          if(this.userInfo) {
            this.$router.push('/publish')
          }else {
            this.$store.dispatch('SHOWLONGINTYPE', 0)
          }
      }
    },
    components: {
      PopupModal
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/sass/mixins';
  @import '~assets/sass/variables';

  .header {

    .navbar {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: $header-height;
      background-color: $module-bg;
      z-index: 999;
      box-shadow: 0 1px 3px 0 rgba(0, 34, 77, .1);

      .navbar-container {
        height: $header-height;
        display: flex;
        //justify-content: space-between;

        .navbar-header {
          height: $header-height;
          display: flex;
          position: relative;
          align-items: center;
          padding-left: .5em;
          justify-content: space-between;

          .navbar-logo {
            width: 10em;
          }

          .navbar-link {
            position: absolute;
            width: 100%;
            height: 100%;
          }
        }
        .navbar-menu {
          flex: 1;
          align-items: center;
          display: flex;
          position: relative;
          padding-left: 3em;

          .navbar-slogan {
            color: $primary;
            font-family: DINRegular, CenturyGothic;
            padding: 1em;
            &:hover {
              color: #000000;
            }
          }
        }
        .navbar-longin {
          align-items: center;
          display: flex;
          position: relative;
          padding-left: 3em;

          .navbar-slogan {
            padding: 0.3em;
            color: $primary;
            &:hover {
              color: #000000;
            }
          }
          img {
            margin-left: .3em;
            border-radius: 50%;
          }
        }
      }
      > .pre-load {
        visibility: hidden;
        width: 0;
        height: 0;
        opacity: 0;
      }
    }
  }
</style>

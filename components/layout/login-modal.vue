<template>
  <transition name="fade">
    <div class="modal" v-show="showType">
      <article>
        <header>
          <i class="iconfont icon-cross" @click="tagclose"></i>
        </header>
        <div class="section">
          <input type="text" v-model="loginform.username" placeholder="请输入账号"/>
          <input type="password" v-model="loginform.password" placeholder="请输入密码"/>
        </div>
        <footer>
          <button @click="login('icoding')">登录</button>
          <button @click="login('qq')">QQ登录</button>
          <button @click="login('github')">github登录</button>
        </footer>
      </article>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  import Service from '~/plugins/axios'

  export default {
    name: 'popup-modal',
    components: {},
    props: {
    },

    data() {
      return {
        showType:false,
        loginform: {
          username: null,
          password: null
        }
      }
    },
    watch: {
      'data.show': function (val) {
        if (val) {
          document.body.appendChild(this.$el);
        } else {
          document.body.removeChild(this.$el);
        }
      }
    },
    mounted() {

    },
    methods: {
      loginSuccess(){
          this.tagclose()
          //this.$emit("loginSuccess")
      },
      tagclose() {
        this.showType = !this.showType
      },
      login(type){
        switch (type) {
          case 'icoding':
            this.$store.dispatch('loginicoding', this.loginform,this.loginSuccess())
            break
          case 'qq':
            break
          case 'github':
            break
        }
      }
    }

  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '~assets/sass/variables';
  @import '~assets/sass/mixins';

  .fade-enter-active, .fade-leave-active {
    transition: all .5s ease;

  }

  .fade-enter-to, .fade-leave {
    opacity: 1;

  }

  .fade-enter, .fade-leave-to {
    opacity: 0;

  }

  .modal {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    vertical-align: center;
    background-color: rgba(0, 0, 0, .3);

    & > article {
      width: 30em;
      box-shadow: 0 0 36px rgba(0, 0, 0, .5);
      position: relative;
      top: 90px;
      margin: 0 auto;
      font-size: 14px;
      color: #666;
      // margin-top: -220px;
      z-index: 2;

      background-color: #fff;
      & > header {
        font-size: 16px;
        padding: 15px 10px 15px 20px;
        font-weight: bold;
        color: #333;
        & > .iconfont {
          color: #8590a6;
          display: block;
          width: 24px;
          height: 24px;
          font-size: 1em;
          float: right;
          &:hover {
            background-color: #e7e7e7;
            cursor: pointer;
          }
        }
      }
      & > .section {
        input[type="text"], input[type="password"] {
          outline: none;
          border: solid 1px #ccc;
          padding: 5px;
          width: 100%;
          &:focus {
            border: solid 1px #009688;
          }
        }
      }
      & > footer {
        padding: 20px;
        text-align: right;
        button {
          margin-left: 6px;
        }
      }
    }
    &.delInfo {
      header i.icon {
        display: inline;
        color: #e67e22;
        font-size: 20px;
      }
      section {
        padding: 10px 20px 10px 50px;
        span {
          color: #e67e22;
        }
      }
    }
  }
</style>

<template>
  <transition name="fade">
    <div class="modal" v-show="data.show">
      <article :style="{width:data.width + 'px'}">
        <header>
          <i class="fa close" @click="close"></i>
          <slot name="title"></slot>
        </header>
        <slot name="section"></slot>
        <footer>
        </footer>
      </article>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  export default {
    name: 'popup-modal',
    components: {},
    props: {
      data: {
        type: Object,
        default: {
          show: false,
          width: 620
        }
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },

    data() {
      return {}
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
      close() {
        this.data.show = false
      },
    }

  }
</script>

<style lang="scss" rel="stylesheet/scss">
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
        i.close {
          display: block;
          width: 24px;
          height: 24px;
          float: right;
          &:hover {
            background-color: #e7e7e7;
            cursor: pointer;
          }
        }
      }
      & > section {
        font-size: 14px;
        color: #666;
        &.tagInfoUl {
          box-sizing: inherit;
          max-height: 400px;
          overflow-x: hidden;
          overflow-y: auto;
          background-color: #f5f5f5;
          border-top: solid 1px #e7e7e7;
          border-bottom: solid 1px #e7e7e7;

          &::-webkit-scrollbar-thumb {
            background-color: rgba(0, 0, 0, .2);
          }
          padding: 21px;
          ul {
            display: block;
            & > li {
              .f16 {
                font-size: 16px;
              }
              margin-bottom: 8px;
              padding-left: 100px;
              label {
                display: block;
                float: left;
                margin-left: -100px;
                width: 95px;
                text-align: right;
              }
              ol > li {
                margin-top: 8px;
              }
            }
          }

        }
        &.createInfoUl {
          max-height: 320px;
          overflow-x: hidden;
          overflow-y: auto;
          padding: 20px;
          ul {
            & > li {
              i {
                display: inline;
              }
              .f16 {
                font-size: 16px;
              }
              margin-bottom: 8px;
              padding-left: 100px;
              label.th {
                display: block;
                float: left;
                margin-left: -100px;
                width: 90px;
                text-align: right;
                line-height: 28px;
                span {
                  color: red;
                }
              }

              input[type="text"], input[type="datetime"], textarea {
                outline: none;
                border: solid 1px #ccc;
                padding: 5px;
                width: 100%;
                &:focus {
                  border: solid 1px #009688;
                }
              }
              .check {
                display: inline-block;
                height: 20px;
                margin-bottom: 12px;
                user-select: none;
                text-align: left;
                line-height: 28px;
                cursor: pointer;
                vertical-align: middle;
                .mc-uiCheckbox {
                  vertical-align: middle;
                  display: inline-block;
                  margin-right: 3px;
                }
              }
              .timeData {
                position: relative;
                & > input {
                  width: 100%;
                  padding: 7px;

                }
                i {
                  position: absolute;
                  top: 8px;
                  right: 10px;
                  float: right;
                  color: #999;
                  display: block;
                }
              }
              p {
                &.error {
                  color: red;
                }
                color: #999;
                display: block;
                padding: 5px 0;
                height: 24px;
                em {
                  float: right;
                  font-style: inherit
                }
              }

            }
          }
        }
        &.publishInfoUl {
          padding: 20px;
          ul {
            & > li {
              i {
                display: inline;
              }
              .f16 {
                font-size: 16px;
              }
              margin-bottom: 8px;
              padding-left: 100px;
              label.th {
                display: block;
                float: left;
                margin-left: -100px;
                width: 90px;
                text-align: right;
                line-height: 28px;
                span {
                  color: red;
                }
              }
              label.check {
                padding-top: 4px;
                cursor: pointer;
                display: inline-block;
                user-select: none;
                vertical-align: middle;
                margin-bottom: 12px;
                .mc-uiCheckbox {
                  vertical-align: middle;
                  display: inline-block;
                  margin-right: 3px;
                }
                span {
                  vertical-align: middle;
                }
              }
              label.super {
                padding-top: 10px;
                cursor: pointer;
                margin-bottom: 10px;
                vertical-align: middle;
                i {
                  display: inline;
                  vertical-align: middle;
                }
              }
              .superBox {
                &:after, &:before {
                  content: '';
                  display: block;
                  clear: both;
                  height: 1px;
                  overflow: hidden;
                }
                label {
                  cursor: pointer;
                  margin-top: 10px;
                  display: block;

                  margin-right: 10px;
                }
                .mc-uiRadio {
                  float: left;
                  margin-right: 6px;
                  vertical-align: middle;
                  text-align: center;
                }
              }
              .clbox {
                &:after {
                  content: '';
                  display: block;
                  clear: both;
                  height: 1;
                  overflow: hidden;
                  margin-bottom: 10px;
                }
                .date-box {
                  &.fl {
                    float: left;
                  }
                  &.fr {
                    float: right;
                  }
                  position: relative;
                  width: 48%;
                  display: inline-block;
                  input {
                    padding: 6px;
                    width: 100%;
                    outline: none;
                    border: solid 1px #ccc;
                    &:focus {
                      border: solid 1px #009688;
                    }
                  }
                  i {
                    position: absolute;
                    display: block;
                    float: right;
                    top: 0px;
                    right: 10px;
                    font-size: 14px;
                    color: #666;
                    border-left: solid 1px #ccc;
                    padding-left: 10px;
                    height: 100%;
                    line-height: 30px;
                  }
                }
              }
              input[type="text"], input[type="datetime"], textarea {
                outline: none;
                border: solid 1px #ccc;
                padding: 5px;
                width: 100%;
                &:focus {
                  border: solid 1px #009688;
                }
              }

              .timeData {
                position: relative;
                & > input {
                  width: 100%;
                  padding: 7px;
                }
                i {
                  position: absolute;
                  top: 8px;
                  right: 10px;
                  float: right;
                  color: #999;
                  display: block;
                }
              }
              p {
                color: #999;
                display: block;
                padding: 5px 0;
                height: 24px;
                em {
                  float: right;
                  font-style: inherit
                }
              }

            }
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

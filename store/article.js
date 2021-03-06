/*
 *
 * 文章数据状态
 *
 */

export const state = () => {
  return {
    hot: {
      fetching: false,
      data: []
    },
    list: {
      fetching: false,
      data: {
        page: {
          currentPage: 0
        },
        data: []
      }
    },
    detail: {
      fetching: false,
      data: {}
    },
    publish: {
      posting: false,
      data: {}
    },
    self: {
      fetching: false,
      data: {
        page: {
          currentPage: 0
        },
        data: []
      }
    },
    selflike: {
      fetching: false,
      data: {
        page: {
          currentPage: 0
        },
        data: []
      }
    }
  }
}
export const mutations = {
  // List
  CLEAR_LIST(state) {
    state.list.data = {
      page: {
        currentPage: 0
      },
      data: []
    }
  },
  REQUEST_LIST(state) {
    state.list.fetching = true
  },
  GET_LIST_FAILURE(state) {
    state.list.fetching = false
  },
  GET_LIST_SUCCESS(state, action) {
    state.list.fetching = false
    state.list.data = action.result
  },
  ADD_LIST_SUCCESS(state, action) {
    state.list.fetching = false
    state.list.data.data.push.apply(state.list.data.data, action.result.data)
    state.list.data.page = action.result.page
  },
  // Hot
  REQUEST_HOT_LIST(state) {
    state.hot.fetching = true
  },
  GET_HOT_LIST_FAILURE(state) {
    state.hot.fetching = false
  },
  GET_HOT_LIST_SUCCESS(state, action){
    state.hot.fetching = false
    state.hot.data = action.result
  },
  // Self
  REQUEST_SELF_LIST(state) {
    state.self.fetching = true
  },
  GET_SELF_LIST_FAILURE(state) {
    state.self.fetching = false
  },
  GET_SELF_LIST_SUCCESS(state, action){
    state.self.fetching = false
    state.self.data = action.result
  },
  // SelfLike
  REQUEST_SELFLIKE_LIST(state) {
    state.selflike.fetching = true
  },
  GET_SELFLIKE_LIST_FAILURE(state) {
    state.selflike.fetching = false
  },
  GET_SELFLIKE_LIST_SUCCESS(state, action){
    state.selflike.fetching = false
    state.selflike.data = action.result
  },
  // Detail
  CLEAR_DETAIL(state) {
    state.detail.data = {}
  },
  REQUEST_DETAIL(state) {
    state.detail.fetching = true
  },
  GET_DETAIL_FAILURE(state) {
    state.detail.fetching = false
    state.detail.data = {}
  },
  GET_DETAIL_SUCCESS(state, action) {
    state.detail.fetching = false
    state.detail.data = action.result
  },
  // 喜欢某篇文章
  LIKE_ARTICLE(state, action) {
    state.list.data.data[action.keyindex].likeId = action.userid
    state.list.data.data[action.keyindex].articleLike = state.list.data.data[action.keyindex].articleLike + 1
  },
  UNLIKE_ARTICLE(state, action) {
    state.list.data.data[action.keyindex].likeId = null
    state.list.data.data[action.keyindex].articleLike = state.list.data.data[action.keyindex].articleLike - 1
  },
  //保存文章
  PUBLISH_ARTICLE_FAILURE(state) {
    state.publish.posting = false
    state.detail.data = {}
  },
  PUBLISH_ARTICLE_SUCCESS(state, action) {
    state.publish.posting = false
    state.publish.data = action
  },
  PUBLISH_ARTICLE(state){
    state.publish.posting = true
  }
}

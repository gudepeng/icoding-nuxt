/*
 *
 * 根数据状态 存放全局数据和异步方法
 *
 */

import Service from '~/plugins/axios'
export const actions = {

  // 全局服务初始化
  nuxtServerInit(store, {params, route, isServer, req}) {
    const initAppData = []
    return Promise.all(initAppData)
  },
  // 获取博主资料
  loadAdminInfo({commit}) {
    return Service.get('/user/me')
      .then(response => {
        console.log(response.status + "     " + response.data + "     " + response.data.status)
        const success = !!response.status && response.data && Object.is(response.data.status, 0)
        console.log("success:" + success + "      " + response.data)
        if (success) commit('login/SET_USER', response.data.result)
      }, err => {
      })
  },
  // 获取全局配置
  loadGlobalOption({commit}) {
    commit('option/REQUEST_GLOBAL_OPTIONS')
    return Service.get('/option')
      .then(response => {
        const success = !!response.status && response.data && Object.is(response.data.code, 1)
        if (success) commit('option/REQUEST_GLOBAL_OPTIONS_SUCCESS', response.data)
        if (!success) commit('option/REQUEST_GLOBAL_OPTIONS_FAILURE')
      }, err => {
        commit('option/REQUEST_GLOBAL_OPTIONS_FAILURE', err)
      })
  },

  // 获取标签列表
  loadTagList({commit}, params = {per_page: 160}) {
    commit('tag/REQUEST_LIST')
    return Service.get('/tag', {params})
      .then(response => {
        const success = !!response.status && response.data && Object.is(response.data.code, 1)
        if (success) commit('tag/GET_LIST_SUCCESS', response.data)
        if (!success) commit('tag/GET_LIST_FAILURE')
      })
      .catch(err => {
        commit('tag/GET_LIST_FAILURE', err)
      })
  },
  // 获取分类列表
  loadCategories({commit}, params = {per_page: 100}) {
    commit('category/REQUEST_LIST')
    return Service.get('/category', {params})
      .then(response => {
        const success = !!response.status && response.data && Object.is(response.data.code, 1)
        if (success) commit('category/GET_LIST_SUCCESS', response.data)
        if (!success) commit('category/GET_LIST_FAILURE')
      })
      .catch(err => {
        commit('category/GET_LIST_FAILURE', err)
      })
  },
  // 获取最热文章列表
  loadHotArticles({commit}) {
    commit('article/REQUEST_HOT_LIST')
    return Service.get('/article/hot')
      .then(response => {
        const success = !!response.status && response.data && Object.is(response.data.status, 0)
        if (success) commit('article/GET_HOT_LIST_SUCCESS', response.data)
        if (!success) commit('article/GET_HOT_LIST_FAILURE')
      }, err => {
        commit('article/GET_HOT_LIST_FAILURE', err)
      })
  },

  // 根据post-id获取评论列表
  loadCommentsByPostId({commit}, params) {
    params.sort = params.sort || -1
    params.page = params.page || 1
    params.per_page = params.per_page || 88
    if (Object.is(params.page, 1)) {
      commit('comment/CLEAR_LIST')
    }
    commit('comment/REQUEST_LIST')
    return Service.get('/comment', {params})
      .then(response => {
        const success = !!response.status && response.data && Object.is(response.data.code, 1)
        if (success) {
          if (Object.is(params.sort, -1)) response.data.result.data.reverse()
          commit('comment/GET_LIST_SUCCESS', response.data)
        }
        if (!success) commit('comment/GET_LIST_FAILURE')
      }, err => {
        commit('comment/GET_LIST_FAILURE', err)
      })
  },

  // 发布评论
  postComment({commit}, comment) {
    commit('comment/POST_ITEM')
    return Service.post('/comment', comment)
      .then(response => {
        const success = !!response.status && response.data && Object.is(response.data.code, 1)
        if (success) {
          commit('comment/POST_ITEM_SUCCESS', response.data)
          return Promise.resolve(response.data)
        } else {
          commit('comment/POST_ITEM_FAILURE')
          return Promise.reject(response.data)
        }
      }, err => {
        commit('comment/POST_ITEM_FAILURE', err)
        return Promise.reject(err)
      })
  },
  // 获取文章列表
  loadArticles({commit}, params = {currentPage: 1, sortId: null}) {
    commit('article/REQUEST_LIST')
    return Service.get('/article', {params})
      .then(response => {
        const success = !!response.status && response.data && Object.is(response.data.status, 0)
        const isFirstPage = params.currentPage && params.currentPage > 1
        const commitName = `article/${isFirstPage ? 'ADD' : 'GET'}_LIST_SUCCESS`
        if (success) commit(commitName, response.data)
        if (!success) commit('article/GET_LIST_FAILURE')
      })
      .catch(err => {
        commit('article/GET_LIST_FAILURE', err)
      })
  },
  // 获取我的文章列表
  loadSelfOrLikeArticles({commit}, params) {
    return Service.get('/article/self/'+params.type, {params})
      .then(response => {
        const success = !!response.status && response.data && Object.is(response.data.status, 0)
        const isFirstPage = params.currentPage && params.currentPage > 1
        const commitName = `article/${isFirstPage ? 'ADD' : 'GET'}_${params.type}_LIST_SUCCESS`
        if (success) commit(commitName, response.data)
      })
      .catch(err => {
      })
  },
  // 获取文章详情
  loadArticleDetail({commit}, params = {}) {
    commit('article/REQUEST_DETAIL')
    return Service.get(`/article/${ params.article_id }`)
      .then(response => {
        const success = !!response.status && response.data && Object.is(response.data.status, 0)
        if (success) commit('article/GET_DETAIL_SUCCESS', response.data)
        if (!success) commit('article/GET_DETAIL_FAILURE')
        return Promise.resolve(response.data)
      }, err => {
        commit('article/GET_DETAIL_FAILURE', err)
        return Promise.reject(err)
      })
  },
  //保存文章
  PUBLISH_ARTICLE({commit}, params) {
    // 如果数据已存在，则直接返回Promise成功，并返回数据
    // 不存在则请求新数据
    return Service.put('/article', params).then(response => {
      const success = !!response.status && response.data && Object.is(response.data.status, 0)
      if (success) commit('article/PUBLISH_ARTICLE_SUCCESS', response.data)
      if (!success) commit('article/PUBLISH_ARTICLE_FAILURE')
      return Promise.resolve(response.data)
    }, err => {
      commit('article/PUBLISH_ARTICLE_FAILURE', err)
      return Promise.reject(err)
    })
  },
  //修改登录状态
  SHOWLONGINTYPE({commit}, params) {
    commit('login/SHOW_LOGIN', params)
  },
  CLEARARTICLELIST({commit}, params = {currentPage: 1, sortId: null}) {
    commit('article/CLEAR_LIST')
    commit('article/REQUEST_LIST')
    return Service.get('/article', {params})
      .then(response => {
        const success = !!response.status && response.data && Object.is(response.data.status, 0)
        const isFirstPage = params.currentPage && params.currentPage > 1
        const commitName = `article/${isFirstPage ? 'ADD' : 'GET'}_LIST_SUCCESS`
        if (success) commit(commitName, response.data)
        if (!success) commit('article/GET_LIST_FAILURE')
      })
      .catch(err => {
        commit('article/GET_LIST_FAILURE', err)
      })
  },
  login({commit}, form) {
    return Service.post('/login/form', form, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(response => {
        if (response.status == 200) {
          commit('login/SET_USER', response)
          commit('login/SHOW_LOGIN', null)
        }
      })
      .catch(err => {
        commit('login/SET_USER', null)
      })
  },
  logout({commit}) {
    commit('login/SET_USER', null)
    Service.post('/logout').then(response => {
    })
  },
  likearticle({commit}, params){
    Service.put('/like/' + params.id)
      .then(function (response) {
        commit('article/LIKE_ARTICLE', params)
      }, function (err) {
      })
  },
  unlikearticle({commit}, params){
    Service.delete('/like/' + params.id)
      .then(function (response) {
        commit('article/UNLIKE_ARTICLE', params)
      }, function (err) {
      })
  },
  loadcomment({commit}, params){
    return Service.get('/comment/' + params.topicType+"/"+params.id)
      .then(response => {
        const success = !!response.status && response.data && Object.is(response.data.status, 0)
        if (success)  commit('commentreply/SET_COMMENT', response.data.result)
      })
      .catch(err => {
      })
  },
  showloadreply({commit,state}, params){
    if(state.commentreply.comments[params.index].showreplys){
      commit('commentreply/HIDE_REPLY',params )
    }else{
      return Service.get('/reply', {params})
        .then(response => {
          const success = !!response.status && response.data && Object.is(response.data.status, 0)
          params.data = response.data.result
          if (success)  commit('commentreply/SHOW_REPLY',params )
        })
        .catch(err => {
        })
    }
  },
}

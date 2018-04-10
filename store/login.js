/**
 * 登录状态
 **/

export const state = () => {
  return {
    showlogintype: null,
    authUser: null
  }
}

export const mutations = {
  SHOW_LOGIN(state, action) {
    state.showlogintype = action
  },
  SET_USER(state, user) {
    state.authUser = user
  }
}

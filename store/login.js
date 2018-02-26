/*
*
* 登录状态
*
*/

export const state = () => {
  return {
    showlogintype: null
  }
}

export const mutations = {
  SHOW_LOGIN(state, action) {
    state.showlogintype = action
  }
}

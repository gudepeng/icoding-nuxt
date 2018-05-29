/**
 * 登录状态
 **/

export const state = () => {
  return {
    comments:{

    }
  }
}

export const mutations = {
  GET_COMMENT(state, action) {
    state.comments = action
  },
  SET_COMMENT(state, action) {
    state.comments = action
  },
  SHOW_REPLY(state, action){
    state.comments[action.index].replys = action.data
    state.comments[action.index].showreplys = true
    state.comments=JSON.parse(JSON.stringify(state.comments))
  },
  HIDE_REPLY(state, action){
    state.comments[action.index].showreplys = false
    state.comments=JSON.parse(JSON.stringify(state.comments))
  }
}

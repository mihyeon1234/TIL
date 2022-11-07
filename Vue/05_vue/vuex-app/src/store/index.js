import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // data 값
  // 중앙에서 관리하는 모든 상태 정보
  state: {
    message : 'message in store',
  },
  // computed 값, state를 활용해서 계산된 값을 얻고자 할때 사용
  getters: {
    messageLength(state){
      return state.message.length
    },
    // messageLength를 이용해서 새로운 값을 계산
    doubleLength(state, getters){
      return getters.messageLength * 2
    }
  },
  // 동기적, state 값을 변경하기 위한 메서드
  // 한가지 일만 해야됨
  mutations: {
    CHANGE_MESSAAGE(state, newMessage){
      console.log(state)
      console.log(newMessage)
      state.message = newMessage
    }
  },
  // 비동기작업이 포함될수 있는 매서드
  // actiosd 이 mutations를 호출함 모든 곳에 접근가능(state 직접 변경안함)
  actions: {
    changeMessage(context, newMessage){
      context.commit( 'CHANGE_MESSAAGE' , newMessage)
    }
  },
  // 
  modules: {
  }
})

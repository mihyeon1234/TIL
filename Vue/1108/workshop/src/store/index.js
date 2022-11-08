import Vue from 'vue'
import Vuex from 'vuex'
import creatPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins:[creatPersistedState(),],

  state: {
    todos:[],
  },
  getters: {
    allTodosCount(state) {
      return  state.todos.length
    },
    TrueCount(state){
      const TrueFiltCount = state.todos.filter((todo)=>{
        return todo.isCompleted == true
      })
      return TrueFiltCount.length
    },
    FalseCount(state, getters){
      return getters.allTodosCount - getters.TrueCount
    }
  },
  mutations: {
    CREATE_TODO(state, todoItem){
      state.todos.push(todoItem)
    },
    DELETE_TODO(state, todoItem){
      const index = state.todos.indexOf(todoItem)
      state.todos.splice(index,1)
    },
    UPDATE_TODO_STATUS(state, todoItem){
      const index = state.todos.indexOf(todoItem)
      state.todos[index].isCompleted = !state.todos[index].isCompleted
    }
  },
  actions: {
    createTodo(context, todoTitle){
      const todoItem ={
        title : todoTitle,
        isCompleted:false,
      }
      context.commit('CREATE_TODO', todoItem)
    },
    updateTodoStatus(context, todoItem){
      context.commit('UPDATE_TODO_STATUS', todoItem)
    }
  },
  modules: {
  }
})

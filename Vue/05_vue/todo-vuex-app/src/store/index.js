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
    trueTodosCount(state){
      const completedeTodos = state.todos.filter((todo)=>{
        return todo.isCompleted == true
      })
      return completedeTodos.length
    },
    falseTodosCount(state, getters){
      return getters.allTodosCount - getters.trueTodosCount
    }
  },
  mutations: {
    CREATE_TODO(state, todoItem){
      state.todos.push(todoItem)
    },
    DELETE_TODO(state, todoItem){
      const index = state.todos.indexOf(todoItem)
      state.todos.splice(index, 1)
    },
    UPDATED_TODO_STATUS(state, todoItem){
      const indexItem = state.todos.indexOf(todoItem)
      state.todos[indexItem].isCompleted = !state.todos[indexItem].isCompleted
    },
    // LODE_TODOS(state){
    //   const localStorageTodos = localStorage.getItem('todos')
    //   const parsedTodos = JSON.parse(localStorageTodos)
    //   state.todos = parsedTodos
    // },
  },
  actions: {
    creatTodo(context, todoTitle){
      // todo객체 만들기
      const todoItem = {
        title:todoTitle,
        isCompleted:false,
      }
      context.commit('CREATE_TODO', todoItem)
      // context.dispatch('saveTodosToLocalStorage')
    },
    // deleteTodo(context, todoItem){
    //   context.commit('DELETE_TODO', todoItem)
    // }
    updateTodoStatus(context, todoItem){
      context.commit('UPDATED_TODO_STATUS', todoItem)
      // context.dispatch('saveTodosToLocalStorage')

    },
    // saveTodosToLocalStorage(context){
    //   const jsonTodos = JSON.stringify(context.state.todos)
    //   // localStorage.setItem('키',값)
    //   window.localStorage.setItem('todos',jsonTodos)
    // },
    // loadTodo(context){
    //   context.commit('LODE_TODOS')
    // }
  },
  modules: {
  }
})

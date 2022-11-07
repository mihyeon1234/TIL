<template>
  <div id="app">
    <h1>Todo List</h1>
    <h2>모든 Todo 개수 : {{allTodosCount}}</h2>
    <h2>완료된 Todo 개수 : {{trueTodosCount}}</h2>
    <h2>아직 안된 Todo 개수 : {{falseTodosCount}}</h2>
    <TodoList/>
    <TodoForm/>
    <!-- <button @click="loadTodo">Todo 불러오기</button> -->
  </div>
</template>

<script>
import TodoList from '@/components/TodoList'
import TodoForm from '@/components/TodoForm'

export default {
  name: 'App',
  components: {
    TodoList,
    TodoForm,
  }, 
  computed:{
    allTodosCount(){
      return this.$store.getters.allTodosCount
    },
    trueTodosCount(){
      return this.$store.getters.trueTodosCount
    },
    falseTodosCount(){
      return this.$store.getters.falseTodosCount
    },
  },
  methods:{
    loadTodo(){
      this.$store.dispatch('loadTodo')
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

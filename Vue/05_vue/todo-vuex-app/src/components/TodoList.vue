<template>
  <div>
    <TodoListItem
     v-for="(todo, index) in todos"
     :key="index"
     :todo="todo"
    />
  </div>
</template>

<script>
import TodoListItem from './TodoListItem.vue';

export default {
  name:'TotoList',
  components:{
    TodoListItem,
  },
  computed: {
    todos() {
        return this.$store.state.todos
    }
  }
}
</script>

<style>

</style>
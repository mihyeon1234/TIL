<template>
  <div>
    <span @click="updateTodoStatus" 
    :class="{'is-Completed':todo.isCompleted}"
    >{{todo.title}}</span>
    {{todo.isCompleted}}
    <button @click="deleteTodo">Delete</button>
  </div>
</template>

<script>
export default {
  name:'TodoListItems',
  props:{
    todo:Object,
  },
  methods:{
    deleteTodo(){
      console.log('삭제');
      // this.$store.dispatch('deleteTodo',this.todo )
      this.$store.commit('DELETE_TODO', this.todo);
    },
    updateTodoStatus(){
      this.$store.dispatch('updateTodoStatus',this.todo)
    }
  }
}
</script>

<style>
.is-Completed{
  text-decoration: line-through;
}
</style>
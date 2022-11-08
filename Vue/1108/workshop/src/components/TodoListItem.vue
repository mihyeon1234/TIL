<template>
  <div>
    <span @click="updateTodoStatus" 
    :class="{'line':todo.isCompleted}"
    >
    {{todo.title}}</span>
    <button @click="deleteTodo">delete</button>
  </div>
</template>

<script>
export default {
    name:'TodoListitem',
    props:{
    todo:Object,
  },
  methods:{
    deleteTodo(){  
        this.$store.commit('DELETE_TODO', this.todo)
    },
    updateTodoStatus(){
        this.$store.dispatch('updateTodoStatus',this.todo)
    }
  },
}
</script>

<style>
.line{
    text-decoration: line-through;
}
</style>
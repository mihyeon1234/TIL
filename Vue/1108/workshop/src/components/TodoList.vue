<template>
  <div >
    
    <TodoListitem
    v-for="(todo, index) in todos"
    :key="index"
    :todo="todo"
    />
    <input type="text"
    @keyup.enter="createTodo"
    v-model="todoTitle"
    >
    <button @click="createTodo" >ADD</button>
  </div>
</template>

<script>
import TodoListitem from './TodoListItem.vue'
export default {
    name:'TodoList',
    components:{
        TodoListitem,
    },
    computed: {
        todos(){
            return this.$store.state.todos
        }
    },
    data(){
        return {
            todoTitle : null,
        }
    },
    methods:{
        createTodo(){
            if (this.todoTitle){
                this.$store.dispatch('createTodo',this.todoTitle)
                this.todoTitle = null
            }
        }
    }
}
</script>

<style>

</style>
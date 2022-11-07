<template>
  <div>
    <input type="text"
    @keyup.enter="createTodo"
    v-model.trim="todoTitle"
    >
  </div>
</template>

<script>
export default {
    name:'TodoForm',
    data(){
      return{
        todoTitle:null,
      }
    },
    methods:{
      createTodo(){
        if (this.todoTitle){
          this.$store.dispatch('creatTodo', this.todoTitle)
          // console.log(this.todoTitle);
          this.todoTitle = null
        }
      }
    }
}
</script>

<style>

</style>
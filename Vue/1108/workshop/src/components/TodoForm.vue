<template>
  <div>
    <h1>asdkfjasldfa</h1>
    <h1>All Todos : {{allTodosCount}}</h1>
    <h2>Completed Todo : {{trueCount}}</h2>
    <h2>Uncompleted Todo : {{falseCount}}</h2>
  </div>
</template>

<script>
export default {
    name:'TodoForm',
    computed:{
        allTodosCount(){
            return this.$store.getters.allTodosCount
        },
        trueCount(){
            return this.$store.getters.TrueCount
        },
        falseCount(){
            return this.$store.getters.FalseCount
        }
    }
}
</script>

<style>

</style>
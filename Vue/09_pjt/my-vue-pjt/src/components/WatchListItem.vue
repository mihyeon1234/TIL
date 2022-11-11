<template>
  <div>
    <!-- <h1>WatchListItem</h1> -->
    <p
    class="backgrounddiv"
      @click="updateWatchStatus" 
      :class="{ 'is-completed': isCompleted }"
    >{{ watchList.title }}</p>
  </div>
</template>

<script>
export default {
    name:"WatchListItem",
    data() {
      return {
        isCompleted: false
      }
    },
    props :{
      watchList: Object,
    },
    methods: {
      updateWatchStatus : function(){
        this.isCompleted = !this.isCompleted
      },
    },
}
</script>

<style>
.is-completed {
  text-decoration: line-through;
  color: red;
}
</style>
<template>
  <div>
    <!-- <h1>WatchListForm</h1> -->
    <h1 style="font-weight:bold">보고싶은 영화</h1>
    <input 
      type="text"
      v-model.trim="WatchListTitle"
      @keyup.enter="createWatchList"
    >
    <button @click="createWatchList">Add</button>
  </div>
</template>

<script>
export default {
    name:'WatchList',
  data() {
    return {
      WatchListTitle: null,
    }
  },
  methods: {
    createWatchList() {
      // console.log(this.WatchListTitle)
      if (this.WatchListTitle) {
        this.$emit('create-watch-list', this.WatchListTitle)
      }
      this.WatchListTitle = null
    }
  }
}
</script>

<style>

</style>
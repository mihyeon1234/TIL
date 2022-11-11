<template>
    <div class="aboutdiv">
      <!-- <h1>WatchList</h1> -->
      <WatchListForm
        @create-watch-list="getCreateWatchList"
      />
      <WatchListItem
        v-for="(watchlist, idx) in watchlists"
        :key="idx"
        :watch-list="watchlist"
      />
    </div>
  </template>
  <script>
  // @ is an alias to /src
  import  WatchListForm from '../components/WatchListForm.vue'  
  import  WatchListItem from '../components/WatchListItem.vue'

  export default {
    name: 'WatchListView',
    data() {
      return {
        watchlists: [],
        // title: inputData,
        // isCompleted: false, 객체 형태
      }
    },
    components: {
        WatchListItem,
        WatchListForm
    },
    methods: {
      getCreateWatchList: function(inputData) {
        // console.log(`getCreateWatchList ${inputData}`)
        const watchlist = {
          title: inputData,
          isCompleted: false,
        }
        this.watchlists.push(watchlist)
        // console.log(this.watchlist)
      },
    },
  }
  </script>
<style>
    .aboutdiv{
        margin-top: 2rem;
        text-align: center;
    }
</style>
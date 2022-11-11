<template>
  <div class="VideoList">
    <h1>VideoList</h1>
    <div>
      <VideoListItem 
      v-for="video in VideoData[0]" 
      :key="video.id.videoId" 
      :video = "video" 
      @detail-submit="DetailSubmit"
      />
    </div>
  </div>
</template>

<script>
import VideoListItem from "./VideoListItem.vue"
export default {
    name: "VideoLis",
    props:{
      VideoData:Array,
    },
    components:{
      VideoListItem,
    },
    methods:{
      DetailSubmit(vidio){
        console.log(2);
        this.$emit('detail-submit', vidio)
      }
    }
}
</script>

<style>
.VideoList{
    width: 40%;
    border: 1px solid rgb(122, 192, 17);
}
</style>
<template>
  <div id="app">
    My First Youtube Project
    <ThesearchBar
      @input-data = "InputGetEvent"
    />
    <div class="VideoDiv" v-if="VideoData.length">
      <VideoDetail
      :video="video"
      />
      <VideoList  
      @detail-submit="DetailSubmit"
      :VideoData="VideoData"/>
    </div>
  </div>
</template>

<script>
import ThesearchBar from './components/TheSearchBar.vue'
import VideoDetail from './components/VideoDetail.vue'
import VideoList from './components/VideoList.vue'
import axios from 'axios'
export default {
  name: 'App',
  components: {
    ThesearchBar,
    VideoDetail,
    VideoList,

  },
  data(){
    return{
      VideoData:[],
      video:[],
      myKeyword:null
    }
  },
  methods : {
    InputGetEvent(keyword){
      this.myKeyword = keyword
      const baseURL = "https://www.googleapis.com/youtube/v3/search"
      const API_KEY = 'AIzaSyBLMEBNxzyohh-zUFGFvHA5ZpI-TLmM4JE'
    axios
      .get(baseURL, {
        params: {
          key: API_KEY,
          part: "snippet",
          type: "video",
          q: this.myKeyword,
        }
      })
      .then(response => {
        this.VideoData=[]
        this.VideoData.push(response.data.items)
        console.log(this.VideoData);
         this.video = response.data.items[0]
        //  this.VideoData = `https://www.youtube.com/embed/${response.data.items[0].id.videoId}`
      })
      .catch((error)=>{
        console.log('something wrong!')
        console.log(error)
      })
    },
    DetailSubmit(DetailData){
      console.log(3);
      this.video = []
      this.video = DetailData
      console.log(this.video);
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.VideoDiv{
  display: flex;
}
</style>

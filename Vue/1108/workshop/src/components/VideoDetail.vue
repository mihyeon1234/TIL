<template>
  <div class="VideoDetail">
    <h1>VideoDetail</h1>
    <iframe
      id="ytplayer"
      type="text/html"
      width="400px"
      height="300px"
      :src="vidio_url"
      frameborder="0"
    ></iframe>
    <div>
      {{ videoTitle | unescape }}
      {{this.video.id.videoId}}
    </div>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: "VideoDetail",

  props: {
    video: Object,
  },
  computed:{
    videoTitle(){
        return this.video.snippet.title
    },
    vidio_url(){
        return  `https://www.youtube.com/embed/${this.video.id.videoId}`
    }
    },
    filters: {
      unescape(rawText) {
          return _.unescape(rawText)
        }
    },

};
</script>

<style>
.VideoDetail {
  width: 60%;
  border: 1px solid orange;
  overflow: auto;
}
</style>

<template>
  <div class="VideoListItem">
    <iframe
      id="ytplayer"
      type="text/html"
      width="100px"
      height="80px"
      :src="link_url1"
      frameborder="0"
    ></iframe>
    <div @click="DetailSubmit">
      <p>{{ videoTitle | unescape }}</p>
      <p>{{videoDesc}}</p>
    </div>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  name: "VideoListItem",
  props: {
    video: Object,
  },
  computed: {
    videoTitle() {
      return this.video.snippet.title;
    },
    videoDesc(){
        return this.video.snippet.description;
    }
  },
  filters: {
    unescape(rawText) {
      return _.unescape(rawText);
    },
  },
  data() {
    return {
        link_url1: `https://www.youtube.com/embed/${this.video.id.videoId}`,
    };
  },
  methods: {
    DetailSubmit() {
        console.log(1);
      this.$emit("detail-submit", this.video);
    },
  },
};
</script>

<style>
.VideoListItem {
  border: 1px solid blue;
  display: flex;
}
</style>

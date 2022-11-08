<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <div><h1>Cat Img</h1>
    <button
    @click="getCatImage"
    >고양이 불러오기</button></div>
    
    <img class="catDiv" v-if="imgSrc" :src="imgSrc" alt="#"><br>
  </div>
</template>

<script>
import axios from 'axios'

export default {

  name: 'App',
  data() {
    return {
      imgSrc: null,
    }
  },
  methods:{
    getCatImage() {
      const catImageSearchURL = 'https://api.thecatapi.com/v1/images/search'
      axios({
        method: 'get',
        url: catImageSearchURL
      })
        .then((response) => {
          this.imgSrc = response.data[0].url
          console.log('이미지 리소스가 업데이트 되었습니다')
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
  created() {
    this.getCatImage()
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
.catDiv{
  margin-top: 50px;
  width: 400px;
  height: fit-content;
}
</style>

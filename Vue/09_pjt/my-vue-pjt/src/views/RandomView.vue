<template>
  <div >
    <div class="detailmovie">      
      <b-button @click="pick" class="buttondiv">pick</b-button>
      <div v-if="movie[0]">
        <img :src="img_url" alt="img_url" class="randomimg">
        <h1 style="font-weight:bold">{{ movie[0].title }}</h1>
      </div>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import axios from "axios";
export default {
  name: "RandomView",
  components: {},
  data() {
    return {
      moviesData: [],
      movie: [],
    };
  },
  methods: {
    getMovies() {
      const baseURL = "https://api.themoviedb.org/3/movie/top_rated";
      const API_KEY = "2ee130f2ba9bf221b6fe5107cffcac46";
      //   const API_KEY = process.env.VUE_APP_YOUTUBE_API_KEY
      //   const numberOfMovie = 10

      axios({
        method: "get",
        url: baseURL,
        params: {
          api_key: API_KEY,
          language: "ko-KR",
        },
      })
        .then((response) => {
          this.moviesData = [];
          this.moviesData.push(response.data.results);
        })
        .catch((error) => {
          console.log("something wrong!");
          console.log(error);
        });
    },
    pick() {
      this.movie = [];
      const idx = Math.floor(Math.random() * this.moviesData[0].length);
      this.movie.push(this.moviesData[0][idx]);
    },
  },
  computed:{
    img_url(){
        return  `https://image.tmdb.org/t/p/original/${this.movie[0].poster_path}`
    }
  },
  
  created() {
    this.getMovies();
    // console.log(1234);
  },
};
</script>
<style>
.buttondiv{
  width: 200px;
  margin-bottom: 1rem;
}
.randomimg{
  width: 500px;
  margin-bottom: 1rem;
}
.detailmovie{
  margin-top: 1rem;
  text-align: center;
}
</style>

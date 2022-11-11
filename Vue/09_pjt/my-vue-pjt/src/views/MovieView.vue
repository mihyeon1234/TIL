<template>
  <div>
    <div class="flexdiv"><MovieCard 
    v-for="movie in moviesData[0]"
    :key="movie.index"
    :movie="movie"
    />
  </div></div>
</template>

<script>
// @ is an alias to /src
import MovieCard from "../components/MovieCard.vue"
import axios from'axios'
export default {
  name: 'MovieView',
  components: {
    MovieCard,
  },
  data(){
    return{
      moviesData:[]
    }
  },
  methods:{
    getMovies(){
      const baseURL = "https://api.themoviedb.org/3/movie/top_rated"
      const API_KEY = '2ee130f2ba9bf221b6fe5107cffcac46'
    //   const API_KEY = process.env.VUE_APP_YOUTUBE_API_KEY
    //   const numberOfMovie = 10

    axios({
        method: 'get',
        url: baseURL,
        params: {
          api_key: API_KEY,
          language: 'ko-KR',
        }
      })
      .then(response => {
        this.moviesData = []
        this.moviesData.push(response.data.results)
        console.log(response.data.results)
      })
      .catch((error)=>{
        console.log('something wrong!')
        console.log(error)
      })
    },
  },
  created(){
    this.getMovies()
  }
}
</script>
<style>
.flexdiv{
  margin-top:2rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
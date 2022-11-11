<template>
  <b-card class="mb-2 carddiv">
    <div>
        <img :src="img_url" alt="img_url" class="imgdiv">
    </div>
    <h2 class="titlediv">{{movie.title}}</h2>
    <p class="pdiv">{{movie.overview}}</p>
  </b-card>
</template>

<script>
export default {
    name: "MovieCard",
    props: {
    movie: Object,
  },
  data(){
    return {
        img_url :`https://image.tmdb.org/t/p/original/${this.movie.poster_path}`
    }
  }
}
</script>

<style>
.carddiv{
    width: 250px;
    max-height: 600px;
    margin:0 1rem;
    overflow: hidden;
  }
.imgdiv{
    width: 200px;
    height: auto;
}
.pdiv{
    max-height: 220px;
    overflow: auto;
    text-overflow: ellipsis;
}
.pdiv::-webkit-scrollbar {
    width: 8px;
    background-color: rgb(223, 252, 252);
  }
.pdiv::-webkit-scrollbar-thumb {
width: 8px;
border-radius: 10px;
background-color: rgb(169, 188, 248);
}
.titlediv{
  margin:1rem 0;
}
</style>
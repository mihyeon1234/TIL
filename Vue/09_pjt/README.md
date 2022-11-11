

### 느낀점

이때까지 배워온 api 통신의, html, vue, css 를 다같이 써볼수 있어서 복습겸, 내가 얼마나 이해하고 적용할수 있는지를 확인해 볼 수 있는 시간이였던것 같다. 이제 프로젝트가 최종 프로젝트만 남았는데 그때는 css랑 알고리즘, 기능 등에 투자할 시간이 많으니까 배운것을 잊지 않고 더 열심히 해봐야될꺼같다.

분업을 함으로써 기능을 나누고 작업을 하였다. 코드리뷰를 통해 나의 코드와 팀원의 코드를 한번 더 이해를 하였고, 배운것이 같아서 그런지 적용하는 방식과 생각하는 방식이 비슷했다. 

깃을 쓰면서 어떻게 하면 충돌이 나지 않는지도 알게되고 브랜치를 나눠서 작업하고 합치는 과정을 거쳤다.

기본적인 스크롤바 등 css는 마음에 들지 않았는데 그것을 어떻게 변경해서 내 맘에 맞게 고칠수 있는지도 해볼수 있었고, 선생님이 하신 구글이 있으면 우주선도 만들수 있다는 말이 매우 와닿았다.

안되는 것은 없고 하기만 하면된다 화이팅~!



```js
# router/index.js

import Vue from 'vue'
import VueRouter from 'vue-router'
import MovieView from '../views/MovieView.vue'
import RandomView from '../views/RandomView.vue'
import WatchListView from '../views/WatchListView.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/movie',
    name: 'MovieView',
    component: MovieView
  },
  {
    path: '/random',
    name: 'RandomView',
    component:RandomView
  },
  {
    path: '/watch-list',
    name: 'WatchList',
    component:WatchListView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

```

```vue
# App.vue

<template>
  <div>
    <b-nav align="end" class="navback">
      <b-nav-item >
        <router-link class="navdiv" to="/movie">Movie</router-link>
      </b-nav-item>
      <b-nav-item >
         <router-link class="navdiv" to="/random">Random</router-link>
         </b-nav-item>
      <b-nav-item >
        <router-link class="navdiv" to="/watch-list">WatchList</router-link>
      </b-nav-item>
    </b-nav>

    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.navback{
  background-color: bisque;
  height: 50px;
  line-height: 32px;
}
.navdiv:hover {
  color: greenyellow;
}

.navdiv{
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}
.navdiv.router-link-exact-active {
  color: #42b983;
}
</style>

```

```vue
# views/MovieView.vue

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
```

```vue
# views/RandomView/vue

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

```

```vue
# views/WatchListView.vue
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
```

```vue
# components/MovieCard.vue
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
```

```vue
# components/WatchListForm.vue

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
```

```vue
# components/WatchListItem.vue
<template>
  <div>
    <!-- <h1>WatchListItem</h1> -->
    <p
    class="backgrounddiv"
      @click="updateWatchStatus" 
      :class="{ 'is-completed': isCompleted }"
    >{{ watchList.title }}</p>
  </div>
</template>

<script>
export default {
    name:"WatchListItem",
    data() {
      return {
        isCompleted: false
      }
    },
    props :{
      watchList: Object,
    },
    methods: {
      updateWatchStatus : function(){
        this.isCompleted = !this.isCompleted
      },
    },
}
</script>

<style>
.is-completed {
  text-decoration: line-through;
  color: red;
}
</style>
```


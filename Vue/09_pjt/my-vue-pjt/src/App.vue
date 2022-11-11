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

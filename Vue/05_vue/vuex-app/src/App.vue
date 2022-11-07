<template>
  <div id="app">
    <h1>{{message}}</h1>
    <input type="text" v-on:keyup.enter="changeMessage" v-model="inputData">
  </div>
</template>

<script>

export default {
  name: 'App',
  data(){
    return {
      inputData:null,
    }
  },
  components: {
  },
  computed: {
    message(){
      return this.$store.state.message+'추가'
    }
  },
  methods:{
    changeMessage(){
    const newMessage = this.inputData
    this.$store.dispatch('액션메서드 이름', newMessage)
  }
  }
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
</style>

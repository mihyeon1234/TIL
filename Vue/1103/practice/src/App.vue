<template>
  <div id="app">
    <h1>App</h1>
    <input type="text" v-model="appData">
    <p>parentData : {{parentInput}}</p>
    <p>childData : {{childInput}}</p>

    <AppParent :app-data = 'appData'
    @chlid-input="getChildData"
/>
    <WebDrm/>
  </div>
</template>

<script>
import AppParent from './components/AppParent.vue'
import WebDrm from './components/webDRM.vue'
export default {
  name: 'App',
  components: {
    AppParent,
    WebDrm,
  },
  data: function (){
    return {
      appData : null,
      parentInput:'',
      childInput:'',
    }
  },
  methods:{
        getChildData: function (childInputData) {
            this.childInput= childInputData[0]
            this.parentInput = childInputData[1]
        },}
}
</script>

<style>
#app {
  margin: 0 auto;
}
</style>

<template>
  <div id="app">
    <LunchMenu @pick-meun="getMenu"/>
    <LottoNumber v-if="Menu" :menu = "Menu"/>
  </div>
</template>

<script>
import LunchMenu from '@/components/Lunch'
import LottoNumber from '@/components/Lotto'
export default {
  name: 'App',
  components: {
    LunchMenu,
    LottoNumber,
  },
  data: function () {
    return {
      Menu: null,
    }
  },
  methods:{
    getMenu:function (itme){
        this.Menu = itme
    },
  }
}
</script>

<style>
#app{
  margin: 0 auto;
}
</style>

<template>
  <div>
    <input type="text"
        v-model="inputData"
        v-on:keyup.enter="SendInputData"
    >
  </div>
</template>

<script>
export default {
    name:'ThesearchBar',
    data: function () {
    return {
        inputData: null,
    }
  },
    methods:{
        SendInputData(){
            this.$emit('input-data', this.inputData)
            this.inputData =null
        }
    }
}
</script>

<style>

</style>
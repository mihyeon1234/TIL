<template>
    <div>
        <h1>AppChild</h1>
        <input type="text"
        v-bind:value="AppChildData"
        v-on:input="childInput" >
        <p>appData : {{appData}}</p>
        <p>appParentData : {{appParentData}}</p>
    </div>
</template>

<script>
export default {
    name : 'AppChild',
    props:{
        appData : String,
        appParentData:String,
    },
    data :function (){
        return {
            AppChildData : '',
        }
    },
    methods:{
        childInput : function (e){
            this.AppChildData = e.target.value
            this.$emit('chlid-input', this.AppChildData)
        }
    }
}
</script>

<style>

</style>
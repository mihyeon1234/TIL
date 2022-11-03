<template>
    <div>
        <h1>AppParent</h1>
        <input type="text" v-bind:value="appParentData"
        v-on:input="parentInput" >
        <p>appData : {{appData}}</p>
        <p>childData :{{childInput}}</p>
        <AppChild :app-data='appData' 
        :app-parent-data='appParentData'
        @chlid-input="getChildData"
        />
    </div>
</template>

<script>
import AppChild from '@/components/AppChild.vue'
export default {
    name : 'AppParent',
    components :{
        AppChild,
    },
    props:{
        appData : String,
    },
    data: function (){
    return {
        appParentData:null,
        childInput:null,
        }
    },
    methods:{
        getChildData: function (childInputData) {
            this.childInput= childInputData
            this.$emit('chlid-input', [this.appParentData,this.childInput])

        },
        parentInput : function (e){
            this.appParentData = e.target.value
            this.$emit('chlid-input', [this.appParentData,this.childInput])
        }
    }
}
</script>

<style>

</style>
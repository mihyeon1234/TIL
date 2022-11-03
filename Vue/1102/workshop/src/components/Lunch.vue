<template>
    <div>
        <h1>점심 메뉴</h1>
        <button v-on:click="pickMeun">Pick one</button>
        <p>{{message}}</p>
        <hr/>
    </div>
</template>

<script>
export default {
    name:'LunchMenu',
    // props:{
    //     message:String,
    // },
    data: function () {
    return {
        message: '',
        myArr: ['국밥', '짜장면', '잔치국수'],
        }
    },
    methods:{
        pickMeun: function(){
                    const idx = Math.floor(Math.random() * this.myArr.length)
                    this.message = this.myArr[idx];
                    this.$emit('pick-meun',this.message)
                },
        
    }
}
</script>

<style>

</style>
<template>
    <div>
        <h1>{{menu}}먹고 로또</h1>
        <button v-on:click="pickRotto" >Get Luchy Numbers</button>
        <p>{{rottos}}</p>
        <hr/>
    </div>
</template>

<script>
export default {
    name:'LottoNumber',
    props:{
        menu : String,
    },
    data: function(){
        return {
            rottos:''
            }
        }
    ,
    methods:{
        pickRotto: function(){
                    this.rottos=[]
                    for (var i = 0; i < 6; i++){
                        this.rottos.push(parseInt(Math.random() * 45+1))
                    }
                    console.log(this.rottos);
                }
    }
}
</script>

<style>

</style>
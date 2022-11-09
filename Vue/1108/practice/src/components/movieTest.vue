<template>
  <div>

  </div>
</template>

<script>
export default {
    methods:{
    getMovie() {
      const SearchURL = 'https://api.thecatapi.com/v1/images/search'
      axios({
        method: 'get',
        client_id :'',
        client_secret :'',
        url: SearchURL
      })
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
  created() {
    this.getCatImage()
  },
}
</script>

<style>

</style>
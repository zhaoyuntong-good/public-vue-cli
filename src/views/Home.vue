<template>
  <div class="home">
    home
    <div class="loading" v-if="loadingShow">loading</div>
  </div>
</template>

<script>
import  {
  getUnits,
  login
 }  from "@/api/login";
export default {
  name: 'Home',
  components: {
  },
  data(){
  	return {
      loadingShow: false,
  	}
  },
  created(){
    let params = {
      isContains: -1
    }
    this.theGetUnit()
    // Promise.all([login(params),getUnits(params)])
    //   .then( res => {
    //     console.log(res)
    //   })
    //   .catch( err => {
    //     console.log('有出错的请求')
    //   })
  },
  methods: {
  	async theGetUnit(){
  		let params = {
  			isContains: -1
      }
      const respons = await getUnits(params);
      console.log(respons)
      const res = await login(params);
      console.log(res)
    }
  }
}
</script>

<style scoped>
  .loading{
    width: 50vw;
    height: 50vh;
    background-color: #333;
    color: #fff;
    line-height: 50vh;
    text-align: center;
  }
</style>
<template>
  <div class="about">
    about
  </div>
</template>

<script>
import  {
  getUnits,
  login
 }  from "@/api/login";
export default {
  name: 'About',
  data(){
  	return {}
  },
  created(){
    this.theGetUnit()
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
</script>>

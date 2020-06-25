<template>
  <div class="home">
    <div @click="openDialog()">打开弹框</div>
    <dialogs v-if="dialogConfig.name" :dialogConfig="dialogConfig"></dialogs>
  </div>
</template>

<script>
import dialogs from '@/components/dialog.vue'
export default {
  name: 'Home',
  components: {
    dialogs,
  },
  data(){
  	return {
      dialogConfig: {
        name: '',
        title: '基础弹框',
      }
  	}
  },
  methods: {
    openDialog(){
      this.dialogConfig.name = 'dialogs';
    },
  }
}
</script>

<style scoped>
</style>
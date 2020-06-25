<template>
  <div>
    <vue-base-dialog ref="VueBaseDialog" :dialogConfig="dialogConfig">
      <div class="xxx">
        <div @click="closeMethod()">关闭弹框</div>
      </div>
    </vue-base-dialog>
  </div>
</template>

<script>
import VueBaseDialog from 'vue-base-dialog'
export default {
  name: 'dialogs',
  components: {
    VueBaseDialog,
  },
  props: ['dialogConfig'],
  data(){
  	return {
  	}
  },
  methods: {
    closeMethod(){
      this.$refs.VueBaseDialog.close();
    },
  }
}
</script>

<style scoped>
  .xxx {
    width: 500px;
    height: 300px;
  }
</style>
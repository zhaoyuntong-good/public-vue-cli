<template>
  <div 
    :class="[
      'vue-base-dialog-mask',
      mask ? '' : 'vue-base-dialog-mask-hide',
      maskAnimation
    ]"
    @click.self="dialogConfig.maskClick ? close() : false">
    <div :class="['vue-base-dialog-box', dialogAnimation]">
      <div 
        v-if="!dialogConfig.selHeader" 
        :class="[
          'vue-base-dialog-header',
          dialogConfig.drag ? 'vue-base-dialog-drag' : '',
        ]"
        @mousedown.self="dialogConfig.drag ? mouseDown($event) : false" 
        @mouseup.self="dialogConfig.drag ? mouseUp() : false">
        <span>{{dialogConfig.title}}</span>
        <i class="close" @click.stop="close()"></i>
      </div>
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VueBaseDialog',
  props: {
    dialogConfig: {
      type: Object,
      default: {}
    }
  },
  data(){
  	return {
      maskAnimation: null,
      dialogAnimation: null,
      mousemoveCallBack: null,
      titleBox: null,
      parentDom: null,
      pointX: null,
      pointY: null,
      boxX: null,
      boxY: null,
      mask: true,
  	}
  },
  created(){
    this.maskAnimation = 'mask-enter-active';
    this.dialogAnimation = this.dialogConfig.animationEnter ? this.dialogConfig.animationEnter : 'dialog-enter-active';
    if (typeof(this.dialogConfig.mask) === 'undefined') {
      this.mask = true;
    } else {
      if (this.dialogConfig.mask) {
        this.mask = true;
      } else {
        this.mask = false;
      }
    }
  },
  methods: {
    mouseDown(event){
      let length = document.getElementsByClassName('vue-base-dialog-header').length;
      // 获取弹框头部
      this.titleBox = document.getElementsByClassName('vue-base-dialog-header')[length - 1];
      // 获取整个弹框
      this.parentDom = this.titleBox.parentNode;
      // 记录鼠标点击位置
      this.pointX = event.clientX;
      this.pointY = event.clientY;
      // 记录弹框初始位置
      this.boxX = this.parentDom.offsetLeft;
      this.boxY = this.parentDom.offsetTop;
      // 设置弹框初始位置并改变定位
      this.parentDom.style.left = this.boxX + 'px';
      this.parentDom.style.top = this.boxY + 'px';
      this.parentDom.style.position = 'inherit';
      // 鼠标移动，改变弹框位置
      this.mousemoveCallBack = event => {
        this.parentDom.style.top = this.boxY + event.clientY - this.pointY + 'px';
        this.parentDom.style.left = this.boxX + event.clientX - this.pointX + 'px';
      }
      // 监听鼠标移动
      document.addEventListener('mousemove',this.mousemoveCallBack);
    },
    mouseUp(){
      // 兼容ie,将定位方式改为absolute
      this.parentDom.style.position = 'absolute';
      // 销毁监听的事件
      document.removeEventListener('mousemove',this.mousemoveCallBack);
      this.mousemoveCallBack = null;
    },
    close(){
      this.maskAnimation = 'mask-leave-active';
      this.dialogAnimation = this.dialogConfig.animationLeave ? this.dialogConfig.animationLeave : 'dialog-leave-active';
      setTimeout(() => {
        this.$parent.dialogConfig.name = '';
      },this.dialogConfig.destroyTime ? this.dialogConfig.destroyTime : 300)
    }
  }
}
</script>

<style scoped>
  .vue-base-dialog-mask {
    position: fixed;
    z-index: 1000;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    background-color: rgba(0,0,0,0.5);
    perspective: 1200px;
  }
  .vue-base-dialog-mask:after{
    content: "";
    display: inline-block;
    height: 100vh;
    width: 0;
    vertical-align: middle;
  }
  .vue-base-dialog-mask-hide {
    background-color: rgba(0, 0, 0, 0);
  }
  .vue-base-dialog-box {
    margin: 0;
    padding: 0;
    width: max-content;
    box-sizing: border-box;
    display: inline-block;
    vertical-align: middle;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #ebeef5;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    backface-visibility: hidden;
  }
  .vue-base-dialog-header {
    height: 40px;
    font-size: 16px;
    color: #303133;
    line-height: 40px;
    text-align: left;
    padding-left: 15px;
    padding-right: 15px;
    border-bottom: 1px solid #ebeef5;
  }
  .vue-base-dialog-header .close {
    float: right;
    width: 16px;
    height: 16px;
    background-image: url("data:image/png;base64,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");
    background-size: 100% 100%;
    margin-top: 12px;
    cursor: pointer;
  }
  .vue-base-dialog-drag{
    cursor: move;
  }
  .mask-enter-active{
    animation: opacityShow 0.3s;
    animation-fill-mode: forwards;
  }
  .mask-leave-active{
    animation: opacityHide 0.3s;
    animation-fill-mode: forwards;
  }
  @keyframes opacityShow{
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  @keyframes opacityHide{
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  .dialog-enter-active{
    animation: enterActive 0.3s;
  }
  .dialog-leave-active{
    animation: leaveActive 0.3s;
  }
  @keyframes enterActive{
    0% {
      opacity: 0;
      -webkit-transform: translateY(-20%);
      -moz-transform: translateY(-20%);
      -ms-transform: translateY(-20%);
      transform: translateY(-20%);
    }
    100% {
      opacity: 1;
      -webkit-transform: translateY(0);
      -moz-transform: translateY(0);
      -ms-transform: translateY(0);
      transform: translateY(0);
    }
  }
  @keyframes leaveActive{
    0% {
      opacity: 1;
      -webkit-transform: translateY(0);
      -moz-transform: translateY(0);
      -ms-transform: translateY(0);
      transform: translateY(0);
    }
    100% {
      opacity: 0;
      -webkit-transform: translateY(-20%);
      -moz-transform: translateY(-20%);
      -ms-transform: translateY(-20%);
      transform: translateY(-20%);
    }
  }
</style>
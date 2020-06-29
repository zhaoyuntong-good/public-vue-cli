<template>
  <div :id="trackId" class="vue-slider-box-track">
    <div :id="barId" class="vue-slider-box-bar" @mousedown="mouseDownBar($event)">
      <div class="left-btn" @mousedown.stop="mouseDownLeft($event)"></div>
      <div class="right-btn" @mousedown.stop="mouseDownRight($event)"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VueSliderBox',
  props: {
    sliderData: {
      type: Array,
      default: [0,100]
    },
    max: {
      type: Number,
      default: 100
    }
  },
  data(){
  	return {
      trackId: null,
      trackDom: null,
      trackWith: null,
      maxData: null,
      step: null,
      barId: null,
      barDom: null,
      barWith: null,
      barStart: null,
      pointX: null,
      barDomLeft: null,
      mousemoveCallBackBar: null,
      mousemoveCallBackLeft: null,
      mousemoveCallBackRight: null,
      leftBtnId: null,
      rightBtnId: null,
  	}
  },
  created(){
    this.trackId = this.randomString(8);
    this.barId = this.randomString(7);
  },
  mounted(){
    this.trackDom = document.getElementById(this.trackId);
    this.barDom = document.getElementById(this.barId);
    // 获取轨道宽度
    this.trackWith = this.trackDom.offsetWidth;
    this.sliderData[1] > this.max ? this.maxData = this.sliderData[1] : this.maxData = this.max;
    this.step = this.trackWith / this.maxData;
    this.barStart = this.sliderData[0];
    this.barEnd = this.sliderData[1];
    this.setDomStyle(this.barStart, this.barEnd);
    document.onmouseup = () => {
      this.trackWith = this.trackDom.offsetWidth;
      this.sliderData[1] > this.max ? this.maxData = this.sliderData[1] : this.maxData = this.max;
      this.step = this.trackWith / this.maxData;
      this.barStart = this.sliderData[0];
      this.barEnd = this.sliderData[1];
      document.removeEventListener('mousemove',this.mousemoveCallBackBar);
      this.mousemoveCallBackBar = null;
      document.removeEventListener('mousemove',this.mousemoveCallBackLeft);
      this.mousemoveCallBackLeft = null;
      document.removeEventListener('mousemove',this.mousemoveCallBackRight);
      this.mousemoveCallBackRight = null;
    }
  },
  methods: {
    // 生成随机id,因为是复用组件，避免id重复的情况
    randomString (len) {
      len = len || 32;
      let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
      let maxPos = $chars.length;
      let str = '';
      for (let i = 0; i < len; i++) {
        str += $chars.charAt(Math.floor(Math.random() * maxPos));
      }
      return str;
    },
    // 设置宽度和left
    setDomStyle (barStart, barEnd) {
      this.barDom.style.width = (barEnd - barStart) * this.step + 'px';
      this.barDom.style.left = barStart * this.step + 'px';
    },
    mouseDownBar (event) {
      // 记录鼠标点击位置
      this.pointX = event.clientX;
      // 记录初始位置
      this.barDomLeft = this.barDom.offsetLeft;
      // 鼠标移动，改变位置
      let pre = 0;
      this.mousemoveCallBackBar = event => {
        let moveLeft = event.clientX - this.pointX;
        let moveLeftNum = moveLeft / this.step;
        let barStart = 0;
        let barEnd = 0;
        barStart = this.barStart +  moveLeftNum;
        barEnd = this.barEnd +  moveLeftNum;
        if (barEnd > this.maxData) {
          return;
        }
        if (barStart < 0) {
          return;
        }
        pre = moveLeft;
        this.$emit('input', [Math.round(barStart), Math.round(barEnd)])
        this.barDom.style.left = this.barDomLeft + event.clientX - this.pointX + 'px';
      }
      document.addEventListener('mousemove',this.mousemoveCallBackBar);
    },
    mouseDownLeft (event) {
      this.pointX = event.clientX;
      let pre = 0;
      this.mousemoveCallBackLeft = event => {
        let moveLeft = event.clientX - this.pointX;
        let moveLeftNum = moveLeft / this.step;
        let barStart = 0;
        barStart = this.barStart +  moveLeftNum;
        if (barStart > this.maxData) {
          return;
        }
        if (barStart < 0) {
          return;
        }
        pre = moveLeft;
        this.$emit('input', [Math.round(barStart), Math.round(this.barEnd)])
        this.setDomStyle(barStart, this.barEnd)
      }
      document.addEventListener('mousemove',this.mousemoveCallBackLeft);
    },
    mouseDownRight (event) {
      this.pointX = event.clientX;
      let pre = 0;
      this.mousemoveCallBackRight = event => {
        let moveLeft = event.clientX - this.pointX;
        let moveLeftNum = moveLeft / this.step;
        let barEnd = 0;
        barEnd = this.barEnd +  moveLeftNum;
        if (barEnd > this.maxData) {
          return;
        }
        if (barEnd < this.barStart) {
          return;
        }
        pre = moveLeft;
        this.$emit('input', [Math.round(this.barStart), Math.round(barEnd)])
        this.setDomStyle(this.barStart, barEnd)
      }
      document.addEventListener('mousemove',this.mousemoveCallBackRight);
    }
  }
}
</script>

<style scoped>
  .vue-slider-box-track {
    position: relative;
    width: 100%;
    height: 100%;
    border: 1px solid rgba(231,235,240,1);
  }
  .vue-slider-box-bar {
    position: absolute;
    height: calc(100% + 2px);
    top: -1px;
    z-index: 1;
    background-color: rgba(216,225,235,.5);
    border-left: 1px solid rgba(216,225,235,1);
    border-right: 1px solid rgba(216,225,235,1);
    cursor: e-resize;
  }
  .vue-slider-box-bar .left-btn {
    float: left;
    position: relative;
    width: 8px;
    height: 14px;
    margin-top: 8px;
    margin-left: -4px;
    background-color: rgba(216,225,235,1);
    cursor: e-resize;
  }
  .vue-slider-box-bar .right-btn {
    float: right;
    position: relative;
    width: 8px;
    height: 14px;
    margin-top: 8px;
    margin-right: -4px;
    background-color: rgba(216,225,235,1);
    cursor: e-resize;
  }
</style>
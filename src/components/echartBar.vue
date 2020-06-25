<template>
  <div :id="myChartId" class="chart"></div>
</template>

<script>
// 引入 echarts 主模块
let echarts = require('echarts/lib/echarts');
// 引入柱状图
require('echarts/lib/chart/bar');
// 引入其他组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/legend');
export default {
  props: {
    echartConfig: {
      type: Object,
      default: {},
      required: true,
    }
  },
  watch:{
    echartConfig: {
      handler: function(){
        this.$nextTick(function(){
          this.drawMyChart();
        })
      },
      deep: true,
      immediate: true
    }
  },
  data(){
  	return {
      myChartId: null,
      myChart: null,
      // 图表配置项
      option: {
        tooltip: {},
        xAxis: {
          data: this.echartConfig.xAxisData
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: this.echartConfig.data
        }]
      }
  	}
  },
  created(){
    this.myChartId = this.randomString(6);
  },
  mounted(){
    this.myChart = echarts.init(document.getElementById(this.myChartId));
    
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
    // 绘制echarts
    drawMyChart(){
      this.myChart.setOption(this.option);
    }
  }
}
</script>

<style scoped>
  .chart{
    width: 100%;
    height: 100%;
  }
</style>
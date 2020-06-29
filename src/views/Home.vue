<template>
  <div class="home">
    <div class="block">
      <!-- <vue-slider-box :sliderData="dataZoom" :max="max" @input="handelDataZoom"></vue-slider-box> -->
    </div>
    <div id="container"></div>
  </div>
</template>
<!-- <script src="https://code.highcharts.com.cn/highcharts-plugins/highcharts-zh_CN.js"></script> -->
<script>
// import Highcharts from 'highcharts'
import HighStock from 'highcharts/highstock'
import res  from './data.js'
export default {
  name: 'Home',
  components: {
  },
  data(){
  	return {
      dataZoom: [0,100],
      max: 200,
      id: 'container',
  	}
  },
  mounted(){
    // console.log(Highcharts)
    // let element = document.createElement('script');
    // element.src = 'https://code.highcharts.com.cn/highcharts-plugins/highcharts-zh_CN.js';
    // document.body.appendChild(element);
    for (let i = 0; i < res.data.length; i ++) {
      res.data[i].length = 2;
    }
    let data = res.data;
    // console.log(data)
    let data1 = [
      [1147651200000,23.15],
      [1147737600000,23.01],
      [1147824000000,22.73],
      [1147910400000,22.83],
      [1147996800000,22.56],
      [1148256000000,22.88],
      [1148342400000,22.79],
      [1148428800000,23.50],
      [1148515200000,23.74],
      [1148601600000,23.72],
      [1148947200000,23.15],
      [1149033600000,22.65],
    ]
    let data2 = [
      [1147651200000,22.82],
      [1147737600000,22.76],
      [1147824000000,22.50],
      [1147910400000,22.13],
      [1147996800000,22.04],
      [1148256000000,22.11],
      [1148342400000,21.92],
      [1148428800000,21.71],
      [1148515200000,21.51],
      [1148601600000,21.88],
      [1148947200000,22.07],
      [1149033600000,22.10],
      
    ]
    HighStock.setOptions({
      lang: {
        resetZoomTitle: '缩放',
        weekdays: ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
        shortMonths: ['01','02','03','04','05','06','07','08','09','10','11','12']
      }
    });
    HighStock.stockChart('container', {
      rangeSelector: {
        buttons : [],
        selected: 1,
        inputEnabled : false,
      },
      credits: {
        enabled: false
      },
      colors: ['#456EA1','#6890C1'],
      navigator: {
        height: 30
      },
      scrollbar: {
        height: 10
      },
      xAxis: {
        labels: {
          formatter: function () {
            var now = new Date(this.value);
            var yy = now.getFullYear();      //年
            var mm = now.getMonth() + 1;     //月
            var dd = now.getDate();          //日
            var clock = yy + "-";
            if(mm < 10) clock += "0";
            clock += mm + "";
            // if(dd < 10) clock += "0";
            // clock += dd;
            return clock;
          }
        }
      },
      yAxis: {
        gridLineColor: '#E7EBF0',
        labels: {
          formatter: function () {
            return (this.value > 0 ? ' + ' : '') + this.value + '%';
          }
        },
        plotLines: [{
          value: 0,
          width: 2,
          color: 'silver'
        }]
      },
      plotOptions: {
        series: {
          compare: 'percent'
        }
      },
      tooltip: {
        split: false,
        shared: true
      },
      tooltip: {
        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
        valueDecimals: 2,
        split: false,
        shared: true
      },
      series:  [{
        name: '本基金',
        data: data1
      },{
        name: '沪深300',
        data: data2
      }]
    });
  },
  methods: {
    createTime(v){
      var now = new Date(v);
      var yy = now.getFullYear();      //年
      var mm = now.getMonth() + 1;     //月
      var dd = now.getDate();          //日
      // var hh = now.getHours();         //时
      // var ii = now.getMinutes();       //分
      // var ss = now.getSeconds();       //秒
      var clock = yy + "-";
      if(mm < 10) clock += "0";
      clock += mm + "-";
      if(dd < 10) clock += "0";
      clock += dd + " ";
      // if(hh < 10) clock += "0";
      // clock += hh + ":";
      // if (ii < 10) clock += '0'; 
      // clock += ii + ":";
      // if (ss < 10) clock += '0'; 
      // clock += ss;
      return clock;
    },
    handelDataZoom (val) {
      this.dataZoom = val;
      console.log(val)
    }
  }
}
</script>

<style scoped>
.block {
  width: 500px;
  height: 30px;
}
#container {
  width: 500px;
  height: 300px;
  margin: 30px auto;
  border: 1px solid red;
}
</style>
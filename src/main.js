import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import highcharts from 'highcharts/highstock'
// import HighchartsMore from 'highcharts/highcharts-more';
// import SolidGauge from 'highcharts/modules/solid-gauge.js'
import Highcharts from 'highcharts'
// HighchartsMore(highcharts);
// SolidGauge(highcharts);
Vue.config.productionTip = false



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

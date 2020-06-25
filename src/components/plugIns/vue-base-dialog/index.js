// module.exports = require('./lib/common');
// console.log()
import VueBaseDialog from './lib/VueBaseDialog.vue'
VueBaseDialog.install = function(Vue) {
  Vue.component(VueBaseDialog.name, VueBaseDialog);
};
export default VueBaseDialog
import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css'
import {
  Icon,
  Button,
  Input,
  Message,
  Submenu,
  Menu,
  MenuItem,
  MenuItemGroup,
  Form,
  FormItem,
  DatePicker,
  Checkbox,
  CheckboxGroup,
  Table,
  TableColumn,
  Select,
  Option,
  Loading,
  Pagination,
  Radio,
  RadioGroup,
  Tree,
  Upload,
} from 'element-ui'

Vue.use(Icon);
Vue.use(Button);
Vue.use(Input);
Vue.use(Submenu);
Vue.use(Menu);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(DatePicker);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Select);
Vue.use(Option);
Vue.use(Pagination);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Tree);
Vue.use(Upload);

// 封装全局loading
let loading = null;
const openLoading = obj => {
  loading = Loading.service({
    lock: obj ? obj.lock ? obj.lock : true : true,
    text: obj ? obj.text ? obj.text : '正在加载...' : '正在加载...',
    spinner: obj ? obj.spinner ? obj.spinner : 'el-icon-loading' : 'el-icon-loading',
    background: obj ? obj.background ? obj.background : 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.9)'
  });
  return true;
}
const closeLoading = () => {
  if (loading) {
    loading.close();
    loading = null;
  }
}
// 封装elementui成功提示弹框
const successMsg = ms => {
  Message({
    showClose: true,
    message: ms,
    type: 'success'
  });
};
// 封装elementui失败提示弹框
const errorMsg = ms => {
  Message({
    showClose: true,
    message: ms,
    type: 'error'
  });
};
// 封装elementui警告提示弹框
const warningMsg = ms => {
  Message({
    showClose: true,
    message: ms,
    type: 'warning'
  });
};

export { 
  loading,
  openLoading,
  closeLoading,
  successMsg,
  errorMsg,
  warningMsg
}
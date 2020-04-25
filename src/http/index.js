import axios from 'axios';
import { 
  successMsg,
  errorMsg,
  openLoading,
  closeLoading
 } from '@/ui';

let selFn = null;
let selErrMsg = null;
let selSucMsg = null;
let pendingArr = [];

// 收集发起的请求
const addPendingArr = beforeUrl => {
  pendingArr.push(beforeUrl);
}

// 删除完成的请求
const removePendingArr = afterUrl => {
  pendingArr.splice(pendingArr.indexOf(afterUrl), 1);
}

// 状态提示函数
const showStatus = status => ({
  400: '请求错误 (400)',
  401: '未授权，请重新登录 (401)',
  403: '拒绝访问 (403)',
  404: '请求出错 (404)',
  408: '请求超时 (408)',
  500: '服务器错误 (500)',
  501: '服务未实现 (501)',
  502: '网络错误 (502)',
  503: '服务不可用 (503)',
  504: '网络超时 (504)',
  505: 'HTTP版本不受支持 (505)'
})[status] || `连接出错${ status }`;

// 创建axios实例
let http = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '/rcs' : '/rcs',
  headers: {
    get: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    },
    post: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  },
  timeout: 60000*2
});

// 请求拦截器
http.interceptors.request.use( config => {
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();
  config.cancelToken = source.token;
  // 先判断该请求是否在正在请求的数组中
  const pendingUrl = config.baseURL + config.url;
  if (pendingArr.indexOf(pendingUrl) > -1) {
    // 终止该请求
    source.cancel();
  } else {
    // 放入正在请求的数组中
    addPendingArr(pendingUrl)
  }
  // 请求发送前，判断是否自定义code不为0的情况的提示信息
  config.fn ? selFn = config.fn : selFn = null;
  config.loading ? openLoading() : false;
  config.selErrMsg ? selErrMsg = config.selErrMsg : selErrMsg = null;
  config.selSucMsg ? selSucMsg = config.selSucMsg : selSucMsg = null;
  return config;
});

// 响应拦截器
http.interceptors.response.use( response => {
  // 请求成功，将该请求从正在请求的数组中删除
  removePendingArr(response.config.baseURL + response.config.url);
  // 关闭loading
  closeLoading();
  selFn ? selFn() : null;
  const { data } = response;
  if (data.code === 0) {
    // 状态码code为0，表示拿到正确数据，判断是否显示提示
    selSucMsg ? successMsg(selSucMsg) : false;
    return data;
  } else {
    // 状态码不为0，表示拿到错误数据，判断显示自定义或默认提示
    selErrMsg ? errorMsg(selErrMsg) : errorMsg(data.message);
    return Promise.reject(response.config.url)
  }
}, error => {
  const { response } = error;
  // 请求成功，将该请求从正在请求的数组中删除
  removePendingArr(response.config.baseURL + response.config.url);
  // 关闭loading
  closeLoading();
  selFn ? selFn() : null;
  errorMsg(showStatus(response.status));
  return Promise.reject('服务器错误!');
});

export default http
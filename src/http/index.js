import axios from 'axios';
import { 
  successMsg,
  errorMsg,
  openLoading,
  closeLoading
 } from '@/ui';

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


let selFn = null;
let loading = null;
let selErrMsg = null;
let selSucMsg = null;

// 请求拦截器
http.interceptors.request.use( config => {
  // 请求发送前，判断是否自定义code不为0的情况的提示信息
  config.fn ? selFn = config.fn : selFn = null;
  config.loading ? loading = openLoading() : loading = null;
  config.selErrMsg ? selErrMsg = config.selErrMsg : selErrMsg = null;
  config.selSucMsg ? selSucMsg = config.selSucMsg : selSucMsg = null;
  return config;
});

// 响应拦截器
http.interceptors.response.use( response => {
  // 请求成功
  loading ? closeLoading() : null;
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
  // 请求失败
  loading ? closeLoading() : null;
  selFn ? selFn() : null;
  const { response } = error;
  errorMsg(showStatus(response.status));
  return Promise.reject('服务器错误!');
});

export default http
import http from '@/http'

// 获取法院
const getUnits = params => http.get('/Map/getUnits', { 
  params,
  loading: true
 });

// 登录
const login = params => http.post('/login/login', params);

export {
  getUnits,
  login
}
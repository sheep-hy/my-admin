import http from '../utils/request'

// 请求首页数据接口
export const getData = () => {
  return http.get('/home/getData')
}
// 用户列表的数据
export const getUser = (params) => {
  return http.get('/user/getUser', params)
}
// 新增
export const addUser = (data) => {
  return http.post('/user/add', data)
}
export const editUser = (data) => {
  return http.post('/user/edit', data)
}
export const delUser = (data) => {
  return http.post('/user/del', data)
}
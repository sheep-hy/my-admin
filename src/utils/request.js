import axios from 'axios'

const http = axios.create({
  baseURL: "/api",// 通用请求的地址前缀
  timeout: 10000,
})
http.interceptors.request.use((config) => {
  return config
}, (error) => {
  return Promise.reject(error)
})
http.interceptors.response.use((response) => {
  return response
}, (error) => {
  return Promise.reject(error)
})
export default http
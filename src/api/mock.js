import Mock from 'mockjs'
import homeApi from './mockServeData/home'
import userApi from './mockServeData/user'
// 定义mock请求拦截
Mock.mock('/api/home/getData', homeApi.getStatisticalData)
// 用户列表的数据
Mock.mock('/api/user/add', 'post', userApi.createUser)
Mock.mock('/api/user/edit', 'post', userApi.updateUser)
Mock.mock('/api/user/del', 'post', userApi.deleteUser)
Mock.mock(/api\/user\/getUser/, userApi.getUserList)
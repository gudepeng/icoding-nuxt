import Vue from 'vue'
import axios from 'axios'

const service = axios.create({
  // baseURL: 'https://api.surmon.me/'
  baseURL:'http://192.168.123.5'
})

// 拦截器
service.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

service.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.reject(error)
})

Vue.prototype.$http = axios
export default service

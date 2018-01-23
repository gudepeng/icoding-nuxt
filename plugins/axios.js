import Vue from 'vue'
import axios from 'axios'

const service = axios.create({
  // baseURL: 'http://39.106.214.109:8081'
  baseURL:'http://127.0.0.1:80'
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

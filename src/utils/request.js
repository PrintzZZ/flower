import axios from 'axios'
let root = ''
// let root = 'http://47.96.156.94'
let request = axios.create()
request.interceptors.request.use((config) => {
  config.url = root + config.url
  return config
})
request.defaults.headers['token'] = localStorage.getItem('token')

export default request

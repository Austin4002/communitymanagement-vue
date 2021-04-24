import axios from 'axios'

//导入NProgress 包对应的js和css
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

export function request(config) {
  const instance = axios.create({
    // baseURL:'http://172.20.10.10:8081/',
    baseURL:'http://127.0.0.1:8081/',
    timeout: 5000,
    // withCredentials:false,

  })

  instance.interceptors.request.use(config => {
    //请求发出前，做点什么
    NProgress.start()
    config.headers.Authorization = window.sessionStorage.getItem('token')
    return config
  }, err => {
    console.log(err);
  })

  instance.interceptors.response.use(res => {
    NProgress.done()
    //对响应数据做点什么
    return res.data
  }, err => {
    console.log(err);
  })

  return instance(config)
}

import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import qs from 'qs'
import router from '@/router'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  },
  transformRequest: [function(data, headers) {
    const ct = headers['Content-Type']
    // json 类型
    if (ct && ct.indexOf('application/json') > -1) {
      return JSON.stringify(data)
    }
    // FormData 类型，ie10 +
    if (ct && ct.indexOf('multipart/form-data') > -1) {
      return data
    }
    // Do whatever you want to transform the data
    return qs.stringify(data)
  }]
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      const token = 'Bearer '+ localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = token // 请求头部添加token
    }
    
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    // if the custom code is not 20000, it is judged as an error.
    if (res.returncode != 200) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
     
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return Promise.resolve(res)
    }
  },
  error => {
    console.log('err' + error) // for debug
    
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
   
    if( error.message=='Network Error'){
      router.push('/login')
    }
    return Promise.reject(error)
  }
)

export default service

/**
 * @Author: tangzhicheng
 * @Date: 2021-06-01 10:21:04
 * @LastEditors: tangzhicheng
 * @LastEditTime: 2021-06-02 11:45:12
 * @Description: file content
 */

import Requester from './requester/requester'

const instance = new Requester({
  config: {
    baseURL: '/'
  },
  options: {
    timeout: 30000
  }
})

// 配置请求拦截
instance.requestInterceptor.use((option) => {
  // option.options..token = '123456'
  return option
})

// 配置响应拦截
instance.responseInterceptor.use((result) => {
  return result
})

export default instance

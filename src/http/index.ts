/**
 * @Author: tangzhicheng
 * @Date: 2021-06-01 10:21:04
 * @LastEditors: tangzhicheng
 * @LastEditTime: 2021-06-01 17:14:51
 * @Description: file content
 */

import Requester from './requester'

const instance = new Requester({
  baseURL: '/api',
  timeout: 30000
})

instance.requestInterceptor.use((config) => {
  config.header.token = '123456'
  return config
})

instance.responseInterceptor.use((result) => {
  return result
})

export default instance

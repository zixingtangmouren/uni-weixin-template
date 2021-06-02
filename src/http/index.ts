/**
 * @Author: tangzhicheng
 * @Date: 2021-06-01 10:21:04
 * @LastEditors: tangzhicheng
 * @LastEditTime: 2021-06-02 16:42:18
 * @Description: file content
 */

import Requester from './requester/requester'

const instance = new Requester({
  config: {
    baseURL: 'http://localhost:3000'
  },
  options: {
    timeout: 30000
  },
  codes: {
    Success_Code: 0
  }
})

// 配置请求拦截
instance.requestInterceptor.use((material) => {
  material.options.header = {
    tk: 'tang'
  }
  return material
})

instance.requestInterceptor.use((material) => {
  material.options.url = material.config.baseURL + material.options.url
  return material
})

// 配置响应拦截
instance.responseInterceptor.use(
  ({ config, result }) => {
    const data = result.data
    if (config.defData && data.code === instance.responseInterceptor.codes.Success_Code) {
      return data.data
    }
    return result
  },

  ({ config, result }) => {
    if (config.defFail) {
      uni.showToast({ mask: true, title: '请求异常！' })
    } else {
      return new Error(result.errMsg || result.message)
    }
    return result
  }
)

export default instance

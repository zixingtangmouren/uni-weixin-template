/**
 * @Author: tangzhicheng
 * @Date: 2021-06-16 10:57:47
 * @LastEditors: tangzhicheng
 * @LastEditTime: 2021-06-16 15:25:38
 * @Description: file content
 */

import { UniRequester } from './uni-requester'

const requester = new UniRequester(
  {
    baseUrl: 'http://localhost:3000',
    load: true,
    defData: false,
    defEx: true,
    defFail: true
  }
)

requester.Interceptor.invoke.use(({ options, config }) => {
  if (config.load) {
    requester.showLoading()
  }
  return { options, config }
})

requester.Interceptor.invoke.use(({ options, config }) => {
  options.header.Authorization = 'xxx'
  return { options, config }
})

requester.Interceptor.invoke.use(({ options, config }) => {
  options.url = config.baseUrl + options.url
  return { options, config }
})

requester.Interceptor.fail.use(err => {
  console.log(err instanceof Error)
  uni.showToast({ title: err.errMsg || '请求失败！', icon: 'none' })
  return err
})

requester.Interceptor.complete.use(({ options, config }) => {
  if (config.load) {
    console.log(213123)
    requester.hideLoading()
  }
  return { options, config }
})

export default requester

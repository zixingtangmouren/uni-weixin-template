/**
 * @Author: tangzhicheng
 * @Date: 2021-06-16 10:57:47
 * @LastEditors: tangzhicheng
 * @LastEditTime: 2021-06-16 16:27:49
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

requester.Interceptor.success.use(({ result, config }) => {
  if (config.defFail && result.statusCode !== 200) {
    uni.showToast({ title: '请求失败！', icon: 'none' })
  }

  return { result, config }
})

requester.Interceptor.success.use(({ result, config }) => {
  let processed = result
  if (config.defData && result.statusCode === 200) {
    processed = (processed.data as AnyObject).data
  }

  return processed
})

requester.Interceptor.fail.use(({ error, config }) => {
  let title = ''
  if (config.defFail) {
    if (error instanceof Error) {
      title = error.message
    } else {
      title = error.errMsg
    }
    uni.showToast({ title: title || '请求失败！', icon: 'none' })
  }

  return { error, config }
})

requester.Interceptor.complete.use(({ options, config }) => {
  if (config.load) {
    requester.hideLoading()
  }
  return { options, config }
})

export default requester

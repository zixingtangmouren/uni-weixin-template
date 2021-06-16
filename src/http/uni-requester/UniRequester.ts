/**
 * @Author: tangzhicheng
 * @Date: 2021-06-16 10:58:39
 * @LastEditors: tangzhicheng
 * @LastEditTime: 2021-06-16 15:16:52
 * @Description: file content
 */

import Vue from 'vue'
import Interceptor from './Interceptor'
import { Config, RequesterOptions, Status } from './types'

class UniRequester {
  // 请求库的全局数据
  public status: Status = Vue.observable<Status>({
    loading: false,
    requestCount: 0
  })

  // 请求前，成功，失败对应的拦截器
  public Interceptor = {
    invoke: new Interceptor<{
      options: UniApp.RequestOptions,
      config:Config
    }>(),
    success: new Interceptor<UniApp.RequestSuccessCallbackResult, any>(),
    fail: new Interceptor<UniApp.GeneralCallbackResult>(),
    complete: new Interceptor<{
      options: UniApp.RequestOptions,
      config:Config
    }>()
  }

  // 请求库默认的配置
  private config: Config
  // uni.request默认的配置
  private requesterOptions: RequesterOptions = {
    method: 'GET'
  }

  constructor(config: Config, options?:RequesterOptions) {
    this.config = config
    if (options) {
      this.requesterOptions = options
    }
  }

  // 暴露给外部的请求方法
  public async request(options:UniApp.RequestOptions, config?: Config) {
    const mergeOptions = Object.assign(this.requesterOptions, options)
    const mergeConfig = Object.assign(this.config, config)
    const allOptions = {
      options: mergeOptions,
      config: mergeConfig
    }

    // 执行发起请求前的拦截器
    this.Interceptor.invoke.run(allOptions)

    try {
      const result = await this.createRequest(mergeOptions)
      // 执行请求成功的拦截器
      return this.Interceptor.success.run(result)
    } catch (error) {
      // 执行请求失败的拦截器
      this.Interceptor.fail.run(error)
      throw new Error(error.errMsg || error.message || '请求报错')
    } finally {
      this.Interceptor.complete.run(allOptions)
    }
  }

  public showLoading() {
    if (!this.status.loading) {
      uni.showLoading({ title: '加载中...' })
    }
    this.status.requestCount++
  }

  public hideLoading() {
    this.status.requestCount--

    // console.log(this.status.requestCount)
    if (this.status.requestCount === 0) {
      uni.hideLoading()
    }
  }

  // 创建请求的promise和uni.request产生的requestTask
  private createRequest(options:UniApp.RequestOptions): Promise<UniApp.RequestSuccessCallbackResult> {
    console.log(1323)
    return new Promise((resolve, reject) => {
      const success = (res: UniApp.RequestSuccessCallbackResult) => {
        resolve(res)
      }

      const fail = (res: UniApp.GeneralCallbackResult) => {
        reject(res)
      }

      options.success = success
      options.fail = fail

      uni.request(options)
    })
  }
}

export default UniRequester

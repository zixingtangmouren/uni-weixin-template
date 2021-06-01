/**
 * @Author: tangzhicheng
 * @Date: 2021-05-31 15:10:13
 * @LastEditors: tangzhicheng
 * @LastEditTime: 2021-06-01 14:15:26
 * @Description: Requester
 */

import Vue from 'vue'
import {
  RequesterOptions, RequesterState, SuccessResult, GeneralResult, ConfigOptions
} from './types'

import Interceptor from './interceptors'

export default class Requester {
  public state: RequesterState = Vue.observable<RequesterState>({
    isLoading: false,
    requestCount: 0
  })

  public options: ConfigOptions = {
    baseURL: '/',
    load: true,
    defData: false,
    defEx: true,
    defFail: true
  }

  public requestInterceptor = new Interceptor()
  public responseInterceptor = new Interceptor()

  constructor(options: ConfigOptions) {
    this.options = Object.assign(this.options, options)
  }

  private increaseRequest() {
    this.state.requestCount += 1
    if (!this.state.isLoading) {
      this.state.isLoading = true
      uni.showLoading({
        title: '加载中……'
      })
    }
  }

  private reduceRequest() {
    this.state.requestCount -= 1
    if (this.state.requestCount === 0) {
      this.state.isLoading = false
      uni.hideLoading()
    }
  }

  private createRequestPromise(options: RequesterOptions): Promise<SuccessResult | GeneralResult> {
    return new Promise((resolve, reject) => {
      const success = (res: SuccessResult) => {
        resolve(res)
      }

      const fail = (err: GeneralResult) => {
        reject(err)
      }

      const complete = () => {
        console.log('niubi')
      }

      uni.request({
        ...options,
        success,
        complete,
        fail
      })
    })
  }

  public async request(options: RequesterOptions) {
    const mergeOptions = this.requestInterceptor.run(Object.assign(this.options, options))
    mergeOptions.url = mergeOptions.baseURL + mergeOptions.url
    this.increaseRequest()

    try {
      const result = await this.createRequestPromise(mergeOptions) as SuccessResult
      const data = (result.data || {}) as AnyObject

      if (data.code === 0) {
        return mergeOptions.defData ? data.data : data
      }

      if (mergeOptions.defEx) {
        uni.showToast({ mask: true, title: data.msg || '后台报错！' })
      } else {
        return data
      }
    } catch (error) {
      console.error(error)
      if (mergeOptions.defFail) {
        uni.showToast({ mask: true, title: '请求异常！' })
      } else {
        return new Error(error.errMsg || error.message)
      }
    } finally {
      this.reduceRequest()
    }
  }
}

/**
 * @Author: tangzhicheng
 * @Date: 2021-05-31 15:10:13
 * @LastEditors: tangzhicheng
 * @LastEditTime: 2021-06-02 16:38:16
 * @Description: Requester
 */

import Vue from 'vue'
import {
  RequesterOptions, RequesterState, SuccessResult, GeneralResult, ConfigOptions, PartialUniRequestOptions, InitRequesterOptions
} from './types'

import Interceptor from './interceptors'

export default class Requester {
  public state: RequesterState = Vue.observable<RequesterState>({
    isLoading: false,
    requestCount: 0
  })

  // requester配置
  public config: ConfigOptions = {
    baseURL: '/',
    load: true,
    defData: false,
    defEx: true,
    defFail: true
  }

  // uni.request方法的配置
  public options: PartialUniRequestOptions = {
    method: 'GET',
    timeout: 30000,
    dataType: 'json'
  }

  public requestInterceptor: Interceptor<RequesterOptions>
  public responseInterceptor: Interceptor<{
    config: ConfigOptions,
    result: any
  }>

  constructor({ config, options, codes }: InitRequesterOptions) {
    this.config = Object.assign(this.config, config)
    this.options = Object.assign(this.options, options)
    this.requestInterceptor = new Interceptor(codes)
    this.responseInterceptor = new Interceptor(codes)
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

  /**
   * 创建请求的promise
   * @param options
   * @returns
   */
  private createRequestPromise(options: UniApp.RequestOptions): Promise<SuccessResult | GeneralResult> {
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

  public async request(options: UniApp.RequestOptions, config?: ConfigOptions) {
    const mergeMaterial = this.requestInterceptor.runWithSuccessTask({
      config: Object.assign(this.config, config),
      options: Object.assign(this.options, options)
    })

    this.increaseRequest()

    try {
      // 请求成功的处理
      const result = await this.createRequestPromise(mergeMaterial.options) as SuccessResult
      return this.responseInterceptor.runWithSuccessTask({
        config: mergeMaterial.config,
        result
      })
    } catch (error) {
      const result = this.responseInterceptor.runWithErrorTask({
        config: mergeMaterial.config,
        error
      })

      throw Error(result.error.errMsg || result.error.message || '请求失败！')
      // 应该合理的将异常抛出
    } finally {
      this.reduceRequest()
    }
  }
}

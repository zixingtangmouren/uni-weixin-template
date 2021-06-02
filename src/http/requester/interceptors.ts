/**
 * @Author: tangzhicheng
 * @Date: 2021-06-01 11:01:21
 * @LastEditors: tangzhicheng
 * @LastEditTime: 2021-06-02 16:53:26
 * @Description: 拦截器对象
 */

import { Task, Codes, GeneralResult, ConfigOptions } from './types'
import { compose } from '@/utils/common'

/**
 * 处理请求之前/响应之后的相关配置
 */
export default class Interceptor<T = any, M = T> {
  private successTaskQueue: Task<T, M>[] = []
  private errorTaskQueue: Task<T, Error | GeneralResult>[] = []
  public codes: Codes = {}

  constructor(codes: Codes = {}) {
    this.codes = codes
  }

  public use(successTask: Task<T, M>, errorTask?: Task<T, Error | GeneralResult>) {
    this.successTaskQueue.push(successTask)
    errorTask && (this.errorTaskQueue.push(errorTask))
  }

  public runWithSuccessTask<V = any>(material: V): V {
    return compose<Task<T, M>, V>(...this.successTaskQueue)(material)
  }

  public runWithErrorTask<V extends { config: ConfigOptions }>(material: V): V {
    return compose<Task<T, Error | GeneralResult>, V>(...this.errorTaskQueue)(material)
  }
}

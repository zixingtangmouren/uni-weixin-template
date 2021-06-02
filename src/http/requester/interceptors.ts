/**
 * @Author: tangzhicheng
 * @Date: 2021-06-01 11:01:21
 * @LastEditors: tangzhicheng
 * @LastEditTime: 2021-06-02 17:09:31
 * @Description: 拦截器对象
 */

import { Task, Codes } from './types'
import { compose } from '@/utils/common'

export default class Interceptor<T = any, M = T> {
  private successTaskQueue: Task<T, M>[] = []
  private errorTaskQueue: Task<T, M>[] = []
  public codes: Codes = {}

  constructor(codes: Codes = {}) {
    this.codes = codes
  }

  public use(successTask: Task<T, M>, errorTask?: Task<T, M>) {
    this.successTaskQueue.push(successTask)
    errorTask && (this.errorTaskQueue.push(errorTask))
  }

  public runWithSuccessTask<V = any>(material: V) {
    return this.run<Task<T, M>, V>(this.successTaskQueue)(material)
  }

  public runWithErrorTask<V = any>(material: V) {
    return this.run<Task<T, M>, V>(this.errorTaskQueue)(material)
  }

  private run<T extends Function, V>(taskQueue: T[]) {
    return compose<T, V>(...taskQueue)
  }
}

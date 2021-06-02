/**
 * @Author: tangzhicheng
 * @Date: 2021-06-01 11:01:21
 * @LastEditors: tangzhicheng
 * @LastEditTime: 2021-06-02 10:10:49
 * @Description: 拦截器对象
 */

import { ErrorTask, GeneralResult, Task } from './types'
import { compose } from '@/utils/common'

export default class Interceptor<T = any> {
  private successTaskQueue: Task<T>[] = [];
  private errorTaskQueue: ErrorTask[] = [];

  public use(successTask: Task<T>, errorTask?: ErrorTask) {
    this.successTaskQueue.push(successTask)
    errorTask && (this.errorTaskQueue.push(errorTask))
  }

  public runWithSuccessTask<V = any>(material: V): V {
    return this.run<Task<T>, V>(this.successTaskQueue)(material)
  }

  public runWithErrorTask<V extends Error | GeneralResult>(material: V): V {
    return this.run<ErrorTask, V>(this.errorTaskQueue)(material)
  }

  private run<T extends Function, V>(taskQueue: T[]) {
    return compose<T, V>(...taskQueue)
  }
}

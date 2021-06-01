/**
 * @Author: tangzhicheng
 * @Date: 2021-06-01 11:01:21
 * @LastEditors: tangzhicheng
 * @LastEditTime: 2021-06-01 17:00:11
 * @Description: file content
 */

import { Task } from './types'
import { compose } from '@/utils/common'

export default class Interceptor {
  private taskQueue: Task[] = [];

  public use(task: Task) {
    this.taskQueue.push(task)
  }

  public run<T = any>(material: T): T {
    try {
      return compose<Task, T>(...this.taskQueue)(material)
    } catch (error) {
      console.error(error)
      return material
    }
  }
}

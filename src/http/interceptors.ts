/**
 * @Author: tangzhicheng
 * @Date: 2021-06-01 11:01:21
 * @LastEditors: tangzhicheng
 * @LastEditTime: 2021-06-01 14:13:45
 * @Description: file content
 */

import { RequesterOptions, Task } from './types'

export default class Interceptor {
  private taskQueue: Task[] = [];

  public use(task: Task) {
    this.taskQueue.push(task)
  }

  public run(option: RequesterOptions): RequesterOptions {
    try {
      return this.taskQueue.reduce((result, curTask) => curTask(result), option)
    } catch (error) {
      console.error(error)
      return option
    }
  }
}

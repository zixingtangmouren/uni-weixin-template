/**
 * @Author: tangzhicheng
 * @Date: 2021-06-16 11:23:03
 * @LastEditors: tangzhicheng
 * @LastEditTime: 2021-06-16 15:46:24
 * @Description: file content
 */

import { compose } from '@/utils/common'
import { InterceptorTask } from './types'

class Interceptor<I, O = I> {
  private queue:InterceptorTask<I, O>[] = [];

  public use(task:InterceptorTask<I, O> | InterceptorTask<I, O>[]) {
    if (task instanceof Array) {
      return this.queue.push(...task)
    }
    this.queue.push(task)
  }

  public run(args: I) {
    return compose(...this.queue)(args)
  }
}

export default Interceptor

/**
 * @Author: tangzhicheng
 * @Date: 2021-06-16 11:23:03
 * @LastEditors: tangzhicheng
 * @LastEditTime: 2021-06-16 15:06:51
 * @Description: file content
 */

import { compose } from '@/utils/common'
import { InterceptorTask } from './types'

class Interceptor<I, O = I> {
  private queue:InterceptorTask<I, O>[] = [];

  public use(task:InterceptorTask<I, O>) {
    this.queue.push(task)
  }

  public run(args: I) {
    return compose(...this.queue)(args)
  }
}

export default Interceptor

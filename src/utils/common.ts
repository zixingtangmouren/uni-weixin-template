/**
 * @Author: tangzhicheng
 * @Date: 2021-06-01 16:42:55
 * @LastEditors: tangzhicheng
 * @LastEditTime: 2021-06-02 17:03:37
 * @Description: 常用工具函数
 */

/**
 * 组合函数
 * @param rest
 * @returns
 */
export const compose = function<T extends Function, V = any>(...rest:T[]) {
  return function(val: any) {
    let result = val
    for (let i = 0; i < rest.length; i++) {
      result = rest[i](result)
    }
    return result as V
  }
}

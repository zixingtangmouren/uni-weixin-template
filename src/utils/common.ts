/**
 * @Author: tangzhicheng
 * @Date: 2021-06-01 16:42:55
 * @LastEditors: tangzhicheng
 * @LastEditTime: 2021-06-16 15:10:05
 * @Description: 常用工具函数
 */

/**
 * 组合函数
 * @param rest
 * @returns
 */
export const compose = function<T extends Function, V = any>(...rest:T[]) {
  return function(val: V) {
    let result: any = val
    for (let i = 0; i < rest.length; i++) {
      try {
        result = rest[i](result)
      } catch (error) {
        console.error(error)
        continue
      }
    }
    return result
  }
}

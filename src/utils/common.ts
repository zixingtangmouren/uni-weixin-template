/**
 * @Author: tangzhicheng
 * @Date: 2021-06-01 16:42:55
 * @LastEditors: tangzhicheng
 * @LastEditTime: 2021-06-01 16:55:01
 * @Description: 常用工具函数
 */

/**
 * 组合函数
 * @param rest
 * @returns
 */
export const compose = function<T extends Function, V>(...rest:T[]) {
  return function(val: V) {
    return rest.reduce((res, func) => func(res), val)
  }
}

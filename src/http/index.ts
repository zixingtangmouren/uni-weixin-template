/**
 * @Author: tangzhicheng
 * @Date: 2021-06-01 10:21:04
 * @LastEditors: tangzhicheng
 * @LastEditTime: 2021-06-01 11:58:32
 * @Description: file content
 */

import Requester from './requester'

const instance = new Requester({
  baseURL: '/api',
  timeout: 30000
})

export default instance

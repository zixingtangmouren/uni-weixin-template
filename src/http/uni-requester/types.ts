/**
 * @Author: tangzhicheng
 * @Date: 2021-06-16 11:00:49
 * @LastEditors: tangzhicheng
 * @LastEditTime: 2021-06-16 14:47:34
 * @Description: file content
 */

export interface Config {
  baseUrl?: string
  load?: boolean
  defEx?: boolean
  defFail?: boolean
  defData?: boolean
}

export type RequesterOptions = Partial<UniApp.RequestOptions>

export interface Status {
  loading: boolean
  requestCount: number
}

export interface InterceptorTask<I, O = I> {
  (args:I): O
}

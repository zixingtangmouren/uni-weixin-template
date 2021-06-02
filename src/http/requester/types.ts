/**
 * @Author: tangzhicheng
 * @Date: 2021-05-31 15:15:30
 * @LastEditors: tangzhicheng
 * @LastEditTime: 2021-06-02 15:57:54
 * @Description: 请求封装类型
 */

export interface ConfigOptions {
  baseURL?: string
  load?: boolean
  defEx?: boolean
  defData?: boolean
  defFail?: boolean
  timeout?: number
}

export interface RequesterOptions {
  config: ConfigOptions
  options: UniApp.RequestOptions
}

export type PartialUniRequestOptions = Partial<UniApp.RequestOptions>

export interface Codes {
  [key: string]: number
}
export interface InitRequesterOptions {
  config: ConfigOptions
  options: PartialUniRequestOptions
  codes: Codes
}

export interface RequesterState {
  isLoading: boolean
  requestCount: number
}

export type SuccessResult = UniApp.RequestSuccessCallbackResult
export type GeneralResult = UniApp.GeneralCallbackResult

export interface Task<T = any, V = T> {
  (option: T): V
}

export type ErrorTask = Task<Error | GeneralResult>

export interface ResponseData<T = any> {
  code: number
  data: T
  msg: null | string
}

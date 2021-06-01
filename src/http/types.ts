/**
 * @Author: tangzhicheng
 * @Date: 2021-05-31 15:15:30
 * @LastEditors: tangzhicheng
 * @LastEditTime: 2021-06-01 11:58:54
 * @Description: file content
 */

export interface ConfigOptions {
  baseURL: string
  load?: boolean
  defEx?: boolean
  defData?: boolean
  defFail?: boolean
  timeout?: number
}

export type RequesterOptions = ConfigOptions & UniApp.RequestOptions

export interface RequesterState {
  isLoading: boolean
  requestCount: number
}

export type SuccessResult = UniApp.RequestSuccessCallbackResult
export type GeneralResult = UniApp.GeneralCallbackResult

export interface Task {
  (option: RequesterOptions): RequesterOptions
}

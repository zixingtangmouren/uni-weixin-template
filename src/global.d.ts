/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/**
 * @Author: tangzhicheng
 * @Date: 2021-05-31 15:06:32
 * @LastEditors: tangzhicheng
 * @LastEditTime: 2021-05-31 15:08:00
 * @Description: file content
 */

import Vue from 'vue'

declare module 'vue/types/vue' {
  interface Vue {
    $api: any;
  }
}

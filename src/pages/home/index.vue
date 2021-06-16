<!--
 * @Author: tangzhicheng
 * @Date: 2021-05-31 15:04:52
 * @LastEditors: tangzhicheng
 * @LastEditTime: 2021-06-16 16:24:17
 * @Description: file content
-->

<template>
  <view>
    <button @click="onClick">click me</button>
  </view>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import rqer from '@/http/index'

@Component
export default class Home extends Vue {
  private created() {
  //  this.$el
    console.log(this.$api)
  }

  private async onClick() {
    // rqer.request({
    //   url: '/success',
    //   method: 'GET'
    // })

    // rqer.request({
    //   url: '/success',
    //   method: 'GET'
    // })

    // const res = await rqer.request({
    //   url: '/error',
    //   method: 'GET'
    // })

    const res = await rqer.request({
      url: '/success',
      method: 'GET'
    })

    console.log(res)
  }
}
</script>

<style lang='scss' scoped>
</style>

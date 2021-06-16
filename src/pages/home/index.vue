<!--
 * @Author: tangzhicheng
 * @Date: 2021-05-31 15:04:52
 * @LastEditors: tangzhicheng
 * @LastEditTime: 2021-06-16 17:04:58
 * @Description: file content
-->

<template>
  <view>
    <view>{{ loading ? 'loading' : 'over' }}</view>
    <button @click="onClick">click me</button>
  </view>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import rqer from '@/http/index'

@Component
export default class Home extends Vue {
  get loading() {
    return rqer.status.loading
  }

  private created() {
  //  this.$el
    console.log(this.$api)
    console.log(rqer.status)
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
    }, {
      defData: true
    })

    console.log(res)
  }
}
</script>

<style lang='scss' scoped>
</style>

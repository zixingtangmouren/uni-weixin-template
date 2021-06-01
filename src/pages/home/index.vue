<!--
 * @Author: tangzhicheng
 * @Date: 2021-05-31 15:04:52
 * @LastEditors: tangzhicheng
 * @LastEditTime: 2021-05-31 15:08:26
 * @Description: file content
-->

<template>
  <div>
    Home
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Home extends Vue {
  private created() {
  //  this.$el
    console.log(this.$api)
  }
}
</script>

<style lang='scss' scoped>
</style>

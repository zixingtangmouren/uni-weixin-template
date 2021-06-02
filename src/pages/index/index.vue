<!--
 * @Author: tangzhicheng
 * @Date: 2021-05-31 13:56:09
 * @LastEditors: tangzhicheng
 * @LastEditTime: 2021-06-02 15:00:01
 * @Description: file content
-->
<template>
  <view class="content">
    <image class="logo"
           src="../../static/logo.png"></image>
    <view>
      <text class="title"
            @click="go">{{title}}</text>
    </view>
  </view>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      title: 'Hello'
    }
  },
  onLoad() {

  },
  methods: {
    go() {
      console.log(12312)
      uni.navigateTo({
        url: '/pages/home/index'
      })
    }
  }
})
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin: 200rpx auto 50rpx auto;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>

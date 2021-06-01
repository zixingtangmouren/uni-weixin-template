<!--
 * @Author: tangzhicheng
 * @Date: 2021-05-31 13:56:09
 * @LastEditors: tangzhicheng
 * @LastEditTime: 2021-06-01 15:42:36
 * @Description: file content
-->
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  mpType: 'app',
  onLaunch() {
    console.log('App Launch')
  },
  onShow() {
    console.log('App Show')
  },
  onHide() {
    console.log('App Hide')
  }
})
</script>

<style>
/*每个页面公共css */
</style>

<script setup lang="ts">
import { onHide, onLaunch, onShow } from '@dcloudio/uni-app'

onLaunch(() => {
  console.log('App Launch')
})
onShow(() => {
  console.log('App Show')
})
onHide(() => {
  console.log('App Hide')
})
</script>

<style lang="scss">
@import 'uview-plus/index.scss';

page {
  background: #f5f7fb;
  color: #303133;
  font-size: 28rpx;
}

.page {
  min-height: 100vh;
  padding: 24rpx;
  box-sizing: border-box;
}
</style>

<style>
@import './app.css';
</style>

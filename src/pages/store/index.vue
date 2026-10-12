<template>
  <view class="page">
    <app-section title="选项式 Store" desc="state、getters、actions，以及 $patch / $reset。刷新后计数仍会保留。">
      <view class="count">{{ counter.count }}</view>
      <view class="hint">双倍：{{ counter.double }}</view>
      <view class="row">
        <view class="row__item">
          <up-button size="small" text="减一" @click="counter.decrement" />
        </view>
        <view class="row__item">
          <up-button size="small" type="primary" text="加一" @click="counter.increment" />
        </view>
        <view class="row__item">
          <up-button size="small" type="success" text="+5" @click="counter.add(5)" />
        </view>
        <view class="row__item">
          <up-button size="small" type="error" plain text="重置" @click="counter.reset" />
        </view>
      </view>
    </app-section>

    <app-section title="组合式 Store" desc="setup 写法配合 storeToRefs。登录后令牌会交给 luch-request 拦截器。">
      <view class="hint">昵称：{{ nickname }}</view>
      <view class="hint">登录态：{{ isLogin ? '已登录' : '未登录' }}</view>
      <view class="token">{{ token || '暂无令牌' }}</view>
      <up-input v-model="name" placeholder="输入昵称" border="surround" clearable />
      <view class="row row--form">
        <view class="row__item">
          <up-button type="primary" text="登录" @click="onLogin" />
        </view>
        <view class="row__item">
          <up-button type="info" plain text="退出" @click="user.logout" />
        </view>
      </view>
    </app-section>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useCounterStore } from '@/stores/counter'
import { useUserStore } from '@/stores/user'

const counter = useCounterStore()
const user = useUserStore()
const { nickname, token, isLogin } = storeToRefs(user)
const name = ref('')

function onLogin() {
  user.login(name.value)
  uni.showToast({ title: `你好，${nickname.value}`, icon: 'none' })
}
</script>

<style lang="scss" scoped>
.count {
  font-size: 72rpx;
  font-weight: 700;
  color: $u-primary;
  line-height: 1.2;
}

.hint {
  margin-top: 8rpx;
  color: $uni-text-color;
  font-size: 28rpx;
}

.token {
  margin: 12rpx 0 20rpx;
  color: $uni-text-color-grey;
  font-size: 24rpx;
  word-break: break-all;
}

.row {
  display: flex;
  flex-wrap: wrap;
  margin-top: 24rpx;
}

.row__item {
  margin-right: 16rpx;
  margin-bottom: 16rpx;
}

.row--form {
  margin-top: 20rpx;
}
</style>

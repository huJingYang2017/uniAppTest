<template>
  <view class="page">
    <view class="rounded-2xl bg-sky-500 p-5 text-white shadow-red-900">
      <view class="text-xs tracking-wide text-sky-100">uni-app · Vue 3 · Vite · TypeScript</view>
      <view class="mt-2 text-2xl font-semibold">{{ title }}</view>
      <view class="mt-2 text-sm text-sky-50 active:font-semibold">当前运行端：{{ platform }}</view>
    </view>

    <view class="mt-4 flex flex-wrap">
      <view v-for="tag in tags" :key="tag" class="mb-2 mr-2">
        <up-tag :text="tag" plain size="mini" />
      </view>
    </view>

    <app-section title="示例入口" desc="下面每张卡片对应一项已接入的技术。">
      <view
        v-for="item in entries"
        :key="item.path"
        class="entry rounded-xl bg-white p-4"
        @click="openPage(item.path)"
      >
        <view class="flex items-center justify-between">
          <text class="text-base font-medium text-slate-800">{{ item.title }}</text>
          <text class="text-xs text-sky-600">查看</text>
        </view>
        <view class="mt-2 text-sm leading-6 text-slate-500">{{ item.desc }}</view>
      </view>
    </app-section>
  </view>
</template>

<script setup lang="ts">
import { appConfig } from '@/config'
import { getPlatformLabel } from '@/utils/platform'

const title = appConfig.title
const platform = getPlatformLabel()

const tags = ['Vite', 'TypeScript', 'Pinia', 'luch-request', 'uView Plus', 'Tailwind', 'SCSS', 'Less', 'Stylus']

const entries = [
  {
    title: 'luch-request',
    desc: '实例、拦截器、令牌、loading、错误分类，以及取消请求。',
    path: '/pages/request/index',
  },
  {
    title: 'Pinia',
    desc: '选项式 Store、组合式 Store、getter、action，以及本地持久化。',
    path: '/pages/store/index',
  },
  {
    title: '样式方案',
    desc: '同一页面对比 SCSS、Less、Stylus 和 Tailwind CSS。',
    path: '/pages/styles/index',
  },
  {
    title: 'uView Plus',
    desc: 'Vue 3 组件库：表单、按钮、标签、图标、Toast 和工具函数。',
    path: '/pages/uview/index',
  },
]

function openPage(path: string) {
  uni.navigateTo({ url: path })
}
</script>

<style lang="scss" scoped>
.entry + .entry {
  margin-top: 20rpx;
}
</style>

<template>
  <view class="page">
    <app-section title="请求实例" :desc="`baseURL：${baseURL}`">
      <view class="text-sm leading-6 text-slate-600">
        令牌来自 Pinia。先到「Pinia」页登录，再回来发请求，结果里会显示拦截器写入的 Authorization。
      </view>
      <view class="mt-3 text-sm text-slate-800">当前令牌：{{ token || '未登录' }}</view>
    </app-section>

    <app-section title="调用" desc="GET / POST 走同一套拦截器；取消请求使用 Promise 上的 abort()。">
      <view class="action">
        <up-button type="primary" text="获取文章" @click="loadPost" />
      </view>
      <view class="action">
        <up-button type="success" text="创建文章" @click="submitPost" />
      </view>
      <view class="action">
        <up-button type="warning" text="请求不存在的地址" @click="loadMissing" />
      </view>
      <view class="action">
        <up-button type="info" text="发起后立即取消" @click="cancelRequest" />
      </view>
    </app-section>

    <app-section title="结果">
      <scroll-view scroll-y class="result">
        <text selectable class="result__text">{{ resultText }}</text>
      </scroll-view>
    </app-section>
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { isLuchRequestError } from 'luch-request'
import { createPost, fetchMissing, fetchPost } from '@/api/demo'
import { http } from '@/api/http'
import { appConfig } from '@/config'
import { useUserStore } from '@/stores/user'

const baseURL = appConfig.apiBaseUrl
const { token } = storeToRefs(useUserStore())
const result = ref('点击按钮后，这里会显示状态码、请求头和响应体。')

const resultText = computed(() => result.value)

function readAuthorization(header: object | undefined) {
  if (!header) return ''
  const found = Object.entries(header).find(([key]) => key.toLowerCase() === 'authorization')
  return found ? String(found[1]) : ''
}

function printSuccess(statusCode: number, header: object | undefined, data: unknown) {
  result.value = JSON.stringify(
    {
      statusCode,
      authorization: readAuthorization(header) || '（未携带，先在 Pinia 页登录）',
      data,
    },
    null,
    2,
  )
}

function printError(error: unknown) {
  if (!isLuchRequestError(error)) {
    result.value = '请求失败'
    return
  }
  const summary = error.toJSON()
  result.value = JSON.stringify(
    {
      code: summary.code,
      message: summary.message,
      statusCode: summary.statusCode ?? null,
    },
    null,
    2,
  )
}

async function loadPost() {
  try {
    const response = await fetchPost(1)
    printSuccess(response.statusCode, response.config.header, response.data)
  } catch (error) {
    printError(error)
  }
}

async function submitPost() {
  try {
    const response = await createPost({
      title: '来自 uni-app 的文章',
      body: 'luch-request 拦截器示例',
    })
    printSuccess(response.statusCode, response.config.header, response.data)
  } catch (error) {
    printError(error)
  }
}

async function loadMissing() {
  try {
    const response = await fetchMissing()
    printSuccess(response.statusCode, response.config.header, response.data)
  } catch (error) {
    printError(error)
  }
}

async function cancelRequest() {
  const pending = http.get('/posts/1', {
    luchMeta: { loading: false, toast: true, auth: true },
  })
  pending.abort('演示取消')
  try {
    await pending
  } catch (error) {
    printError(error)
  }
}
</script>

<style lang="scss" scoped>
.action + .action {
  margin-top: 16rpx;
}

.result {
  max-height: 640rpx;
  padding: 20rpx;
  border-radius: 16rpx;
  background: #0f172a;
  box-sizing: border-box;

  &__text {
    color: #e2e8f0;
    font-size: 24rpx;
    line-height: 1.6;
    word-break: break-all;
  }
}
</style>

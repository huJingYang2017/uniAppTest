<template>
  <view class="page">
    <up-notice-bar text="Vue 3 项目使用 uView Plus。uView 2 只支持 Vue 2，不能装进当前工程。" />

    <app-section title="基础组件" :desc="`系统：${osName} · ${formattedNow}`">
      <view class="icon-row">
        <up-icon name="photo" color="#3c9cff" size="28" />
        <up-icon name="heart-fill" color="#f56c6c" size="28" />
        <up-icon name="star-fill" color="#f9ae3d" size="28" />
      </view>
      <view class="tag-row">
        <up-tag text="主要" type="primary" />
        <up-tag text="成功" type="success" plain />
        <up-tag text="警告" type="warning" />
      </view>
      <up-cell-group>
        <up-cell title="工具函数" :value="toolTime" is-link @click="showToolToast" />
        <up-cell title="dayjs" :value="dayjsText" />
      </up-cell-group>
    </app-section>

    <app-section title="表单校验" desc="规则同时通过 props 和 setRules 设置，方便微信小程序生效。">
      <up-form ref="formRef" :model="form" :rules="rules" label-width="72">
        <up-form-item label="账号" prop="account" border-bottom>
          <up-input v-model="form.account" placeholder="至少 3 个字符" border="none" clearable />
        </up-form-item>
        <up-form-item label="备注" prop="remark">
          <up-input v-model="form.remark" placeholder="选填" border="none" />
        </up-form-item>
      </up-form>
      <view class="submit">
        <up-button type="primary" text="提交" @click="submit" />
      </view>
    </app-section>

    <up-toast ref="toastRef" />
  </view>
</template>

<script setup lang="ts">
import { onReady } from '@dcloudio/uni-app'
import { reactive, ref } from 'vue'
import dayjs from 'dayjs'
import type { FormRef, ToastRef } from 'uview-plus'

const formRef = ref<FormRef | null>(null)
const toastRef = ref<ToastRef | null>(null)
const osName = uni.$u.os()
const dayjsText = dayjs().format('YYYY-MM-DD HH:mm:ss')
const toolTime = uni.$u.timeFormat(Date.now(), 'yyyy-mm-dd hh:MM')
const formattedNow = dayjsText

const form = reactive({
  account: '',
  remark: '',
})

const rules = {
  account: [
    { required: true, message: '请填写账号', trigger: ['blur', 'change'] },
    { min: 3, message: '账号至少 3 个字符', trigger: ['blur', 'change'] },
  ],
}

onReady(() => {
  formRef.value?.setRules(rules)
})

function showToolToast() {
  uni.$u.toast(`当前系统 ${osName}`)
}

function submit() {
  formRef.value
    ?.validate()
    .then(() => {
      toastRef.value?.show({
        type: 'success',
        message: `已提交 ${form.account}`,
      })
    })
    .catch(() => {
      toastRef.value?.show({
        type: 'error',
        message: '请先把账号填写完整',
      })
    })
}
</script>

<style lang="scss" scoped>
.icon-row,
.tag-row {
  display: flex;
  align-items: center;
  margin-bottom: 20rpx;
}

.icon-row > view,
.tag-row > view {
  margin-right: 16rpx;
}

.submit {
  margin-top: 24rpx;
}
</style>

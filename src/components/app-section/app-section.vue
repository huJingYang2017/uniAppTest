<template>
  <view class="app-section">
    <view class="app-section__title">{{ title }}</view>
    <view v-if="desc" class="app-section__desc">{{ desc }}</view>
    <view class="app-section__body">
      <slot />
    </view>
  </view>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  desc?: string
}>()
</script>

<style lang="scss" scoped>
.app-section {
  margin-top: 24rpx;

  &__title {
    font-size: 32rpx;
    font-weight: 600;
    color: $uni-text-color;
  }

  &__desc {
    margin-top: 8rpx;
    font-size: 24rpx;
    line-height: 1.6;
    color: $uni-text-color-grey;
  }

  &__body {
    margin-top: 16rpx;
  }
}
</style>

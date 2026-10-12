<template>
  <view class="less-card">
    <text class="less-card__title">Less</text>
    <text class="less-card__text">变量、嵌套，以及从 variables.less 引入的主题色。</text>
  </view>
</template>

<style lang="less" scoped>
@import '../../styles/variables.less';

.less-card {
  background: @less-bg;
  border: 1px solid @less-border;
  border-radius: 16rpx;
  padding: 24rpx;

  &__title {
    display: block;
    font-size: 32rpx;
    font-weight: 600;
    color: @less-primary;
  }

  &__text {
    display: block;
    margin-top: 12rpx;
    font-size: 26rpx;
    line-height: 1.6;
    color: #606266;
  }
}
</style>

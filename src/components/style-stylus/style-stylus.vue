<template>
  <view class="stylus-card">
    <text class="stylus-card__title">Stylus</text>
    <text class="stylus-card__text">缩进语法、变量，以及从 variables.styl 引入的主题色。</text>
  </view>
</template>

<style lang="stylus" scoped>
@import '../../styles/variables.styl'

.stylus-card
  background stylus-bg
  border 1px solid stylus-border
  border-radius 16rpx
  padding 24rpx

  &__title
    display block
    font-size 32rpx
    font-weight 600
    color stylus-primary

  &__text
    display block
    margin-top 12rpx
    font-size 26rpx
    line-height 1.6
    color #606266
</style>

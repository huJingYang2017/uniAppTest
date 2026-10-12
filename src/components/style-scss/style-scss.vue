<template>
  <view class="scss-card">
    <text class="scss-card__title">SCSS / Sass</text>
    <text class="scss-card__text">嵌套、mixin，以及 uni.scss 里的 $uni-color-primary。</text>
  </view>
</template>

<style lang="scss" scoped>
@import '../../styles/mixins.scss';

.scss-card {
  @include card-surface(#eef6ff, rgba($uni-color-primary, 0.25));

  &__title {
    display: block;
    font-size: 32rpx;
    font-weight: 600;
    color: $uni-color-primary;
  }

  &__text {
    display: block;
    margin-top: 12rpx;
    font-size: 26rpx;
    line-height: 1.6;
    color: $uni-text-color-grey;
  }
}
</style>

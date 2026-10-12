<template>
  <view class="page">
    <app-section title="预处理器" desc="三种语法可以写在不同组件里，由 Vite 按 lang 选择编译器。">
      <view class="block">
        <style-scss />
      </view>
      <view class="block">
        <style-less />
      </view>
      <view class="block">
        <style-stylus />
      </view>
    </app-section>

    <app-section title="Tailwind CSS" desc="类名写在模板上。小程序端由 weapp-tailwindcss 转成 rpx。">
      <view class="rounded-2xl border border-violet-200 bg-violet-50 p-4">
        <view class="text-base font-semibold text-violet-700">原子类</view>
        <view class="mt-2 text-sm leading-6 text-violet-900">
          间距、颜色、圆角和字重都来自 Tailwind，不需要再写选择器。
        </view>
        <view class="mt-3 flex">
          <view class="rounded-full bg-violet-600 px-3 py-1 text-xs text-white">Vite</view>
          <view class="ml-2 rounded-full bg-white px-3 py-1 text-xs text-violet-700">rem2rpx</view>
        </view>
      </view>
    </app-section>
  </view>
</template>

<script setup lang="ts">
import StyleLess from '@/components/style-less/style-less.vue'
import StyleScss from '@/components/style-scss/style-scss.vue'
import StyleStylus from '@/components/style-stylus/style-stylus.vue'
</script>

<style lang="scss" scoped>
.block + .block {
  margin-top: 20rpx;
}
</style>

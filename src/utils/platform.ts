export function getPlatformLabel(): string {
  // 这个函数能对上当前平台，是因为 // ifdef 在编译时就把其他平台的代码删掉了。页面运行时，函数里只剩本次打包目标对应的那一行赋值。
  let name = 'App'
  // #ifdef H5
  name = 'H5'
  // #endif
  // #ifdef MP-WEIXIN
  name = '微信小程序'
  // #endif
  // #ifdef MP-ALIPAY
  name = '支付宝小程序'
  // #endif
  // #ifdef MP-TOUTIAO
  name = '抖音小程序'
  // #endif
  return name
}

import { createSSRApp } from 'vue'
import * as Pinia from 'pinia'
import uviewPlus from 'uview-plus'
import App from './App.vue'
import { persistPlugin } from './stores/persist'

export function createApp() {
  const app = createSSRApp(App)
  const pinia = Pinia.createPinia()
  pinia.use(persistPlugin)
  app.use(pinia)
  app.use(uviewPlus)

  return {
    app,
    // uni-app 要求把 Pinia 命名空间一并返回，SSR 和小程序端才能正确复用。
    Pinia,
  }
}

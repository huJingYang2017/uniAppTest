import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import { WeappTailwindcss } from 'weapp-tailwindcss/vite'

const projectRoot = dirname(fileURLToPath(import.meta.url))

// Tailwind 由 weapp-tailwindcss 生成，不要再注册 @tailwindcss/vite 或 @tailwindcss/postcss。
const tailwindPlugins = WeappTailwindcss({
  cssEntries: [resolve(projectRoot, 'src/app.css')],
  rem2rpx: true,
  tailwindcssBasedir: projectRoot,
})

export default defineConfig({
  plugins: [uni(), ...(tailwindPlugins ?? [])],
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ['legacy-js-api', 'color-functions', 'import'],
      },
    },
  },
  server: {
    host: true,
    port: 5173,
  },
})

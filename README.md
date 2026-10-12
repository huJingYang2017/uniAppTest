# uni-app Vue3 技术栈示例

基于官方 `uni-preset-vue#vite-ts` 模板，接入日常开发会用到的一套依赖。

## 技术栈

| 能力 | 选型 |
| --- | --- |
| 框架 | uni-app + Vue 3 |
| 构建 | Vite |
| 语言 | TypeScript |
| 状态 | Pinia（选项式 / 组合式 / 本地持久化） |
| 请求 | luch-request 4 |
| 组件库 | uView Plus（Vue 3） |
| 原子类 | Tailwind CSS 4 + weapp-tailwindcss |
| 预处理器 | SCSS、Less、Stylus |

Vue 3 工程使用 **uView Plus**。uView 2 只支持 Vue 2，所以没有安装 `uview-ui`。uView Plus 内部还自带一份 luch-request 3，通过 `uni.$u.http` 使用；业务请求走项目里的 luch-request 4，入口在 `src/api/http.ts`。

## 启动

```bash
npm install
npm run dev:h5
npm run dev:mp-weixin
npm run build:h5
npm run type-check
```

H5 开发服务默认端口 `5173`。微信小程序请用微信开发者工具打开 `dist/dev/mp-weixin`。

接口示例使用 `https://jsonplaceholder.typicode.com`，可在 `.env.development` 和 `.env.production` 里修改 `VITE_API_BASE_URL`。

## 目录

```text
src/
  api/            luch-request 实例与示例接口
  components/     easycom 组件与三种预处理器示例
  config/         环境变量
  pages/          首页、请求、Pinia、样式、uView Plus
  stores/         Pinia 与持久化插件
  styles/         SCSS mixin、Less / Stylus 变量
  app.css         Tailwind 入口
```

`app-` 开头的组件按 `pages.json` 的 easycom 规则自动引入。`up-` 开头的组件来自 uView Plus。

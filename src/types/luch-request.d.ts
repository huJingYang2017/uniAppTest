export {}

declare module 'luch-request' {
  interface LuchMeta {
    /** 为 true 时显示全局 loading，并发请求会合并计数。 */
    loading?: boolean
    /** 为 false 时失败不弹 Toast。默认失败会提示。 */
    toast?: boolean
    /** 为 false 时不附带登录令牌。 */
    auth?: boolean
  }
}

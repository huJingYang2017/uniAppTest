import {
  createLuchRequest,
  isLuchRequestError,
  LuchRequestError,
} from 'luch-request'
import type { LuchMeta, LuchRequestInstance } from 'luch-request'
import { appConfig } from '@/config'
import { useUserStore } from '@/stores/user'

let pendingCount = 0

function showLoading() {
  if (pendingCount === 0) {
    uni.showLoading({ title: '加载中', mask: true })
  }
  pendingCount += 1
}

function hideLoading() {
  pendingCount = Math.max(0, pendingCount - 1)
  if (pendingCount === 0) uni.hideLoading()
}

function readMeta(config: unknown): LuchMeta | undefined {
  if (!config || typeof config !== 'object' || !('luchMeta' in config)) return undefined
  return (config as { luchMeta?: LuchMeta }).luchMeta
}

function toMessage(error: unknown): string {
  if (!isLuchRequestError(error)) return '请求失败'
  switch (error.code) {
    case LuchRequestError.ERR_NETWORK:
      return '网络异常，请稍后重试'
    case LuchRequestError.ERR_BAD_STATUS:
      return `服务响应异常（${error.toJSON().statusCode ?? '未知状态'}）`
    case LuchRequestError.ERR_CANCELED:
      return '请求已取消'
    case LuchRequestError.ERR_BAD_RESPONSE:
      return '响应解析失败'
    default:
      return error.message || '请求失败'
  }
}

function notify(message: string) {
  // hideLoading 会把紧接着的 Toast 一起关掉，稍后再提示。
  setTimeout(() => {
    uni.showToast({ title: message, icon: 'none' })
  }, 50)
}

export const http: LuchRequestInstance = createLuchRequest({
  baseURL: appConfig.apiBaseUrl,
  timeout: 15000,
  header: {
    'Content-Type': 'application/json',
  },
})

http.interceptors.request.use((config) => {
  const meta = config.luchMeta
  if (meta?.loading) showLoading()

  if (meta?.auth !== false) {
    const token = useUserStore().token
    if (token) {
      config.header = {
        ...config.header,
        Authorization: `Bearer ${token}`,
      }
    }
  }

  return config
})

http.interceptors.response.use(
  (response) => {
    if (response.config.luchMeta?.loading) hideLoading()
    return response
  },
  (error) => {
    const meta = isLuchRequestError(error) ? readMeta(error.config) : undefined
    if (meta?.loading) hideLoading()
    if (meta?.toast !== false) notify(toMessage(error))
    throw error
  },
)

export function uploadFile(url: string, filePath: string, name = 'file') {
  return http.upload({
    url,
    filePath,
    name,
    luchMeta: { loading: true, toast: true },
  })
}

export function downloadFile(url: string) {
  return http.download({
    url,
    luchMeta: { loading: true, toast: true },
  })
}

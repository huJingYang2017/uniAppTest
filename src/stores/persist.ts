import type { PiniaPluginContext, StateTree } from 'pinia'

declare module 'pinia' {
  export interface DefineStoreOptionsBase<S extends StateTree, Store> {
    /** 为 true 时把 state 写入 uni storage，下次启动自动回填。 */
    persist?: boolean
  }
}

const STORAGE_PREFIX = 'pinia:'

function readState(key: string): Record<string, unknown> | null {
  const cached = uni.getStorageSync(key) as unknown
  if (cached == null || cached === '') return null
  if (typeof cached === 'string') {
    try {
      const parsed = JSON.parse(cached) as unknown
      if (parsed && typeof parsed === 'object') return parsed as Record<string, unknown>
    } catch {
      return null
    }
    return null
  }
  if (typeof cached === 'object') return cached as Record<string, unknown>
  return null
}

export function persistPlugin({ options, store }: PiniaPluginContext) {
  if (!options.persist) return

  const key = `${STORAGE_PREFIX}${store.$id}`
  const cached = readState(key)
  if (cached) {
    store.$patch((state) => {
      Object.assign(state, cached)
    })
  }

  store.$subscribe((_mutation, state) => {
    uni.setStorageSync(key, JSON.stringify(state))
  })
}

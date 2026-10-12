import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
  getters: {
    double: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count += 1
    },
    decrement() {
      this.count -= 1
    },
    add(step: number) {
      this.$patch({ count: this.count + step })
    },
    reset() {
      this.$reset()
    },
  },
  persist: true,
})

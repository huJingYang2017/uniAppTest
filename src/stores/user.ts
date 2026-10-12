import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore(
  'user',
  () => {
    const nickname = ref('游客')
    const token = ref('')
    const isLogin = computed(() => token.value.length > 0)

    function login(name: string) {
      nickname.value = name.trim() || '学员'
      token.value = `demo-token-${Date.now()}`
    }

    function logout() {
      nickname.value = '游客'
      token.value = ''
    }

    return { nickname, token, isLogin, login, logout }
  },
  { persist: true },
)

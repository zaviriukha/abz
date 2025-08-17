import { defineStore } from 'pinia'
import { getToken } from '@/services/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({ token: '', exp: 0, inFlight: null }),
  actions: {
    async ensureToken() {
      const now = Date.now()
      if (this.token && now < this.exp) return this.token

      if (!this.inFlight) {
        this.inFlight = (async () => {
          const t = await getToken()
          this.token = t
          this.exp = now + 40 * 60 * 1000 // 40 хв
          this.inFlight = null
          return t
        })()
      }
      return this.inFlight
    },
    clear() {
      this.token = ''
      this.exp = 0
    },
  },
})

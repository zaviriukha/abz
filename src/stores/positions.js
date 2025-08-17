import { defineStore } from 'pinia'
import { getPositions } from '@/services/api'

export const usePositionsStore = defineStore('positions', {
  state: () => ({ items: [], loaded: false, inFlight: null }),
  actions: {
    async ensurePositions() {
      if (this.loaded) return this.items
      if (!this.inFlight) {
        this.inFlight = (async () => {
          const { positions } = await getPositions()
          this.items = positions || []
          this.loaded = true
          this.inFlight = null
          return this.items
        })()
      }
      return this.inFlight
    },
  },
})

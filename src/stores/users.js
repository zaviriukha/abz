import { defineStore } from 'pinia'
import { getUsers } from '@/services/api'

export const useUsersStore = defineStore('users', {
  state: () => ({
    list: [],
    page: 1,
    totalPages: 1,
    loading: false,
    controller: null,
  }),
  getters: { isLastPage: (s) => s.page >= s.totalPages },
  actions: {
    normalizeUser(u) {
      const positionName =
        typeof u.position === 'string'
          ? u.position
          : (u.position && u.position.name) || u.title || ''
      let photo = u.photo || u.avatar || ''
      if (photo && !/^https?:\/\//i.test(photo)) {
        photo = `https://frontend-test-assignment-api.abz.agency/${photo.replace(/^\/+/, '')}`
      }
      return {
        id: u.id,
        name: u.name,
        title: positionName,
        email: u.email,
        phone: u.phone,
        avatar: photo || '/photo-cover.svg',
        registration_timestamp: u.registration_timestamp || u.registration_date || null,
      }
    },

    async fetchPage(p = 1) {
      if (this.loading) return
      this.loading = true

      if (this.controller) this.controller.abort()
      this.controller = new AbortController()

      try {
        const data = await getUsers({ page: p, count: 6, signal: this.controller.signal })
        this.page = Number(data.page)
        this.totalPages = Number(data.total_pages)
        const next = (data.users || []).map(this.normalizeUser)
        this.list = p === 1 ? next : [...this.list, ...next]
      } catch (e) {
        if (e.name !== 'AbortError') console.error('getUsers failed:', e)
      } finally {
        this.loading = false
        this.controller = null
      }
    },

    async refreshFirstPage() {
      await this.fetchPage(1)
    },
  },
})

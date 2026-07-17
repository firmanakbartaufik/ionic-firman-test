import { defineStore } from 'pinia'
import AuthService from '@/services/AuthService'
import { storage } from '@/utils/storage'

import type {
  LoginRequest,
  RegisterRequest,
  User,
} from '@/types/auth'

const user = storage.get('user')

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: storage.get('token') ?? '',
    user: user ? JSON.parse(user) as User : null,
    loading: false,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    async login(payload: LoginRequest) {
      this.loading = true

      try {
        const data = await AuthService.login(payload)

        this.token = data.access_token
        this.user = data.user

        storage.set('token', data.access_token)
        storage.set('user', JSON.stringify(data.user))
      } finally {
        this.loading = false
      }
    },

    async register(payload: RegisterRequest) {
      this.loading = true

      try {
        await AuthService.register(payload)
      } finally {
        this.loading = false
      }
    },

    async logout() {
      await AuthService.logout()

      this.token = ''
      this.user = null

      storage.remove('token')
      storage.remove('user')
    },

    restore() {
      this.token = storage.get('token') ?? ''

      const user = storage.get('user')

      this.user = user
        ? JSON.parse(user) as User
        : null
    },
  },
})
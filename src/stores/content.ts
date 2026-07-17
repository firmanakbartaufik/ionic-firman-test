import { defineStore } from 'pinia'

import ContentService from '@/services/ContentService'

import type {
  Content,
  ContentRequest,
} from '@/types/content'

interface ContentState {
  items: Content[]
  item: Content | null
  loading: boolean
  error: string | null

  page: number
  perPage: number
  total: number
  lastPage: number
  search: string
}

export const useContentStore = defineStore('content', {
  state: (): ContentState => ({
    items: [],
    item: null,
    loading: false,
    error: null,

    page: 1,
    perPage: 10,
    total: 0,
    lastPage: 1,
    search: '',
  }),

  actions: {
    async fetch() {
      this.loading = true
      this.error = null

      try {
        const response = await ContentService.list({
          page: this.page,
          per_page: this.perPage,
          search: this.search || undefined,
        })

        const body: any = response.data

        // Format: Laravel apiResource { data: [...], meta: { current_page, last_page, ... } }
        if (Array.isArray(body.data)) {
          this.items = body.data
          this.page = body.meta?.current_page ?? this.page
          this.lastPage = body.meta?.last_page ?? 1
          this.total = body.meta?.total ?? body.data.length
        }
        // Format: ApiResponse wrapper { data: { data: [...], current_page, ... } }
        else if (body.data && typeof body.data === 'object') {
          const paginated = body.data
          this.items = Array.isArray(paginated.data) ? paginated.data : []
          this.page = paginated.current_page ?? this.page
          this.lastPage = paginated.last_page ?? 1
          this.total = paginated.total ?? 0
        }
        else {
          this.items = []
        }
      } catch (e: any) {
        this.items = []
        this.error = e.response?.data?.message || 'Gagal memuat data content'
        throw e
      } finally {
        this.loading = false
      }
    },

    async show(id: number) {
      this.loading = true
      this.error = null

      try {
        const response = await ContentService.show(id)
        const body: any = response.data

        // Format: Laravel apiResource { data: { ...content } }
        // Format: ApiResponse wrapper { data: { data: { ...content } } }
        this.item = body.data?.id ? body.data : body.data?.data ?? body.data

        return this.item
      } catch (e: any) {
        this.error = e.response?.data?.message || 'Gagal memuat data content'
        throw e
      } finally {
        this.loading = false
      }
    },

    async create(payload: ContentRequest) {
      this.loading = true
      this.error = null

      try {
        await ContentService.create(payload)

        await this.fetch()
      } catch (e: any) {
        this.error = e.response?.data?.message || 'Gagal menyimpan content'
        throw e
      } finally {
        this.loading = false
      }
    },

    async update(
      id: number,
      payload: ContentRequest
    ) {
      this.loading = true
      this.error = null

      try {
        await ContentService.update(id, payload)

        await this.fetch()
      } catch (e: any) {
        this.error = e.response?.data?.message || 'Gagal memperbarui content'
        throw e
      } finally {
        this.loading = false
      }
    },

    async delete(id: number) {
      this.loading = true
      this.error = null

      try {
        await ContentService.delete(id)

        await this.fetch()
      } catch (e: any) {
        this.error = e.response?.data?.message || 'Gagal menghapus content'
        throw e
      } finally {
        this.loading = false
      }
    },

    async refresh() {
      await this.fetch()
    },

    resetItem() {
      this.item = null
    },
  },
})

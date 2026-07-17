export interface Content extends Record<string, unknown> {
  id: number
  title: string
  description: string
  created_at: string
  updated_at: string
}

export interface ContentRequest {
  title: string
  description: string
}

export interface ContentQuery {
  page?: number
  per_page?: number
  search?: string
}

export interface PaginationResponse<T> {
  data: T[]
  current_page: number
  last_page: number
  per_page: number
  total: number
}

export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
}
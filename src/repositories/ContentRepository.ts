import api from '@/api/axios'

import type {
  ApiResponse,
  Content,
  ContentQuery,
  ContentRequest,
  PaginationResponse,
} from '@/types/content'

class ContentRepository {
  list(params?: ContentQuery) {
    return api.get<ApiResponse<PaginationResponse<Content>>>(
      '/contents',
      {
        params,
      }
    )
  }

  show(id: number) {
    return api.get<ApiResponse<Content>>(
      `/contents/${id}`
    )
  }

  create(payload: ContentRequest) {
    return api.post<ApiResponse<Content>>(
      '/contents',
      payload
    )
  }

  update(
    id: number,
    payload: ContentRequest
  ) {
    return api.put<ApiResponse<Content>>(
      `/contents/${id}`,
      payload
    )
  }

  delete(id: number) {
    return api.delete<ApiResponse<null>>(
      `/contents/${id}`
    )
  }
}

export default new ContentRepository()
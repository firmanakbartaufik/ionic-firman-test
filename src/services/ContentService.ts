import ContentRepository from '@/repositories/ContentRepository'

import type {
  ContentQuery,
  ContentRequest,
} from '@/types/content'

class ContentService {
  list(params?: ContentQuery) {
    return ContentRepository.list(params)
  }

  show(id: number) {
    return ContentRepository.show(id)
  }

  create(payload: ContentRequest) {
    return ContentRepository.create(payload)
  }

  update(
    id: number,
    payload: ContentRequest
  ) {
    return ContentRepository.update(id, payload)
  }

  delete(id: number) {
    return ContentRepository.delete(id)
  }
}

export default new ContentService()
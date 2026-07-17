import api from '@/api/axios'
import type { LoginRequest, LoginResponse, RegisterRequest } from '@/types/auth'

class AuthRepository {
  login(payload: LoginRequest) {
    return api.post<LoginResponse>(
        '/auth/login',
        payload
    )
}

  register(payload: RegisterRequest) {
    return api.post('/auth/register', payload)
  }

  me() {
    return api.get('/auth/me')
  }

  logout() {
    return api.post('/auth/logout')
  }
}

export default new AuthRepository()
import AuthRepository from '@/repositories/AuthRepository'
import type {
  LoginRequest,
  RegisterRequest,
  LoginData,
} from '@/types/auth'
import { storage } from '@/utils/storage'

class AuthService {
  async login(payload: LoginRequest): Promise<LoginData> {
    const response = await AuthRepository.login(payload)

    const result = response.data.data

    storage.set('token', result.access_token)
    storage.set('user', JSON.stringify(result.user))

    return result
  }

  async register(payload: RegisterRequest) {
    return await AuthRepository.register(payload)
  }

  async me() {
    return await AuthRepository.me()
  }

  async logout() {
    await AuthRepository.logout()

    storage.remove('token')
    storage.remove('user')
  }
}

export default new AuthService()
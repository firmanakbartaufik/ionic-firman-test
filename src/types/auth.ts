export interface User {
  id: number
  name: string
  email: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
  password_confirmation: string
}

export interface LoginData {
  access_token: string
  token_type: string
  expires_in: number
  user: User
}

export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
}

export type LoginResponse = ApiResponse<LoginData>
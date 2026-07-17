import { storage } from '@/utils/storage'
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = storage.get('token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  console.log(`[API] ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`, {
    hasToken: !!token,
    tokenPreview: token ? token.substring(0, 20) + '...' : null,
    data: config.data,
  })

  return config
})

api.interceptors.response.use(
  (response) => {
    console.log(`[API] ${response.config.method?.toUpperCase()} ${response.config.url} → ${response.status}`, response.data)
    return response
  },
  (error) => {
    const status = error.response?.status
    const data = error.response?.data

    console.error(`[API] ${error.config?.method?.toUpperCase()} ${error.config?.url} → ${status}`, data)

    if (status === 401) {
      storage.remove('token')
      storage.remove('user')
      window.location.href = '/login'
    }

    return Promise.reject(error)
  }
)

export default api

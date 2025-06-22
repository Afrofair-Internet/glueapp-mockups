// plugins/axios.ts
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 共通レスポンスエラーハンドリング（任意）
api.interceptors.response.use(
  response => response,
  error => {
    console.error('APIエラー:', error)

    // 認証切れ（401）の処理例
    if (error.response?.status === 401) {
      alert('ログインセッションが切れています。再ログインしてください。')
      window.location.href = '/login'
    }

    // その他のエラー処理（ログ・トーストなど）
    return Promise.reject(error)
  }
)

export default api

export interface User {
  id: string
  name: string
  kana: string
  email: string
  role: 'admin' | 'user' | ''
  lastLogin: string
}

// Global type definitions for the Wanxing AI project
export interface User {
  id: string
  name: string
  email: string
}

export interface Course {
  id: string
  title: string
  description: string
  price: number
  duration: string
}

export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
}

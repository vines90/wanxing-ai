// API service functions for Wanxing AI project
import type { Course, User, ApiResponse } from '@/types'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

// Generic API request function
async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  }

  const response = await fetch(url, config)
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'API request failed')
  }

  return data
}

// Course services
export const courseService = {
  async getAllCourses(): Promise<Course[]> {
    const response = await apiRequest<Course[]>('/courses')
    return response.data
  },

  async getCourseById(id: string): Promise<Course> {
    const response = await apiRequest<Course>(`/courses/${id}`)
    return response.data
  },
}

// User services
export const userService = {
  async getCurrentUser(): Promise<User> {
    const response = await apiRequest<User>('/user/profile')
    return response.data
  },

  async updateUser(userData: Partial<User>): Promise<User> {
    const response = await apiRequest<User>('/user/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    })
    return response.data
  },
}

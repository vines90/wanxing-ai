// Pinia stores for Wanxing AI project state management
import { defineStore } from 'pinia'
import { ref, computed, readonly } from 'vue'
import type { User, Course } from '@/types'

// User store
export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)
  const isLoggedIn = computed(() => !!user.value)

  function setUser(userData: User) {
    user.value = userData
  }

  function clearUser() {
    user.value = null
  }

  return {
    user: readonly(user),
    isLoggedIn,
    setUser,
    clearUser,
  }
})

// Course store
export const useCourseStore = defineStore('course', () => {
  const courses = ref<Course[]>([])
  const loading = ref(false)

  async function fetchCourses() {
    loading.value = true
    try {
      // API call would go here
      // courses.value = await courseService.getAllCourses()
    } finally {
      loading.value = false
    }
  }

  function addCourse(course: Course) {
    courses.value.push(course)
  }

  return {
    courses: readonly(courses),
    loading: readonly(loading),
    fetchCourses,
    addCourse,
  }
})

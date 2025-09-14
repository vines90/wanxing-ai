// Pinia stores for Wanxing AI project state management
import { defineStore } from 'pinia'
import { ref, computed, readonly } from 'vue'
import type { User, Course, BlogPost, BlogCategory, BlogFilter, PaginatedResponse } from '@/types'

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
  const error = ref<string | null>(null)

  async function fetchCourses() {
    loading.value = true
    error.value = null
    
    try {
      const { courseService } = await import('@/services/api')
      courses.value = await courseService.getAllCourses()
    } catch (err) {
      error.value = err instanceof Error ? err.message : '获取课程信息失败'
      console.error('Failed to fetch courses:', err)
    } finally {
      loading.value = false
    }
  }

  async function getCourseById(id: string): Promise<Course | null> {
    try {
      const { courseService } = await import('@/services/api')
      return await courseService.getCourseById(id)
    } catch (err) {
      console.error('Failed to get course by id:', err)
      return null
    }
  }

  async function getPopularCourses(limit = 3): Promise<Course[]> {
    try {
      const { courseService } = await import('@/services/api')
      return await courseService.getPopularCourses(limit)
    } catch (err) {
      console.error('Failed to get popular courses:', err)
      return courses.value.slice(0, limit)
    }
  }

  function addCourse(course: Course) {
    courses.value.push(course)
  }

  function clearError() {
    error.value = null
  }

  return {
    courses: readonly(courses),
    loading: readonly(loading),
    error: readonly(error),
    fetchCourses,
    getCourseById,
    getPopularCourses,
    addCourse,
    clearError,
  }
})

// Blog store
export const useBlogStore = defineStore('blog', () => {
  const posts = ref<BlogPost[]>([])
  const currentPost = ref<BlogPost | null>(null)
  const categories = ref<BlogCategory[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const pagination = ref({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false
  })
  const filters = ref<BlogFilter>({})

  // Computed
  const featuredPosts = computed(() => posts.value.filter(post => post.featured))
  const recentPosts = computed(() => 
    posts.value
      .filter(post => post.status === 'published')
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, 5)
  )

  // Actions
  async function fetchPosts(params: BlogFilter & { page?: number; limit?: number } = {}) {
    loading.value = true
    error.value = null
    
    try {
      const { blogService } = await import('@/services/api')
      const response: PaginatedResponse<BlogPost> = await blogService.getPosts({
        page: params.page || 1,
        limit: params.limit || 10,
        ...params
      })
      
      posts.value = response.data
      pagination.value = response.pagination
      filters.value = params
    } catch (err) {
      error.value = err instanceof Error ? err.message : '获取博客文章失败'
      console.error('Failed to fetch blog posts:', err)
    } finally {
      loading.value = false
    }
  }

  async function fetchPostBySlug(slug: string): Promise<BlogPost | null> {
    loading.value = true
    error.value = null
    
    try {
      const { blogService } = await import('@/services/api')
      const post = await blogService.getPostBySlug(slug)
      currentPost.value = post
      
      // Increment view count
      await blogService.incrementViewCount(post.id)
      
      return post
    } catch (err) {
      error.value = err instanceof Error ? err.message : '获取博客文章失败'
      console.error('Failed to fetch blog post:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  async function fetchFeaturedPosts(limit = 3): Promise<BlogPost[]> {
    try {
      const { blogService } = await import('@/services/api')
      return await blogService.getFeaturedPosts(limit)
    } catch (err) {
      console.error('Failed to fetch featured posts:', err)
      return []
    }
  }

  async function fetchCategories() {
    try {
      const { blogService } = await import('@/services/api')
      categories.value = await blogService.getCategories()
    } catch (err) {
      console.error('Failed to fetch categories:', err)
    }
  }

  async function fetchRelatedPosts(postId: string, limit = 3): Promise<BlogPost[]> {
    try {
      const { blogService } = await import('@/services/api')
      return await blogService.getRelatedPosts(postId, limit)
    } catch (err) {
      console.error('Failed to fetch related posts:', err)
      return []
    }
  }

  function setFilters(newFilters: BlogFilter) {
    filters.value = { ...newFilters }
  }

  function clearFilters() {
    filters.value = {}
  }

  function clearError() {
    error.value = null
  }

  function clearCurrentPost() {
    currentPost.value = null
  }

  return {
    // State
    posts: readonly(posts),
    currentPost: readonly(currentPost),
    categories: readonly(categories),
    loading: readonly(loading),
    error: readonly(error),
    pagination: readonly(pagination),
    filters: readonly(filters),
    
    // Computed
    featuredPosts,
    recentPosts,
    
    // Actions
    fetchPosts,
    fetchPostBySlug,
    fetchFeaturedPosts,
    fetchCategories,
    fetchRelatedPosts,
    setFilters,
    clearFilters,
    clearError,
    clearCurrentPost,
  }
})

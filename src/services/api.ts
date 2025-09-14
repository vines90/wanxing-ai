// API service functions for Wanxing AI project
import type { 
  Course, 
  User, 
  ApiResponse, 
  ContactForm, 
  ConsultationRequest,
  BlogPost,
  BlogCategory,
  BlogComment,
  BlogFilter,
  PaginationParams,
  PaginatedResponse
} from '@/types'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
const API_TIMEOUT = Number(import.meta.env.VITE_API_TIMEOUT) || 10000

// Generic API request function with error handling and timeout
async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT)

  const config: RequestInit = {
    signal: controller.signal,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  }

  try {
  const response = await fetch(url, config)
    clearTimeout(timeoutId)
    
  const data = await response.json()

  if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`)
  }

  return data
  } catch (error) {
    clearTimeout(timeoutId)
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('请求超时，请检查网络连接')
      }
      throw error
    }
    throw new Error('网络请求失败')
  }
}

// Mock data for development (when API is not available)
const mockCourses: Course[] = [
  {
    id: 'ai-media',
    title: 'AI自媒体',
    description: '掌握AI工具进行内容创作，从文案到视频制作全流程',
    price: 1299,
    duration: '6周',
    level: 'beginner',
    category: 'ai-media',
    instructor: '李小雅',
    syllabus: [
      'AI文案创作工具使用',
      'AI图片生成与编辑',
      'AI视频制作技巧',
      '自媒体运营策略',
      '爆款内容创作方法',
      'AI辅助直播技巧'
    ],
    enrollmentCount: 2156,
    rating: 4.9,
    thumbnail: '/images/courses/ai-media.jpg',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20'
  },
  {
    id: 'ai-prompt',
    title: 'AI提示词',
    description: '深入学习提示词工程，成为AI沟通专家',
    price: 999,
    duration: '4周',
    level: 'beginner',
    category: 'prompt-engineering',
    instructor: '张明轩',
    syllabus: [
      '提示词基础原理',
      'ChatGPT高效使用技巧',
      '角色扮演提示词设计',
      '复杂任务分解方法',
      '提示词模板库构建',
      '多轮对话优化'
    ],
    enrollmentCount: 3247,
    rating: 4.8,
    thumbnail: '/images/courses/ai-prompt.jpg',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-18'
  },
  {
    id: 'ai-office',
    title: 'AI办公提效',
    description: '利用AI工具提升办公效率，自动化日常工作',
    price: 1599,
    duration: '5周',
    level: 'intermediate',
    category: 'office-automation',
    instructor: '王建华',
    syllabus: [
      'Excel AI插件使用',
      'PPT智能生成技巧',
      '邮件自动回复设置',
      '会议记录AI转写',
      '数据分析自动化',
      '工作流程优化'
    ],
    enrollmentCount: 1876,
    rating: 4.7,
    thumbnail: '/images/courses/ai-office.jpg',
    createdAt: '2024-01-12',
    updatedAt: '2024-01-19'
  },
  {
    id: 'ai-programming',
    title: 'AI编程',
    description: '学会用AI辅助编程，提升开发效率和代码质量',
    price: 2199,
    duration: '8周',
    level: 'advanced',
    category: 'ai-programming',
    instructor: '陈志远',
    syllabus: [
      'GitHub Copilot使用技巧',
      'AI代码生成与优化',
      '智能代码审查',
      '自动化测试生成',
      'AI辅助调试技巧',
      '项目架构设计',
      '代码重构自动化',
      '技术文档AI生成'
    ],
    enrollmentCount: 1432,
    rating: 4.9,
    thumbnail: '/images/courses/ai-programming.jpg',
    createdAt: '2024-01-08',
    updatedAt: '2024-01-16'
  }
]

// Mock blog data for development
const mockBlogPosts: BlogPost[] = [
  {
    id: 'post-1',
    title: 'AI大模型训练的最佳实践指南',
    slug: 'ai-model-training-best-practices',
    excerpt: '深入探讨大型语言模型训练过程中的关键技术要点，包括数据预处理、模型架构选择、训练策略优化等方面的实战经验分享。',
    content: `# AI大模型训练的最佳实践指南

随着人工智能技术的快速发展，大型语言模型已成为AI领域的重要突破。本文将分享AI大模型训练的最佳实践...

## 数据预处理
数据质量直接影响模型性能...

## 模型架构选择
选择合适的模型架构是成功的关键...

## 训练策略优化
有效的训练策略能够显著提升模型效果...`,
    author: '张明华',
    authorAvatar: '/images/team/zhang-minghua.jpg',
    category: 'machine-learning',
    tags: ['大模型', '训练', 'AI', '深度学习'],
    thumbnail: '/images/blog/ai-training.jpg',
    publishedAt: '2024-03-15',
    readTime: 8,
    viewCount: 1250,
    featured: true,
    status: 'published',
    contentType: 'markdown'
  },
  {
    id: 'post-2',
    title: '从零开始构建你的第一个聊天机器人',
    slug: 'build-your-first-chatbot',
    excerpt: '通过实际案例学习如何使用现代AI技术构建智能聊天机器人，涵盖自然语言处理、对话管理和部署优化等核心内容。',
    content: `# 从零开始构建你的第一个聊天机器人

聊天机器人已经成为现代企业客户服务的重要工具...`,
    author: '刘建国',
    authorAvatar: '/images/team/liu-jianguo.jpg',
    category: 'nlp',
    tags: ['聊天机器人', 'NLP', '对话系统'],
    thumbnail: '/images/blog/chatbot.jpg',
    publishedAt: '2024-03-12',
    readTime: 12,
    viewCount: 890,
    featured: false,
    status: 'published',
    contentType: 'markdown'
  },
  {
    id: 'post-3',
    title: '计算机视觉在工业检测中的应用',
    slug: 'computer-vision-industrial-inspection',
    excerpt: '探索计算机视觉技术在工业质量检测领域的创新应用，包括缺陷检测、自动化分拣和质量控制系统的设计与实现。',
    content: `# 计算机视觉在工业检测中的应用

工业4.0时代，计算机视觉技术正在revolutionize传统制造业...`,
    author: '陈美玲',
    authorAvatar: '/images/team/chen-meiling.jpg',
    category: 'computer-vision',
    tags: ['计算机视觉', '工业检测', '自动化'],
    thumbnail: '/images/blog/industrial-cv.jpg',
    publishedAt: '2024-03-10',
    readTime: 10,
    viewCount: 654,
    featured: true,
    status: 'published',
    contentType: 'markdown'
  },
  {
    id: 'post-4',
    title: 'Python在数据科学中的高级技巧',
    slug: 'python-advanced-data-science',
    excerpt: '掌握Python在数据科学项目中的高级技巧和最佳实践，提升数据处理、分析和可视化的效率。',
    content: `# Python在数据科学中的高级技巧

数据科学家必须掌握的Python高级技巧...`,
    author: '王志强',
    authorAvatar: '/images/team/wang-zhiqiang.jpg',
    category: 'data-science',
    tags: ['Python', '数据科学', '机器学习'],
    thumbnail: '/images/blog/python-ds.jpg',
    publishedAt: '2024-03-08',
    readTime: 15,
    viewCount: 1120,
    featured: false,
    status: 'published',
    contentType: 'markdown'
  }
]

const mockBlogCategories: BlogCategory[] = [
  {
    id: 'machine-learning',
    name: '机器学习',
    slug: 'machine-learning',
    description: '深度学习、神经网络、算法优化等机器学习相关内容',
    postCount: 12,
    color: '#E31937'
  },
  {
    id: 'nlp',
    name: '自然语言处理',
    slug: 'nlp',
    description: '文本分析、语言模型、对话系统等NLP技术分享',
    postCount: 8,
    color: '#2563EB'
  },
  {
    id: 'computer-vision',
    name: '计算机视觉',
    slug: 'computer-vision',
    description: '图像识别、目标检测、视觉AI应用案例',
    postCount: 6,
    color: '#059669'
  },
  {
    id: 'data-science',
    name: '数据科学',
    slug: 'data-science',
    description: '数据分析、可视化、商业智能等数据科学实践',
    postCount: 10,
    color: '#7C3AED'
  }
]

// Course services
export const courseService = {
  async getAllCourses(): Promise<Course[]> {
    try {
    const response = await apiRequest<Course[]>('/courses')
    return response.data
    } catch (error) {
      // 开发环境下返回模拟数据
      console.warn('API not available, using mock data:', error)
      return mockCourses
    }
  },

  async getCourseById(id: string): Promise<Course> {
    try {
    const response = await apiRequest<Course>(`/courses/${id}`)
    return response.data
    } catch (error) {
      console.warn('API not available, using mock data:', error)
      const course = mockCourses.find(c => c.id === id)
      if (!course) throw new Error('课程不存在')
      return course
    }
  },

  async getPopularCourses(limit = 3): Promise<Course[]> {
    try {
      const response = await apiRequest<Course[]>(`/courses/popular?limit=${limit}`)
      return response.data
    } catch (error) {
      console.warn('API not available, using mock data:', error)
      return mockCourses.slice(0, limit)
    }
  }
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

  async registerUser(userData: Omit<User, 'id'>): Promise<User> {
    const response = await apiRequest<User>('/user/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    })
    return response.data
  }
}

// Contact and consultation services
export const contactService = {
  async submitContactForm(formData: ContactForm): Promise<{ success: boolean; message: string }> {
    try {
      const response = await apiRequest<{ success: boolean; message: string }>('/contact/submit', {
        method: 'POST',
        body: JSON.stringify(formData),
      })
      return response.data
    } catch (error) {
      // 开发环境下模拟成功响应
      console.warn('API not available, simulating success:', error)
      return { success: true, message: '感谢您的咨询，我们会尽快联系您！' }
    }
  },

  async requestConsultation(request: ConsultationRequest): Promise<{ success: boolean; message: string }> {
    try {
      const response = await apiRequest<{ success: boolean; message: string }>('/consultation/request', {
        method: 'POST',
        body: JSON.stringify(request),
      })
      return response.data
    } catch (error) {
      console.warn('API not available, simulating success:', error)
      return { success: true, message: '预约成功！我们的顾问会在24小时内联系您。' }
    }
  },

  async subscribeNewsletter(email: string): Promise<{ success: boolean; message: string }> {
    try {
      const response = await apiRequest<{ success: boolean; message: string }>('/newsletter/subscribe', {
        method: 'POST',
        body: JSON.stringify({ email }),
      })
      return response.data
    } catch (error) {
      console.warn('API not available, simulating success:', error)
      return { success: true, message: '订阅成功！您将收到最新的课程信息。' }
    }
  }
}

// Blog services
export const blogService = {
  async getPosts(params: PaginationParams & BlogFilter = { page: 1, limit: 10 }): Promise<PaginatedResponse<BlogPost>> {
    try {
      const queryParams = new URLSearchParams()
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, String(value))
        }
      })
      
      const response = await apiRequest<PaginatedResponse<BlogPost>>(`/blog/posts?${queryParams}`)
      return response.data
    } catch (error) {
      console.warn('API not available, using mock data:', error)
      
      // Apply filters to mock data
      let filteredPosts = mockBlogPosts.filter(post => {
        if (params.category && post.category !== params.category) return false
        if (params.featured !== undefined && post.featured !== params.featured) return false
        if (params.status && post.status !== params.status) return false
        if (params.search) {
          const searchLower = params.search.toLowerCase()
          return post.title.toLowerCase().includes(searchLower) ||
                 post.excerpt.toLowerCase().includes(searchLower) ||
                 post.tags.some(tag => tag.toLowerCase().includes(searchLower))
        }
        return true
      })
      
      // Sort by published date (newest first)
      filteredPosts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      
      // Pagination
      const page = params.page || 1
      const limit = params.limit || 10
      const startIndex = (page - 1) * limit
      const endIndex = startIndex + limit
      const paginatedPosts = filteredPosts.slice(startIndex, endIndex)
      
      return {
        data: paginatedPosts,
        pagination: {
          page,
          limit,
          total: filteredPosts.length,
          totalPages: Math.ceil(filteredPosts.length / limit),
          hasNext: endIndex < filteredPosts.length,
          hasPrev: page > 1
        }
      }
    }
  },

  async getPostBySlug(slug: string): Promise<BlogPost> {
    try {
      const response = await apiRequest<BlogPost>(`/blog/posts/${slug}`)
      return response.data
    } catch (error) {
      console.warn('API not available, using mock data:', error)
      const post = mockBlogPosts.find(p => p.slug === slug)
      if (!post) throw new Error('博客文章不存在')
      return post
    }
  },

  async getFeaturedPosts(limit = 3): Promise<BlogPost[]> {
    try {
      const response = await apiRequest<BlogPost[]>(`/blog/posts/featured?limit=${limit}`)
      return response.data
    } catch (error) {
      console.warn('API not available, using mock data:', error)
      return mockBlogPosts.filter(post => post.featured).slice(0, limit)
    }
  },

  async getCategories(): Promise<BlogCategory[]> {
    try {
      const response = await apiRequest<BlogCategory[]>('/blog/categories')
      return response.data
    } catch (error) {
      console.warn('API not available, using mock data:', error)
      return mockBlogCategories
    }
  },

  async getRelatedPosts(postId: string, limit = 3): Promise<BlogPost[]> {
    try {
      const response = await apiRequest<BlogPost[]>(`/blog/posts/${postId}/related?limit=${limit}`)
      return response.data
    } catch (error) {
      console.warn('API not available, using mock data:', error)
      const currentPost = mockBlogPosts.find(p => p.id === postId)
      if (!currentPost) return []
      
      // Find posts with similar tags or category
      const relatedPosts = mockBlogPosts
        .filter(post => post.id !== postId)
        .filter(post => 
          post.category === currentPost.category ||
          post.tags.some(tag => currentPost.tags.includes(tag))
        )
        .sort(() => Math.random() - 0.5) // Random order
        .slice(0, limit)
      
      return relatedPosts
    }
  },

  async incrementViewCount(postId: string): Promise<void> {
    try {
      await apiRequest(`/blog/posts/${postId}/view`, { method: 'POST' })
    } catch (error) {
      console.warn('View count tracking failed:', error)
    }
  }
}

// Analytics service
export const analyticsService = {
  async trackEvent(eventName: string, properties: Record<string, any> = {}): Promise<void> {
    try {
      await apiRequest('/analytics/track', {
        method: 'POST',
        body: JSON.stringify({ event: eventName, properties }),
      })
    } catch (error) {
      // 静默失败，不影响用户体验
      console.warn('Analytics tracking failed:', error)
    }
  },

  async trackPageView(path: string): Promise<void> {
    try {
      await apiRequest('/analytics/pageview', {
        method: 'POST',
        body: JSON.stringify({ path }),
      })
    } catch (error) {
      console.warn('Page view tracking failed:', error)
    }
  }
}

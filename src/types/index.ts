// Global type definitions for the Wanxing AI project

// User related types
export interface User {
  id: string
  name: string
  email: string
  phone?: string
  avatar?: string
  registeredAt?: string
  lastLoginAt?: string
}

// Course related types
export interface Course {
  id: string
  title: string
  description: string
  price: number
  duration: string
  level: 'beginner' | 'intermediate' | 'advanced'
  category: 'ai-media' | 'prompt-engineering' | 'office-automation' | 'ai-programming'
  instructor: string
  syllabus: string[]
  enrollmentCount: number
  rating?: number
  thumbnail?: string
  createdAt?: string
  updatedAt?: string
}

// Contact and consultation types
export interface ContactForm {
  name: string
  email: string
  phone?: string
  message: string
  subject?: string
  interestedCourse?: string
}

export interface ConsultationRequest {
  name: string
  email: string
  phone: string
  preferredTime: string
  interestedCourse?: string
  experience?: 'none' | 'beginner' | 'intermediate' | 'advanced'
  goals?: string
}

// API response types
export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  meta?: {
    page?: number
    limit?: number
    total?: number
    totalPages?: number
  }
}

// Notification types
export interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message: string
  duration?: number
  persistent?: boolean
}

// Form validation types
export interface ValidationRule {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  message: string
}

export interface FormField {
  name: string
  value: any
  error?: string
  rules?: ValidationRule[]
}

// Analytics types
export interface AnalyticsEvent {
  event: string
  properties: Record<string, any>
  timestamp?: number
}

// Blog content types
export interface BlogContentBlock {
  id: string
  type: 'paragraph' | 'heading' | 'image' | 'code' | 'quote' | 'list' | 'table' | 'embed'
  content: string | BlogImageContent | BlogCodeContent | BlogTableContent
  order: number
}

export interface BlogImageContent {
  src: string
  alt: string
  caption?: string
  width?: number
  height?: number
  alignment: 'left' | 'center' | 'right' | 'full'
}

export interface BlogCodeContent {
  code: string
  language: string
  filename?: string
  showLineNumbers?: boolean
}

export interface BlogTableContent {
  headers: string[]
  rows: string[][]
  caption?: string
}

export interface BlogMediaGallery {
  id: string
  title: string
  images: BlogImageContent[]
  layout: 'grid' | 'carousel' | 'masonry'
}

// Blog related types
export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string // Markdown content
  contentBlocks?: BlogContentBlock[] // Structured content for rich editing
  author: string
  authorAvatar?: string
  category: string
  tags: string[]
  thumbnail?: string
  gallery?: BlogMediaGallery
  seo?: {
    metaTitle?: string
    metaDescription?: string
    canonicalUrl?: string
    noIndex?: boolean
  }
  publishedAt: string
  updatedAt?: string
  readTime: number
  viewCount: number
  featured: boolean
  status: 'draft' | 'published' | 'archived'
  contentType: 'markdown' | 'rich' // Content editing mode
}

export interface BlogCategory {
  id: string
  name: string
  slug: string
  description: string
  postCount: number
  color?: string
}

export interface BlogComment {
  id: string
  postId: string
  author: string
  email: string
  content: string
  createdAt: string
  replies?: BlogComment[]
  approved: boolean
}

// AI课程推荐相关类型
export interface AssessmentData {
  name: string
  age: number
  education: string
  experience: string
  interests: string[]
  goals: string[]
  timeAvailable: string
  learningStyle: string
  techBackground: string
  careerStage: string
}

export interface CourseRecommendation {
  courseId: string
  courseName: string
  matchScore: number
  reasons: string[]
  learningPath: string[]
  expectedOutcomes: string[]
  timeEstimate: string
  difficulty: string
  nextSteps: string[]
}

export interface BlogFilter {
  category?: string
  tag?: string
  author?: string
  search?: string
  featured?: boolean
  status?: BlogPost['status']
}

// File upload and media management
export interface FileUploadOptions {
  maxSize?: number // in MB
  allowedTypes?: string[]
  quality?: number // for image compression
  generateThumbnail?: boolean
}

export interface UploadedFile {
  id: string
  originalName: string
  filename: string
  path: string
  url: string
  mimeType: string
  size: number
  width?: number
  height?: number
  thumbnail?: string
  uploadedAt: string
  alt?: string
  caption?: string
}

export interface MediaLibrary {
  files: UploadedFile[]
  folders: MediaFolder[]
  totalSize: number
  totalFiles: number
}

export interface MediaFolder {
  id: string
  name: string
  path: string
  parentId?: string
  createdAt: string
}

// Rich text editor types
export interface EditorConfig {
  toolbar: string[]
  plugins: string[]
  allowedTags: string[]
  imageUpload: boolean
  videoEmbed: boolean
  codeHighlight: boolean
}

// Common utility types
export type LoadingState = 'idle' | 'loading' | 'success' | 'error'

export interface PaginationParams {
  page: number
  limit: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

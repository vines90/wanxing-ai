<template>
  <main class="min-h-screen bg-black text-white">
    <!-- Header -->
    <header class="py-6 px-4 bg-gradient-to-r from-gray-900 to-gray-800 border-b border-border">
      <div class="container mx-auto">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <router-link to="/" class="text-2xl font-bold text-white hover:text-primary-400 transition-colors">
              万星<span class="text-primary-500">AI</span>
            </router-link>
            <span class="text-text-muted">|</span>
            <h1 class="text-xl font-semibold text-white">内容管理</h1>
          </div>
          
          <div class="flex items-center space-x-4">
            <span class="text-sm text-text-muted">管理员</span>
            <button @click="logout" class="btn btn-ghost btn-sm">
              退出登录
            </button>
            <router-link to="/" class="btn btn-ghost btn-sm">
              返回网站
            </router-link>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <div class="py-8 px-4">
      <div class="container mx-auto max-w-4xl">
        <!-- Welcome Section -->
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-white mb-4">欢迎使用内容管理系统</h2>
          <p class="text-text-secondary">管理您的博客文章和网站内容</p>
        </div>

        <!-- Quick Actions -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <!-- 写新文章 -->
          <router-link
            to="/admin/blog/new"
            class="admin-card bg-gradient-to-br from-primary-600 to-primary-700 hover:from-primary-500 hover:to-primary-600"
          >
            <div class="flex items-center justify-between mb-4">
              <div class="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                </svg>
              </div>
              <span class="text-xs text-white bg-white bg-opacity-20 px-2 py-1 rounded">快速</span>
            </div>
            <h3 class="text-xl font-bold text-white mb-2">写新文章</h3>
            <p class="text-white text-opacity-80 text-sm">创建并发布新的博客文章</p>
          </router-link>

          <!-- 管理文章 -->
          <div class="admin-card bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 cursor-pointer">
            <div class="flex items-center justify-between mb-4">
              <div class="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <span class="text-xs text-white bg-white bg-opacity-20 px-2 py-1 rounded">{{ totalPosts }}</span>
            </div>
            <h3 class="text-xl font-bold text-white mb-2">管理文章</h3>
            <p class="text-white text-opacity-80 text-sm">编辑和管理已发布的文章</p>
          </div>

          <!-- 查看网站 -->
          <router-link
            to="/blog"
            class="admin-card bg-gradient-to-br from-green-600 to-green-700 hover:from-green-500 hover:to-green-600"
          >
            <div class="flex items-center justify-between mb-4">
              <div class="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
              </div>
              <span class="text-xs text-white bg-white bg-opacity-20 px-2 py-1 rounded">前台</span>
            </div>
            <h3 class="text-xl font-bold text-white mb-2">查看博客</h3>
            <p class="text-white text-opacity-80 text-sm">预览已发布的博客文章</p>
          </router-link>
        </div>

        <!-- Recent Posts -->
        <div class="bg-background-card border border-border rounded-lg overflow-hidden">
          <div class="px-6 py-4 border-b border-border">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold text-text-primary">最近的文章</h3>
              <router-link to="/admin/blog/new" class="btn btn-primary btn-sm">
                写新文章
              </router-link>
            </div>
          </div>
          
          <div class="divide-y divide-border">
            <div
              v-for="post in recentPosts"
              :key="post.id"
              class="px-6 py-4 hover:bg-background-elevated transition-colors group"
            >
              <div class="flex items-center justify-between">
                <div class="flex-1">
                  <div class="flex items-center space-x-3 mb-2">
                    <h4 class="font-medium text-text-primary group-hover:text-primary-400 transition-colors">
                      {{ post.title }}
                    </h4>
                    <span 
                      class="inline-block px-2 py-1 text-xs rounded"
                      :class="{
                        'bg-green-900 text-green-300': post.status === 'published',
                        'bg-yellow-900 text-yellow-300': post.status === 'draft',
                        'bg-gray-700 text-gray-300': post.status === 'archived'
                      }"
                    >
                      {{ getStatusText(post.status) }}
                    </span>
                    <span v-if="post.featured" class="inline-block px-2 py-1 text-xs bg-primary-900 text-primary-300 rounded">
                      精选
                    </span>
                  </div>
                  <p class="text-sm text-text-secondary line-clamp-2 mb-2">{{ post.excerpt }}</p>
                  <div class="flex items-center space-x-4 text-xs text-text-muted">
                    <span>{{ formatDate(post.publishedAt) }}</span>
                    <span>{{ post.viewCount }} 次查看</span>
                    <span>{{ post.readTime }} 分钟阅读</span>
                  </div>
                </div>
                
                <div class="flex items-center space-x-2 ml-4">
                  <button
                    @click="editPost(post)"
                    class="p-2 text-text-muted hover:text-text-primary hover:bg-background-elevated rounded transition-colors"
                    title="编辑"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                  </button>
                  
                  <router-link
                    :to="`/blog/${post.slug}`"
                    class="p-2 text-text-muted hover:text-text-primary hover:bg-background-elevated rounded transition-colors"
                    title="查看"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Empty State -->
          <div v-if="recentPosts.length === 0" class="px-6 py-12 text-center">
            <div class="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-medium text-text-primary mb-2">还没有文章</h3>
            <p class="text-text-secondary mb-4">开始创建您的第一篇博客文章</p>
            <router-link to="/admin/blog/new" class="btn btn-primary">
              写第一篇文章
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useBlogStore } from '@/stores'
import { formatDate } from '@/utils'
import { clearAuth } from '@/utils/auth'
import type { BlogPost } from '@/types'

const router = useRouter()
const blogStore = useBlogStore()

// Local state
const recentPosts = ref<BlogPost[]>([])

// Computed
const totalPosts = computed(() => recentPosts.value.length)

// Lifecycle
onMounted(async () => {
  await loadRecentPosts()
})

// Methods
const loadRecentPosts = async () => {
  try {
    // 获取最近的文章
    await blogStore.fetchPosts({ limit: 5 })
    recentPosts.value = [...blogStore.posts] as BlogPost[]
  } catch (error) {
    console.error('Failed to load recent posts:', error)
  }
}

const getStatusText = (status: string): string => {
  const statusMap = {
    'published': '已发布',
    'draft': '草稿',
    'archived': '已归档'
  }
  return statusMap[status as keyof typeof statusMap] || status
}

const editPost = (post: BlogPost) => {
  router.push(`/admin/blog/edit/${post.id}`)
}

const logout = () => {
  clearAuth()
  router.push('/admin/login')
}
</script>

<style scoped>
.admin-card {
  @apply p-6 rounded-lg transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-xl;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

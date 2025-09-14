<template>
  <main class="min-h-screen bg-black text-white">
    <!-- Loading State -->
    <div v-if="blogStore.loading" class="flex justify-center items-center min-h-screen">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="blogStore.error" class="flex flex-col items-center justify-center min-h-screen">
      <div class="text-center">
        <h1 class="text-4xl font-bold text-white mb-4">文章未找到</h1>
        <p class="text-text-secondary mb-8">{{ blogStore.error }}</p>
        <div class="space-x-4">
          <button @click="$router.push('/blog')" class="btn btn-primary">
            返回博客列表
          </button>
          <button @click="$router.go(-1)" class="btn btn-secondary">
            返回上页
          </button>
        </div>
      </div>
    </div>

    <!-- Blog Post Content -->
    <article v-else-if="post" class="py-8">
      <!-- Header -->
      <header class="py-16 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div class="container mx-auto max-w-4xl">
          <!-- Breadcrumb -->
          <nav class="mb-8">
            <ol class="flex items-center space-x-2 text-sm text-text-muted">
              <li><router-link to="/" class="hover:text-primary-400">首页</router-link></li>
              <li><span class="mx-2">/</span></li>
              <li><router-link to="/blog" class="hover:text-primary-400">博客</router-link></li>
              <li><span class="mx-2">/</span></li>
              <li class="text-text-primary">{{ post.title }}</li>
            </ol>
          </nav>

          <!-- Category Badge -->
          <div class="mb-4">
            <span 
              class="inline-block px-3 py-1 rounded-full text-sm font-medium"
              :style="{ 
                backgroundColor: categoryColor + '20', 
                color: categoryColor,
                border: `1px solid ${categoryColor}40`
              }"
            >
              {{ categoryName }}
            </span>
          </div>

          <!-- Title -->
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {{ post.title }}
          </h1>

          <!-- Meta Information -->
          <div class="flex flex-wrap items-center gap-6 text-text-secondary">
            <!-- Author -->
            <div class="flex items-center">
              <div class="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center mr-3">
                <span class="text-white font-bold">{{ post.author.charAt(0) }}</span>
              </div>
              <div>
                <div class="text-sm font-medium text-text-primary">{{ post.author }}</div>
                <div class="text-xs text-text-muted">作者</div>
              </div>
            </div>

            <!-- Published Date -->
            <div class="flex items-center">
              <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path>
              </svg>
              {{ formatDate(post.publishedAt) }}
            </div>

            <!-- Read Time -->
            <div class="flex items-center">
              <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path>
              </svg>
              {{ post.readTime }} 分钟阅读
            </div>

            <!-- View Count -->
            <div class="flex items-center">
              <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"></path>
              </svg>
              {{ post.viewCount }} 次阅读
            </div>
          </div>

          <!-- Tags -->
          <div class="flex flex-wrap gap-2 mt-6">
            <span 
              v-for="tag in post.tags" 
              :key="tag"
              class="inline-block bg-background-elevated text-text-muted px-3 py-1 rounded-full text-sm"
            >
              #{{ tag }}
            </span>
          </div>
        </div>
      </header>

      <!-- Content -->
      <div class="py-16 px-4">
        <div class="container mx-auto max-w-4xl">
          <!-- Post Content -->
          <BlogContentRenderer :post="{ ...post } as BlogPost" />

          <!-- Share Section -->
          <div class="mt-12 pt-8 border-t border-border">
            <h3 class="text-lg font-semibold text-text-primary mb-4">分享这篇文章</h3>
            <div class="flex items-center space-x-4">
              <button 
                @click="shareToWeChat"
                class="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 6.092-1.502-.417-2.579-2.93-4.672-6.035-4.672z"></path>
                </svg>
                微信
              </button>
              
              <button 
                @click="copyLink"
                class="flex items-center px-4 py-2 bg-background-card border border-border text-text-primary rounded-lg hover:bg-background-elevated transition-colors"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                </svg>
                复制链接
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Related Posts -->
      <section v-if="relatedPosts.length > 0" class="py-16 px-4 bg-gray-900">
        <div class="container mx-auto max-w-6xl">
          <h2 class="text-3xl font-bold text-white mb-8 text-center">相关文章</h2>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <BlogCard
              v-for="relatedPost in relatedPosts"
              :key="relatedPost.id"
              :post="relatedPost"
              @read="handleReadPost"
            />
          </div>
        </div>
      </section>
    </article>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBlogStore } from '@/stores'
import { analyticsService } from '@/services/api'
import { formatDate } from '@/utils'
import BlogCard from '@/components/blog/BlogCard.vue'
import BlogContentRenderer from '@/components/blog/BlogContentRenderer.vue'
import type { BlogPost } from '@/types'

const route = useRoute()
const router = useRouter()
const blogStore = useBlogStore()

// Local state
const relatedPosts = ref<BlogPost[]>([])

// Computed
const post = computed(() => blogStore.currentPost)

const categoryNames = {
  'machine-learning': '机器学习',
  'nlp': '自然语言处理',
  'computer-vision': '计算机视觉',
  'data-science': '数据科学'
}

const categoryColors = {
  'machine-learning': '#E31937',
  'nlp': '#2563EB',
  'computer-vision': '#059669',
  'data-science': '#7C3AED'
}

const categoryName = computed(() => {
  if (!post.value) return ''
  return categoryNames[post.value.category as keyof typeof categoryNames] || post.value.category
})

const categoryColor = computed(() => {
  if (!post.value) return '#E31937'
  return categoryColors[post.value.category as keyof typeof categoryColors] || '#E31937'
})


// Lifecycle
onMounted(async () => {
  await loadPost()
})

// Watch for route changes
watch(() => route.params.slug, async () => {
  await loadPost()
})

// Methods
const loadPost = async () => {
  const slug = route.params.slug as string
  if (!slug) return
  
  const loadedPost = await blogStore.fetchPostBySlug(slug)
  if (loadedPost) {
    // Load related posts
    relatedPosts.value = await blogStore.fetchRelatedPosts(loadedPost.id)
    
    // Track page view
    analyticsService.trackEvent('blog_post_view', {
      post_id: loadedPost.id,
      post_title: loadedPost.title,
      post_category: loadedPost.category
    })
  }
}

const handleReadPost = (post: BlogPost) => {
  analyticsService.trackEvent('related_post_click', {
    from_post_id: blogStore.currentPost?.id,
    to_post_id: post.id,
    post_title: post.title
  })
  
  router.push(`/blog/${post.slug}`)
}

const shareToWeChat = () => {
  analyticsService.trackEvent('blog_share', { 
    platform: 'wechat',
    post_id: post.value?.id 
  })
  
  // In a real app, integrate with WeChat sharing API
  alert('微信分享功能即将上线')
}

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href)
    
    analyticsService.trackEvent('blog_share', { 
      platform: 'copy_link',
      post_id: post.value?.id 
    })
    
    // Show success message (you could use a toast component here)
    alert('链接已复制到剪贴板')
  } catch (err) {
    console.error('Failed to copy link:', err)
  }
}
</script>


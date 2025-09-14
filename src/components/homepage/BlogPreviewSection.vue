<template>
  <section class="py-20 bg-gradient-to-b from-black to-gray-900">
    <div class="container mx-auto px-4">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-white mb-6">
          技术 <span class="text-primary-500">博客</span>
        </h2>
        <p class="text-xl text-gray-300 max-w-3xl mx-auto">
          探索AI前沿技术，分享实战经验，与您一起洞察人工智能发展趋势
        </p>
      </div>

      <!-- Featured Posts -->
      <div v-if="featuredPosts.length > 0" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <article
          v-for="post in featuredPosts"
          :key="post.id"
          class="blog-preview-card card card-hover bg-background-card border border-border overflow-hidden group cursor-pointer"
          @click="handleReadPost(post)"
        >
          <!-- Thumbnail -->
          <div class="relative h-48 bg-gradient-to-br from-primary-900 to-gray-800 overflow-hidden">
            <div class="absolute inset-0 bg-pattern opacity-20"></div>
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="text-center">
                <div class="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <span class="text-xs text-gray-300 uppercase tracking-wider">{{ getCategoryName(post.category) }}</span>
              </div>
            </div>
            
            <!-- Featured Badge -->
            <div class="absolute top-4 left-4 bg-primary-500 text-white px-2 py-1 rounded text-xs font-bold">
              精选
            </div>
            
            <!-- Read Time -->
            <div class="absolute bottom-4 right-4 bg-black bg-opacity-60 text-white px-2 py-1 rounded text-xs">
              {{ post.readTime }}分钟
            </div>
          </div>

          <!-- Content -->
          <div class="p-6">
            <!-- Meta -->
            <div class="flex items-center justify-between mb-3 text-sm text-text-muted">
              <span>{{ formatDate(post.publishedAt) }}</span>
              <span>{{ post.viewCount }} 阅读</span>
            </div>
            
            <!-- Title -->
            <h3 class="text-lg font-bold text-text-primary mb-3 group-hover:text-primary-400 transition-colors line-clamp-2">
              {{ post.title }}
            </h3>
            
            <!-- Excerpt -->
            <p class="text-text-secondary text-sm mb-4 line-clamp-3">
              {{ post.excerpt }}
            </p>
            
            <!-- Author -->
            <div class="flex items-center">
              <div class="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center mr-2">
                <span class="text-white font-bold text-xs">{{ post.author.charAt(0) }}</span>
              </div>
              <span class="text-xs text-text-muted">{{ post.author }}</span>
            </div>
          </div>
        </article>
      </div>

      <!-- Loading State -->
      <div v-else-if="loading" class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
      </div>

      <!-- View All Button -->
      <div class="text-center">
        <router-link 
          to="/blog"
          class="btn btn-outline btn-lg group"
          @click="trackViewAllClick"
        >
          查看全部文章
          <svg class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
          </svg>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useBlogStore } from '@/stores'
import { analyticsService } from '@/services/api'
import { formatDate } from '@/utils'
import type { BlogPost } from '@/types'

const router = useRouter()
const blogStore = useBlogStore()

// Local state
const featuredPosts = ref<BlogPost[]>([])
const loading = ref(false)

// Category names mapping
const categoryNames = {
  'machine-learning': '机器学习',
  'nlp': '自然语言处理',
  'computer-vision': '计算机视觉',
  'data-science': '数据科学'
}

// Lifecycle
onMounted(async () => {
  await loadFeaturedPosts()
})

// Methods
const loadFeaturedPosts = async () => {
  loading.value = true
  try {
    featuredPosts.value = await blogStore.fetchFeaturedPosts(3)
  } catch (error) {
    console.error('Failed to load featured posts:', error)
  } finally {
    loading.value = false
  }
}

const getCategoryName = (category: string): string => {
  return categoryNames[category as keyof typeof categoryNames] || category
}

const handleReadPost = (post: BlogPost) => {
  // Track blog post click from homepage
  analyticsService.trackEvent('blog_post_click', {
    post_id: post.id,
    post_title: post.title,
    post_category: post.category,
    source: 'homepage_preview'
  })
  
  router.push(`/blog/${post.slug}`)
}

const trackViewAllClick = () => {
  analyticsService.trackEvent('view_all_blog_posts_click', {
    source: 'homepage_preview'
  })
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.blog-preview-card {
  transition: all 0.3s ease;
}

.blog-preview-card:hover {
  transform: translateY(-4px);
}
</style>




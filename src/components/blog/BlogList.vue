<template>
  <div class="blog-list">
    <!-- Loading State -->
    <div v-if="blogStore.loading" class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="blogStore.error" class="text-center py-12">
      <div class="text-red-400 mb-4">{{ blogStore.error }}</div>
      <button @click="blogStore.fetchPosts()" class="btn btn-outline btn-sm">
        重新加载
      </button>
    </div>

    <!-- Blog Posts Grid -->
    <div v-else-if="blogStore.posts.length > 0" class="space-y-8">
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <BlogCard
          v-for="post in blogStore.posts"
          :key="post.id"
          :post="post"
          @read="handleReadPost"
        />
      </div>

      <!-- Pagination -->
      <BlogPagination 
        v-if="blogStore.pagination.totalPages > 1"
        :pagination="blogStore.pagination"
        @page-change="handlePageChange"
      />
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-12">
      <div class="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
      </div>
      <h3 class="text-lg font-medium text-text-primary mb-2">暂无博客文章</h3>
      <p class="text-text-secondary">请稍后再来查看最新的技术分享</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useBlogStore } from '@/stores'
import { analyticsService } from '@/services/api'
import BlogCard from './BlogCard.vue'
import BlogPagination from './BlogPagination.vue'
import type { BlogPost, BlogFilter } from '@/types'

interface Props {
  filters?: BlogFilter
  limit?: number
}

const props = withDefaults(defineProps<Props>(), {
  filters: () => ({}),
  limit: 10
})

const router = useRouter()
const blogStore = useBlogStore()

// Lifecycle
onMounted(async () => {
  await blogStore.fetchPosts({ 
    ...props.filters, 
    limit: props.limit 
  })
})

// Event handlers
const handleReadPost = (post: BlogPost) => {
  // Track blog read interaction
  analyticsService.trackEvent('blog_post_click', {
    post_id: post.id,
    post_title: post.title,
    post_category: post.category,
    source: 'blog_list'
  })
  
  // Navigate to blog post detail
  router.push(`/blog/${post.slug}`)
}

const handlePageChange = async (page: number) => {
  // Track pagination
  analyticsService.trackEvent('blog_pagination', {
    page,
    total_pages: blogStore.pagination.totalPages
  })
  
  await blogStore.fetchPosts({
    ...props.filters,
    page,
    limit: props.limit
  })
  
  // Scroll to top of blog list
  const blogListElement = document.querySelector('.blog-list')
  if (blogListElement) {
    blogListElement.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>




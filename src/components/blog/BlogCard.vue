<template>
  <article class="blog-card card card-hover bg-background-card border border-border overflow-hidden group">
    <!-- Thumbnail -->
    <div class="relative h-48 bg-gradient-to-br from-primary-900 to-gray-800 overflow-hidden">
      <div class="absolute inset-0 bg-pattern opacity-20"></div>
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="text-center">
          <div class="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-2">
            <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <span class="text-xs text-gray-300 uppercase tracking-wider">{{ categoryName }}</span>
        </div>
      </div>
      
      <!-- Featured Badge -->
      <div v-if="post.featured" class="absolute top-4 left-4 bg-primary-500 text-white px-2 py-1 rounded text-xs font-bold">
        精选
      </div>
      
      <!-- Read Time -->
      <div class="absolute bottom-4 right-4 bg-black bg-opacity-60 text-white px-2 py-1 rounded text-xs">
        {{ post.readTime }}分钟阅读
      </div>
    </div>

    <!-- Content -->
    <div class="p-6">
      <!-- Meta Info -->
      <div class="flex items-center justify-between mb-3 text-sm text-text-muted">
        <div class="flex items-center">
          <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path>
          </svg>
          {{ formatDate(post.publishedAt) }}
        </div>
        
        <div class="flex items-center">
          <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
            <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"></path>
          </svg>
          {{ post.viewCount }}
        </div>
      </div>
      
      <!-- Title -->
      <h3 class="text-xl font-bold text-text-primary mb-3 group-hover:text-primary-400 transition-colors line-clamp-2">
        {{ post.title }}
      </h3>
      
      <!-- Excerpt -->
      <p class="text-text-secondary mb-4 line-clamp-3">
        {{ post.excerpt }}
      </p>
      
      <!-- Tags -->
      <div class="flex flex-wrap gap-2 mb-4">
        <span 
          v-for="tag in post.tags.slice(0, 3)" 
          :key="tag"
          class="inline-block bg-background-elevated text-text-muted px-2 py-1 rounded-sm text-xs"
        >
          #{{ tag }}
        </span>
        <span v-if="post.tags.length > 3" class="text-text-muted text-xs">
          +{{ post.tags.length - 3 }}
        </span>
      </div>
      
      <!-- Author & Actions -->
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <div class="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center mr-3">
            <span class="text-white font-bold text-sm">
              {{ post.author.charAt(0) }}
            </span>
          </div>
          <div>
            <div class="text-sm font-medium text-text-primary">{{ post.author }}</div>
            <div class="text-xs text-text-muted">作者</div>
          </div>
        </div>
        
        <button 
          @click="$emit('read', post)"
          class="btn btn-outline btn-sm"
        >
          阅读全文
        </button>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { formatDate } from '@/utils'
import type { BlogPost } from '@/types'

interface Props {
  post: BlogPost
}

interface Emits {
  read: [post: BlogPost]
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// Mock categories mapping
const categoryNames = {
  'machine-learning': '机器学习',
  'nlp': '自然语言处理',
  'computer-vision': '计算机视觉',
  'data-science': '数据科学'
}

const categoryName = computed(() => 
  categoryNames[props.post.category as keyof typeof categoryNames] || props.post.category
)
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
</style>


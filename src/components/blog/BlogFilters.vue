<template>
  <div class="blog-filters bg-background-card rounded-lg p-6 border border-border">
    <h3 class="text-lg font-semibold text-text-primary mb-6">筛选文章</h3>
    
    <!-- Search -->
    <div class="mb-6">
      <label class="form-label">搜索</label>
      <div class="relative">
        <input
          v-model="searchQuery"
          type="text"
          class="form-input pl-10"
          placeholder="搜索文章标题或内容..."
          @input="handleSearchChange"
        />
        <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      </div>
    </div>

    <!-- Categories -->
    <div class="mb-6">
      <label class="form-label">分类</label>
      <div class="space-y-2">
        <label class="flex items-center">
          <input
            v-model="selectedCategory"
            type="radio"
            value=""
            class="form-radio"
            @change="handleCategoryChange"
          />
          <span class="ml-2 text-sm text-text-secondary">全部分类</span>
        </label>
        <label 
          v-for="category in categories"
          :key="category.id"
          class="flex items-center"
        >
          <input
            v-model="selectedCategory"
            type="radio"
            :value="category.slug"
            class="form-radio"
            @change="handleCategoryChange"
          />
          <span class="ml-2 text-sm text-text-secondary">
            {{ category.name }} ({{ category.postCount }})
          </span>
        </label>
      </div>
    </div>

    <!-- Featured Filter -->
    <div class="mb-6">
      <label class="flex items-center">
        <input
          v-model="featuredOnly"
          type="checkbox"
          class="form-checkbox"
          @change="handleFeaturedChange"
        />
        <span class="ml-2 text-sm text-text-secondary">仅显示精选文章</span>
      </label>
    </div>

    <!-- Sort Options -->
    <div class="mb-6">
      <label class="form-label">排序方式</label>
      <select
        v-model="sortBy"
        class="form-select"
        @change="handleSortChange"
      >
        <option value="publishedAt">发布时间</option>
        <option value="viewCount">阅读量</option>
        <option value="title">标题</option>
      </select>
    </div>

    <!-- Clear Filters -->
    <button
      @click="clearAllFilters"
      class="w-full btn btn-outline btn-sm"
    >
      清除所有筛选
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { debounce } from '@/utils'
import type { BlogCategory, BlogFilter } from '@/types'

interface Props {
  categories: BlogCategory[]
  filters: BlogFilter
}

interface Emits {
  'filter-change': [filters: BlogFilter]
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// Local state
const searchQuery = ref(props.filters.search || '')
const selectedCategory = ref(props.filters.category || '')
const featuredOnly = ref(props.filters.featured || false)
const sortBy = ref('publishedAt')

// Debounced search
const debouncedSearch = debounce((query: string) => {
  emitFilterChange()
}, 300)

// Event handlers
const handleSearchChange = () => {
  debouncedSearch(searchQuery.value)
}

const handleCategoryChange = () => {
  emitFilterChange()
}

const handleFeaturedChange = () => {
  emitFilterChange()
}

const handleSortChange = () => {
  emitFilterChange()
}

const emitFilterChange = () => {
  const filters: BlogFilter = {}
  
  if (searchQuery.value.trim()) {
    filters.search = searchQuery.value.trim()
  }
  
  if (selectedCategory.value) {
    filters.category = selectedCategory.value
  }
  
  if (featuredOnly.value) {
    filters.featured = true
  }
  
  emit('filter-change', filters)
}

const clearAllFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = ''
  featuredOnly.value = false
  sortBy.value = 'publishedAt'
  
  emit('filter-change', {})
}

// Watch for external filter changes
watch(() => props.filters, (newFilters) => {
  searchQuery.value = newFilters.search || ''
  selectedCategory.value = newFilters.category || ''
  featuredOnly.value = newFilters.featured || false
}, { deep: true })
</script>




<template>
  <nav class="flex items-center justify-between" aria-label="分页导航">
    <!-- Page Info -->
    <div class="text-sm text-text-muted">
      显示第 {{ startItem }} - {{ endItem }} 项，共 {{ pagination.total }} 项
    </div>

    <!-- Pagination Buttons -->
    <div class="flex items-center space-x-2">
      <!-- Previous Page -->
      <button
        @click="$emit('page-change', pagination.page - 1)"
        :disabled="!pagination.hasPrev"
        class="btn btn-ghost btn-sm"
        :class="{ 'opacity-50 cursor-not-allowed': !pagination.hasPrev }"
        aria-label="上一页"
      >
        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
        上一页
      </button>

      <!-- Page Numbers -->
      <div class="flex items-center space-x-1">
        <!-- First Page -->
        <button
          v-if="showFirstPage"
          @click="$emit('page-change', 1)"
          class="btn btn-ghost btn-sm w-10"
          :class="{ 'btn-primary': pagination.page === 1 }"
        >
          1
        </button>

        <!-- First Ellipsis -->
        <span v-if="showFirstEllipsis" class="px-2 text-text-muted">...</span>

        <!-- Visible Page Numbers -->
        <button
          v-for="page in visiblePages"
          :key="page"
          @click="$emit('page-change', page)"
          class="btn btn-ghost btn-sm w-10"
          :class="{ 'btn-primary': pagination.page === page }"
        >
          {{ page }}
        </button>

        <!-- Last Ellipsis -->
        <span v-if="showLastEllipsis" class="px-2 text-text-muted">...</span>

        <!-- Last Page -->
        <button
          v-if="showLastPage"
          @click="$emit('page-change', pagination.totalPages)"
          class="btn btn-ghost btn-sm w-10"
          :class="{ 'btn-primary': pagination.page === pagination.totalPages }"
        >
          {{ pagination.totalPages }}
        </button>
      </div>

      <!-- Next Page -->
      <button
        @click="$emit('page-change', pagination.page + 1)"
        :disabled="!pagination.hasNext"
        class="btn btn-ghost btn-sm"
        :class="{ 'opacity-50 cursor-not-allowed': !pagination.hasNext }"
        aria-label="下一页"
      >
        下一页
        <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Pagination {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

interface Props {
  pagination: Pagination
}

interface Emits {
  'page-change': [page: number]
}

const props = defineProps<Props>()
defineEmits<Emits>()

// Computed properties
const startItem = computed(() => (props.pagination.page - 1) * props.pagination.limit + 1)
const endItem = computed(() => Math.min(props.pagination.page * props.pagination.limit, props.pagination.total))

const visiblePages = computed(() => {
  const current = props.pagination.page
  const total = props.pagination.totalPages
  const delta = 2 // Number of pages to show on each side of current page
  
  let start = Math.max(2, current - delta)
  let end = Math.min(total - 1, current + delta)
  
  // Adjust range if we're near the beginning or end
  if (current <= delta + 1) {
    end = Math.min(total - 1, 2 * delta + 2)
  }
  if (current >= total - delta) {
    start = Math.max(2, total - 2 * delta - 1)
  }
  
  const pages = []
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

const showFirstPage = computed(() => props.pagination.totalPages > 1)
const showLastPage = computed(() => props.pagination.totalPages > 1 && props.pagination.totalPages > Math.max(...visiblePages.value))
const showFirstEllipsis = computed(() => visiblePages.value.length > 0 && visiblePages.value[0] > 2)
const showLastEllipsis = computed(() => visiblePages.value.length > 0 && visiblePages.value[visiblePages.value.length - 1] < props.pagination.totalPages - 1)
</script>




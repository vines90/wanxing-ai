<template>
  <main class="min-h-screen bg-black text-white">
    <!-- Hero Section -->
    <section class="py-20 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div class="container mx-auto text-center">
        <h1 class="text-5xl md:text-6xl font-bold mb-6">
          技术 <span class="text-primary-500">博客</span>
        </h1>
        <p class="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
          分享AI前沿技术、实战经验和行业洞察，助您紧跟人工智能发展趋势
        </p>
        
        <!-- Search Bar -->
        <div class="max-w-md mx-auto">
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              class="w-full px-4 py-3 pl-12 bg-background-card border border-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="搜索文章..."
              @keyup.enter="handleSearch"
            />
            <svg class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <section class="py-16 px-4">
      <div class="container mx-auto">
        <div class="grid lg:grid-cols-4 gap-8">
          <!-- Sidebar -->
          <aside class="lg:col-span-1">
            <div class="sticky top-8">
              <BlogFilters
                :categories="blogStore.categories"
                :filters="currentFilters"
                @filter-change="handleFilterChange"
              />
              
              <!-- Recent Posts -->
              <div class="mt-8 bg-background-card rounded-lg p-6 border border-border">
                <h3 class="text-lg font-semibold text-text-primary mb-4">最新文章</h3>
                <div class="space-y-4">
                  <div
                    v-for="post in recentPosts"
                    :key="post.id"
                    class="flex items-start space-x-3 cursor-pointer group"
                    @click="handleReadPost(post)"
                  >
                    <div class="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 class="text-sm font-medium text-text-primary group-hover:text-primary-400 transition-colors line-clamp-2">
                        {{ post.title }}
                      </h4>
                      <p class="text-xs text-text-muted mt-1">
                        {{ formatDate(post.publishedAt) }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <!-- Blog Content -->
          <div class="lg:col-span-3">
            <!-- Featured Posts -->
            <div v-if="featuredPosts.length > 0 && !hasFilters" class="mb-12">
              <h2 class="text-3xl font-bold text-white mb-8">精选文章</h2>
              <div class="grid md:grid-cols-2 gap-6">
                <BlogCard
                  v-for="post in featuredPosts"
                  :key="post.id"
                  :post="post"
                  @read="handleReadPost"
                />
              </div>
            </div>

            <!-- Filter Results Info -->
            <div v-if="hasFilters" class="mb-6">
              <div class="flex items-center justify-between">
                <h2 class="text-2xl font-bold text-white">
                  搜索结果
                  <span v-if="blogStore.pagination.total > 0" class="text-text-muted text-base font-normal">
                    ({{ blogStore.pagination.total }} 篇文章)
                  </span>
                </h2>
                <button @click="clearFilters" class="btn btn-ghost btn-sm">
                  清除筛选
                </button>
              </div>
            </div>

            <!-- All Posts -->
            <div v-if="!hasFilters || blogStore.posts.length > 0">
              <h2 v-if="!hasFilters" class="text-3xl font-bold text-white mb-8">全部文章</h2>
              
              <BlogList
                :filters="currentFilters"
                :limit="12"
              />
            </div>

            <!-- No Results -->
            <div v-else-if="hasFilters && blogStore.posts.length === 0 && !blogStore.loading" class="text-center py-12">
              <div class="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <h3 class="text-lg font-medium text-text-primary mb-2">未找到相关文章</h3>
              <p class="text-text-secondary mb-4">尝试调整搜索条件或浏览其他分类</p>
              <button @click="clearFilters" class="btn btn-primary btn-sm">
                浏览全部文章
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useBlogStore } from '@/stores'
import { analyticsService } from '@/services/api'
import { formatDate } from '@/utils'
import BlogCard from '@/components/blog/BlogCard.vue'
import BlogList from '@/components/blog/BlogList.vue'
import BlogFilters from '@/components/blog/BlogFilters.vue'
import type { BlogPost, BlogFilter } from '@/types'

const router = useRouter()
const blogStore = useBlogStore()

// Local state
const searchQuery = ref('')
const currentFilters = ref<BlogFilter>({})
const featuredPosts = ref<BlogPost[]>([])
const recentPosts = ref<BlogPost[]>([])

// Computed
const hasFilters = computed(() => 
  Object.keys(currentFilters.value).length > 0
)

// Lifecycle
onMounted(async () => {
  // Load initial data
  await Promise.all([
    blogStore.fetchCategories(),
    loadFeaturedPosts(),
    loadRecentPosts()
  ])
  
  // Track page view
  analyticsService.trackPageView('/blog')
})

// Methods
const loadFeaturedPosts = async () => {
  featuredPosts.value = await blogStore.fetchFeaturedPosts(4)
}

const loadRecentPosts = async () => {
  recentPosts.value = await blogStore.fetchFeaturedPosts(5)
}

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    handleFilterChange({ search: searchQuery.value.trim() })
  }
}

const handleFilterChange = (filters: BlogFilter) => {
  currentFilters.value = filters
  
  // Track filter usage
  analyticsService.trackEvent('blog_filter_change', {
    filters: Object.keys(filters),
    search_query: filters.search,
    category: filters.category,
    featured_only: filters.featured
  })
}

const clearFilters = () => {
  searchQuery.value = ''
  currentFilters.value = {}
  
  analyticsService.trackEvent('blog_filters_cleared')
}

const handleReadPost = (post: BlogPost) => {
  analyticsService.trackEvent('blog_post_click', {
    post_id: post.id,
    post_title: post.title,
    post_category: post.category,
    source: 'blog_page'
  })
  
  router.push(`/blog/${post.slug}`)
}

// Watch for search query changes
watch(searchQuery, (newQuery) => {
  if (!newQuery.trim() && currentFilters.value.search) {
    // Remove search filter if query is empty
    const { search, ...otherFilters } = currentFilters.value
    currentFilters.value = otherFilters
  }
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>




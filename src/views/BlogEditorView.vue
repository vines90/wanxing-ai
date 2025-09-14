<template>
  <main class="min-h-screen bg-black text-white">
    <!-- Header -->
    <header class="py-8 px-4 bg-gradient-to-r from-gray-900 to-gray-800 border-b border-border">
      <div class="container mx-auto">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-white">博客编辑器</h1>
            <p class="text-text-muted mt-1">创建和编辑博客文章</p>
          </div>
          
          <div class="flex items-center space-x-4">
            <button
              @click="saveDraft"
              :disabled="saving"
              class="btn btn-secondary"
            >
              {{ saving ? '保存中...' : '保存草稿' }}
            </button>
            
            <button
              @click="publishPost"
              :disabled="!canPublish || saving"
              class="btn btn-primary"
            >
              {{ isEditing ? '更新文章' : '发布文章' }}
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Editor Content -->
    <div class="py-8 px-4">
      <div class="container mx-auto max-w-6xl">
        <div class="grid lg:grid-cols-4 gap-8">
          <!-- Main Editor -->
          <div class="lg:col-span-3 space-y-6">
            <!-- Title -->
            <div>
              <label class="form-label">文章标题</label>
              <input
                v-model="post.title"
                type="text"
                class="form-input text-xl font-semibold"
                placeholder="输入文章标题..."
                @input="updateSlug"
              />
            </div>

            <!-- Slug -->
            <div>
              <label class="form-label">URL标识符 (slug)</label>
              <input
                v-model="post.slug"
                type="text"
                class="form-input font-mono text-sm"
                placeholder="url-friendly-slug"
              />
            </div>

            <!-- Excerpt -->
            <div>
              <label class="form-label">文章摘要</label>
              <textarea
                v-model="post.excerpt"
                class="form-input resize-none"
                rows="3"
                placeholder="简要描述文章内容..."
              ></textarea>
            </div>

            <!-- Content Type Toggle -->
            <div class="flex items-center space-x-4">
              <label class="form-label mb-0">编辑模式:</label>
              <div class="flex bg-background-card rounded-lg p-1">
                <button
                  @click="post.contentType = 'markdown'"
                  :class="{ 'bg-primary-500 text-white': post.contentType === 'markdown' }"
                  class="px-3 py-1 rounded text-sm transition-colors"
                >
                  Markdown
                </button>
                <button
                  @click="post.contentType = 'rich'"
                  :class="{ 'bg-primary-500 text-white': post.contentType === 'rich' }"
                  class="px-3 py-1 rounded text-sm transition-colors"
                >
                  富文本
                </button>
              </div>
            </div>

            <!-- Rich Text Editor -->
            <div v-if="post.contentType === 'rich'">
              <label class="form-label">文章内容</label>
              <RichTextEditor
                v-model="post.content"
                placeholder="开始写作..."
                @content-change="updateReadTime"
              />
            </div>

            <!-- Markdown Editor -->
            <div v-else class="space-y-4">
              <div class="flex items-center justify-between">
                <label class="form-label mb-0">文章内容 (Markdown)</label>
                <button
                  @click="showPreview = !showPreview"
                  class="btn btn-ghost btn-sm"
                >
                  {{ showPreview ? '隐藏预览' : '显示预览' }}
                </button>
              </div>
              
              <div class="grid" :class="{ 'md:grid-cols-2 gap-4': showPreview }">
                <!-- Markdown Input -->
                <div>
                  <textarea
                    v-model="post.content"
                    class="form-input font-mono text-sm resize-none"
                    rows="20"
                    placeholder="# 文章标题

使用 Markdown 语法编写文章内容...

## 支持的功能

- **粗体** 和 *斜体*
- [链接](https://example.com)
- ![图片](image-url)
- `代码`

```javascript
// 代码块
console.log('Hello World');
```

> 引用文本

| 表格 | 头部 |
|------|------|
| 数据 | 内容 |"
                    @input="updateReadTime"
                  ></textarea>
                </div>
                
                <!-- Preview -->
                <div v-if="showPreview" class="bg-background-card border border-border rounded-lg p-4">
                  <div class="text-sm text-text-muted mb-2">预览</div>
                  <BlogContentRenderer :post="previewPost" />
                </div>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="lg:col-span-1 space-y-6">
            <!-- Publish Settings -->
            <div class="bg-background-card border border-border rounded-lg p-4">
              <h3 class="font-semibold text-text-primary mb-4">发布设置</h3>
              
              <div class="space-y-4">
                <!-- Status -->
                <div>
                  <label class="form-label">状态</label>
                  <select v-model="post.status" class="form-select">
                    <option value="draft">草稿</option>
                    <option value="published">已发布</option>
                    <option value="archived">已归档</option>
                  </select>
                </div>

                <!-- Featured -->
                <div>
                  <label class="flex items-center">
                    <input v-model="post.featured" type="checkbox" class="form-checkbox mr-2" />
                    <span class="text-sm">精选文章</span>
                  </label>
                </div>

                <!-- Read Time -->
                <div>
                  <label class="form-label">预计阅读时间 (分钟)</label>
                  <input
                    v-model.number="post.readTime"
                    type="number"
                    min="1"
                    class="form-input"
                  />
                </div>

                <!-- Publish Date -->
                <div>
                  <label class="form-label">发布时间</label>
                  <input
                    v-model="publishDate"
                    type="datetime-local"
                    class="form-input"
                  />
                </div>
              </div>
            </div>

            <!-- Categories & Tags -->
            <div class="bg-background-card border border-border rounded-lg p-4">
              <h3 class="font-semibold text-text-primary mb-4">分类和标签</h3>
              
              <div class="space-y-4">
                <!-- Category -->
                <div>
                  <label class="form-label">分类</label>
                  <select v-model="post.category" class="form-select">
                    <option value="machine-learning">机器学习</option>
                    <option value="nlp">自然语言处理</option>
                    <option value="computer-vision">计算机视觉</option>
                    <option value="data-science">数据科学</option>
                  </select>
                </div>

                <!-- Tags -->
                <div>
                  <label class="form-label">标签</label>
                  <div class="space-y-2">
                    <input
                      v-model="newTag"
                      type="text"
                      class="form-input"
                      placeholder="输入标签，按回车添加"
                      @keyup.enter="addTag"
                    />
                    <div class="flex flex-wrap gap-2">
                      <span
                        v-for="tag in post.tags"
                        :key="tag"
                        class="inline-flex items-center bg-primary-500 text-white px-2 py-1 rounded text-xs"
                      >
                        {{ tag }}
                        <button @click="removeTag(tag)" class="ml-1 hover:text-red-300">
                          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                          </svg>
                        </button>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Author Info -->
            <div class="bg-background-card border border-border rounded-lg p-4">
              <h3 class="font-semibold text-text-primary mb-4">作者信息</h3>
              
              <div class="space-y-4">
                <div>
                  <label class="form-label">作者</label>
                  <input v-model="post.author" type="text" class="form-input" />
                </div>
              </div>
            </div>

            <!-- SEO -->
            <div class="bg-background-card border border-border rounded-lg p-4">
              <h3 class="font-semibold text-text-primary mb-4">SEO 设置</h3>
              
              <div class="space-y-4">
                <div>
                  <label class="form-label">Meta 标题</label>
                  <input
                    v-model="post.seo.metaTitle"
                    type="text"
                    class="form-input"
                    :placeholder="post.title"
                  />
                </div>

                <div>
                  <label class="form-label">Meta 描述</label>
                  <textarea
                    v-model="post.seo.metaDescription"
                    class="form-input resize-none"
                    rows="3"
                    :placeholder="post.excerpt"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import RichTextEditor from '@/components/editor/RichTextEditor.vue'
import BlogContentRenderer from '@/components/blog/BlogContentRenderer.vue'
import type { BlogPost } from '@/types'

const route = useRoute()
const router = useRouter()

// Local state
const saving = ref(false)
const showPreview = ref(false)
const newTag = ref('')

const publishDate = ref(new Date().toISOString().slice(0, 16))

const post = ref<BlogPost>({
  id: '',
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  author: '万星AI团队',
  category: 'machine-learning',
  tags: [],
  publishedAt: new Date().toISOString(),
  readTime: 5,
  viewCount: 0,
  featured: false,
  status: 'draft',
  contentType: 'markdown',
  seo: {
    metaTitle: '',
    metaDescription: '',
  }
})

// Computed
const isEditing = computed(() => !!route.params.id)

const canPublish = computed(() => {
  return post.value.title.trim() && 
         post.value.content.trim() && 
         post.value.excerpt.trim() &&
         post.value.slug.trim()
})

const previewPost = computed(() => ({
  ...post.value,
  publishedAt: publishDate.value
}))

// Lifecycle
onMounted(() => {
  if (isEditing.value) {
    loadPost()
  }
})

// Methods
const updateSlug = () => {
  if (!isEditing.value) {
    post.value.slug = post.value.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
  }
}

const updateReadTime = () => {
  const words = post.value.content.split(/\s+/).length
  post.value.readTime = Math.ceil(words / 200) // 假设每分钟读200字
}

const addTag = () => {
  const tag = newTag.value.trim()
  if (tag && !post.value.tags.includes(tag)) {
    post.value.tags.push(tag)
    newTag.value = ''
  }
}

const removeTag = (tag: string) => {
  const index = post.value.tags.indexOf(tag)
  if (index > -1) {
    post.value.tags.splice(index, 1)
  }
}

const saveDraft = async () => {
  saving.value = true
  
  try {
    // 在实际应用中，这里会调用 API 保存草稿
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    post.value.status = 'draft'
    post.value.updatedAt = new Date().toISOString()
    
    alert('草稿已保存')
  } catch (error) {
    console.error('Failed to save draft:', error)
    alert('保存失败，请重试')
  } finally {
    saving.value = false
  }
}

const publishPost = async () => {
  if (!canPublish.value) return
  
  saving.value = true
  
  try {
    // 在实际应用中，这里会调用 API 发布文章
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    post.value.status = 'published'
    post.value.publishedAt = publishDate.value
    post.value.updatedAt = new Date().toISOString()
    
    if (!isEditing.value) {
      post.value.id = `post-${Date.now()}`
    }
    
    alert(isEditing.value ? '文章已更新' : '文章已发布')
    
    // 跳转到博客详情页
    router.push(`/blog/${post.value.slug}`)
  } catch (error) {
    console.error('Failed to publish post:', error)
    alert('发布失败，请重试')
  } finally {
    saving.value = false
  }
}

const loadPost = async () => {
  // 在实际应用中，这里会从 API 加载文章数据
  console.log('Loading post:', route.params.id)
}
</script>

<style scoped>
.form-input {
  @apply w-full px-3 py-2 bg-background border border-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent;
}

.form-select {
  @apply w-full px-3 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent;
}

.form-checkbox {
  @apply text-primary-500 bg-background border-border rounded focus:ring-primary-500;
}

.form-label {
  @apply block text-sm font-medium text-text-primary mb-2;
}
</style>




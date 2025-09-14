<template>
  <div class="blog-content-renderer">
    <!-- Rich Text Content -->
    <div v-if="post.contentType === 'rich'" v-html="sanitizedContent" class="prose prose-invert max-w-none"></div>
    
    <!-- Markdown Content -->
    <div v-else class="prose prose-invert max-w-none" v-html="renderedMarkdown"></div>
    
    <!-- Content Blocks (Structured Content) -->
    <div v-if="post.contentBlocks && post.contentBlocks.length > 0" class="content-blocks space-y-6 mt-8">
      <h3 class="text-xl font-semibold text-text-primary border-b border-border pb-2">补充内容</h3>
      
      <div
        v-for="block in sortedContentBlocks"
        :key="block.id"
        class="content-block"
      >
        <!-- Paragraph Block -->
        <div v-if="block.type === 'paragraph'" class="prose prose-invert">
          <p v-html="block.content"></p>
        </div>

        <!-- Heading Block -->
        <div v-else-if="block.type === 'heading'" class="heading-block">
          <component :is="getHeadingTag(block.content as string)" class="font-bold text-text-primary">
            {{ getHeadingText(block.content as string) }}
          </component>
        </div>

        <!-- Image Block -->
        <ImageBlock
          v-else-if="block.type === 'image'"
          :content="block.content as BlogImageContent"
        />

        <!-- Code Block -->
        <CodeBlock
          v-else-if="block.type === 'code'"
          :content="block.content as BlogCodeContent"
        />

        <!-- Quote Block -->
        <div v-else-if="block.type === 'quote'" class="quote-block">
          <blockquote class="border-l-4 border-primary-500 pl-4 italic text-text-secondary bg-background-elevated p-4 rounded-r-lg">
            {{ block.content }}
          </blockquote>
        </div>

        <!-- List Block -->
        <div v-else-if="block.type === 'list'" class="list-block prose prose-invert">
          <div v-html="renderList(block.content as string)"></div>
        </div>

        <!-- Table Block -->
        <TableBlock
          v-else-if="block.type === 'table'"
          :content="block.content as BlogTableContent"
        />

        <!-- Embed Block -->
        <EmbedBlock
          v-else-if="block.type === 'embed'"
          :content="block.content as string"
        />
      </div>
    </div>

    <!-- Media Gallery -->
    <MediaGallery
      v-if="post.gallery"
      :gallery="post.gallery"
      class="mt-8"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { marked } from 'marked'
import type { BlogPost, BlogImageContent, BlogCodeContent, BlogTableContent } from '@/types'
import ImageBlock from './content-blocks/ImageBlock.vue'
import CodeBlock from './content-blocks/CodeBlock.vue'
import TableBlock from './content-blocks/TableBlock.vue'
import EmbedBlock from './content-blocks/EmbedBlock.vue'
import MediaGallery from './MediaGallery.vue'

interface Props {
  post: BlogPost
}

const props = defineProps<Props>()

// Configure marked for better rendering
marked.setOptions({
  breaks: true,
  gfm: true,
})

// Computed
const sortedContentBlocks = computed(() => {
  if (!props.post.contentBlocks) return []
  return [...props.post.contentBlocks].sort((a, b) => a.order - b.order)
})

const renderedMarkdown = computed(() => {
  if (!props.post.content) return ''
  
  // Enhanced markdown rendering with custom rules
  let content = props.post.content
  
  // Custom image syntax: ![alt](src "caption")
  content = content.replace(
    /!\[([^\]]*)\]\(([^")]+)(?:\s+"([^"]*)")?\)/g,
    (match, alt, src, caption) => {
      const captionHtml = caption ? `<figcaption class="text-center text-sm text-text-muted mt-2">${caption}</figcaption>` : ''
      return `<figure class="my-6"><img src="${src}" alt="${alt}" class="w-full rounded-lg shadow-lg" />${captionHtml}</figure>`
    }
  )
  
  // Custom code blocks with language highlighting
  content = content.replace(
    /```(\w+)?\n([\s\S]*?)```/g,
    (match, language, code) => {
      const lang = language || 'text'
      return `<div class="code-block my-6">
        <div class="code-header bg-gray-800 text-gray-300 px-4 py-2 text-sm rounded-t-lg flex justify-between items-center">
          <span>${lang}</span>
          <button onclick="copyCode(this)" class="text-xs px-2 py-1 bg-gray-700 rounded hover:bg-gray-600">复制</button>
        </div>
        <pre class="bg-gray-900 p-4 rounded-b-lg overflow-x-auto"><code class="language-${lang}">${escapeHtml(code.trim())}</code></pre>
      </div>`
    }
  )
  
  // Custom alert/callout syntax: :::type content :::
  content = content.replace(
    /:::(\w+)\s*([\s\S]*?):::/g,
    (match, type, content) => {
      const alertClasses = {
        info: 'border-blue-500 bg-blue-50 text-blue-800',
        warning: 'border-yellow-500 bg-yellow-50 text-yellow-800',
        error: 'border-red-500 bg-red-50 text-red-800',
        success: 'border-green-500 bg-green-50 text-green-800'
      }
      const classes = alertClasses[type as keyof typeof alertClasses] || alertClasses.info
      return `<div class="alert border-l-4 p-4 my-6 rounded-r-lg ${classes}">
        <div class="font-medium capitalize">${type}</div>
        <div class="mt-1">${content.trim()}</div>
      </div>`
    }
  )
  
  return marked(content)
})

const sanitizedContent = computed(() => {
  // In a real app, use DOMPurify or similar for XSS protection
  return props.post.content || ''
})

// Methods
const getHeadingTag = (content: string): string => {
  const match = content.match(/^(#{1,6})\s/)
  if (match) {
    return `h${match[1].length}`
  }
  return 'h2'
}

const getHeadingText = (content: string): string => {
  return content.replace(/^#{1,6}\s/, '')
}

const renderList = (content: string): string => {
  const lines = content.split('\n').filter(line => line.trim())
  
  if (lines[0]?.match(/^\d+\./)) {
    // Ordered list
    const items = lines.map(line => `<li>${line.replace(/^\d+\.\s*/, '')}</li>`).join('')
    return `<ol class="list-decimal list-inside space-y-1">${items}</ol>`
  } else {
    // Unordered list
    const items = lines.map(line => `<li>${line.replace(/^[-*]\s*/, '')}</li>`).join('')
    return `<ul class="list-disc list-inside space-y-1">${items}</ul>`
  }
}

const escapeHtml = (text: string): string => {
  const div = document.createElement('div')
  div.textContent = text
  return div.innerHTML
}

// Global function for code copying (attached to window)
if (typeof window !== 'undefined') {
  (window as any).copyCode = function(button: HTMLElement) {
    const codeBlock = button.closest('.code-block')
    const code = codeBlock?.querySelector('code')?.textContent
    if (code) {
      navigator.clipboard.writeText(code).then(() => {
        button.textContent = '已复制'
        setTimeout(() => {
          button.textContent = '复制'
        }, 2000)
      })
    }
  }
}
</script>

<style scoped>
/* Enhanced prose styles */
.prose :deep(h1) {
  @apply text-4xl font-bold text-text-primary mt-8 mb-6 pb-2 border-b border-border;
}

.prose :deep(h2) {
  @apply text-3xl font-bold text-text-primary mt-8 mb-4;
}

.prose :deep(h3) {
  @apply text-2xl font-bold text-text-primary mt-6 mb-3;
}

.prose :deep(h4) {
  @apply text-xl font-semibold text-text-primary mt-4 mb-2;
}

.prose :deep(p) {
  @apply text-text-secondary leading-relaxed mb-4;
}

.prose :deep(strong) {
  @apply font-semibold text-text-primary;
}

.prose :deep(em) {
  @apply italic;
}

.prose :deep(a) {
  @apply text-primary-400 hover:text-primary-300 underline;
}

.prose :deep(ul) {
  @apply list-disc list-inside space-y-1 mb-4;
}

.prose :deep(ol) {
  @apply list-decimal list-inside space-y-1 mb-4;
}

.prose :deep(li) {
  @apply text-text-secondary;
}

.prose :deep(blockquote) {
  @apply border-l-4 border-primary-500 pl-4 italic text-text-secondary bg-background-elevated p-4 rounded-r-lg my-6;
}

.prose :deep(code) {
  @apply bg-gray-800 text-yellow-300 px-1 py-0.5 rounded text-sm;
}

.prose :deep(pre) {
  @apply bg-gray-900 p-4 rounded-lg overflow-x-auto my-6;
}

.prose :deep(pre code) {
  @apply bg-transparent p-0;
}

.prose :deep(table) {
  @apply w-full border-collapse border border-border rounded-lg overflow-hidden my-6;
}

.prose :deep(th) {
  @apply bg-background-elevated text-text-primary font-semibold p-3 border-b border-border text-left;
}

.prose :deep(td) {
  @apply text-text-secondary p-3 border-b border-border;
}

.prose :deep(tr:last-child td) {
  @apply border-b-0;
}

.prose :deep(img) {
  @apply rounded-lg shadow-lg my-6;
}

.prose :deep(figure) {
  @apply my-6;
}

.prose :deep(figcaption) {
  @apply text-center text-sm text-text-muted mt-2;
}

/* Alert/Callout styles */
.prose :deep(.alert) {
  @apply border-l-4 p-4 my-6 rounded-r-lg;
}

.prose :deep(.alert.info) {
  @apply border-blue-500 bg-blue-900 bg-opacity-20 text-blue-300;
}

.prose :deep(.alert.warning) {
  @apply border-yellow-500 bg-yellow-900 bg-opacity-20 text-yellow-300;
}

.prose :deep(.alert.error) {
  @apply border-red-500 bg-red-900 bg-opacity-20 text-red-300;
}

.prose :deep(.alert.success) {
  @apply border-green-500 bg-green-900 bg-opacity-20 text-green-300;
}

/* Code block styles */
.prose :deep(.code-block) {
  @apply my-6 rounded-lg overflow-hidden;
}

.prose :deep(.code-header) {
  @apply bg-gray-800 text-gray-300 px-4 py-2 text-sm flex justify-between items-center;
}

.prose :deep(.code-header button) {
  @apply text-xs px-2 py-1 bg-gray-700 rounded hover:bg-gray-600 transition-colors;
}
</style>




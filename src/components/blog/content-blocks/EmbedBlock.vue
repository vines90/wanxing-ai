<template>
  <div class="embed-block my-6">
    <!-- YouTube Embed -->
    <div v-if="embedType === 'youtube'" class="youtube-embed">
      <div class="aspect-video rounded-lg overflow-hidden bg-background-card border border-border">
        <iframe
          :src="youtubeEmbedUrl"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          class="w-full h-full"
        ></iframe>
      </div>
      <div v-if="embedTitle" class="text-center text-sm text-text-muted mt-2">
        {{ embedTitle }}
      </div>
    </div>

    <!-- Bilibili Embed -->
    <div v-else-if="embedType === 'bilibili'" class="bilibili-embed">
      <div class="aspect-video rounded-lg overflow-hidden bg-background-card border border-border">
        <iframe
          :src="bilibiliEmbedUrl"
          title="Bilibili video player"
          frameborder="0"
          allowfullscreen
          class="w-full h-full"
        ></iframe>
      </div>
      <div v-if="embedTitle" class="text-center text-sm text-text-muted mt-2">
        {{ embedTitle }}
      </div>
    </div>

    <!-- CodePen Embed -->
    <div v-else-if="embedType === 'codepen'" class="codepen-embed">
      <div class="rounded-lg overflow-hidden bg-background-card border border-border" style="height: 400px;">
        <iframe
          :src="codepenEmbedUrl"
          title="CodePen Embed"
          frameborder="0"
          class="w-full h-full"
        ></iframe>
      </div>
      <div v-if="embedTitle" class="text-center text-sm text-text-muted mt-2">
        {{ embedTitle }}
      </div>
    </div>

    <!-- JSFiddle Embed -->
    <div v-else-if="embedType === 'jsfiddle'" class="jsfiddle-embed">
      <div class="rounded-lg overflow-hidden bg-background-card border border-border" style="height: 400px;">
        <iframe
          :src="jsfiddleEmbedUrl"
          title="JSFiddle Embed"
          frameborder="0"
          class="w-full h-full"
        ></iframe>
      </div>
      <div v-if="embedTitle" class="text-center text-sm text-text-muted mt-2">
        {{ embedTitle }}
      </div>
    </div>

    <!-- Twitter/X Embed -->
    <div v-else-if="embedType === 'twitter'" class="twitter-embed">
      <div class="bg-background-card border border-border rounded-lg p-4">
        <div class="text-center text-text-muted">
          <svg class="w-8 h-8 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
          </svg>
          <p class="text-sm">Twitter/X 嵌入</p>
          <a :href="content" target="_blank" rel="noopener noreferrer" class="text-primary-400 hover:text-primary-300 text-sm">
            查看原推文
          </a>
        </div>
      </div>
    </div>

    <!-- Generic URL Embed -->
    <div v-else-if="embedType === 'url'" class="url-embed">
      <div class="bg-background-card border border-border rounded-lg p-4">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
            </svg>
          </div>
          <div class="flex-1">
            <div class="text-sm font-medium text-text-primary">外部链接</div>
            <a :href="content" target="_blank" rel="noopener noreferrer" class="text-primary-400 hover:text-primary-300 text-sm break-all">
              {{ content }}
            </a>
          </div>
          <button
            @click="openInNewTab"
            class="text-text-muted hover:text-text-primary p-2 rounded hover:bg-background-elevated transition-colors"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Unsupported Embed -->
    <div v-else class="unsupported-embed">
      <div class="bg-background-card border border-border rounded-lg p-6 text-center">
        <div class="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-3">
          <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
          </svg>
        </div>
        <p class="text-text-muted mb-2">不支持的嵌入类型</p>
        <p class="text-sm text-text-secondary break-all">{{ content }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  content: string
}

const props = defineProps<Props>()

// Computed
const embedType = computed(() => {
  const url = props.content.trim()
  
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    return 'youtube'
  }
  
  if (url.includes('bilibili.com')) {
    return 'bilibili'
  }
  
  if (url.includes('codepen.io')) {
    return 'codepen'
  }
  
  if (url.includes('jsfiddle.net')) {
    return 'jsfiddle'
  }
  
  if (url.includes('twitter.com') || url.includes('x.com')) {
    return 'twitter'
  }
  
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return 'url'
  }
  
  return 'unsupported'
})

const youtubeEmbedUrl = computed(() => {
  if (embedType.value !== 'youtube') return ''
  
  const url = props.content
  let videoId = ''
  
  if (url.includes('youtu.be/')) {
    videoId = url.split('youtu.be/')[1].split('?')[0]
  } else if (url.includes('youtube.com/watch?v=')) {
    videoId = url.split('v=')[1].split('&')[0]
  }
  
  return `https://www.youtube.com/embed/${videoId}`
})

const bilibiliEmbedUrl = computed(() => {
  if (embedType.value !== 'bilibili') return ''
  
  const url = props.content
  const match = url.match(/\/video\/([^/?]+)/)
  const bvid = match ? match[1] : ''
  
  return `https://player.bilibili.com/player.html?bvid=${bvid}&high_quality=1`
})

const codepenEmbedUrl = computed(() => {
  if (embedType.value !== 'codepen') return ''
  
  const url = props.content
  const match = url.match(/codepen\.io\/([^/]+)\/pen\/([^/?]+)/)
  
  if (match) {
    const [, user, penId] = match
    return `https://codepen.io/${user}/embed/${penId}?default-tab=result`
  }
  
  return ''
})

const jsfiddleEmbedUrl = computed(() => {
  if (embedType.value !== 'jsfiddle') return ''
  
  const url = props.content
  const baseUrl = url.split('?')[0]
  return `${baseUrl}/embedded/result,html,css,js/`
})

const embedTitle = computed(() => {
  // Extract title from URL or return empty
  try {
    const url = new URL(props.content)
    return url.hostname
  } catch {
    return ''
  }
})

// Methods
const openInNewTab = () => {
  window.open(props.content, '_blank', 'noopener,noreferrer')
}
</script>

<style scoped>
.aspect-video {
  aspect-ratio: 16 / 9;
}

.embed-block iframe {
  border: none;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .embed-block {
    margin: 1rem 0;
  }
}
</style>




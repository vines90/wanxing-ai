<template>
  <figure 
    :class="alignmentClass"
    class="image-block my-6 group"
  >
    <div class="relative inline-block">
      <img
        :src="content.src"
        :alt="content.alt"
        :width="content.width"
        :height="content.height"
        @load="onImageLoad"
        @error="onImageError"
        class="rounded-lg shadow-lg transition-transform group-hover:scale-[1.02] cursor-pointer"
        :class="imageClass"
        @click="openLightbox"
      />
      
      <!-- Loading overlay -->
      <div v-if="loading" class="absolute inset-0 bg-background-card bg-opacity-75 flex items-center justify-center rounded-lg">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
      </div>
      
      <!-- Error overlay -->
      <div v-if="error" class="absolute inset-0 bg-background-card bg-opacity-75 flex items-center justify-center rounded-lg">
        <div class="text-center text-text-muted">
          <svg class="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
          </svg>
          <p class="text-sm">图片加载失败</p>
        </div>
      </div>
      
      <!-- Zoom indicator -->
      <div class="absolute top-3 right-3 bg-black bg-opacity-60 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path>
        </svg>
      </div>
    </div>
    
    <!-- Caption -->
    <figcaption 
      v-if="content.caption" 
      class="text-center text-sm text-text-muted mt-3 px-4"
    >
      {{ content.caption }}
    </figcaption>
  </figure>

  <!-- Lightbox Modal -->
  <Teleport to="body">
    <div
      v-if="lightboxOpen"
      class="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
      @click="closeLightbox"
      @keydown.esc="closeLightbox"
    >
      <div class="relative max-w-full max-h-full">
        <img
          :src="content.src"
          :alt="content.alt"
          class="max-w-full max-h-full object-contain"
          @click.stop
        />
        
        <!-- Close button -->
        <button
          @click="closeLightbox"
          class="absolute top-4 right-4 text-white hover:text-gray-300 bg-black bg-opacity-50 rounded-full p-2"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        
        <!-- Caption in lightbox -->
        <div 
          v-if="content.caption"
          class="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-75 text-white px-4 py-2 rounded"
        >
          {{ content.caption }}
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import type { BlogImageContent } from '@/types'

interface Props {
  content: BlogImageContent
}

const props = defineProps<Props>()

// Local state
const loading = ref(true)
const error = ref(false)
const lightboxOpen = ref(false)

// Computed
const alignmentClass = computed(() => {
  switch (props.content.alignment) {
    case 'left':
      return 'text-left'
    case 'right':
      return 'text-right'
    case 'center':
      return 'text-center mx-auto'
    case 'full':
      return 'w-full'
    default:
      return 'text-center mx-auto'
  }
})

const imageClass = computed(() => {
  const classes = []
  
  if (props.content.alignment === 'full') {
    classes.push('w-full')
  } else {
    classes.push('max-w-full h-auto')
  }
  
  if (props.content.width) {
    classes.push(`max-w-[${props.content.width}px]`)
  }
  
  return classes.join(' ')
})

// Methods
const onImageLoad = () => {
  loading.value = false
  error.value = false
}

const onImageError = () => {
  loading.value = false
  error.value = true
}

const openLightbox = () => {
  if (!error.value) {
    lightboxOpen.value = true
    document.body.style.overflow = 'hidden'
  }
}

const closeLightbox = () => {
  lightboxOpen.value = false
  document.body.style.overflow = ''
}

// Handle ESC key for lightbox
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && lightboxOpen.value) {
    closeLightbox()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  if (lightboxOpen.value) {
    document.body.style.overflow = ''
  }
})
</script>

<style scoped>
.image-block img {
  transition: transform 0.2s ease-in-out;
}
</style>




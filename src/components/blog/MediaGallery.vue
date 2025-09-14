<template>
  <div class="media-gallery my-8">
    <!-- Gallery Title -->
    <h3 v-if="gallery.title" class="text-xl font-semibold text-text-primary mb-6 text-center">
      {{ gallery.title }}
    </h3>

    <!-- Grid Layout -->
    <div v-if="gallery.layout === 'grid'" class="gallery-grid">
      <div 
        class="grid gap-4"
        :class="gridClass"
      >
        <div
          v-for="(image, index) in gallery.images"
          :key="index"
          @click="openLightbox(index)"
          class="gallery-item relative group cursor-pointer overflow-hidden rounded-lg"
          :class="getItemClass(index)"
        >
          <img
            :src="image.src"
            :alt="image.alt"
            class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          
          <!-- Overlay -->
          <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
            <div class="opacity-0 group-hover:opacity-100 transition-opacity">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path>
              </svg>
            </div>
          </div>
          
          <!-- Caption overlay -->
          <div v-if="image.caption" class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
            <p class="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity">
              {{ image.caption }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Carousel Layout -->
    <div v-else-if="gallery.layout === 'carousel'" class="gallery-carousel">
      <div class="relative">
        <!-- Main Image -->
        <div class="carousel-main bg-background-card rounded-lg overflow-hidden">
          <img
            :src="currentImage.src"
            :alt="currentImage.alt"
            class="w-full h-96 object-cover cursor-pointer"
            @click="openLightbox(currentIndex)"
          />
          
          <!-- Navigation Arrows -->
          <button
            v-if="gallery.images.length > 1"
            @click="previousImage"
            class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          
          <button
            v-if="gallery.images.length > 1"
            @click="nextImage"
            class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
          
          <!-- Image counter -->
          <div class="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
            {{ currentIndex + 1 }} / {{ gallery.images.length }}
          </div>
        </div>
        
        <!-- Caption -->
        <div v-if="currentImage.caption" class="text-center text-sm text-text-muted mt-3">
          {{ currentImage.caption }}
        </div>
        
        <!-- Thumbnails -->
        <div v-if="gallery.images.length > 1" class="carousel-thumbnails mt-4 flex space-x-2 justify-center overflow-x-auto pb-2">
          <button
            v-for="(image, index) in gallery.images"
            :key="index"
            @click="currentIndex = index"
            class="flex-shrink-0 w-16 h-16 rounded border-2 overflow-hidden transition-all"
            :class="{ 'border-primary-500': index === currentIndex, 'border-border': index !== currentIndex }"
          >
            <img :src="image.src" :alt="image.alt" class="w-full h-full object-cover" />
          </button>
        </div>
      </div>
    </div>

    <!-- Masonry Layout -->
    <div v-else-if="gallery.layout === 'masonry'" class="gallery-masonry">
      <div class="masonry-container columns-1 md:columns-2 lg:columns-3 gap-4">
        <div
          v-for="(image, index) in gallery.images"
          :key="index"
          @click="openLightbox(index)"
          class="masonry-item break-inside-avoid mb-4 group cursor-pointer"
        >
          <div class="relative overflow-hidden rounded-lg">
            <img
              :src="image.src"
              :alt="image.alt"
              class="w-full h-auto transition-transform duration-300 group-hover:scale-105"
            />
            
            <!-- Overlay -->
            <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
              <div class="opacity-0 group-hover:opacity-100 transition-opacity">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path>
                </svg>
              </div>
            </div>
            
            <!-- Caption -->
            <div v-if="image.caption" class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
              <p class="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                {{ image.caption }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Lightbox -->
    <Teleport to="body">
      <div
        v-if="lightboxOpen"
        class="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
        @click="closeLightbox"
        @keydown.esc="closeLightbox"
      >
        <div class="relative max-w-full max-h-full">
          <!-- Main lightbox image -->
          <img
            :src="gallery.images[lightboxIndex].src"
            :alt="gallery.images[lightboxIndex].alt"
            class="max-w-full max-h-full object-contain"
            @click.stop
          />
          
          <!-- Navigation -->
          <button
            v-if="gallery.images.length > 1"
            @click.stop="lightboxPrevious"
            class="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 bg-black bg-opacity-50 rounded-full p-3"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          
          <button
            v-if="gallery.images.length > 1"
            @click.stop="lightboxNext"
            class="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 bg-black bg-opacity-50 rounded-full p-3"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
          
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
            v-if="gallery.images[lightboxIndex].caption"
            class="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-75 text-white px-4 py-2 rounded max-w-lg text-center"
          >
            {{ gallery.images[lightboxIndex].caption }}
          </div>
          
          <!-- Image counter -->
          <div class="absolute top-4 left-4 bg-black bg-opacity-75 text-white px-3 py-1 rounded">
            {{ lightboxIndex + 1 }} / {{ gallery.images.length }}
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import type { BlogMediaGallery } from '@/types'

interface Props {
  gallery: BlogMediaGallery
}

const props = defineProps<Props>()

// Local state
const currentIndex = ref(0)
const lightboxOpen = ref(false)
const lightboxIndex = ref(0)

// Computed
const currentImage = computed(() => props.gallery.images[currentIndex.value] || props.gallery.images[0])

const gridClass = computed(() => {
  const imageCount = props.gallery.images.length
  if (imageCount === 1) return 'grid-cols-1'
  if (imageCount === 2) return 'grid-cols-1 md:grid-cols-2'
  if (imageCount === 3) return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
  return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
})

// Methods
const getItemClass = (index: number): string => {
  // Add special styling for specific grid positions
  const imageCount = props.gallery.images.length
  
  if (imageCount >= 3 && index === 0) {
    return 'md:col-span-2 md:row-span-2 h-64 md:h-auto'
  }
  
  return 'h-32 md:h-40'
}

const nextImage = () => {
  currentIndex.value = (currentIndex.value + 1) % props.gallery.images.length
}

const previousImage = () => {
  currentIndex.value = currentIndex.value === 0 ? props.gallery.images.length - 1 : currentIndex.value - 1
}

const openLightbox = (index: number) => {
  lightboxIndex.value = index
  lightboxOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeLightbox = () => {
  lightboxOpen.value = false
  document.body.style.overflow = ''
}

const lightboxNext = () => {
  lightboxIndex.value = (lightboxIndex.value + 1) % props.gallery.images.length
}

const lightboxPrevious = () => {
  lightboxIndex.value = lightboxIndex.value === 0 ? props.gallery.images.length - 1 : lightboxIndex.value - 1
}

// Keyboard navigation
const handleKeydown = (event: KeyboardEvent) => {
  if (!lightboxOpen.value) return
  
  switch (event.key) {
    case 'Escape':
      closeLightbox()
      break
    case 'ArrowLeft':
      lightboxPrevious()
      break
    case 'ArrowRight':
      lightboxNext()
      break
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
/* Gallery transitions */
.gallery-item img {
  transition: transform 0.3s ease;
}

.carousel-thumbnails {
  scrollbar-width: thin;
  scrollbar-color: #4b5563 #1f2937;
}

.carousel-thumbnails::-webkit-scrollbar {
  height: 4px;
}

.carousel-thumbnails::-webkit-scrollbar-track {
  background: #1f2937;
}

.carousel-thumbnails::-webkit-scrollbar-thumb {
  background: #4b5563;
  border-radius: 2px;
}

/* Masonry layout adjustments */
.masonry-container {
  column-fill: balance;
}

@media (max-width: 768px) {
  .masonry-container {
    columns: 1;
  }
}
</style>




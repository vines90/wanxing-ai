<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-background-card rounded-lg shadow-xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-hidden">
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b border-border">
        <h2 class="text-xl font-semibold text-text-primary">插入图片</h2>
        <button @click="$emit('close')" class="text-text-muted hover:text-text-primary">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- Tabs -->
      <div class="flex border-b border-border">
        <button
          @click="activeTab = 'upload'"
          :class="{ 'border-primary-500 text-primary-500': activeTab === 'upload' }"
          class="px-6 py-3 border-b-2 border-transparent text-text-secondary hover:text-text-primary transition-colors"
        >
          上传图片
        </button>
        <button
          @click="activeTab = 'url'"
          :class="{ 'border-primary-500 text-primary-500': activeTab === 'url' }"
          class="px-6 py-3 border-b-2 border-transparent text-text-secondary hover:text-text-primary transition-colors"
        >
          网络图片
        </button>
        <button
          @click="activeTab = 'library'"
          :class="{ 'border-primary-500 text-primary-500': activeTab === 'library' }"
          class="px-6 py-3 border-b-2 border-transparent text-text-secondary hover:text-text-primary transition-colors"
        >
          媒体库
        </button>
      </div>

      <!-- Content -->
      <div class="p-6 max-h-[60vh] overflow-y-auto">
        <!-- Upload Tab -->
        <div v-if="activeTab === 'upload'" class="space-y-6">
          <!-- Drop Zone -->
          <div
            @drop="handleDrop"
            @dragover.prevent
            @dragenter.prevent
            @dragleave="isDragging = false"
            @dragover="isDragging = true"
            :class="{ 'border-primary-500 bg-primary-50': isDragging }"
            class="border-2 border-dashed border-border rounded-lg p-8 text-center transition-colors"
          >
            <div class="mx-auto w-12 h-12 text-text-muted mb-4">
              <svg fill="none" stroke="currentColor" viewBox="0 0 48 48">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <p class="text-text-primary font-medium mb-2">拖拽图片到这里或点击上传</p>
            <p class="text-text-muted text-sm mb-4">支持 JPG, PNG, GIF, WebP 格式，最大 10MB</p>
            <button
              @click="triggerFileInput"
              class="btn btn-primary btn-sm"
            >
              选择文件
            </button>
            <input
              ref="fileInput"
              type="file"
              accept="image/*"
              multiple
              @change="handleFileSelect"
              class="hidden"
            />
          </div>

          <!-- Upload Progress -->
          <div v-if="uploading" class="space-y-3">
            <div v-for="upload in uploadQueue" :key="upload.id" class="bg-background-elevated rounded-lg p-4">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-medium text-text-primary">{{ upload.file.name }}</span>
                <span class="text-sm text-text-muted">{{ upload.progress }}%</span>
              </div>
              <div class="w-full bg-background-card rounded-full h-2">
                <div
                  :style="{ width: upload.progress + '%' }"
                  class="bg-primary-500 h-2 rounded-full transition-all duration-300"
                ></div>
              </div>
            </div>
          </div>

          <!-- Uploaded Images Preview -->
          <div v-if="uploadedImages.length > 0" class="space-y-4">
            <h3 class="text-lg font-medium text-text-primary">已上传的图片</h3>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div
                v-for="image in uploadedImages"
                :key="image.id"
                @click="selectImage(image)"
                class="relative group cursor-pointer bg-background-elevated rounded-lg overflow-hidden hover:ring-2 hover:ring-primary-500 transition-all"
              >
                <img :src="image.url" :alt="image.alt" class="w-full h-32 object-cover" />
                <div class="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span class="text-white text-sm">选择图片</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- URL Tab -->
        <div v-if="activeTab === 'url'" class="space-y-6">
          <div>
            <label class="form-label">图片URL</label>
            <input
              v-model="imageUrl"
              type="url"
              class="form-input"
              placeholder="https://example.com/image.jpg"
              @input="validateImageUrl"
            />
          </div>

          <div>
            <label class="form-label">替代文本 (Alt)</label>
            <input
              v-model="imageAlt"
              type="text"
              class="form-input"
              placeholder="图片描述"
            />
          </div>

          <div>
            <label class="form-label">图片说明 (可选)</label>
            <input
              v-model="imageCaption"
              type="text"
              class="form-input"
              placeholder="图片说明文字"
            />
          </div>

          <!-- URL Preview -->
          <div v-if="imageUrl && isValidUrl" class="bg-background-elevated rounded-lg p-4">
            <h3 class="text-sm font-medium text-text-primary mb-3">预览</h3>
            <img
              :src="imageUrl"
              :alt="imageAlt"
              @load="urlImageLoaded = true"
              @error="urlImageLoaded = false"
              class="max-w-full h-auto rounded"
            />
          </div>
        </div>

        <!-- Media Library Tab -->
        <div v-if="activeTab === 'library'" class="space-y-6">
          <!-- Search -->
          <div>
            <input
              v-model="searchQuery"
              type="text"
              class="form-input"
              placeholder="搜索媒体文件..."
            />
          </div>

          <!-- Library Grid -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div
              v-for="media in filteredMediaLibrary"
              :key="media.id"
              @click="selectImage(media)"
              class="relative group cursor-pointer bg-background-elevated rounded-lg overflow-hidden hover:ring-2 hover:ring-primary-500 transition-all"
            >
              <img :src="media.thumbnail || media.url" :alt="media.alt" class="w-full h-24 object-cover" />
              <div class="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span class="text-white text-xs text-center px-2">{{ media.originalName }}</span>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-if="filteredMediaLibrary.length === 0" class="text-center py-8">
            <div class="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
            <p class="text-text-muted">媒体库为空</p>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="flex items-center justify-between p-6 border-t border-border">
        <div class="text-sm text-text-muted">
          <span v-if="selectedImage">已选择: {{ selectedImage.originalName || selectedImage.alt }}</span>
        </div>
        <div class="flex space-x-3">
          <button @click="$emit('close')" class="btn btn-secondary">
            取消
          </button>
          <button
            @click="insertSelectedImage"
            :disabled="!canInsert"
            class="btn btn-primary"
          >
            插入图片
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { UploadedFile } from '@/types'

interface Emits {
  close: []
  'image-selected': [image: { src: string; alt: string; caption?: string }]
}

const emit = defineEmits<Emits>()

// Local state
const activeTab = ref<'upload' | 'url' | 'library'>('upload')
const isDragging = ref(false)
const uploading = ref(false)
const uploadQueue = ref<any[]>([])
const uploadedImages = ref<UploadedFile[]>([])
const selectedImage = ref<UploadedFile | null>(null)

// URL input
const imageUrl = ref('')
const imageAlt = ref('')
const imageCaption = ref('')
const isValidUrl = ref(false)
const urlImageLoaded = ref(false)

// Media library
const searchQuery = ref('')
const mediaLibrary = ref<UploadedFile[]>([])

// File input
const fileInput = ref<HTMLInputElement>()

// Computed
const canInsert = computed(() => {
  if (activeTab.value === 'upload' || activeTab.value === 'library') {
    return !!selectedImage.value
  }
  if (activeTab.value === 'url') {
    return imageUrl.value && isValidUrl.value && urlImageLoaded.value
  }
  return false
})

const filteredMediaLibrary = computed(() => {
  if (!searchQuery.value) return mediaLibrary.value
  return mediaLibrary.value.filter(media =>
    media.originalName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    (media.alt && media.alt.toLowerCase().includes(searchQuery.value.toLowerCase()))
  )
})

// Lifecycle
onMounted(() => {
  loadMediaLibrary()
})

// Methods
const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files) {
    handleFiles(Array.from(target.files))
  }
}

const handleDrop = (event: DragEvent) => {
  event.preventDefault()
  isDragging.value = false
  
  if (event.dataTransfer?.files) {
    handleFiles(Array.from(event.dataTransfer.files))
  }
}

const handleFiles = async (files: File[]) => {
  const imageFiles = files.filter(file => file.type.startsWith('image/'))
  
  if (imageFiles.length === 0) {
    alert('请选择图片文件')
    return
  }

  // Check file size (10MB limit)
  const oversizedFiles = imageFiles.filter(file => file.size > 10 * 1024 * 1024)
  if (oversizedFiles.length > 0) {
    alert('部分文件超过10MB大小限制')
    return
  }

  uploading.value = true
  
  for (const file of imageFiles) {
    await uploadFile(file)
  }
  
  uploading.value = false
}

const uploadFile = async (file: File): Promise<void> => {
  const uploadId = Date.now() + Math.random()
  const uploadItem = {
    id: uploadId,
    file,
    progress: 0
  }
  
  uploadQueue.value.push(uploadItem)
  
  try {
    // Simulate file upload with progress
    for (let progress = 0; progress <= 100; progress += 10) {
      await new Promise(resolve => setTimeout(resolve, 100))
      uploadItem.progress = progress
    }
    
    // Create uploaded file object (in real app, this would come from server)
    const uploadedFile: UploadedFile = {
      id: `img_${Date.now()}_${Math.random()}`,
      originalName: file.name,
      filename: `${Date.now()}_${file.name}`,
      path: `/uploads/${Date.now()}_${file.name}`,
      url: URL.createObjectURL(file), // In real app, this would be server URL
      mimeType: file.type,
      size: file.size,
      uploadedAt: new Date().toISOString(),
      alt: file.name.replace(/\.[^/.]+$/, ''), // Remove extension for alt text
    }
    
    uploadedImages.value.push(uploadedFile)
    mediaLibrary.value.push(uploadedFile)
    
  } catch (error) {
    console.error('Upload failed:', error)
    alert('上传失败，请重试')
  } finally {
    // Remove from upload queue
    const index = uploadQueue.value.findIndex(item => item.id === uploadId)
    if (index > -1) {
      uploadQueue.value.splice(index, 1)
    }
  }
}

const validateImageUrl = () => {
  try {
    new URL(imageUrl.value)
    isValidUrl.value = true
  } catch {
    isValidUrl.value = false
  }
}

const selectImage = (image: UploadedFile) => {
  selectedImage.value = image
}

const insertSelectedImage = () => {
  if (activeTab.value === 'url' && imageUrl.value) {
    emit('image-selected', {
      src: imageUrl.value,
      alt: imageAlt.value || '图片',
      caption: imageCaption.value
    })
  } else if (selectedImage.value) {
    emit('image-selected', {
      src: selectedImage.value.url,
      alt: selectedImage.value.alt || '图片',
      caption: selectedImage.value.caption
    })
  }
}

const loadMediaLibrary = () => {
  // Mock media library data
  mediaLibrary.value = [
    {
      id: 'demo1',
      originalName: 'ai-robot.jpg',
      filename: 'ai-robot.jpg',
      path: '/images/demo/ai-robot.jpg',
      url: '/images/demo/ai-robot.jpg',
      mimeType: 'image/jpeg',
      size: 245760,
      uploadedAt: '2024-03-10T10:00:00Z',
      alt: 'AI机器人示例图',
    },
    {
      id: 'demo2',
      originalName: 'neural-network.png',
      filename: 'neural-network.png',
      path: '/images/demo/neural-network.png',
      url: '/images/demo/neural-network.png',
      mimeType: 'image/png',
      size: 189432,
      uploadedAt: '2024-03-09T15:30:00Z',
      alt: '神经网络图解',
    },
  ]
}
</script>

<style scoped>
.form-input {
  @apply w-full px-3 py-2 bg-background border border-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent;
}

.form-label {
  @apply block text-sm font-medium text-text-primary mb-2;
}
</style>




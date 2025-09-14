<template>
  <div class="card card-hover bg-background-card border border-border p-6">
    <!-- Rating Stars -->
    <div class="flex items-center mb-4">
      <div class="flex">
        <svg
          v-for="i in 5"
          :key="i"
          class="w-5 h-5"
          :class="i <= testimonial.rating ? 'text-yellow-400' : 'text-gray-600'"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
      </div>
      <span class="ml-2 text-sm text-text-muted">{{ testimonial.rating }}/5</span>
    </div>

    <!-- Testimonial Content -->
    <blockquote class="text-text-secondary mb-6 leading-relaxed italic">
      "{{ testimonial.content }}"
    </blockquote>

    <!-- Author Info -->
    <div class="flex items-center">
      <!-- Avatar -->
      <div class="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
        <span class="text-white font-bold text-lg">
          {{ testimonial.name.charAt(0) }}
        </span>
      </div>
      
      <!-- Author Details -->
      <div class="flex-1">
        <div class="font-semibold text-text-primary">{{ testimonial.name }}</div>
        <div class="text-sm text-text-muted">{{ testimonial.position }}</div>
        <div class="text-sm text-primary-400">{{ testimonial.company }}</div>
      </div>
    </div>

    <!-- Course and Date Info -->
    <div class="mt-4 pt-4 border-t border-border-dark">
      <div class="flex items-center justify-between text-xs text-text-muted">
        <span class="bg-background-elevated px-2 py-1 rounded">{{ testimonial.course }}</span>
        <span>毕业于 {{ formatGraduationDate(testimonial.graduationDate) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Testimonial {
  id: string
  name: string
  position: string
  company: string
  avatar: string
  content: string
  rating: number
  course: string
  graduationDate: string
}

interface Props {
  testimonial: Testimonial
}

defineProps<Props>()

// Helper function to format graduation date
const formatGraduationDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', { 
    year: 'numeric', 
    month: 'long'
  })
}
</script>
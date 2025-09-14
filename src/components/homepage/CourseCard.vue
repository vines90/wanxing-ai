<template>
  <div class="card card-hover group bg-background-card border border-border overflow-hidden">
    <!-- Course Image -->
    <div class="relative h-48 bg-gradient-to-br from-primary-900 to-gray-800 overflow-hidden">
      <div class="absolute inset-0 bg-pattern opacity-20"></div>
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="text-center">
          <div class="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-2">
            <component :is="courseIcon" class="w-8 h-8 text-white" />
          </div>
          <span class="text-xs text-gray-300 uppercase tracking-wider">{{ levelText }}</span>
        </div>
      </div>
      
      <!-- Price Badge -->
      <div class="absolute top-4 right-4 bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-bold">
        {{ formatCurrency(course.price) }}
      </div>
      
      <!-- Enrollment Count -->
      <div class="absolute bottom-4 left-4 bg-black bg-opacity-60 text-white px-2 py-1 rounded text-xs">
        {{ course.enrollmentCount }}人已报名
      </div>
    </div>

    <!-- Course Content -->
    <div class="p-6">
      <!-- Course Title -->
      <h3 class="text-xl font-bold text-text-primary mb-3 group-hover:text-primary-400 transition-colors">
        {{ course.title }}
      </h3>
      
      <!-- Course Description -->
      <p class="text-text-secondary mb-4 line-clamp-2">
        {{ course.description }}
      </p>
      
      <!-- Course Info -->
      <div class="flex items-center justify-between mb-4 text-sm text-text-muted">
        <div class="flex items-center">
          <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path>
          </svg>
          {{ course.duration }}
        </div>
        
        <div class="flex items-center">
          <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"></path>
          </svg>
          {{ instructorName }}
        </div>
      </div>
      
      <!-- Course Syllabus Preview -->
      <div class="mb-6">
        <h4 class="text-sm font-medium text-text-primary mb-2">课程大纲</h4>
        <ul class="text-xs text-text-muted space-y-1">
          <li v-for="(topic, index) in course.syllabus.slice(0, 3)" :key="index" class="flex items-start">
            <span class="text-primary-500 mr-1">•</span>
            {{ topic }}
          </li>
          <li v-if="course.syllabus.length > 3" class="text-primary-400">
            +{{ course.syllabus.length - 3 }}个更多主题...
          </li>
        </ul>
      </div>
      
      <!-- Actions -->
      <div class="flex gap-2">
        <button 
          @click="$emit('enroll', course)"
          class="flex-1 btn btn-primary btn-sm"
        >
          立即报名
        </button>
        <button 
          @click="handleLearnMore"
          class="btn btn-outline btn-sm px-4"
        >
          详情
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { formatCurrency } from '@/utils'
import { analyticsService } from '@/services/api'
import { teamMembers } from '@/data/teamMembers'
import type { Course } from '@/types'

interface Props {
  course: Course
}

interface Emits {
  enroll: [course: Course]
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// Computed properties
const levelText = computed(() => {
  const levels = {
    beginner: '初级',
    intermediate: '中级', 
    advanced: '高级'
  }
  return levels[props.course.level] || '未知'
})

const courseIcon = computed(() => {
  const icons = {
    foundation: 'AcademicCapIcon',
    'deep-learning': 'CpuChipIcon',
    nlp: 'ChatBubbleLeftRightIcon',
    'computer-vision': 'EyeIcon',
    'data-science': 'ChartBarIcon',
    'ai-media': 'VideoCameraIcon',
    'prompt-engineering': 'CommandLineIcon',
    'office-automation': 'DocumentTextIcon',
    'ai-programming': 'CodeBracketIcon'
  }
  
  // Return a simple div if icon not found
  return icons[props.course.category] || 'div'
})

const instructorName = computed(() => {
  const instructor = teamMembers.find(member => member.id === props.course.instructor)
  return instructor?.name || '待定'
})

// Event handlers
const handleLearnMore = () => {
  analyticsService.trackEvent('course_learn_more_click', {
    course_id: props.course.id,
    course_title: props.course.title,
    source: 'course_card'
  })
  
  // In real implementation, this would navigate to course detail page
  console.log('Navigate to course detail:', props.course.id)
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
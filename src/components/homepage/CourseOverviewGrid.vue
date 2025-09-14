<template>
  <section class="py-20 bg-black">
    <div class="container mx-auto px-4">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-white mb-6">
          热门 <span class="text-primary-500">AI课程</span>
        </h2>
        <p class="text-xl text-gray-300 max-w-3xl mx-auto">
          精心设计的课程体系，从入门到精通，助您成为AI领域的专业人才
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="courseStore.loading" class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>

      <!-- Error State -->
      <div v-else-if="courseStore.error" class="text-center py-12">
        <p class="text-red-400 mb-4">{{ courseStore.error }}</p>
        <button @click="courseStore.fetchCourses()" class="btn btn-outline btn-sm">
          重新加载
        </button>
      </div>

      <!-- Course Grid -->
      <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <CourseCard
          v-for="course in courseStore.courses"
          :key="course.id"
          :course="{ ...course } as Course"
          @enroll="handleEnroll"
        />
      </div>

      <!-- View All Courses CTA -->
      <div class="text-center mt-12">
        <button 
          @click="scrollToCourses"
          class="btn btn-outline btn-lg"
        >
          查看全部课程
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import CourseCard from './CourseCard.vue'
import { useCourseStore } from '@/stores'
import { analyticsService } from '@/services/api'
import { scrollToElement } from '@/utils'
import type { Course } from '@/types'

// Store
const courseStore = useCourseStore()

// Lifecycle
onMounted(async () => {
  if (courseStore.courses.length === 0) {
    await courseStore.fetchCourses()
  }
})

// Event handlers
const handleEnroll = (course: Course) => {
  // Track enrollment interest
  analyticsService.trackEvent('course_enroll_interest', {
    course_id: course.id,
    course_title: course.title,
    course_price: course.price,
    source: 'course_overview_grid'
  })
  
  // Scroll to contact form
  const contactSection = document.getElementById('contact-section')
  if (contactSection) {
    scrollToElement(contactSection, 80)
  }
}

const scrollToCourses = () => {
  analyticsService.trackEvent('view_all_courses_click', {
    source: 'course_overview_grid'
  })
  
  // In real implementation, this would navigate to courses page
  console.log('Navigate to courses page')
}
</script>
<script setup lang="ts">
import { onMounted } from 'vue'
import HeroSection from '@/components/homepage/HeroSection.vue'
import CourseOverviewGrid from '@/components/homepage/CourseOverviewGrid.vue'
import TestimonialsCarousel from '@/components/homepage/TestimonialsCarousel.vue'
import BlogPreviewSection from '@/components/homepage/BlogPreviewSection.vue'
import ContactSection from '@/components/homepage/ContactSection.vue'
import { useCourseStore } from '@/stores'
import { analyticsService } from '@/services/api'

// Store
const courseStore = useCourseStore()

// Lifecycle
onMounted(async () => {
  // Load courses data
  await courseStore.fetchCourses()
  
  // Track page view
  analyticsService.trackPageView('/')
})
</script>

<template>
  <main class="min-h-screen bg-black text-white">
    <!-- Hero Section -->
    <HeroSection />

    <!-- Features Section -->
    <section class="py-20 px-4 bg-gray-900">
      <div class="container mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-white mb-6">
            专业 <span class="text-primary-500">AI培训服务</span>
          </h2>
          <p class="text-xl text-gray-300 max-w-3xl mx-auto">
            从零基础到AI专家，我们提供全方位的人工智能培训解决方案
          </p>
        </div>
        
        <div class="grid md:grid-cols-3 gap-8">
          <div class="card card-hover group">
            <div class="w-16 h-16 bg-primary-500 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
              <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold mb-4 text-primary-500">系统化课程</h3>
            <p class="text-gray-300 leading-relaxed">
              四大核心课程体系，从AI基础到深度学习实战，循序渐进掌握前沿技术
            </p>
            <ul class="mt-4 space-y-2 text-sm text-gray-400">
              <li>• AI基础入门</li>
              <li>• 深度学习实战</li>
              <li>• 自然语言处理</li>
              <li>• 计算机视觉</li>
            </ul>
          </div>
          
          <div class="card card-hover group">
            <div class="w-16 h-16 bg-primary-500 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
              <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd"></path>
                <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold mb-4 text-primary-500">项目实战</h3>
            <p class="text-gray-300 leading-relaxed">
              真实企业项目案例驱动学习，在实践中掌握AI技术的实际应用
            </p>
            <ul class="mt-4 space-y-2 text-sm text-gray-400">
              <li>• 智能推荐系统</li>
              <li>• 文本情感分析</li>
              <li>• 图像识别应用</li>
              <li>• 聊天机器人开发</li>
            </ul>
          </div>
          
          <div class="card card-hover group">
            <div class="w-16 h-16 bg-primary-500 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
              <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold mb-4 text-primary-500">就业保障</h3>
            <p class="text-gray-300 leading-relaxed">
              专业的职业规划指导和就业推荐服务，助您成功转型AI工程师
            </p>
            <ul class="mt-4 space-y-2 text-sm text-gray-400">
              <li>• 简历优化指导</li>
              <li>• 面试技巧培训</li>
              <li>• 企业内推机会</li>
              <li>• 职业发展规划</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Course Overview -->
    <CourseOverviewGrid />
    
    <!-- Testimonials -->
    <TestimonialsCarousel />
    
    <!-- Blog Preview -->
    <BlogPreviewSection />
    
    <!-- Contact Section -->
    <ContactSection />
  </main>
</template>

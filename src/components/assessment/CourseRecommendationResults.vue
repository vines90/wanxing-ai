<template>
  <div class="course-recommendation-results">
    <!-- Header -->
    <div class="text-center mb-8">
      <div class="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      </div>
      <h2 class="text-2xl font-bold text-text-primary mb-2">
        {{ userName }}，为您找到了最适合的课程！
      </h2>
      <p class="text-text-secondary">
        基于AI智能分析，以下是为您量身定制的学习方案
      </p>
    </div>

    <!-- Recommendations -->
    <div class="space-y-8">
      <div
        v-for="(recommendation, index) in recommendations"
        :key="recommendation.courseId"
        class="recommendation-card bg-background-elevated border border-border rounded-lg p-6 relative overflow-hidden"
      >
        <!-- Recommendation Badge -->
        <div class="absolute top-4 right-4">
          <div class="bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            推荐度: {{ recommendation.matchScore }}%
          </div>
        </div>

        <!-- Course Title -->
        <div class="mb-6">
          <div class="flex items-center space-x-3 mb-2">
            <div class="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              {{ index + 1 }}
            </div>
            <h3 class="text-xl font-bold text-text-primary">{{ recommendation.courseName }}</h3>
          </div>
          <div class="flex items-center space-x-4 text-sm text-text-muted">
            <span class="flex items-center">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              {{ recommendation.timeEstimate }}
            </span>
            <span class="flex items-center">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
              {{ recommendation.difficulty }}
            </span>
          </div>
        </div>

        <!-- Recommendation Reasons -->
        <div class="mb-6">
          <h4 class="text-lg font-semibold text-text-primary mb-3">为什么推荐这门课程？</h4>
          <div class="grid md:grid-cols-2 gap-3">
            <div
              v-for="reason in recommendation.reasons"
              :key="reason"
              class="flex items-start space-x-2 p-3 bg-background-card rounded-lg"
            >
              <svg class="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span class="text-sm text-text-secondary">{{ reason }}</span>
            </div>
          </div>
        </div>

        <!-- Learning Path -->
        <div class="mb-6" v-if="recommendation.learningPath.length > 0">
          <h4 class="text-lg font-semibold text-text-primary mb-3">学习路径</h4>
          <div class="space-y-3">
            <div
              v-for="(step, stepIndex) in recommendation.learningPath"
              :key="stepIndex"
              class="flex items-start space-x-3"
            >
              <div class="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">
                {{ stepIndex + 1 }}
              </div>
              <span class="text-sm text-text-secondary">{{ step }}</span>
            </div>
          </div>
        </div>

        <!-- Expected Outcomes -->
        <div class="mb-6">
          <h4 class="text-lg font-semibold text-text-primary mb-3">学习后您将收获</h4>
          <div class="grid md:grid-cols-2 gap-3">
            <div
              v-for="outcome in recommendation.expectedOutcomes"
              :key="outcome"
              class="flex items-start space-x-2 p-3 bg-gradient-to-r from-green-900 to-green-800 rounded-lg"
            >
              <svg class="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
              <span class="text-sm text-green-200">{{ outcome }}</span>
            </div>
          </div>
        </div>

        <!-- Next Steps -->
        <div class="mb-6" v-if="recommendation.nextSteps.length > 0">
          <h4 class="text-lg font-semibold text-text-primary mb-3">后续进阶建议</h4>
          <div class="space-y-2">
            <div
              v-for="step in recommendation.nextSteps"
              :key="step"
              class="flex items-start space-x-2 text-sm text-text-muted"
            >
              <svg class="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
              <span>{{ step }}</span>
            </div>
          </div>
        </div>

        <!-- Course Actions -->
        <div class="flex items-center justify-between pt-4 border-t border-border">
          <div class="text-sm text-text-muted">
            课程ID: {{ recommendation.courseId }}
          </div>
          <div class="flex items-center space-x-3">
            <button class="btn btn-ghost btn-sm">
              了解详情
            </button>
            <button class="btn btn-primary btn-sm">
              立即报名
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Summary -->
    <div class="mt-8 p-6 bg-gradient-to-r from-primary-900 to-primary-800 rounded-lg">
      <h3 class="text-lg font-semibold text-white mb-3">专属学习建议</h3>
      <div class="grid md:grid-cols-2 gap-6 text-sm">
        <div>
          <h4 class="font-medium text-primary-200 mb-2">总体建议</h4>
          <ul class="space-y-1 text-primary-100">
            <li>• 建议按推荐顺序依次学习</li>
            <li>• 每门课程建议完成度达到80%以上</li>
            <li>• 重视实战项目，建立作品集</li>
          </ul>
        </div>
        <div>
          <h4 class="font-medium text-primary-200 mb-2">学习支持</h4>
          <ul class="space-y-1 text-primary-100">
            <li>• 专属学习群答疑解惑</li>
            <li>• 1对1导师指导服务</li>
            <li>• 就业推荐和职业规划</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex items-center justify-center space-x-4 mt-8 pt-6 border-t border-border">
      <button @click="$emit('restart')" class="btn btn-secondary">
        重新测试
      </button>
      <button @click="$emit('close')" class="btn btn-primary">
        开始学习
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CourseRecommendation } from '@/types'

interface Props {
  recommendations: CourseRecommendation[]
  userName: string
}

interface Emits {
  close: []
  restart: []
}

defineProps<Props>()
defineEmits<Emits>()
</script>

<style scoped>
.recommendation-card {
  transition: all 0.3s ease;
}

.recommendation-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

/* 渐变边框效果 */
.recommendation-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #E31937, #FF6B6B, #4ECDC4);
  border-radius: 8px 8px 0 0;
}
</style>

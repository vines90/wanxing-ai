<script setup lang="ts">
import { ref } from 'vue'
import CourseCard from './CourseCard.vue'

// Course data for the 4 AI courses
const courses = ref([
  {
    id: 'ai-prompts',
    title: 'AI提示词工程',
    subtitle: 'AI Prompt Engineering',
    duration: '4周课程',
    level: '零基础入门',
    price: '¥2,980',
    description: '掌握AI对话技巧，学会编写高效提示词，提升工作效率10倍以上',
    keyBenefits: ['ChatGPT高级使用技巧', '提示词编写框架', '商业场景应用', '实战项目练习'],
    icon: '🤖',
    bgGradient: 'from-blue-500 to-cyan-500',
    route: '/courses/ai-prompts',
  },
  {
    id: 'ai-social-media',
    title: 'AI自媒体运营',
    subtitle: 'AI Social Media Marketing',
    duration: '6周课程',
    level: '进阶提升',
    price: '¥4,980',
    description: '结合AI工具进行内容创作，打造个人IP，实现自媒体变现',
    keyBenefits: ['AI内容创作工具', '短视频制作技巧', '社交媒体运营', '变现策略指导'],
    icon: '📱',
    bgGradient: 'from-pink-500 to-rose-500',
    route: '/courses/ai-social-media',
  },
  {
    id: 'ai-digital-human',
    title: 'AI数字人制作',
    subtitle: 'AI Digital Human Creation',
    duration: '8周课程',
    level: '专业进阶',
    price: '¥6,980',
    description: '学会制作AI数字人，掌握虚拟主播、数字员工等前沿技术',
    keyBenefits: ['数字人建模技术', '语音合成与驱动', '直播间搭建', '商业化应用'],
    icon: '👤',
    bgGradient: 'from-purple-500 to-indigo-500',
    route: '/courses/ai-digital-human',
  },
  {
    id: 'ai-programming',
    title: 'AI编程开发',
    subtitle: 'AI Programming & Development',
    duration: '12周课程',
    level: '深度专精',
    price: '¥8,980',
    description: '掌握AI开发技能，学会构建智能应用，成为AI工程师',
    keyBenefits: ['Python AI开发', '机器学习实战', 'AI模型训练', '项目部署上线'],
    icon: '💻',
    bgGradient: 'from-green-500 to-teal-500',
    route: '/courses/ai-programming',
  },
])

// Navigation to course detail page
const navigateToCourse = (route: string) => {
  console.log(`Navigating to: ${route}`)
  // In real implementation, use Vue Router
}
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
    <CourseCard
      v-for="course in courses"
      :key="course.id"
      :course="course"
      @click="navigateToCourse(course.route)"
    />
  </div>
</template>

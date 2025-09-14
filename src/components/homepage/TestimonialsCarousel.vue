<template>
  <section class="py-20 bg-gradient-to-b from-gray-900 to-black">
    <div class="container mx-auto px-4">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-white mb-6">
          学员 <span class="text-primary-500">成功案例</span>
        </h2>
        <p class="text-xl text-gray-300 max-w-3xl mx-auto">
          听听我们学员的真实反馈，了解他们如何通过万星AI改变职业轨迹
        </p>
      </div>

      <!-- Testimonials Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <TestimonialCard
          v-for="testimonial in testimonials"
          :key="testimonial.id"
          :testimonial="testimonial"
        />
      </div>

      <!-- Statistics -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-gray-800">
        <div class="text-center">
          <div class="text-3xl md:text-4xl font-bold text-primary-500 mb-2">500+</div>
          <div class="text-gray-300">成功学员</div>
        </div>
        <div class="text-center">
          <div class="text-3xl md:text-4xl font-bold text-primary-500 mb-2">95%</div>
          <div class="text-gray-300">就业成功率</div>
        </div>
        <div class="text-center">
          <div class="text-3xl md:text-4xl font-bold text-primary-500 mb-2">50+</div>
          <div class="text-gray-300">合作企业</div>
        </div>
        <div class="text-center">
          <div class="text-3xl md:text-4xl font-bold text-primary-500 mb-2">3年</div>
          <div class="text-gray-300">办学经验</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TestimonialCard from './TestimonialCard.vue'

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

const testimonials = ref<Testimonial[]>([
  {
    id: 'testimonial-1',
    name: '李小明',
    position: 'AI工程师',
    company: '腾讯科技',
    avatar: '/images/testimonials/li-xiaoming.jpg',
    content: '在万星AI学习的这几个月，让我从一个编程小白成功转型为AI工程师。老师的教学方式非常实用，项目导向的学习让我快速掌握了实战技能。现在在腾讯负责推荐算法优化，薪资比之前翻了两倍！',
    rating: 5,
    course: 'AI基础入门课程',
    graduationDate: '2024-01'
  },
  {
    id: 'testimonial-2',
    name: '张雅雯',
    position: 'NLP算法工程师',
    company: '字节跳动',
    avatar: '/images/testimonials/zhang-yawen.jpg',
    content: '万星AI的NLP课程非常专业，从理论到实践都覆盖得很全面。特别是刘老师的BERT模型讲解，让我对transformer架构有了深入理解。毕业后顺利进入字节跳动，现在负责智能客服项目。',
    rating: 5,
    course: 'NLP自然语言处理',
    graduationDate: '2024-02'
  },
  {
    id: 'testimonial-3',
    name: '王建华',
    position: '机器学习工程师',
    company: '阿里巴巴',
    avatar: '/images/testimonials/wang-jianhua.jpg',
    content: '作为一名传统软件工程师，通过万星AI的深度学习课程，我成功转型到AI领域。课程设置很合理，有大量的hands-on项目，让我能够真正理解算法原理。现在在阿里负责商品推荐系统的优化工作。',
    rating: 5,
    course: '深度学习实战',
    graduationDate: '2023-12'
  }
])
</script>
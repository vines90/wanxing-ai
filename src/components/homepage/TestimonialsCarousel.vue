<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import TestimonialCard from './TestimonialCard.vue'

// Testimonial data with local Foshan Shunde success stories
const testimonials = ref([
  {
    id: 1,
    name: '陈志华',
    age: 28,
    occupation: '从传统制造业转型AI产品经理',
    location: '佛山顺德',
    avatar: '/images/testimonials/chen-zhihua.jpg', // Placeholder
    course: 'AI提示词工程 + AI编程开发',
    beforeSituation: '在顺德一家家具厂做普通管理工作，薪资8K，担心被AI替代',
    afterResult: '成功转型为AI产品经理，月薪提升至18K，带领团队开发智能制造解决方案',
    quote:
      '万星AI的课程非常实用，老师都是行业专家，从零基础到能独立开发AI应用，只用了3个月时间。现在我在公司负责AI产品规划，工作更有挑战性，收入也翻了一倍多。',
    rating: 5,
    completionDate: '2024-06',
    salaryIncrease: '125%',
  },
  {
    id: 2,
    name: '李美玲',
    age: 32,
    occupation: '自媒体博主',
    location: '佛山顺德',
    avatar: '/images/testimonials/li-meiling.jpg', // Placeholder
    course: 'AI自媒体运营 + AI数字人制作',
    beforeSituation: '做了2年自媒体，粉丝量一直突破不了5万，月收入不稳定',
    afterResult: '利用AI工具制作内容，粉丝增长至30万，月收入稳定在3-5万元',
    quote:
      '学会用AI做短视频和直播后，我的内容产出效率提升了10倍，粉丝特别喜欢我的AI数字人直播间。万星AI的老师手把手教学，让我快速掌握了这些前沿技术。',
    rating: 5,
    completionDate: '2024-08',
    salaryIncrease: '400%',
  },
  {
    id: 3,
    name: '王建国',
    age: 35,
    occupation: '企业培训师',
    location: '佛山顺德',
    avatar: '/images/testimonials/wang-jianguo.jpg', // Placeholder
    course: 'AI数字人制作 + AI提示词工程',
    beforeSituation: '传统企业培训师，疫情期间业务受冲击，亟需转型升级',
    afterResult: '开发AI培训助手，创立在线教育品牌，年收入从20万提升至60万',
    quote:
      'AI数字人技术让我的培训业务完全数字化了，现在我可以24小时为企业提供培训服务。万星AI的实战项目特别棒，直接就能用到工作中。',
    rating: 5,
    completionDate: '2024-07',
    salaryIncrease: '200%',
  },
  {
    id: 4,
    name: '张小雅',
    age: 24,
    occupation: '应届毕业生转AI工程师',
    location: '佛山顺德',
    avatar: '/images/testimonials/zhang-xiaoya.jpg', // Placeholder
    course: 'AI编程开发 + AI提示词工程',
    beforeSituation: '大学学的是传统计算机专业，对AI开发零基础，找工作屡屡碰壁',
    afterResult: '顺利入职顺德一家科技公司，成为AI算法工程师，起薪15K',
    quote:
      '作为应届生，万星AI给了我进入AI行业的机会。老师们不仅教技术，还指导简历和面试，最终帮我成功转型为AI工程师。现在我负责公司的机器学习项目，特别有成就感！',
    rating: 5,
    completionDate: '2024-09',
    salaryIncrease: '从0到15K',
  },
])

// Carousel state
const currentIndex = ref(0)
const autoPlayInterval = ref<number | null>(null)
const isHovered = ref(false)

// Auto-play functionality
const startAutoPlay = () => {
  autoPlayInterval.value = setInterval(() => {
    if (!isHovered.value) {
      nextSlide()
    }
  }, 5000) // 5 seconds
}

const stopAutoPlay = () => {
  if (autoPlayInterval.value) {
    clearInterval(autoPlayInterval.value)
    autoPlayInterval.value = null
  }
}

// Navigation functions
const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % testimonials.value.length
}

const prevSlide = () => {
  currentIndex.value =
    currentIndex.value === 0 ? testimonials.value.length - 1 : currentIndex.value - 1
}

const goToSlide = (index: number) => {
  currentIndex.value = index
}

// Lifecycle hooks
onMounted(() => {
  startAutoPlay()
})

onUnmounted(() => {
  stopAutoPlay()
})

// Hover handlers
const handleMouseEnter = () => {
  isHovered.value = true
}

const handleMouseLeave = () => {
  isHovered.value = false
}
</script>

<template>
  <div
    class="relative max-w-4xl mx-auto"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- Main carousel container -->
    <div class="overflow-hidden rounded-2xl">
      <div
        class="flex transition-transform duration-500 ease-in-out"
        :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
      >
        <div v-for="testimonial in testimonials" :key="testimonial.id" class="w-full flex-shrink-0">
          <TestimonialCard :testimonial="testimonial" />
        </div>
      </div>
    </div>

    <!-- Navigation arrows -->
    <button
      @click="prevSlide"
      class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-800 rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-500"
      :class="{ 'opacity-100': isHovered, 'opacity-70': !isHovered }"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 19l-7-7 7-7"
        ></path>
      </svg>
    </button>

    <button
      @click="nextSlide"
      class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-800 rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-500"
      :class="{ 'opacity-100': isHovered, 'opacity-70': !isHovered }"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 5l7 7-7 7"
        ></path>
      </svg>
    </button>

    <!-- Dot indicators -->
    <div class="flex justify-center mt-8 space-x-3">
      <button
        v-for="(_, index) in testimonials"
        :key="index"
        @click="goToSlide(index)"
        class="w-3 h-3 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        :class="{
          'bg-primary-500 scale-125': currentIndex === index,
          'bg-gray-300 hover:bg-gray-400': currentIndex !== index,
        }"
      ></button>
    </div>

    <!-- Progress bar -->
    <div class="mt-6">
      <div class="w-full bg-gray-200 rounded-full h-1">
        <div
          class="bg-primary-500 h-1 rounded-full transition-all duration-300"
          :style="{ width: `${((currentIndex + 1) / testimonials.length) * 100}%` }"
        ></div>
      </div>
    </div>
  </div>
</template>

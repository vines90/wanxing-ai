<script setup lang="ts">
interface Testimonial {
  id: number
  name: string
  age: number
  occupation: string
  location: string
  avatar: string
  course: string
  beforeSituation: string
  afterResult: string
  quote: string
  rating: number
  completionDate: string
  salaryIncrease: string
}

defineProps<{
  testimonial: Testimonial
}>()
</script>

<template>
  <div class="bg-white rounded-2xl shadow-xl p-8 mx-4">
    <!-- Header with user info -->
    <div class="flex items-start mb-6">
      <!-- Avatar -->
      <div class="flex-shrink-0 mr-6">
        <div
          class="w-20 h-20 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg"
        >
          {{ testimonial.name.charAt(0) }}
        </div>
      </div>

      <!-- User details -->
      <div class="flex-1">
        <h3 class="text-2xl font-bold text-gray-900 mb-1">{{ testimonial.name }}</h3>
        <p class="text-lg text-primary-600 font-semibold mb-2">{{ testimonial.occupation }}</p>
        <div class="flex flex-wrap items-center gap-4 text-sm text-gray-600">
          <span class="flex items-center">
            <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clip-rule="evenodd"
              ></path>
            </svg>
            {{ testimonial.location }}
          </span>
          <span class="flex items-center">
            <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clip-rule="evenodd"
              ></path>
            </svg>
            结课时间: {{ testimonial.completionDate }}
          </span>
          <span>{{ testimonial.age }}岁</span>
        </div>
      </div>

      <!-- Rating stars -->
      <div class="flex items-center ml-4">
        <div class="flex">
          <svg
            v-for="star in 5"
            :key="star"
            class="w-5 h-5"
            :class="{
              'text-yellow-400': star <= testimonial.rating,
              'text-gray-300': star > testimonial.rating,
            }"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            ></path>
          </svg>
        </div>
      </div>
    </div>

    <!-- Course info -->
    <div class="mb-6 p-4 bg-gray-50 rounded-lg">
      <div class="text-sm text-gray-600 mb-1">学习课程</div>
      <div class="font-semibold text-primary-600">{{ testimonial.course }}</div>
    </div>

    <!-- Before/After comparison -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <!-- Before -->
      <div class="bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
        <h4 class="font-semibold text-red-800 mb-2 flex items-center">
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clip-rule="evenodd"
            ></path>
          </svg>
          学习前
        </h4>
        <p class="text-red-700 text-sm">{{ testimonial.beforeSituation }}</p>
      </div>

      <!-- After -->
      <div class="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
        <h4 class="font-semibold text-green-800 mb-2 flex items-center">
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd"
            ></path>
          </svg>
          学习后
        </h4>
        <p class="text-green-700 text-sm">{{ testimonial.afterResult }}</p>
      </div>
    </div>

    <!-- Salary increase highlight -->
    <div class="text-center mb-6">
      <div
        class="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-800 rounded-full font-semibold"
      >
        <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
            clip-rule="evenodd"
          ></path>
        </svg>
        收入提升: {{ testimonial.salaryIncrease }}
      </div>
    </div>

    <!-- Main quote -->
    <blockquote class="relative">
      <div class="text-6xl text-primary-200 absolute -top-4 -left-2">"</div>
      <p class="text-lg text-gray-700 leading-relaxed italic pl-8 pr-4">
        {{ testimonial.quote }}
      </p>
      <div class="text-6xl text-primary-200 absolute -bottom-8 right-0 transform rotate-180">"</div>
    </blockquote>
  </div>
</template>

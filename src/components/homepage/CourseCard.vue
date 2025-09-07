<script setup lang="ts">
interface Course {
  id: string
  title: string
  subtitle: string
  duration: string
  level: string
  price: string
  description: string
  keyBenefits: string[]
  icon: string
  bgGradient: string
  route: string
}

defineProps<{
  course: Course
}>()

defineEmits<{
  click: []
}>()
</script>

<template>
  <div
    class="card group cursor-pointer transform hover:scale-105 transition-all duration-300 overflow-hidden border border-gray-200 hover:border-primary-300"
    @click="$emit('click')"
  >
    <!-- Course icon and gradient header -->
    <div
      :class="`h-32 bg-gradient-to-br ${course.bgGradient} flex items-center justify-center text-white relative overflow-hidden`"
    >
      <div class="text-5xl opacity-90">{{ course.icon }}</div>
      <div
        class="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"
      ></div>
    </div>

    <!-- Course content -->
    <div class="p-6">
      <!-- Course title and subtitle -->
      <div class="mb-4">
        <h3
          class="text-xl font-bold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors duration-200"
        >
          {{ course.title }}
        </h3>
        <p class="text-sm text-gray-500 font-medium">
          {{ course.subtitle }}
        </p>
      </div>

      <!-- Course metadata -->
      <div class="flex justify-between items-center mb-4 text-sm">
        <div class="flex flex-col">
          <span class="text-gray-600">{{ course.duration }}</span>
          <span class="text-primary-600 font-semibold">{{ course.level }}</span>
        </div>
        <div class="text-right">
          <div class="text-2xl font-bold text-primary-600">{{ course.price }}</div>
        </div>
      </div>

      <!-- Course description -->
      <p class="text-gray-700 text-sm mb-4 leading-relaxed">
        {{ course.description }}
      </p>

      <!-- Key benefits -->
      <div class="mb-6">
        <h4 class="text-sm font-semibold text-gray-900 mb-2">核心收获：</h4>
        <ul class="space-y-1">
          <li
            v-for="benefit in course.keyBenefits"
            :key="benefit"
            class="flex items-start text-sm text-gray-600"
          >
            <svg
              class="w-4 h-4 text-primary-500 mt-0.5 mr-2 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
            {{ benefit }}
          </li>
        </ul>
      </div>

      <!-- CTA button -->
      <button
        class="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 group-hover:shadow-lg"
      >
        了解详情
      </button>
    </div>

    <!-- Hover overlay effect -->
    <div
      class="absolute inset-0 border-2 border-primary-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
    ></div>
  </div>
</template>

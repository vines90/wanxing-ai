<script setup lang="ts">
import { ref } from 'vue'

// Contact information
const phoneNumber = ref('0757-22806688')
// Note: WeChat QR code will be added in future iterations

// CTA actions
const scrollToContactForm = () => {
  // In real implementation, this would scroll to contact form
  console.log('Scrolling to contact form')
}

const openConsultationChat = () => {
  // In real implementation, this would open WeChat or WhatsApp
  console.log('Opening consultation chat')
}
</script>

<template>
  <section
    class="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
  >
    <!-- Background overlay -->
    <div class="absolute inset-0 bg-black opacity-40"></div>

    <!-- Hero content -->
    <div class="relative z-10 container mx-auto px-4 text-center text-white">
      <div class="max-w-4xl mx-auto">
        <!-- Primary Headline -->
        <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          掌握<span class="text-primary-500">人工智能</span>
          <br class="hidden sm:block" />
          开启未来职业
        </h1>

        <!-- Subheadline -->
        <p class="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-8 leading-relaxed">
          佛山顺德专业AI培训机构 · 从零基础到行业专家
          <br class="hidden sm:block" />
          实战教学 · 就业保障 · 本地化服务
        </p>

        <!-- Key benefits -->
        <div class="flex flex-wrap justify-center gap-6 mb-10 text-lg">
          <div class="flex items-center">
            <svg class="w-6 h-6 text-primary-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
            4大核心课程
          </div>
          <div class="flex items-center">
            <svg class="w-6 h-6 text-primary-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
            实战项目导向
          </div>
          <div class="flex items-center">
            <svg class="w-6 h-6 text-primary-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
            就业推荐服务
          </div>
        </div>

        <!-- Call-to-Action buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button
            @click="scrollToContactForm"
            class="btn-primary text-lg px-8 py-4 transform hover:scale-105 transition-transform duration-200"
          >
            免费咨询课程
          </button>
          <button
            @click="openConsultationChat"
            class="btn-secondary text-lg px-8 py-4 transform hover:scale-105 transition-transform duration-200"
          >
            在线预约试听
          </button>
        </div>

        <!-- Contact information -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-8 text-lg">
          <!-- Phone number -->
          <a
            :href="`tel:${phoneNumber}`"
            class="flex items-center hover:text-primary-500 transition-colors duration-200"
          >
            <svg class="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"
              ></path>
            </svg>
            {{ phoneNumber }}
          </a>

          <!-- WeChat QR code -->
          <div class="flex items-center">
            <svg class="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 6.092-1.502-.417-2.579-2.93-4.672-6.035-4.672z"
              ></path>
              <path
                d="M17.297 8.727C14.086 8.727 11.5 10.835 11.5 13.355c0 2.52 2.586 4.629 5.797 4.629.648 0 1.278-.085 1.874-.245a.716.716 0 01.596.081l1.583.926a.272.272 0 00.139.045.245.245 0 00.241-.245c0-.06-.023-.12-.04-.178l-.324-1.234a.492.492 0 01.177-.554c1.525-1.123 2.457-2.784 2.457-4.625 0-2.52-2.586-4.628-5.797-4.628z"
              ></path>
            </svg>
            微信咨询
            <div
              class="ml-2 w-8 h-8 bg-gray-200 rounded border border-gray-300 flex items-center justify-center text-xs text-gray-600"
            >
              QR
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll down indicator -->
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 14l-7 7m0 0l-7-7m7 7V3"
        ></path>
      </svg>
    </div>

    <!-- Background image/video placeholder -->
    <div class="absolute inset-0 -z-10">
      <!-- In real implementation, add hero background image or video here -->
      <div class="w-full h-full bg-gradient-to-br from-primary-900 via-gray-900 to-gray-800"></div>
    </div>
  </section>
</template>

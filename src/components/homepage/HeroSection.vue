<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { analyticsService } from '@/services/api'
import { scrollToElement } from '@/utils'
import PixelFloatingIcon from '@/components/ui/PixelFloatingIcon.vue'
import CourseAssessmentModal from '@/components/assessment/CourseAssessmentModal.vue'

// Contact information from environment variables
const phoneNumber = ref(import.meta.env.VITE_PHONE_NUMBER || '0757-22806688')
const email = ref(import.meta.env.VITE_EMAIL || 'info@wanxing-ai.com')

// State management
const isVisible = ref(false)

// 课程评估功能
const showAssessmentModal = ref(false)

// Mouse tracking for grid effect
const mouseX = ref(0)
const mouseY = ref(0)
const isMouseInside = ref(false)
const activeNodes = ref(new Set<string>())
const isMouseMoving = ref(false)
const moveTimeout = ref<number | null>(null)

// Grid configuration
const GRID_SIZE = 50
const HIGHLIGHT_RADIUS = 120

// Generate grid positions dynamically based on mouse position
const getGridNodesAroundMouse = () => {
  if (!isMouseInside.value) return []
  
  const nodes: Array<{x: number, y: number, id: string, distance: number}> = []
  const centerX = Math.floor(mouseX.value / GRID_SIZE) * GRID_SIZE
  const centerY = Math.floor(mouseY.value / GRID_SIZE) * GRID_SIZE
  
  // Check grid points in a 7x7 area around mouse
  for (let offsetX = -3; offsetX <= 3; offsetX++) {
    for (let offsetY = -3; offsetY <= 3; offsetY++) {
      const x = centerX + offsetX * GRID_SIZE
      const y = centerY + offsetY * GRID_SIZE
      
      // Skip if outside screen bounds
      if (x < -GRID_SIZE || y < -GRID_SIZE || x > window.innerWidth + GRID_SIZE || y > window.innerHeight + GRID_SIZE) {
        continue
      }
      
      const distance = Math.sqrt(
        Math.pow(x - mouseX.value, 2) + Math.pow(y - mouseY.value, 2)
      )
      
      if (distance <= HIGHLIGHT_RADIUS) {
        const id = `${x}-${y}`
        nodes.push({ x, y, id, distance })
      }
    }
  }
  
  return nodes
}

// Update active grid cells based on mouse position (immediate, no setTimeout)
const updateActiveGridCells = () => {
  // Clear all active nodes first
  activeNodes.value.clear()
  
  if (!isMouseInside.value) return
  
  const nearbyNodes = getGridNodesAroundMouse()
  
  // Activate nodes immediately based on distance
  nearbyNodes.forEach(node => {
    activeNodes.value.add(node.id)
  })
}

// Mouse tracking functions
const handleMouseMove = (event: MouseEvent) => {
  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
  mouseX.value = event.clientX - rect.left
  mouseY.value = event.clientY - rect.top
  updateActiveGridCells()
  
  // Track mouse movement state
  isMouseMoving.value = true
  
  // Clear previous timeout
  if (moveTimeout.value) {
    clearTimeout(moveTimeout.value)
  }
  
  // Set mouse as stopped after 300ms of no movement
  moveTimeout.value = window.setTimeout(() => {
    isMouseMoving.value = false
  }, 300)
}

const handleMouseEnter = () => {
  isMouseInside.value = true
  isMouseMoving.value = false
}

const handleMouseLeave = () => {
  isMouseInside.value = false
  isMouseMoving.value = false
  if (moveTimeout.value) {
    clearTimeout(moveTimeout.value)
    moveTimeout.value = null
  }
  updateActiveGridCells()
}

// Lifecycle
onMounted(() => {
  // Animate hero section on mount
  setTimeout(() => {
    isVisible.value = true
  }, 100)
  
  // Track page view
  analyticsService.trackPageView('/')
})

onUnmounted(() => {
  // Cleanup timeout
  if (moveTimeout.value) {
    clearTimeout(moveTimeout.value)
  }
})

// CTA actions with analytics tracking
const scrollToContactForm = () => {
  // Track user interaction
  analyticsService.trackEvent('hero_cta_contact_click', {
    source: 'hero_section',
    button_text: '免费咨询课程'
  })
  
  // Scroll to contact form section (will be implemented)
  const contactSection = document.getElementById('contact-section')
  if (contactSection) {
    scrollToElement(contactSection, 80)
  } else {
    // If no contact section, show contact modal (future implementation)
    console.log('Opening contact modal...')
  }
}

const openConsultationChat = () => {
  // Track user interaction
  analyticsService.trackEvent('hero_cta_consultation_click', {
    source: 'hero_section',
    button_text: '在线预约试听'
  })
  
  // Open consultation modal or redirect to consultation page
  // For now, scroll to contact form
  scrollToContactForm()
}

const handlePhoneCall = () => {
  analyticsService.trackEvent('phone_click', {
    source: 'hero_section',
    phone_number: phoneNumber.value
  })
  
  // Phone call will be handled by browser
  window.location.href = `tel:${phoneNumber.value}`
}

const showWeChatQR = () => {
  analyticsService.trackEvent('wechat_qr_click', {
    source: 'hero_section'
  })
  
  // TODO: Show WeChat QR code modal
  alert('微信二维码功能即将上线，请先拨打电话咨询：' + phoneNumber.value)
}

// 课程评估功能
const openAssessment = () => {
  analyticsService.trackEvent('course_assessment_opened', {
    source: 'hero_pixel_icon'
  })
  showAssessmentModal.value = true
}

const closeAssessment = () => {
  analyticsService.trackEvent('course_assessment_closed')
  showAssessmentModal.value = false
}
</script>

<template>
  <section
    class="hero-section relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden"
    @mousemove="handleMouseMove"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- Animated Grid Background -->
    <div class="absolute inset-0">
      <!-- Base grid pattern -->
      <div class="grid-background absolute inset-0"></div>
      
      <!-- Dynamic electrical grid nodes -->
      <div class="grid-nodes absolute inset-0 pointer-events-none">
        <div
          v-for="node in getGridNodesAroundMouse()"
          :key="node.id"
          class="grid-node absolute active"
          :class="{ 'flowing': !isMouseMoving && isMouseInside }"
          :style="{
            left: `${node.x}px`,
            top: `${node.y}px`,
            '--distance': node.distance,
            '--intensity': Math.max(0, 1 - node.distance / HIGHLIGHT_RADIUS),
            '--flow-delay': `${node.distance * 0.05}s`
          }"
        >
          <!-- Electrical node core -->
          <div class="node-core"></div>
          
          <!-- Electrical connections -->
          <div class="node-connections">
            <!-- Horizontal line -->
            <div class="connection horizontal"></div>
            <!-- Vertical line -->
            <div class="connection vertical"></div>
          </div>
          
          <!-- Electrical spark effect -->
          <div class="spark-effect"></div>
        </div>
      </div>
      
      <!-- Removed electrical field overlay circle -->
    </div>

    <!-- Background overlay for content readability -->
    <div class="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60"></div>

    <!-- Hero content -->
    <div class="relative z-10 container mx-auto px-4 text-center text-white">
      <div class="max-w-4xl mx-auto">
        <!-- Primary Headline with animation -->
        <h1 
          class="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight transition-all duration-1000"
          :class="{ 'animate-fade-in-up': isVisible }"
        >
          掌握<span class="text-primary-500">人工智能</span>
          <br class="hidden sm:block" />
          开启未来职业
        </h1>

        <!-- Subheadline with delayed animation -->
        <p 
          class="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-8 leading-relaxed transition-all duration-1000 delay-300"
          :class="{ 'animate-fade-in-up': isVisible }"
        >
          佛山顺德专业AI培训机构 · 从零基础到行业专家
          <br class="hidden sm:block" />
          实战教学 · 就业保障 · 本地化服务
        </p>

        <!-- Key benefits with staggered animation -->
        <div 
          class="flex flex-wrap justify-center gap-6 mb-10 text-lg transition-all duration-1000 delay-500"
          :class="{ 'animate-fade-in-up': isVisible }"
        >
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

        <!-- Call-to-Action buttons with animation -->
        <div 
          class="flex flex-col sm:flex-row gap-4 justify-center mb-12 transition-all duration-1000 delay-700"
          :class="{ 'animate-fade-in-up': isVisible }"
        >
          <button
            @click="scrollToContactForm"
            class="btn-primary text-lg px-8 py-4 transform hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            免费咨询课程
          </button>
          <button
            @click="openConsultationChat"
            class="btn-secondary text-lg px-8 py-4 transform hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            在线预约试听
          </button>
        </div>

        <!-- Contact information with animation -->
        <div 
          class="flex flex-col sm:flex-row items-center justify-center gap-8 text-lg transition-all duration-1000 delay-900"
          :class="{ 'animate-fade-in-up': isVisible }"
        >
          <!-- Phone number -->
          <a
            @click="handlePhoneCall"
            :href="`tel:${phoneNumber}`"
            class="flex items-center hover:text-primary-500 transition-colors duration-200 cursor-pointer group"
          >
            <svg class="w-6 h-6 mr-2 group-hover:animate-pulse" fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"
              ></path>
            </svg>
            {{ phoneNumber }}
          </a>

          <!-- WeChat QR code -->
          <button
            @click="showWeChatQR"
            class="flex items-center hover:text-primary-500 transition-colors duration-200 cursor-pointer group"
          >
            <svg class="w-6 h-6 mr-2 group-hover:animate-pulse" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 6.092-1.502-.417-2.579-2.93-4.672-6.035-4.672z"
              ></path>
              <path
                d="M17.297 8.727C14.086 8.727 11.5 10.835 11.5 13.355c0 2.52 2.586 4.629 5.797 4.629.648 0 1.278-.085 1.874-.245a.716.716 0 01.596.081l1.583.926a.272.272 0 00.139.045.245.245 0 00.241-.245c0-.06-.023-.12-.04-.178l-.324-1.234a.492.492 0 01.177-.554c1.525-1.123 2.457-2.784 2.457-4.625 0-2.52-2.586-4.628-5.797-4.628z"
              ></path>
            </svg>
            微信咨询
            <div
              class="ml-2 w-8 h-8 bg-gray-200 rounded border border-gray-300 flex items-center justify-center text-xs text-gray-600 group-hover:bg-primary-100 transition-colors duration-200"
            >
              QR
            </div>
          </button>
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
      <div class="w-full h-full bg-gradient-to-br from-primary-900 via-gray-900 to-gray-800">      </div>
    </div>

    <!-- 8bit像素风悬浮动画 -->
    <PixelFloatingIcon @click="openAssessment" />

    <!-- 课程评估弹窗 -->
    <CourseAssessmentModal 
      :is-open="showAssessmentModal"
      @close="closeAssessment"
    />
  </section>
</template>

<style scoped>
/* 基础网格背景 */
.grid-background {
  background-image: 
    linear-gradient(rgba(227, 25, 55, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(227, 25, 55, 0.08) 1px, transparent 1px);
  background-size: 50px 50px;
  opacity: 0.6;
  filter: blur(0.5px);
}

/* 网格节点容器 */
.grid-nodes {
  z-index: 1;
}

/* 单个网格节点 */
.grid-node {
  width: 50px;
  height: 50px;
  transform: translate(-25px, -25px);
  opacity: 0;
}

/* 激活状态的网格节点 */
.grid-node.active {
  opacity: var(--intensity, 1);
}

/* 电流流动状态 - 鼠标停止时激活 */
.grid-node.flowing {
  animation: current-pulse 2s ease-in-out infinite;
  animation-delay: var(--flow-delay, 0s);
}

.grid-node.flowing .node-core {
  animation: core-electricity 1.5s ease-in-out infinite;
  animation-delay: var(--flow-delay, 0s);
}

.grid-node.flowing .connection {
  background-size: 200% 100%;
  animation: current-wave 3s linear infinite;
  animation-delay: var(--flow-delay, 0s);
}

.grid-node.flowing .connection.horizontal {
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(227, 25, 55, calc(0.2 * var(--intensity, 1))) 10%,
    rgba(227, 25, 55, calc(0.6 * var(--intensity, 1))) 25%,
    rgba(227, 25, 55, calc(0.9 * var(--intensity, 1))) 50%,
    rgba(227, 25, 55, calc(0.6 * var(--intensity, 1))) 75%,
    rgba(227, 25, 55, calc(0.2 * var(--intensity, 1))) 90%,
    transparent 100%
  );
}

.grid-node.flowing .connection.vertical {
  background: linear-gradient(
    180deg,
    transparent 0%,
    rgba(227, 25, 55, calc(0.2 * var(--intensity, 1))) 10%,
    rgba(227, 25, 55, calc(0.6 * var(--intensity, 1))) 25%,
    rgba(227, 25, 55, calc(0.9 * var(--intensity, 1))) 50%,
    rgba(227, 25, 55, calc(0.6 * var(--intensity, 1))) 75%,
    rgba(227, 25, 55, calc(0.2 * var(--intensity, 1))) 90%,
    transparent 100%
  );
}

.grid-node.flowing .spark-effect {
  animation: spark-dance 2.5s ease-in-out infinite;
  animation-delay: calc(var(--flow-delay, 0s) + 0.5s);
}

/* 节点核心 - 电流汇聚点 */
.node-core {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 4px;
  height: 4px;
  background: #E31937;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 
    0 0 calc(10px * var(--intensity, 1)) #E31937,
    0 0 calc(20px * var(--intensity, 1)) rgba(227, 25, 55, 0.8),
    0 0 calc(30px * var(--intensity, 1)) rgba(227, 25, 55, 0.6);
}

/* 电流连接线 */
.node-connections {
  position: absolute;
  inset: 0;
}

.connection {
  position: absolute;
  opacity: var(--intensity, 1);
  box-shadow: 0 0 calc(8px * var(--intensity, 1)) rgba(227, 25, 55, 0.6);
}

.connection.horizontal {
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  transform: translateY(-50%);
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(227, 25, 55, calc(0.3 * var(--intensity, 1))) 20%,
    rgba(227, 25, 55, calc(0.8 * var(--intensity, 1))) 50%,
    rgba(227, 25, 55, calc(0.3 * var(--intensity, 1))) 80%,
    transparent 100%
  );
}

.connection.vertical {
  left: 50%;
  top: 0;
  bottom: 0;
  width: 1px;
  transform: translateX(-50%);
  background: linear-gradient(
    180deg,
    transparent 0%,
    rgba(227, 25, 55, calc(0.3 * var(--intensity, 1))) 20%,
    rgba(227, 25, 55, calc(0.8 * var(--intensity, 1))) 50%,
    rgba(227, 25, 55, calc(0.3 * var(--intensity, 1))) 80%,
    transparent 100%
  );
}

/* 电火花效果 */
.spark-effect {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20px;
  height: 20px;
  transform: translate(-50%, -50%);
  background: radial-gradient(
    circle,
    rgba(227, 25, 55, calc(0.8 * var(--intensity, 1))) 0%,
    rgba(255, 100, 120, calc(0.6 * var(--intensity, 1))) 30%,
    rgba(255, 200, 210, calc(0.3 * var(--intensity, 1))) 60%,
    transparent 100%
  );
  border-radius: 50%;
  opacity: var(--intensity, 1);
}

/* Removed electrical field indicator styles */

/* 电流流动动画 - 仅在鼠标停止时激活 */
@keyframes current-pulse {
  0%, 100% {
    filter: brightness(1) saturate(1);
    transform: scale(1);
  }
  50% {
    filter: brightness(1.5) saturate(1.3);
    transform: scale(1.05);
  }
}

@keyframes current-wave {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 200% 50%;
  }
}

@keyframes spark-dance {
  0%, 100% {
    opacity: var(--intensity, 1);
    transform: translate(-50%, -50%) scale(1);
  }
  25% {
    opacity: calc(var(--intensity, 1) * 1.3);
    transform: translate(-50%, -50%) scale(1.2);
  }
  50% {
    opacity: calc(var(--intensity, 1) * 0.8);
    transform: translate(-50%, -50%) scale(0.9);
  }
  75% {
    opacity: calc(var(--intensity, 1) * 1.1);
    transform: translate(-50%, -50%) scale(1.1);
  }
}

@keyframes core-electricity {
  0%, 100% {
    box-shadow: 
      0 0 calc(10px * var(--intensity, 1)) #E31937,
      0 0 calc(20px * var(--intensity, 1)) rgba(227, 25, 55, 0.8),
      0 0 calc(30px * var(--intensity, 1)) rgba(227, 25, 55, 0.6);
  }
  33% {
    box-shadow: 
      0 0 calc(15px * var(--intensity, 1)) #E31937,
      0 0 calc(25px * var(--intensity, 1)) rgba(227, 25, 55, 0.9),
      0 0 calc(35px * var(--intensity, 1)) rgba(227, 25, 55, 0.7);
  }
  66% {
    box-shadow: 
      0 0 calc(8px * var(--intensity, 1)) #E31937,
      0 0 calc(18px * var(--intensity, 1)) rgba(227, 25, 55, 0.7),
      0 0 calc(28px * var(--intensity, 1)) rgba(227, 25, 55, 0.5);
  }
}

/* 响应式调整 */
@media (max-width: 768px) {
  .grid-background {
    background-size: 40px 40px;
  }
  
  .grid-node {
    width: 40px;
    height: 40px;
    transform: translate(-20px, -20px);
  }
  
  .grid-node.active {
    transform: translate(-20px, -20px);
  }
  
  .node-core {
    width: 3px;
    height: 3px;
  }
  
  .spark-effect {
    width: 15px;
    height: 15px;
  }
}

/* 性能优化 */
.hero-section {
  will-change: transform;
}

.grid-node,
.node-core,
.connection,
.spark-effect {
  will-change: opacity, transform;
}

/* 禁用文本选择以提升交互体验 */
.hero-section {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* 移除了动画延迟效果，改为实时响应 */
</style>

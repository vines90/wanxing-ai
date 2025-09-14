<template>
  <div 
    class="pixel-floating-icon fixed cursor-pointer z-20 transition-all duration-[3000ms] ease-in-out hover:scale-110"
    :style="{ 
      left: position.x + 'px', 
      top: position.y + 'px',
      animation: `float ${animationDuration}s ease-in-out infinite`
    }"
    @click="handleClick"
  >
    <!-- 8bit像素风机器人图标 -->
    <div class="pixel-robot relative">
      <!-- 机器人身体 -->
      <div class="robot-body">
        <!-- 头部 -->
        <div class="robot-head">
          <div class="pixel-row">
            <div class="pixel bg-gray-600"></div>
            <div class="pixel bg-gray-500"></div>
            <div class="pixel bg-gray-500"></div>
            <div class="pixel bg-gray-500"></div>
            <div class="pixel bg-gray-600"></div>
          </div>
          <div class="pixel-row">
            <div class="pixel bg-gray-500"></div>
            <div class="pixel bg-blue-400"></div>
            <div class="pixel bg-gray-300"></div>
            <div class="pixel bg-blue-400"></div>
            <div class="pixel bg-gray-500"></div>
          </div>
          <div class="pixel-row">
            <div class="pixel bg-gray-500"></div>
            <div class="pixel bg-gray-300"></div>
            <div class="pixel bg-red-400"></div>
            <div class="pixel bg-gray-300"></div>
            <div class="pixel bg-gray-500"></div>
          </div>
          <div class="pixel-row">
            <div class="pixel bg-gray-600"></div>
            <div class="pixel bg-gray-500"></div>
            <div class="pixel bg-gray-500"></div>
            <div class="pixel bg-gray-500"></div>
            <div class="pixel bg-gray-600"></div>
          </div>
        </div>
        
        <!-- 身体 -->
        <div class="robot-torso">
          <div class="pixel-row">
            <div class="pixel bg-transparent"></div>
            <div class="pixel bg-gray-500"></div>
            <div class="pixel bg-gray-400"></div>
            <div class="pixel bg-gray-500"></div>
            <div class="pixel bg-transparent"></div>
          </div>
          <div class="pixel-row">
            <div class="pixel bg-gray-500"></div>
            <div class="pixel bg-gray-400"></div>
            <div class="pixel bg-primary-400"></div>
            <div class="pixel bg-gray-400"></div>
            <div class="pixel bg-gray-500"></div>
          </div>
          <div class="pixel-row">
            <div class="pixel bg-gray-500"></div>
            <div class="pixel bg-gray-400"></div>
            <div class="pixel bg-gray-400"></div>
            <div class="pixel bg-gray-400"></div>
            <div class="pixel bg-gray-500"></div>
          </div>
          <div class="pixel-row">
            <div class="pixel bg-gray-600"></div>
            <div class="pixel bg-gray-500"></div>
            <div class="pixel bg-gray-500"></div>
            <div class="pixel bg-gray-500"></div>
            <div class="pixel bg-gray-600"></div>
          </div>
        </div>
        
        <!-- 手臂 -->
        <div class="robot-arms">
          <div class="arm arm-left">
            <div class="pixel bg-gray-500"></div>
            <div class="pixel bg-gray-400"></div>
          </div>
          <div class="arm arm-right">
            <div class="pixel bg-gray-400"></div>
            <div class="pixel bg-gray-500"></div>
          </div>
        </div>
      </div>
      
      <!-- 悬浮光环效果 -->
      <div class="floating-ring"></div>
      
      <!-- 移动轨迹粒子效果 -->
      <div class="trail-particles">
        <div class="particle particle-1"></div>
        <div class="particle particle-2"></div>
        <div class="particle particle-3"></div>
      </div>
      
      <!-- 文字提示 -->
      <div class="tooltip pixel-font">
        <div class="tooltip-text">AI课程测试</div>
        <div class="tooltip-arrow"></div>
      </div>

      <!-- 8bit风格对话框 -->
      <div 
        v-if="showDialogue" 
        class="dialogue-bubble pixel-font"
        @click="handleDialogueClick"
      >
        <!-- 对话框边框（8bit风格） -->
        <div class="dialogue-border">
          <!-- 顶部边框 -->
          <div class="border-row border-top">
            <div class="border-pixel"></div>
            <div class="border-line"></div>
            <div class="border-pixel"></div>
          </div>
          
          <!-- 内容区域 -->
          <div class="dialogue-content">
            <div class="dialogue-text">{{ currentMessage }}</div>
            <div class="dialogue-cursor">▶</div>
          </div>
          
          <!-- 底部边框 -->
          <div class="border-row border-bottom">
            <div class="border-pixel"></div>
            <div class="border-line"></div>
            <div class="border-pixel"></div>
          </div>
        </div>
        
        <!-- 对话框指向箭头 -->
        <div class="dialogue-arrow">
          <div class="arrow-pixel-row">
            <div class="arrow-pixel"></div>
          </div>
          <div class="arrow-pixel-row">
            <div class="arrow-pixel"></div>
            <div class="arrow-pixel"></div>
            <div class="arrow-pixel"></div>
          </div>
          <div class="arrow-pixel-row">
            <div class="arrow-pixel"></div>
            <div class="arrow-pixel"></div>
            <div class="arrow-pixel"></div>
            <div class="arrow-pixel"></div>
            <div class="arrow-pixel"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Emits {
  click: []
}

const emit = defineEmits<Emits>()

// 音效系统
const playClickSound = () => {
  try {
    // 创建简单的点击音效
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1)
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)
    
    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.1)
  } catch (error) {
    // 如果音频API不可用，静默失败
    console.log('Audio not available')
  }
}

// 对话框出现音效
const playDialogueSound = () => {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    // 更清脆的提示音
    oscillator.frequency.setValueAtTime(600, audioContext.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.05)
    oscillator.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 0.1)
    
    gainNode.gain.setValueAtTime(0.08, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15)
    
    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.15)
  } catch (error) {
    console.log('Audio not available')
  }
}

const handleClick = () => {
  playClickSound()
  emit('click')
}

// 悬浮位置和动画
const position = ref({ x: 50, y: 200 })
const animationDuration = ref(3 + Math.random() * 2) // 3-5秒随机

// 对话框状态
const showDialogue = ref(false)
const currentMessage = ref('')
const dialogueTimeout = ref<number | null>(null)

let animationFrame: number

// 对话框消息库
const dialogueMessages = [
  '想知道你适合学哪些AI课程吗？',
  '点我测一下你的AI学习潜力！',
  '快来测试你的AI天赋指数吧～',
  'AI课程适配度检测中...',
  '发现潜在的AI学霸！',
  '你的专属AI学习路径在这里！',
  '想成为AI专家吗？先测测看！',
  '哇～发现了一个对AI感兴趣的人！',
  '嘿！要不要试试AI课程推荐？',
  '你的AI学习之旅即将开始！'
]

// 生成随机悬浮位置 - 全屏幕飘动
const updatePosition = () => {
  const isMobile = window.innerWidth <= 768
  
  // 根据设备调整参数
  const margin = isMobile ? 40 : 80 // 移动端减小边距
  const iconWidth = isMobile ? 60 : 80 // 移动端图标较小
  const iconHeight = isMobile ? 80 : 100
  
  // 移动端避开顶部和底部的系统UI区域
  const topOffset = isMobile ? 100 : 0
  const bottomOffset = isMobile ? 120 : 0
  
  const maxX = window.innerWidth - iconWidth - margin
  const maxY = window.innerHeight - iconHeight - margin - bottomOffset
  const minY = margin + topOffset
  
  // 确保有足够的空间
  if (maxX > margin && maxY > minY) {
    position.value = {
      x: margin + Math.random() * (maxX - margin),
      y: minY + Math.random() * (maxY - minY)
    }
  } else {
    // 如果屏幕太小，使用安全的默认位置
    position.value = {
      x: isMobile ? 20 : 50,
      y: isMobile ? window.innerHeight - 150 : 200
    }
  }
  
  // 移动端移动频率稍低
  const interval = isMobile ? (6 + Math.random() * 4) : (4 + Math.random() * 3)
  setTimeout(updatePosition, interval * 1000)
}

// 显示随机对话框
const showRandomDialogue = () => {
  if (showDialogue.value) return // 如果已经显示对话框，跳过
  
  const randomMessage = dialogueMessages[Math.floor(Math.random() * dialogueMessages.length)]
  currentMessage.value = randomMessage
  showDialogue.value = true
  
  // 播放对话框出现音效
  playDialogueSound()
  
  // 3-5秒后自动隐藏对话框
  if (dialogueTimeout.value) {
    clearTimeout(dialogueTimeout.value)
  }
  
  dialogueTimeout.value = window.setTimeout(() => {
    hideDialogue()
  }, 3000 + Math.random() * 2000)
}

// 隐藏对话框
const hideDialogue = () => {
  showDialogue.value = false
  if (dialogueTimeout.value) {
    clearTimeout(dialogueTimeout.value)
    dialogueTimeout.value = null
  }
}

// 点击对话框也能触发测试
const handleDialogueClick = () => {
  hideDialogue()
  handleClick()
}

// 随机显示对话框的定时器
const startDialogueTimer = () => {
  // 8-20秒后随机显示对话框
  const delay = 8000 + Math.random() * 12000
  setTimeout(() => {
    showRandomDialogue()
    startDialogueTimer() // 递归调用，持续随机显示
  }, delay)
}

// 处理窗口大小变化
const handleResize = () => {
  // 当窗口大小改变时，重新计算位置
  updatePosition()
}

onMounted(() => {
  updatePosition()
  window.addEventListener('resize', handleResize)
  startDialogueTimer() // 启动对话框定时器
})

onUnmounted(() => {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame)
  }
  if (dialogueTimeout.value) {
    clearTimeout(dialogueTimeout.value)
  }
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.pixel-floating-icon {
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
}

.pixel {
  width: 6px;
  height: 6px;
  display: inline-block;
  image-rendering: pixelated;
  image-rendering: crisp-edges;
}

.pixel-row {
  display: flex;
  line-height: 0;
}

.robot-body {
  position: relative;
}

.robot-head {
  margin-bottom: 2px;
}

.robot-torso {
  margin-bottom: 2px;
}

.robot-arms {
  position: absolute;
  top: 24px;
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.arm {
  display: flex;
  flex-direction: column;
}

.arm-left {
  margin-left: -8px;
}

.arm-right {
  margin-right: -8px;
}

.floating-ring {
  position: absolute;
  top: -8px;
  left: -8px;
  right: -8px;
  bottom: -8px;
  border: 2px solid rgba(227, 25, 55, 0.3);
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}

.tooltip {
  position: absolute;
  bottom: -50px;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.pixel-floating-icon:hover .tooltip {
  opacity: 1;
}

.tooltip-text {
  background: rgba(0, 0, 0, 0.9);
  color: white;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 12px;
  font-family: 'Courier New', monospace;
  white-space: nowrap;
  border: 1px solid #333;
}

.tooltip-arrow {
  position: absolute;
  top: -6px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 6px solid rgba(0, 0, 0, 0.9);
}

.pixel-font {
  font-family: 'Courier New', monospace;
  font-weight: bold;
  text-rendering: optimizeSpeed;
}

/* 悬浮动画 */
@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  25% {
    transform: translateY(-10px) rotate(2deg);
  }
  50% {
    transform: translateY(-5px) rotate(0deg);
  }
  75% {
    transform: translateY(-15px) rotate(-2deg);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.3;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.6;
  }
}

/* 移动轨迹粒子效果 */
.trail-particles {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
}

.particle {
  position: absolute;
  width: 3px;
  height: 3px;
  background: #E31937;
  border-radius: 50%;
  opacity: 0;
}

.particle-1 {
  animation: particle-float-1 4s ease-in-out infinite;
}

.particle-2 {
  animation: particle-float-2 3.5s ease-in-out infinite 0.5s;
}

.particle-3 {
  animation: particle-float-3 4.5s ease-in-out infinite 1s;
}

@keyframes particle-float-1 {
  0%, 100% {
    transform: translate(0, 0);
    opacity: 0;
  }
  20%, 80% {
    opacity: 0.6;
  }
  50% {
    transform: translate(-20px, -30px);
    opacity: 0.8;
  }
}

@keyframes particle-float-2 {
  0%, 100% {
    transform: translate(0, 0);
    opacity: 0;
  }
  20%, 80% {
    opacity: 0.4;
  }
  50% {
    transform: translate(25px, -20px);
    opacity: 0.6;
  }
}

@keyframes particle-float-3 {
  0%, 100% {
    transform: translate(0, 0);
    opacity: 0;
  }
  20%, 80% {
    opacity: 0.5;
  }
  50% {
    transform: translate(-10px, 25px);
    opacity: 0.7;
  }
}

/* 悬停效果 */
.pixel-floating-icon:hover {
  transform: scale(1.15);
}

.pixel-floating-icon:hover .floating-ring {
  border-color: rgba(227, 25, 55, 0.8);
  animation-duration: 1s;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .pixel-floating-icon {
    /* 移动端也支持全屏飘动，但限制在安全区域 */
    transform: scale(0.8);
  }
  
  .pixel {
    width: 5px;
    height: 5px;
  }
  
  .tooltip-text {
    font-size: 10px;
    padding: 6px 8px;
  }
}

@media (max-width: 480px) {
  .pixel-floating-icon {
    transform: scale(0.7);
  }
}

/* 8bit风格对话框 */
.dialogue-bubble {
  position: absolute;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  cursor: pointer;
  animation: dialogue-appear 0.3s ease-out;
}

.dialogue-border {
  background: #1a1a1a;
  border: 2px solid #ffffff;
  position: relative;
  min-width: 200px;
  max-width: 280px;
}

.border-row {
  display: flex;
  height: 4px;
}

.border-pixel {
  width: 4px;
  height: 4px;
  background: #ffffff;
}

.border-line {
  flex: 1;
  height: 4px;
  background: #ffffff;
}

.dialogue-content {
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #1a1a1a;
}

.dialogue-text {
  color: #ffffff;
  font-size: 12px;
  line-height: 1.4;
  font-family: 'Courier New', monospace;
  text-rendering: optimizeSpeed;
  flex: 1;
  margin-right: 8px;
}

.dialogue-cursor {
  color: #E31937;
  font-size: 10px;
  animation: cursor-blink 1s infinite;
}

.dialogue-arrow {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
}

.arrow-pixel-row {
  display: flex;
  justify-content: center;
  line-height: 0;
}

.arrow-pixel {
  width: 2px;
  height: 2px;
  background: #ffffff;
  margin: 0 1px;
}

.arrow-pixel-row:nth-child(1) {
  margin-bottom: 1px;
}

.arrow-pixel-row:nth-child(2) {
  margin-bottom: 1px;
}

/* 对话框动画 */
@keyframes dialogue-appear {
  0% {
    opacity: 0;
    transform: translateX(-50%) translateY(10px) scale(0.8);
  }
  100% {
    opacity: 1;
    transform: translateX(-50%) translateY(0) scale(1);
  }
}

@keyframes cursor-blink {
  0%, 50% {
    opacity: 1;
  }
  51%, 100% {
    opacity: 0;
  }
}

/* 对话框悬停效果 */
.dialogue-bubble:hover {
  transform: translateX(-50%) scale(1.05);
  transition: transform 0.2s ease;
}

.dialogue-bubble:hover .dialogue-border {
  border-color: #E31937;
  box-shadow: 0 0 10px rgba(227, 25, 55, 0.5);
}

.dialogue-bubble:hover .border-pixel,
.dialogue-bubble:hover .border-line {
  background: #E31937;
}

.dialogue-bubble:hover .arrow-pixel {
  background: #E31937;
}

/* 移动端对话框适配 */
@media (max-width: 768px) {
  .dialogue-bubble {
    max-width: 220px;
    min-width: 180px;
  }
  
  .dialogue-text {
    font-size: 11px;
  }
  
  .dialogue-content {
    padding: 10px 12px;
  }
}

@media (max-width: 480px) {
  .dialogue-bubble {
    max-width: 200px;
    min-width: 160px;
  }
  
  .dialogue-text {
    font-size: 10px;
  }
  
  .dialogue-content {
    padding: 8px 10px;
  }
}
</style>

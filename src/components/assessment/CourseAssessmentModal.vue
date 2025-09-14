<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
    <div class="bg-background-card rounded-lg shadow-xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-hidden">
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b border-border">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
            </svg>
          </div>
          <div>
            <h2 class="text-2xl font-bold text-text-primary">AI课程适配测试</h2>
            <p class="text-text-muted">让AI为您推荐最适合的学习路径</p>
          </div>
        </div>
        <button @click="close" class="text-text-muted hover:text-text-primary">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- Content -->
      <div class="p-6 overflow-y-auto max-h-[70vh]">
        <!-- Assessment Form -->
        <form v-if="!showResults" @submit.prevent="submitAssessment" class="space-y-8">
          <!-- Step Indicator -->
          <div class="flex items-center justify-center mb-8">
            <div class="flex items-center space-x-4">
              <div
                v-for="step in 3"
                :key="step"
                class="flex items-center"
              >
                <div
                  class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors"
                  :class="{
                    'bg-primary-500 text-white': currentStep >= step,
                    'bg-gray-700 text-gray-400': currentStep < step
                  }"
                >
                  {{ step }}
                </div>
                <div v-if="step < 3" class="w-16 h-1 mx-2 bg-gray-700 rounded">
                  <div
                    class="h-full bg-primary-500 rounded transition-all duration-300"
                    :style="{ width: currentStep > step ? '100%' : '0%' }"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 1: 基本信息 -->
          <div v-show="currentStep === 1" class="space-y-6">
            <h3 class="text-xl font-semibold text-text-primary mb-6">第一步：基本信息</h3>
            
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label class="form-label">姓名 *</label>
                <input
                  v-model="formData.name"
                  type="text"
                  class="form-input"
                  placeholder="请输入您的姓名"
                  required
                />
              </div>
              
              <div>
                <label class="form-label">年龄 *</label>
                <select v-model="formData.age" class="form-select" required>
                  <option value="">请选择年龄段</option>
                  <option value="18-22">18-22岁</option>
                  <option value="23-27">23-27岁</option>
                  <option value="28-35">28-35岁</option>
                  <option value="36-45">36-45岁</option>
                  <option value="45+">45岁以上</option>
                </select>
              </div>
              
              <div>
                <label class="form-label">教育背景 *</label>
                <select v-model="formData.education" class="form-select" required>
                  <option value="">请选择教育背景</option>
                  <option value="高中">高中及以下</option>
                  <option value="大专">大专</option>
                  <option value="本科">本科</option>
                  <option value="硕士">硕士</option>
                  <option value="博士">博士及以上</option>
                </select>
              </div>
              
              <div>
                <label class="form-label">工作经验 *</label>
                <select v-model="formData.experience" class="form-select" required>
                  <option value="">请选择工作经验</option>
                  <option value="student">在校学生</option>
                  <option value="0-1年">0-1年</option>
                  <option value="1-3年">1-3年</option>
                  <option value="3-5年">3-5年</option>
                  <option value="5-10年">5-10年</option>
                  <option value="10年以上">10年以上</option>
                </select>
              </div>
            </div>

            <div>
              <label class="form-label">职业阶段 *</label>
              <select v-model="formData.careerStage" class="form-select" required>
                <option value="">请选择职业阶段</option>
                <option value="学生">在校学生</option>
                <option value="应届生">应届毕业生</option>
                <option value="初级">初级从业者</option>
                <option value="中级">中级从业者</option>
                <option value="高级">高级从业者</option>
                <option value="转行">准备转行</option>
                <option value="创业">创业者</option>
              </select>
            </div>
          </div>

          <!-- Step 2: 技术背景 -->
          <div v-show="currentStep === 2" class="space-y-6">
            <h3 class="text-xl font-semibold text-text-primary mb-6">第二步：技术背景</h3>
            
            <div>
              <label class="form-label">技术背景 *</label>
              <select v-model="formData.techBackground" class="form-select" required>
                <option value="">请选择技术背景</option>
                <option value="none">完全无技术背景</option>
                <option value="basic-computer">基础电脑操作</option>
                <option value="office-user">熟练使用办公软件</option>
                <option value="programmer">有编程基础</option>
                <option value="advanced-programmer">编程经验丰富</option>
              </select>
            </div>

            <div>
              <label class="form-label">兴趣领域 * (可多选)</label>
              <div class="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                <label
                  v-for="interest in interestOptions"
                  :key="interest"
                  class="flex items-center p-3 border border-border rounded-lg cursor-pointer hover:bg-background-elevated transition-colors"
                  :class="{ 'bg-primary-900 border-primary-500': formData.interests.includes(interest) }"
                >
                  <input
                    v-model="formData.interests"
                    type="checkbox"
                    :value="interest"
                    class="form-checkbox mr-2"
                  />
                  <span class="text-sm">{{ interest }}</span>
                </label>
              </div>
            </div>

            <div>
              <label class="form-label">学习目标 * (可多选)</label>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                <label
                  v-for="goal in goalOptions"
                  :key="goal"
                  class="flex items-center p-3 border border-border rounded-lg cursor-pointer hover:bg-background-elevated transition-colors"
                  :class="{ 'bg-primary-900 border-primary-500': formData.goals.includes(goal) }"
                >
                  <input
                    v-model="formData.goals"
                    type="checkbox"
                    :value="goal"
                    class="form-checkbox mr-2"
                  />
                  <span class="text-sm">{{ goal }}</span>
                </label>
              </div>
            </div>
          </div>

          <!-- Step 3: 学习偏好 -->
          <div v-show="currentStep === 3" class="space-y-6">
            <h3 class="text-xl font-semibold text-text-primary mb-6">第三步：学习偏好</h3>
            
            <div>
              <label class="form-label">可用学习时间 *</label>
              <select v-model="formData.timeAvailable" class="form-select" required>
                <option value="">请选择每周可用时间</option>
                <option value="1-3小时">1-3小时</option>
                <option value="4-8小时">4-8小时</option>
                <option value="9-15小时">9-15小时</option>
                <option value="16-25小时">16-25小时</option>
                <option value="25小时以上">25小时以上</option>
              </select>
            </div>

            <div>
              <label class="form-label">学习风格 *</label>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                <label
                  v-for="style in learningStyles"
                  :key="style.value"
                  class="flex items-start p-4 border border-border rounded-lg cursor-pointer hover:bg-background-elevated transition-colors"
                  :class="{ 'bg-primary-900 border-primary-500': formData.learningStyle === style.value }"
                >
                  <input
                    v-model="formData.learningStyle"
                    type="radio"
                    :value="style.value"
                    class="form-radio mt-1 mr-3"
                    required
                  />
                  <div>
                    <div class="font-medium text-text-primary">{{ style.label }}</div>
                    <div class="text-sm text-text-muted mt-1">{{ style.description }}</div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <!-- Form Actions -->
          <div class="flex items-center justify-between pt-6 border-t border-border">
            <button
              v-if="currentStep > 1"
              type="button"
              @click="currentStep--"
              class="btn btn-secondary"
            >
              上一步
            </button>
            <div v-else></div>

            <div class="flex items-center space-x-4">
              <button type="button" @click="close" class="btn btn-ghost">
                取消
              </button>
              
              <button
                v-if="currentStep < 3"
                type="button"
                @click="nextStep"
                :disabled="!canProceed"
                class="btn btn-primary"
              >
                下一步
              </button>
              
              <button
                v-else
                type="submit"
                :disabled="isAnalyzing || !canSubmit"
                class="btn btn-primary"
              >
                {{ isAnalyzing ? 'AI分析中...' : '获取推荐' }}
              </button>
            </div>
          </div>
        </form>

        <!-- Results -->
        <CourseRecommendationResults
          v-if="showResults"
          :recommendations="recommendations"
          :user-name="formData.name"
          @close="close"
          @restart="restartAssessment"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { aiService } from '@/services/ai'
import CourseRecommendationResults from './CourseRecommendationResults.vue'
import type { AssessmentData, CourseRecommendation } from '@/types'

interface Props {
  isOpen: boolean
}

interface Emits {
  close: []
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// Form state
const currentStep = ref(1)
const isAnalyzing = ref(false)
const showResults = ref(false)
const recommendations = ref<CourseRecommendation[]>([])

const formData = ref<AssessmentData>({
  name: '',
  age: 25,
  education: '',
  experience: '',
  interests: [],
  goals: [],
  timeAvailable: '',
  learningStyle: '',
  techBackground: '',
  careerStage: ''
})

// Options
const interestOptions = [
  '内容创作', '自媒体', '提高效率', 
  '办公自动化', '编程', 'AI工具应用',
  '提示词工程', '副业创收'
]

const goalOptions = [
  '学会AI内容创作', '提升工作效率', '掌握AI工具',
  '开展副业', '职场技能提升', '转行AI行业',
  '创业项目', '个人兴趣'
]

const learningStyles = [
  {
    value: 'theory-practice',
    label: '理论+实践型',
    description: '希望既学习理论知识，又能动手实践'
  },
  {
    value: 'hands-on',
    label: '动手实践型',
    description: '喜欢通过项目和实战来学习'
  },
  {
    value: 'theory-first',
    label: '理论先行型',
    description: '先掌握理论基础，再进行实践'
  },
  {
    value: 'guided',
    label: '引导学习型',
    description: '需要老师指导和结构化的学习路径'
  }
]

// Computed
const canProceed = computed(() => {
  switch (currentStep.value) {
    case 1:
      return formData.value.name && formData.value.age && formData.value.education && 
             formData.value.experience && formData.value.careerStage
    case 2:
      return formData.value.techBackground && formData.value.interests.length > 0 && 
             formData.value.goals.length > 0
    case 3:
      return formData.value.timeAvailable && formData.value.learningStyle
    default:
      return false
  }
})

const canSubmit = computed(() => {
  return canProceed.value && !isAnalyzing.value
})

// Methods
const nextStep = () => {
  if (canProceed.value && currentStep.value < 3) {
    currentStep.value++
  }
}

const submitAssessment = async () => {
  if (!canSubmit.value) return

  isAnalyzing.value = true

  try {
    // 格式化数据
    const assessmentData: AssessmentData = {
      name: formData.value.name,
      age: formData.value.age,
      education: formData.value.education,
      experience: formData.value.experience,
      interests: formData.value.interests,
      goals: formData.value.goals,
      timeAvailable: formData.value.timeAvailable,
      learningStyle: formData.value.learningStyle,
      techBackground: formData.value.techBackground,
      careerStage: formData.value.careerStage
    }

    // 调用AI服务
    recommendations.value = await aiService.getCourseRecommendation(assessmentData)
    showResults.value = true

  } catch (error) {
    console.error('Assessment failed:', error)
    alert('评估过程中出现错误，请稍后重试')
  } finally {
    isAnalyzing.value = false
  }
}

const close = () => {
  emit('close')
}

const restartAssessment = () => {
  showResults.value = false
  currentStep.value = 1
  formData.value = {
    name: '',
    age: 25,
    education: '',
    experience: '',
    interests: [],
    goals: [],
    timeAvailable: '',
    learningStyle: '',
    techBackground: '',
    careerStage: ''
  }
}
</script>

<style scoped>
.form-input {
  @apply w-full px-3 py-2 bg-background border border-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent;
}

.form-select {
  @apply w-full px-3 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent;
}

.form-checkbox {
  @apply text-primary-500 bg-background border-border rounded focus:ring-primary-500;
}

.form-radio {
  @apply text-primary-500 bg-background border-border focus:ring-primary-500;
}

.form-label {
  @apply block text-sm font-medium text-text-primary mb-2;
}
</style>

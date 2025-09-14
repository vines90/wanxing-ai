<template>
  <section id="contact-section" class="py-20 bg-gradient-to-b from-black to-gray-900">
    <div class="container mx-auto px-4">
      <div class="max-w-4xl mx-auto">
        <!-- Section Header -->
        <div class="text-center mb-12">
          <h2 class="text-4xl md:text-5xl font-bold text-white mb-4">
            免费咨询 <span class="text-primary-500">开启AI之路</span>
          </h2>
          <p class="text-xl text-gray-300 max-w-2xl mx-auto">
            填写以下信息，我们的专业顾问将在24小时内联系您，为您量身定制学习方案
          </p>
        </div>

        <div class="grid lg:grid-cols-2 gap-12">
          <!-- Contact Form -->
          <div class="bg-background-card rounded-2xl p-8 border border-border shadow-2xl">
            <form @submit.prevent="handleSubmit" class="space-y-6">
              <!-- Name Input -->
              <div>
                <label for="name" class="form-label">姓名 *</label>
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  class="form-input"
                  :class="{ 'border-red-500': errors.name }"
                  placeholder="请输入您的姓名"
                  required
                />
                <p v-if="errors.name" class="form-error">{{ errors.name }}</p>
              </div>

              <!-- Phone Input -->
              <div>
                <label for="phone" class="form-label">手机号 *</label>
                <input
                  id="phone"
                  v-model="form.phone"
                  type="tel"
                  class="form-input"
                  :class="{ 'border-red-500': errors.phone }"
                  placeholder="请输入您的手机号"
                  required
                />
                <p v-if="errors.phone" class="form-error">{{ errors.phone }}</p>
              </div>

              <!-- Email Input -->
              <div>
                <label for="email" class="form-label">邮箱</label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  class="form-input"
                  :class="{ 'border-red-500': errors.email }"
                  placeholder="请输入您的邮箱（选填）"
                />
                <p v-if="errors.email" class="form-error">{{ errors.email }}</p>
              </div>

              <!-- Course Interest -->
              <div>
                <label for="course" class="form-label">感兴趣的课程</label>
                <select
                  id="course"
                  v-model="form.interestedCourse"
                  class="form-select"
                >
                  <option value="">请选择您感兴趣的课程</option>
                  <option value="foundation">AI基础入门课程</option>
                  <option value="deep-learning">深度学习实战</option>
                  <option value="nlp">NLP自然语言处理</option>
                  <option value="computer-vision">计算机视觉</option>
                  <option value="custom">定制化培训</option>
                </select>
              </div>

              <!-- Experience Level -->
              <div>
                <label class="form-label">您的技术背景</label>
                <div class="grid grid-cols-2 gap-3 mt-2">
                  <label class="flex items-center">
                    <input
                      v-model="form.experience"
                      type="radio"
                      value="none"
                      class="form-radio"
                    />
                    <span class="ml-2 text-sm text-text-secondary">零基础</span>
                  </label>
                  <label class="flex items-center">
                    <input
                      v-model="form.experience"
                      type="radio"
                      value="beginner"
                      class="form-radio"
                    />
                    <span class="ml-2 text-sm text-text-secondary">初学者</span>
                  </label>
                  <label class="flex items-center">
                    <input
                      v-model="form.experience"
                      type="radio"
                      value="intermediate"
                      class="form-radio"
                    />
                    <span class="ml-2 text-sm text-text-secondary">有一定基础</span>
                  </label>
                  <label class="flex items-center">
                    <input
                      v-model="form.experience"
                      type="radio"
                      value="advanced"
                      class="form-radio"
                    />
                    <span class="ml-2 text-sm text-text-secondary">有工作经验</span>
                  </label>
                </div>
              </div>

              <!-- Message -->
              <div>
                <label for="message" class="form-label">留言</label>
                <textarea
                  id="message"
                  v-model="form.message"
                  class="form-textarea"
                  rows="4"
                  placeholder="请描述您的学习目标或其他需求（选填）"
                ></textarea>
              </div>

              <!-- Preferred Contact Time -->
              <div>
                <label for="preferredTime" class="form-label">希望联系时间</label>
                <select
                  id="preferredTime"
                  v-model="form.preferredTime"
                  class="form-select"
                >
                  <option value="">请选择您方便接听电话的时间</option>
                  <option value="morning">上午 (9:00-12:00)</option>
                  <option value="afternoon">下午 (14:00-18:00)</option>
                  <option value="evening">晚上 (19:00-21:00)</option>
                  <option value="weekend">周末时间</option>
                </select>
              </div>

              <!-- Submit Button -->
              <button
                type="submit"
                :disabled="isSubmitting"
                class="w-full btn btn-primary btn-lg"
                :class="{ 'opacity-50 cursor-not-allowed': isSubmitting }"
              >
                <span v-if="isSubmitting" class="flex items-center justify-center">
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  提交中...
                </span>
                <span v-else>免费获取学习方案</span>
              </button>
            </form>

            <!-- Success Message -->
            <div v-if="showSuccess" class="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div class="flex">
                <svg class="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
                <div class="ml-3">
                  <p class="text-sm text-green-800">{{ successMessage }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Contact Information -->
          <div class="space-y-8">
            <!-- Contact Details -->
            <div class="bg-background-card rounded-2xl p-8 border border-border">
              <h3 class="text-2xl font-bold text-white mb-6">联系方式</h3>
              <div class="space-y-4">
                <div class="flex items-center">
                  <svg class="w-6 h-6 text-primary-500 mr-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                  </svg>
                  <div>
                    <p class="text-text-primary font-medium">电话咨询</p>
                    <p class="text-text-secondary">{{ phoneNumber }}</p>
                  </div>
                </div>
                
                <div class="flex items-center">
                  <svg class="w-6 h-6 text-primary-500 mr-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                  </svg>
                  <div>
                    <p class="text-text-primary font-medium">邮箱咨询</p>
                    <p class="text-text-secondary">{{ email }}</p>
                  </div>
                </div>

                <div class="flex items-center">
                  <svg class="w-6 h-6 text-primary-500 mr-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path>
                  </svg>
                  <div>
                    <p class="text-text-primary font-medium">培训地址</p>
                    <p class="text-text-secondary">广东省佛山市顺德区</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Working Hours -->
            <div class="bg-background-card rounded-2xl p-8 border border-border">
              <h3 class="text-2xl font-bold text-white mb-6">工作时间</h3>
              <div class="space-y-3">
                <div class="flex justify-between">
                  <span class="text-text-secondary">周一至周五</span>
                  <span class="text-text-primary">9:00 - 21:00</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-text-secondary">周六至周日</span>
                  <span class="text-text-primary">10:00 - 18:00</span>
                </div>
                <div class="mt-4 p-3 bg-primary-50 rounded-lg">
                  <p class="text-sm text-primary-800">
                    <strong>24小时在线咨询</strong><br>
                    微信客服随时为您解答疑问
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { contactService, analyticsService } from '@/services/api'
import type { ContactForm } from '@/types'

// Environment variables
const phoneNumber = ref(import.meta.env.VITE_PHONE_NUMBER || '0757-22806688')
const email = ref(import.meta.env.VITE_EMAIL || 'info@wanxing-ai.com')

// Form state
const form = reactive<ContactForm & { experience: string; preferredTime: string }>({
  name: '',
  email: '',
  phone: '',
  message: '',
  interestedCourse: '',
  experience: '',
  preferredTime: ''
})

// UI state
const isSubmitting = ref(false)
const showSuccess = ref(false)
const successMessage = ref('')
const errors = reactive<Record<string, string>>({})

// Form validation
const validateForm = (): boolean => {
  Object.keys(errors).forEach(key => delete errors[key])
  
  if (!form.name.trim()) {
    errors.name = '请输入您的姓名'
  }
  
  if (!form.phone.trim()) {
    errors.phone = '请输入您的手机号'
  } else if (!/^1[3-9]\d{9}$/.test(form.phone.trim())) {
    errors.phone = '请输入有效的手机号'
  }
  
  if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = '请输入有效的邮箱地址'
  }
  
  return Object.keys(errors).length === 0
}

// Form submission
const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }
  
  isSubmitting.value = true
  
  try {
    // Track form submission attempt
    analyticsService.trackEvent('contact_form_submit', {
      interested_course: form.interestedCourse,
      experience: form.experience,
      has_email: !!form.email
    })
    
    // Submit form
    const response = await contactService.submitContactForm({
      name: form.name,
      email: form.email,
      phone: form.phone,
      message: form.message,
      interestedCourse: form.interestedCourse
    })
    
    if (response.success) {
      successMessage.value = response.message
      showSuccess.value = true
      
      // Reset form
      Object.assign(form, {
        name: '',
        email: '',
        phone: '',
        message: '',
        interestedCourse: '',
        experience: '',
        preferredTime: ''
      })
      
      // Track successful submission
      analyticsService.trackEvent('contact_form_success', {
        interested_course: form.interestedCourse
      })
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        showSuccess.value = false
      }, 5000)
    }
  } catch (error) {
    console.error('Form submission error:', error)
    // You could show an error message here
    analyticsService.trackEvent('contact_form_error', {
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  } finally {
    isSubmitting.value = false
  }
}
</script>


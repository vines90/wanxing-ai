<template>
  <main class="min-h-screen bg-black text-white flex items-center justify-center">
    <div class="bg-background-card border border-border rounded-lg p-8 w-full max-w-md">
      <!-- Logo -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-white mb-2">
          万星<span class="text-primary-500">AI</span>
        </h1>
        <p class="text-text-muted">内容管理系统</p>
      </div>

      <!-- Login Form -->
      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label class="form-label">管理员密码</label>
          <input
            v-model="password"
            type="password"
            class="form-input"
            placeholder="请输入管理员密码"
            autocomplete="current-password"
            required
          />
        </div>

        <!-- Error Message -->
        <div v-if="error" class="text-red-400 text-sm text-center">
          {{ error }}
        </div>

        <button
          type="submit"
          :disabled="loading || !password.trim()"
          class="w-full btn btn-primary"
        >
          {{ loading ? '验证中...' : '登录' }}
        </button>
      </form>

      <!-- Tips -->
      <div class="mt-8 text-center">
        <p class="text-xs text-text-muted">
          提示：双击网站Logo也可以快速进入管理后台
        </p>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// Local state
const password = ref('')
const loading = ref(false)
const error = ref('')

// 简单的密码验证（在实际应用中应该使用更安全的认证方式）
const ADMIN_PASSWORD = 'wanxing2024'

// Lifecycle
onMounted(() => {
  // 如果已经登录，直接跳转到管理后台
  if (isAuthenticated()) {
    const redirect = route.query.redirect as string
    router.push(redirect || '/admin')
  }
})

// Methods
const handleLogin = async () => {
  if (!password.value.trim()) return

  loading.value = true
  error.value = ''

  try {
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 800))

    if (password.value === ADMIN_PASSWORD) {
      // 设置认证状态
      localStorage.setItem('admin_auth', 'true')
      localStorage.setItem('admin_login_time', Date.now().toString())
      
      // 跳转到目标页面
      const redirect = route.query.redirect as string
      router.push(redirect || '/admin')
    } else {
      error.value = '密码错误，请重试'
      password.value = ''
    }
  } catch (err) {
    error.value = '登录失败，请重试'
  } finally {
    loading.value = false
  }
}

const isAuthenticated = (): boolean => {
  const auth = localStorage.getItem('admin_auth')
  const loginTime = localStorage.getItem('admin_login_time')
  
  if (!auth || !loginTime) return false
  
  // 检查是否在24小时内
  const now = Date.now()
  const loginTimestamp = parseInt(loginTime)
  const hoursDiff = (now - loginTimestamp) / (1000 * 60 * 60)
  
  if (hoursDiff > 24) {
    // 超过24小时，清除认证
    localStorage.removeItem('admin_auth')
    localStorage.removeItem('admin_login_time')
    return false
  }
  
  return auth === 'true'
}
</script>

<style scoped>
.form-input {
  @apply w-full px-3 py-2 bg-background border border-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent;
}

.form-label {
  @apply block text-sm font-medium text-text-primary mb-2;
}
</style>




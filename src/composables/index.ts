// Vue composables for shared logic in Wanxing AI project
import { ref, computed, readonly } from 'vue'

export const useTheme = () => {
  const isDark = ref(true) // Always dark theme for Wanxing AI

  const themeClass = computed(() => (isDark.value ? 'dark' : 'light'))

  return {
    isDark: readonly(isDark),
    themeClass,
  }
}

export const useApi = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)

  const request = async <T>(apiCall: () => Promise<T>): Promise<T | null> => {
    try {
      loading.value = true
      error.value = null
      const result = await apiCall()
      return result
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error'
      return null
    } finally {
      loading.value = false
    }
  }

  return {
    loading: readonly(loading),
    error: readonly(error),
    request,
  }
}

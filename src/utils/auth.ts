// 简单的认证工具函数

export const isAuthenticated = (): boolean => {
  const auth = localStorage.getItem('admin_auth')
  const loginTime = localStorage.getItem('admin_login_time')
  
  if (!auth || !loginTime) return false
  
  // 检查是否在24小时内
  const now = Date.now()
  const loginTimestamp = parseInt(loginTime)
  const hoursDiff = (now - loginTimestamp) / (1000 * 60 * 60)
  
  if (hoursDiff > 24) {
    // 超过24小时，清除认证
    clearAuth()
    return false
  }
  
  return auth === 'true'
}

export const setAuth = (): void => {
  localStorage.setItem('admin_auth', 'true')
  localStorage.setItem('admin_login_time', Date.now().toString())
}

export const clearAuth = (): void => {
  localStorage.removeItem('admin_auth')
  localStorage.removeItem('admin_login_time')
}

export const requireAuth = (to: any, from: any, next: any): void => {
  if (isAuthenticated()) {
    next()
  } else {
    next(`/admin/login?redirect=${encodeURIComponent(to.fullPath)}`)
  }
}




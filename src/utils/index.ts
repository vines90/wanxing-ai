// Common utility functions for the Wanxing AI project

/**
 * Format currency for Chinese locale
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency: 'CNY',
  }).format(amount)
}

/**
 * Format date for Chinese locale
 */
export const formatDate = (date: Date | string): string => {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

/**
 * Debounce function calls
 */
export const debounce = <T extends (...args: any[]) => void>(
  fn: T,
  delay: number,
): ((...args: Parameters<T>) => void) => {
  let timeoutId: number | undefined
  return (...args: Parameters<T>) => {
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = window.setTimeout(() => fn(...args), delay)
  }
}

/**
 * Generate unique ID with optional prefix
 */
let idCounter = 0
export const generateId = (prefix = 'id'): string => {
  idCounter++
  return `${prefix}-${idCounter}-${Date.now()}`
}

/**
 * Throttle function calls
 */
export const throttle = <T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number,
): ((...args: Parameters<T>) => void) => {
  let isThrottled = false
  return (...args: Parameters<T>) => {
    if (!isThrottled) {
      fn(...args)
      isThrottled = true
      setTimeout(() => {
        isThrottled = false
      }, delay)
    }
  }
}

/**
 * Clamp a number between min and max values
 */
export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max)
}

/**
 * Check if value is empty (null, undefined, empty string, empty array, empty object)
 */
export const isEmpty = (value: unknown): boolean => {
  if (value === null || value === undefined) return true
  if (typeof value === 'string') return value.trim().length === 0
  if (Array.isArray(value)) return value.length === 0
  if (typeof value === 'object') return Object.keys(value as object).length === 0
  return false
}

/**
 * Deep clone an object
 */
export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') return obj
  if (obj instanceof Date) return new Date(obj.getTime()) as unknown as T
  if (obj instanceof Array) return obj.map(item => deepClone(item)) as unknown as T
  if (typeof obj === 'object') {
    const cloned = {} as { [key: string]: unknown }
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        cloned[key] = deepClone(obj[key])
      }
    }
    return cloned as T
  }
  return obj
}

/**
 * Capitalize first letter of string
 */
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Convert string to kebab-case
 */
export const kebabCase = (str: string): string => {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase()
}

/**
 * Convert string to camelCase
 */
export const camelCase = (str: string): string => {
  return str
    .replace(/-([a-z])/g, (g) => g[1].toUpperCase())
    .replace(/\s+(.)/g, (g) => g[1].toUpperCase())
}

/**
 * Format file size in bytes to human readable format
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

/**
 * Truncate text to specified length
 */
export const truncate = (text: string, length: number, suffix = '...'): string => {
  if (text.length <= length) return text
  return text.substring(0, length - suffix.length) + suffix
}

/**
 * Check if device is mobile
 */
export const isMobile = (): boolean => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
}

/**
 * Smooth scroll to element
 */
export const scrollToElement = (
  element: Element | string,
  offset = 0,
  behavior: ScrollBehavior = 'smooth'
): void => {
  const targetElement = typeof element === 'string' 
    ? document.querySelector(element)
    : element

  if (targetElement) {
    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset
    window.scrollTo({
      top: targetPosition,
      behavior
    })
  }
}

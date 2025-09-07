// Common utility functions for the Wanxing AI project
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency: 'CNY',
  }).format(amount)
}

export const formatDate = (date: Date | string): string => {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

export const debounce = <T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number,
): ((...args: Parameters<T>) => void) => {
  let timeoutId: number | undefined
  return (...args: Parameters<T>) => {
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = window.setTimeout(() => fn(...args), delay)
  }
}

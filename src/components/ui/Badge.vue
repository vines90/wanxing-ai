<template>
  <span :class="badgeClasses">
    <span v-if="icon" class="badge-icon">
      <component :is="icon" />
    </span>
    
    <span v-if="dot" class="badge-dot"></span>
    
    <slot />
    
    <button
      v-if="closable"
      type="button"
      class="badge-close"
      @click="handleClose"
    >
      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </span>
</template>

<script setup lang="ts">
import { computed, type Component } from 'vue'

interface BadgeProps {
  /**
   * Badge variant
   */
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'neutral'
  
  /**
   * Badge size
   */
  size?: 'xs' | 'sm' | 'md' | 'lg'
  
  /**
   * Badge shape
   */
  shape?: 'rounded' | 'pill' | 'square'
  
  /**
   * Show as dot indicator
   */
  dot?: boolean
  
  /**
   * Icon component
   */
  icon?: Component
  
  /**
   * Show close button
   */
  closable?: boolean
  
  /**
   * Outlined style
   */
  outlined?: boolean
  
  /**
   * Soft background style
   */
  soft?: boolean
}

const props = withDefaults(defineProps<BadgeProps>(), {
  variant: 'primary',
  size: 'sm',
  shape: 'rounded',
  dot: false,
  closable: false,
  outlined: false,
  soft: true
})

interface BadgeEmits {
  close: []
}

const emit = defineEmits<BadgeEmits>()

const badgeClasses = computed(() => {
  const classes = ['inline-flex', 'items-center', 'font-medium', 'transition-colors']
  
  // Base variant classes
  if (props.outlined) {
    classes.push('border', 'bg-transparent')
    
    switch (props.variant) {
      case 'primary':
        classes.push('border-primary-500', 'text-primary-500')
        break
      case 'secondary':
        classes.push('border-text-muted', 'text-text-muted')
        break
      case 'success':
        classes.push('border-success', 'text-success')
        break
      case 'warning':
        classes.push('border-warning', 'text-warning')
        break
      case 'error':
        classes.push('border-error', 'text-error')
        break
      case 'info':
        classes.push('border-info', 'text-info')
        break
      case 'neutral':
        classes.push('border-border', 'text-text-secondary')
        break
    }
  } else if (props.soft) {
    switch (props.variant) {
      case 'primary':
        classes.push('bg-primary-100', 'text-primary-800')
        break
      case 'secondary':
        classes.push('bg-background-card', 'text-text-secondary')
        break
      case 'success':
        classes.push('bg-green-100', 'text-green-800')
        break
      case 'warning':
        classes.push('bg-yellow-100', 'text-yellow-800')
        break
      case 'error':
        classes.push('bg-red-100', 'text-red-800')
        break
      case 'info':
        classes.push('bg-blue-100', 'text-blue-800')
        break
      case 'neutral':
        classes.push('bg-background-elevated', 'text-text-primary')
        break
    }
  } else {
    classes.push('text-white')
    
    switch (props.variant) {
      case 'primary':
        classes.push('bg-primary-500')
        break
      case 'secondary':
        classes.push('bg-background-elevated')
        break
      case 'success':
        classes.push('bg-success')
        break
      case 'warning':
        classes.push('bg-warning')
        break
      case 'error':
        classes.push('bg-error')
        break
      case 'info':
        classes.push('bg-info')
        break
      case 'neutral':
        classes.push('bg-background-card')
        break
    }
  }
  
  // Size classes
  switch (props.size) {
    case 'xs':
      if (props.dot) {
        classes.push('w-2', 'h-2')
      } else {
        classes.push('px-2', 'py-0.5', 'text-xs', 'gap-1')
      }
      break
    case 'sm':
      if (props.dot) {
        classes.push('w-3', 'h-3')
      } else {
        classes.push('px-2.5', 'py-0.5', 'text-xs', 'gap-1')
      }
      break
    case 'md':
      if (props.dot) {
        classes.push('w-4', 'h-4')
      } else {
        classes.push('px-3', 'py-1', 'text-sm', 'gap-1.5')
      }
      break
    case 'lg':
      if (props.dot) {
        classes.push('w-5', 'h-5')
      } else {
        classes.push('px-4', 'py-1.5', 'text-sm', 'gap-2')
      }
      break
  }
  
  // Shape classes
  switch (props.shape) {
    case 'rounded':
      classes.push('rounded-md')
      break
    case 'pill':
      classes.push('rounded-full')
      break
    case 'square':
      classes.push('rounded-none')
      break
  }
  
  // Dot specific classes
  if (props.dot) {
    classes.push('rounded-full', 'flex-shrink-0')
  }
  
  return classes.join(' ')
})

const handleClose = () => {
  emit('close')
}
</script>

<style scoped>
.badge-icon {
  @apply flex-shrink-0;
}

.badge-icon > :deep(svg) {
  @apply w-3 h-3;
}

.badge-close {
  @apply -mr-1 ml-1.5 flex-shrink-0 hover:opacity-70 transition-opacity;
}

.badge-dot {
  @apply flex-shrink-0 rounded-full;
}
</style>
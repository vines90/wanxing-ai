<template>
  <Transition
    enter-active-class="transition ease-out duration-300"
    enter-from-class="opacity-0 transform scale-95"
    enter-to-class="opacity-100 transform scale-100"
    leave-active-class="transition ease-in duration-200"
    leave-from-class="opacity-100 transform scale-100"
    leave-to-class="opacity-0 transform scale-95"
  >
    <div v-if="visible" :class="alertClasses" role="alert">
      <div v-if="icon || $slots.icon" class="alert-icon">
        <slot name="icon">
          <component :is="icon" />
        </slot>
      </div>
      
      <div class="alert-content">
        <div v-if="title" class="alert-title">
          {{ title }}
        </div>
        
        <div v-if="$slots.default || message" class="alert-message">
          <slot>{{ message }}</slot>
        </div>
        
        <div v-if="$slots.actions" class="alert-actions">
          <slot name="actions" />
        </div>
      </div>
      
      <button
        v-if="dismissible"
        type="button"
        class="alert-dismiss"
        @click="dismiss"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed, ref, type Component } from 'vue'

interface AlertProps {
  /**
   * Alert variant
   */
  variant?: 'info' | 'success' | 'warning' | 'error'
  
  /**
   * Alert title
   */
  title?: string
  
  /**
   * Alert message
   */
  message?: string
  
  /**
   * Icon component
   */
  icon?: Component
  
  /**
   * Show dismiss button
   */
  dismissible?: boolean
  
  /**
   * Auto dismiss after timeout (ms)
   */
  timeout?: number
  
  /**
   * Show border
   */
  bordered?: boolean
  
  /**
   * Rounded corners
   */
  rounded?: boolean
}

const props = withDefaults(defineProps<AlertProps>(), {
  variant: 'info',
  dismissible: false,
  bordered: false,
  rounded: true
})

interface AlertEmits {
  dismiss: []
}

const emit = defineEmits<AlertEmits>()

const visible = ref(true)

const alertClasses = computed(() => {
  const classes = ['alert', 'flex', 'items-start', 'space-x-3']
  
  // Variant classes
  switch (props.variant) {
    case 'info':
      classes.push('alert-info')
      break
    case 'success':
      classes.push('alert-success')
      break
    case 'warning':
      classes.push('alert-warning')
      break
    case 'error':
      classes.push('alert-error')
      break
  }
  
  // Border
  if (props.bordered) {
    classes.push('border-2')
  } else {
    classes.push('border')
  }
  
  // Rounded corners
  if (props.rounded) {
    classes.push('rounded-lg')
  }
  
  return classes.join(' ')
})

const dismiss = () => {
  visible.value = false
  emit('dismiss')
}

// Auto dismiss
if (props.timeout && props.timeout > 0) {
  setTimeout(dismiss, props.timeout)
}
</script>

<style scoped>
.alert-icon {
  @apply flex-shrink-0 mt-0.5;
}

.alert-icon > :deep(svg) {
  @apply w-5 h-5;
}

.alert-content {
  @apply flex-1 min-w-0;
}

.alert-title {
  @apply font-medium text-sm mb-1;
}

.alert-message {
  @apply text-sm opacity-90;
}

.alert-actions {
  @apply mt-3 flex space-x-2;
}

.alert-dismiss {
  @apply flex-shrink-0 p-1 -m-1 rounded hover:opacity-70 transition-opacity;
}
</style>
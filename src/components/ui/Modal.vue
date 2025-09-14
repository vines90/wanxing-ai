<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="visible"
        class="fixed inset-0 z-50 overflow-y-auto"
        @click="handleBackdropClick"
      >
        <!-- Backdrop -->
        <div class="fixed inset-0 bg-black bg-opacity-75 transition-opacity" />
        
        <!-- Modal Container -->
        <div class="flex min-h-full items-center justify-center p-4">
          <Transition
            enter-active-class="transition ease-out duration-300"
            enter-from-class="opacity-0 transform scale-95"
            enter-to-class="opacity-100 transform scale-100"
            leave-active-class="transition ease-in duration-200"
            leave-from-class="opacity-100 transform scale-100"
            leave-to-class="opacity-0 transform scale-95"
          >
            <div
              v-if="visible"
              :class="modalClasses"
              @click.stop
            >
              <!-- Modal Header -->
              <div v-if="title || $slots.header || closable" class="modal-header">
                <div class="flex items-start justify-between">
                  <div class="flex-1">
                    <slot name="header">
                      <h3 v-if="title" class="text-xl font-semibold text-text-primary">
                        {{ title }}
                      </h3>
                    </slot>
                  </div>
                  
                  <button
                    v-if="closable"
                    type="button"
                    class="p-1 -m-1 ml-4 text-text-muted hover:text-text-primary transition-colors rounded"
                    @click="close"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <!-- Modal Content -->
              <div v-if="$slots.default" class="modal-content">
                <slot />
              </div>
              
              <!-- Modal Footer -->
              <div v-if="$slots.footer" class="modal-footer">
                <slot name="footer" />
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, watch, onMounted, onUnmounted } from 'vue'

interface ModalProps {
  /**
   * Modal visibility
   */
  modelValue: boolean
  
  /**
   * Modal title
   */
  title?: string
  
  /**
   * Modal size
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
  
  /**
   * Show close button
   */
  closable?: boolean
  
  /**
   * Close on backdrop click
   */
  closeOnBackdrop?: boolean
  
  /**
   * Close on escape key
   */
  closeOnEscape?: boolean
  
  /**
   * Prevent body scroll
   */
  preventBodyScroll?: boolean
  
  /**
   * Center modal vertically
   */
  centered?: boolean
}

const props = withDefaults(defineProps<ModalProps>(), {
  size: 'md',
  closable: true,
  closeOnBackdrop: true,
  closeOnEscape: true,
  preventBodyScroll: true,
  centered: true
})

interface ModalEmits {
  'update:modelValue': [value: boolean]
  open: []
  close: []
}

const emit = defineEmits<ModalEmits>()

const visible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const modalClasses = computed(() => {
  const classes = [
    'relative',
    'bg-background-card',
    'rounded-xl',
    'shadow-2xl',
    'border',
    'border-border',
    'w-full',
    'max-h-[90vh]',
    'overflow-hidden',
    'flex',
    'flex-col'
  ]
  
  // Size classes
  switch (props.size) {
    case 'xs':
      classes.push('max-w-xs')
      break
    case 'sm':
      classes.push('max-w-sm')
      break
    case 'md':
      classes.push('max-w-md')
      break
    case 'lg':
      classes.push('max-w-lg')
      break
    case 'xl':
      classes.push('max-w-2xl')
      break
    case 'full':
      classes.push('max-w-7xl', 'h-[90vh]')
      break
  }
  
  return classes.join(' ')
})

const handleBackdropClick = () => {
  if (props.closeOnBackdrop) {
    close()
  }
}

const handleEscapeKey = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && props.closeOnEscape && visible.value) {
    close()
  }
}

const close = () => {
  visible.value = false
  emit('close')
}

// Body scroll management
let originalBodyOverflow = ''

watch(visible, (isVisible) => {
  if (props.preventBodyScroll) {
    if (isVisible) {
      originalBodyOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = originalBodyOverflow
    }
  }
  
  if (isVisible) {
    emit('open')
  }
}, { immediate: true })

onMounted(() => {
  if (props.closeOnEscape) {
    document.addEventListener('keydown', handleEscapeKey)
  }
})

onUnmounted(() => {
  if (props.closeOnEscape) {
    document.removeEventListener('keydown', handleEscapeKey)
  }
  
  // Restore body overflow
  if (props.preventBodyScroll && originalBodyOverflow !== undefined) {
    document.body.style.overflow = originalBodyOverflow
  }
})
</script>

<style scoped>
.modal-header {
  @apply p-6 pb-4 border-b border-border flex-shrink-0;
}

.modal-content {
  @apply p-6 flex-1 overflow-y-auto;
}

.modal-footer {
  @apply p-6 pt-4 border-t border-border flex-shrink-0;
}
</style>
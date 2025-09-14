<template>
  <div class="form-field">
    <label v-if="label" :for="textareaId" class="form-label">
      {{ label }}
      <span v-if="required" class="text-error ml-1">*</span>
    </label>
    
    <div class="relative">
      <textarea
        :id="textareaId"
        v-model="textareaValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :rows="rows"
        :class="textareaClasses"
        v-bind="$attrs"
        @blur="handleBlur"
        @focus="handleFocus"
        @input="handleInput"
      ></textarea>
      
      <div v-if="maxLength || resizable === false" class="absolute bottom-2 right-2 flex items-center space-x-2">
        <span v-if="maxLength" class="text-xs text-text-muted">
          {{ characterCount }}/{{ maxLength }}
        </span>
      </div>
    </div>
    
    <div v-if="hint || error" class="mt-1">
      <p v-if="error" class="form-error">{{ error }}</p>
      <p v-else-if="hint" class="text-xs text-text-muted">{{ hint }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { generateId } from '@/utils/index'

interface TextareaProps {
  /**
   * Textarea value
   */
  modelValue?: string
  
  /**
   * Textarea label
   */
  label?: string
  
  /**
   * Placeholder text
   */
  placeholder?: string
  
  /**
   * Number of visible text lines
   */
  rows?: number
  
  /**
   * Maximum character length
   */
  maxLength?: number
  
  /**
   * Textarea size
   */
  size?: 'sm' | 'md' | 'lg'
  
  /**
   * Disabled state
   */
  disabled?: boolean
  
  /**
   * Readonly state
   */
  readonly?: boolean
  
  /**
   * Required field
   */
  required?: boolean
  
  /**
   * Error message
   */
  error?: string
  
  /**
   * Hint message
   */
  hint?: string
  
  /**
   * Enable/disable resize
   */
  resizable?: boolean
  
  /**
   * Auto-grow height based on content
   */
  autoGrow?: boolean
}

const props = withDefaults(defineProps<TextareaProps>(), {
  rows: 4,
  size: 'md',
  disabled: false,
  readonly: false,
  required: false,
  resizable: true,
  autoGrow: false
})

interface TextareaEmits {
  'update:modelValue': [value: string]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  input: [event: Event]
}

const emit = defineEmits<TextareaEmits>()

const textareaId = ref(generateId('textarea'))

const textareaValue = computed({
  get: () => props.modelValue ?? '',
  set: (value) => {
    if (props.maxLength && value.length > props.maxLength) {
      return
    }
    emit('update:modelValue', value)
  }
})

const characterCount = computed(() => {
  return (props.modelValue ?? '').length
})

const textareaClasses = computed(() => {
  const classes = ['form-textarea']
  
  // Size classes
  if (props.size === 'lg') classes.push('form-input-lg')
  
  // State classes
  if (props.error) classes.push('border-error focus:ring-error')
  if (props.disabled) classes.push('opacity-50 cursor-not-allowed')
  if (props.readonly) classes.push('bg-background-light')
  if (!props.resizable) classes.push('resize-none')
  
  // Character count spacing
  if (props.maxLength) classes.push('pb-8')
  
  return classes.join(' ')
})

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}

const handleInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  
  if (props.maxLength && target.value.length > props.maxLength) {
    target.value = target.value.slice(0, props.maxLength)
  }
  
  if (props.autoGrow) {
    target.style.height = 'auto'
    target.style.height = target.scrollHeight + 'px'
  }
  
  emit('update:modelValue', target.value)
  emit('input', event)
}
</script>
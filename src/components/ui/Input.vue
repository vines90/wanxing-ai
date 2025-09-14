<template>
  <div class="form-field">
    <label v-if="label" :for="inputId" class="form-label">
      {{ label }}
      <span v-if="required" class="text-error ml-1">*</span>
    </label>
    
    <div class="relative">
      <div v-if="prefixIcon" class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <component :is="prefixIcon" class="h-5 w-5 text-text-muted" />
      </div>
      
      <input
        :id="inputId"
        v-model="inputValue"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :autocomplete="autocomplete"
        :class="inputClasses"
        v-bind="$attrs"
        @blur="handleBlur"
        @focus="handleFocus"
        @input="handleInput"
      />
      
      <div v-if="suffixIcon || clearable" class="absolute inset-y-0 right-0 flex items-center">
        <button
          v-if="clearable && inputValue"
          type="button"
          class="p-2 text-text-muted hover:text-text-primary"
          @click="clearInput"
        >
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div v-else-if="suffixIcon" class="pr-3 flex items-center pointer-events-none">
          <component :is="suffixIcon" class="h-5 w-5 text-text-muted" />
        </div>
      </div>
    </div>
    
    <div v-if="hint || error" class="mt-1">
      <p v-if="error" class="form-error">{{ error }}</p>
      <p v-else-if="hint" class="text-xs text-text-muted">{{ hint }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, type Component } from 'vue'
import { generateId } from '@/utils/index'

interface InputProps {
  /**
   * Input value
   */
  modelValue?: string | number
  
  /**
   * Input type
   */
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search'
  
  /**
   * Input label
   */
  label?: string
  
  /**
   * Placeholder text
   */
  placeholder?: string
  
  /**
   * Input size
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
   * Icon component for prefix
   */
  prefixIcon?: Component
  
  /**
   * Icon component for suffix
   */
  suffixIcon?: Component
  
  /**
   * Show clear button when has value
   */
  clearable?: boolean
  
  /**
   * Autocomplete attribute
   */
  autocomplete?: string
}

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  size: 'md',
  disabled: false,
  readonly: false,
  required: false,
  clearable: false
})

interface InputEmits {
  'update:modelValue': [value: string | number]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  input: [event: Event]
}

const emit = defineEmits<InputEmits>()

const inputId = ref(generateId('input'))

const inputValue = computed({
  get: () => props.modelValue ?? '',
  set: (value) => emit('update:modelValue', value)
})

const inputClasses = computed(() => {
  const classes = ['form-input']
  
  // Size classes
  if (props.size === 'lg') classes.push('form-input-lg')
  
  // State classes
  if (props.error) classes.push('border-error focus:ring-error')
  if (props.disabled) classes.push('opacity-50 cursor-not-allowed')
  if (props.readonly) classes.push('bg-background-light')
  
  // Icon spacing
  if (props.prefixIcon) classes.push('pl-10')
  if (props.suffixIcon || props.clearable) classes.push('pr-10')
  
  return classes.join(' ')
})

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
  emit('input', event)
}

const clearInput = () => {
  emit('update:modelValue', '')
}
</script>
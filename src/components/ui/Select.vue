<template>
  <div class="form-field">
    <label v-if="label" :for="selectId" class="form-label">
      {{ label }}
      <span v-if="required" class="text-error ml-1">*</span>
    </label>
    
    <div class="relative">
      <select
        :id="selectId"
        v-model="selectValue"
        :disabled="disabled"
        :required="required"
        :class="selectClasses"
        v-bind="$attrs"
        @blur="handleBlur"
        @focus="handleFocus"
        @change="handleChange"
      >
        <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
        <option
          v-for="option in normalizedOptions"
          :key="option.value"
          :value="option.value"
          :disabled="option.disabled"
        >
          {{ option.label }}
        </option>
      </select>
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

interface SelectOption {
  label: string
  value: string | number
  disabled?: boolean
}

interface SelectProps {
  /**
   * Select value
   */
  modelValue?: string | number
  
  /**
   * Select options
   */
  options?: SelectOption[] | string[] | number[]
  
  /**
   * Select label
   */
  label?: string
  
  /**
   * Placeholder text
   */
  placeholder?: string
  
  /**
   * Select size
   */
  size?: 'sm' | 'md' | 'lg'
  
  /**
   * Disabled state
   */
  disabled?: boolean
  
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
}

const props = withDefaults(defineProps<SelectProps>(), {
  options: () => [],
  size: 'md',
  disabled: false,
  required: false
})

interface SelectEmits {
  'update:modelValue': [value: string | number]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  change: [event: Event]
}

const emit = defineEmits<SelectEmits>()

const selectId = ref(generateId('select'))

const selectValue = computed({
  get: () => props.modelValue ?? '',
  set: (value) => emit('update:modelValue', value)
})

const normalizedOptions = computed(() => {
  return props.options.map(option => {
    if (typeof option === 'string' || typeof option === 'number') {
      return {
        label: String(option),
        value: option,
        disabled: false
      }
    }
    return option
  })
})

const selectClasses = computed(() => {
  const classes = ['form-select']
  
  // Size classes
  if (props.size === 'lg') classes.push('form-input-lg')
  
  // State classes
  if (props.error) classes.push('border-error focus:ring-error')
  if (props.disabled) classes.push('opacity-50 cursor-not-allowed')
  
  return classes.join(' ')
})

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}

const handleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  emit('update:modelValue', target.value)
  emit('change', event)
}
</script>
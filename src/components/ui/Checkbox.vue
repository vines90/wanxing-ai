<template>
  <div class="flex items-start">
    <div class="flex items-center h-5">
      <input
        :id="checkboxId"
        v-model="checkboxValue"
        type="checkbox"
        :value="value"
        :disabled="disabled"
        :required="required"
        :class="checkboxClasses"
        v-bind="$attrs"
        @change="handleChange"
      />
    </div>
    
    <div v-if="label || $slots.default" class="ml-3">
      <label :for="checkboxId" class="form-label mb-0 cursor-pointer">
        <slot>{{ label }}</slot>
      </label>
      
      <p v-if="description" class="text-xs text-text-muted mt-1">
        {{ description }}
      </p>
    </div>
  </div>
  
  <div v-if="error" class="mt-1">
    <p class="form-error">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { generateId } from '@/utils/index'

interface CheckboxProps {
  /**
   * Checkbox value (for v-model)
   */
  modelValue?: boolean | string[] | number[]
  
  /**
   * Value to add/remove from array when used with array v-model
   */
  value?: string | number
  
  /**
   * Checkbox label
   */
  label?: string
  
  /**
   * Description text
   */
  description?: string
  
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
   * Indeterminate state
   */
  indeterminate?: boolean
}

const props = withDefaults(defineProps<CheckboxProps>(), {
  disabled: false,
  required: false,
  indeterminate: false
})

interface CheckboxEmits {
  'update:modelValue': [value: boolean | string[] | number[]]
  change: [event: Event]
}

const emit = defineEmits<CheckboxEmits>()

const checkboxId = ref(generateId('checkbox'))

const checkboxValue = computed({
  get: () => {
    if (Array.isArray(props.modelValue)) {
      return props.value !== undefined ? props.modelValue.includes(props.value as never) : false
    }
    return props.modelValue ?? false
  },
  set: (checked: boolean) => {
    if (Array.isArray(props.modelValue) && props.value !== undefined) {
      const newValue = [...props.modelValue]
      if (checked) {
        if (!newValue.includes(props.value as never)) {
          newValue.push(props.value as never)
        }
      } else {
        const index = newValue.indexOf(props.value as never)
        if (index > -1) {
          newValue.splice(index, 1)
        }
      }
      emit('update:modelValue', newValue as string[] | number[])
    } else {
      emit('update:modelValue', checked)
    }
  }
})

const checkboxClasses = computed(() => {
  const classes = ['form-checkbox']
  
  // State classes
  if (props.disabled) classes.push('opacity-50 cursor-not-allowed')
  if (props.error) classes.push('border-error focus:ring-error')
  
  return classes.join(' ')
})

const handleChange = (event: Event) => {
  emit('change', event)
}
</script>
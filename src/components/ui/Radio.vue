<template>
  <div class="flex items-start">
    <div class="flex items-center h-5">
      <input
        :id="radioId"
        v-model="radioValue"
        type="radio"
        :value="value"
        :name="name"
        :disabled="disabled"
        :required="required"
        :class="radioClasses"
        v-bind="$attrs"
        @change="handleChange"
      />
    </div>
    
    <div v-if="label || $slots.default" class="ml-3">
      <label :for="radioId" class="form-label mb-0 cursor-pointer">
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

interface RadioProps {
  /**
   * Radio value (for v-model)
   */
  modelValue?: string | number | boolean
  
  /**
   * Value of this radio option
   */
  value: string | number | boolean
  
  /**
   * Radio group name
   */
  name?: string
  
  /**
   * Radio label
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
}

const props = withDefaults(defineProps<RadioProps>(), {
  disabled: false,
  required: false
})

interface RadioEmits {
  'update:modelValue': [value: string | number | boolean]
  change: [event: Event]
}

const emit = defineEmits<RadioEmits>()

const radioId = ref(generateId('radio'))

const radioValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const radioClasses = computed(() => {
  const classes = ['form-radio']
  
  // State classes
  if (props.disabled) classes.push('opacity-50 cursor-not-allowed')
  if (props.error) classes.push('border-error focus:ring-error')
  
  return classes.join(' ')
})

const handleChange = (event: Event) => {
  emit('change', event)
}
</script>
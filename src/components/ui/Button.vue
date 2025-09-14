<template>
  <component
    :is="tag"
    :class="buttonClasses"
    :disabled="disabled"
    :type="tag === 'button' ? type : undefined"
    :href="tag === 'a' ? href : undefined"
    :to="tag === 'router-link' ? to : undefined"
    v-bind="$attrs"
    @click="handleClick"
  >
    <span v-if="loading" class="btn-spinner">
      <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </span>
    
    <span v-if="icon && iconPosition === 'left'" class="btn-icon-left">
      <component :is="icon" />
    </span>

    <span :class="{ 'opacity-0': loading }">
      <slot />
    </span>

    <span v-if="icon && iconPosition === 'right'" class="btn-icon-right">
      <component :is="icon" />
    </span>
  </component>
</template>

<script setup lang="ts">
import { computed, type Component } from 'vue'

interface ButtonProps {
  /**
   * Button variant style
   */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  
  /**
   * Button size
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  
  /**
   * HTML tag or Vue component to render
   */
  tag?: 'button' | 'a' | 'router-link'
  
  /**
   * Button type (when tag is button)
   */
  type?: 'button' | 'submit' | 'reset'
  
  /**
   * Href attribute (when tag is a)
   */
  href?: string
  
  /**
   * Router link to prop (when tag is router-link)
   */
  to?: string | object
  
  /**
   * Disabled state
   */
  disabled?: boolean
  
  /**
   * Loading state - shows spinner and disables interaction
   */
  loading?: boolean
  
  /**
   * Full width button
   */
  block?: boolean
  
  /**
   * Icon component to display
   */
  icon?: Component
  
  /**
   * Icon position
   */
  iconPosition?: 'left' | 'right'
  
  /**
   * Rounded button (pill shape)
   */
  rounded?: boolean
}

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'primary',
  size: 'md',
  tag: 'button',
  type: 'button',
  disabled: false,
  loading: false,
  block: false,
  iconPosition: 'left',
  rounded: false
})

interface ButtonEmits {
  click: [event: Event]
}

const emit = defineEmits<ButtonEmits>()

const buttonClasses = computed(() => {
  const classes = ['btn']
  
  // Variant classes
  classes.push(`btn-${props.variant}`)
  
  // Size classes
  classes.push(`btn-${props.size}`)
  
  // Conditional classes
  if (props.block) classes.push('w-full')
  if (props.rounded) classes.push('rounded-full')
  if (props.loading) classes.push('relative')
  
  return classes.join(' ')
})

const handleClick = (event: Event) => {
  if (props.disabled || props.loading) {
    event.preventDefault()
    return
  }
  emit('click', event)
}
</script>

<style scoped>
.btn-spinner {
  @apply absolute inset-0 flex items-center justify-center;
}

.btn-icon-left {
  @apply -ml-1 mr-2 flex-shrink-0;
}

.btn-icon-right {
  @apply ml-2 -mr-1 flex-shrink-0;
}

.btn-icon-left > :deep(svg),
.btn-icon-right > :deep(svg) {
  @apply w-4 h-4;
}

/* Icon-only buttons */
.btn:not(:has(span:not(.btn-icon-left):not(.btn-icon-right):not(.btn-spinner))) {
  @apply px-2;
}

.btn:not(:has(span:not(.btn-icon-left):not(.btn-icon-right):not(.btn-spinner))).btn-xs {
  @apply px-1;
}

.btn:not(:has(span:not(.btn-icon-left):not(.btn-icon-right):not(.btn-spinner))).btn-sm {
  @apply px-1.5;
}

.btn:not(:has(span:not(.btn-icon-left):not(.btn-icon-right):not(.btn-spinner))).btn-lg {
  @apply px-3;
}

.btn:not(:has(span:not(.btn-icon-left):not(.btn-icon-right):not(.btn-spinner))).btn-xl {
  @apply px-4;
}
</style>
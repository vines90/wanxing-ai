<template>
  <div :class="containerClasses">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface ContainerProps {
  /**
   * Container max width
   */
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | 'narrow'
  
  /**
   * Remove horizontal padding
   */
  noPadding?: boolean
  
  /**
   * Center the container
   */
  center?: boolean
  
  /**
   * Enable fluid container (no max-width)
   */
  fluid?: boolean
}

const props = withDefaults(defineProps<ContainerProps>(), {
  size: 'xl',
  noPadding: false,
  center: true,
  fluid: false
})

const containerClasses = computed(() => {
  const classes = ['w-full']
  
  // Center alignment
  if (props.center) {
    classes.push('mx-auto')
  }
  
  // Container sizing
  if (!props.fluid) {
    switch (props.size) {
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
        classes.push('max-w-7xl')
        break
      case '2xl':
        classes.push('max-w-7xl')
        break
      case 'narrow':
        classes.push('max-w-4xl')
        break
      case 'full':
        // No max-width constraint
        break
    }
  }
  
  // Horizontal padding
  if (!props.noPadding) {
    classes.push('px-4', 'sm:px-6', 'lg:px-8')
  }
  
  return classes.join(' ')
})
</script>
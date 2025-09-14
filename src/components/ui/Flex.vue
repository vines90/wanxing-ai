<template>
  <div :class="flexClasses">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface FlexProps {
  /**
   * Flex direction
   */
  direction?: 'row' | 'row-reverse' | 'col' | 'col-reverse'
  
  /**
   * Flex wrap
   */
  wrap?: boolean | 'reverse'
  
  /**
   * Justify content
   */
  justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly'
  
  /**
   * Align items
   */
  align?: 'start' | 'end' | 'center' | 'baseline' | 'stretch'
  
  /**
   * Gap between flex items
   */
  gap?: number | string
  
  /**
   * Make items grow to fill available space
   */
  grow?: boolean
  
  /**
   * Responsive behavior
   */
  responsive?: {
    sm?: Partial<FlexProps>
    md?: Partial<FlexProps>
    lg?: Partial<FlexProps>
    xl?: Partial<FlexProps>
  }
}

const props = withDefaults(defineProps<FlexProps>(), {
  direction: 'row',
  wrap: false,
  justify: 'start',
  align: 'stretch',
  gap: 0,
  grow: false
})

const flexClasses = computed(() => {
  const classes = ['flex']
  
  // Flex direction
  switch (props.direction) {
    case 'row':
      classes.push('flex-row')
      break
    case 'row-reverse':
      classes.push('flex-row-reverse')
      break
    case 'col':
      classes.push('flex-col')
      break
    case 'col-reverse':
      classes.push('flex-col-reverse')
      break
  }
  
  // Flex wrap
  if (props.wrap === true) {
    classes.push('flex-wrap')
  } else if (props.wrap === 'reverse') {
    classes.push('flex-wrap-reverse')
  }
  
  // Justify content
  switch (props.justify) {
    case 'start':
      classes.push('justify-start')
      break
    case 'end':
      classes.push('justify-end')
      break
    case 'center':
      classes.push('justify-center')
      break
    case 'between':
      classes.push('justify-between')
      break
    case 'around':
      classes.push('justify-around')
      break
    case 'evenly':
      classes.push('justify-evenly')
      break
  }
  
  // Align items
  switch (props.align) {
    case 'start':
      classes.push('items-start')
      break
    case 'end':
      classes.push('items-end')
      break
    case 'center':
      classes.push('items-center')
      break
    case 'baseline':
      classes.push('items-baseline')
      break
    case 'stretch':
      classes.push('items-stretch')
      break
  }
  
  // Gap
  if (typeof props.gap === 'number' && props.gap > 0) {
    classes.push(`gap-${props.gap}`)
  } else if (typeof props.gap === 'string') {
    classes.push(`gap-[${props.gap}]`)
  }
  
  // Grow
  if (props.grow) {
    classes.push('flex-1')
  }
  
  // Responsive classes
  if (props.responsive) {
    Object.entries(props.responsive).forEach(([breakpoint, config]) => {
      const prefix = `${breakpoint}:`
      
      if (config.direction) {
        classes.push(`${prefix}flex-${config.direction}`)
      }
      if (config.justify) {
        classes.push(`${prefix}justify-${config.justify}`)
      }
      if (config.align) {
        classes.push(`${prefix}items-${config.align}`)
      }
    })
  }
  
  return classes.join(' ')
})
</script>
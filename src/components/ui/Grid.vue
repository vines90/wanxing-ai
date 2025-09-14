<template>
  <div :class="gridClasses">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface GridProps {
  /**
   * Number of columns (responsive)
   */
  cols?: {
    xs?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
    '2xl'?: number
  } | number
  
  /**
   * Gap between grid items
   */
  gap?: number | string
  
  /**
   * Auto-fit columns (responsive columns based on min width)
   */
  autoFit?: boolean
  
  /**
   * Auto-fill columns
   */
  autoFill?: boolean
  
  /**
   * Minimum column width for auto layouts
   */
  minColWidth?: string
  
  /**
   * Align items
   */
  alignItems?: 'start' | 'center' | 'end' | 'stretch'
  
  /**
   * Justify items
   */
  justifyItems?: 'start' | 'center' | 'end' | 'stretch'
  
  /**
   * Dense grid packing
   */
  dense?: boolean
}

const props = withDefaults(defineProps<GridProps>(), {
  cols: 1,
  gap: 6,
  autoFit: false,
  autoFill: false,
  minColWidth: '300px',
  alignItems: 'stretch',
  justifyItems: 'stretch',
  dense: false
})

const gridClasses = computed(() => {
  const classes = ['grid']
  
  // Grid columns
  if (props.autoFit) {
    classes.push('grid-cols-auto-fit')
  } else if (props.autoFill) {
    classes.push('grid-cols-auto-fill')
  } else if (typeof props.cols === 'number') {
    classes.push(`grid-cols-${props.cols}`)
  } else if (typeof props.cols === 'object') {
    // Responsive columns
    if (props.cols.xs) classes.push(`grid-cols-${props.cols.xs}`)
    if (props.cols.sm) classes.push(`sm:grid-cols-${props.cols.sm}`)
    if (props.cols.md) classes.push(`md:grid-cols-${props.cols.md}`)
    if (props.cols.lg) classes.push(`lg:grid-cols-${props.cols.lg}`)
    if (props.cols.xl) classes.push(`xl:grid-cols-${props.cols.xl}`)
    if (props.cols['2xl']) classes.push(`2xl:grid-cols-${props.cols['2xl']}`)
  }
  
  // Gap
  if (typeof props.gap === 'number') {
    classes.push(`gap-${props.gap}`)
  } else if (typeof props.gap === 'string') {
    classes.push(`gap-[${props.gap}]`)
  }
  
  // Alignment
  switch (props.alignItems) {
    case 'start':
      classes.push('items-start')
      break
    case 'center':
      classes.push('items-center')
      break
    case 'end':
      classes.push('items-end')
      break
    case 'stretch':
      classes.push('items-stretch')
      break
  }
  
  switch (props.justifyItems) {
    case 'start':
      classes.push('justify-items-start')
      break
    case 'center':
      classes.push('justify-items-center')
      break
    case 'end':
      classes.push('justify-items-end')
      break
    case 'stretch':
      classes.push('justify-items-stretch')
      break
  }
  
  // Dense packing
  if (props.dense) {
    classes.push('grid-flow-dense')
  }
  
  return classes.join(' ')
})
</script>
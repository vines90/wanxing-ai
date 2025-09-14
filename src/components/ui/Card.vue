<template>
  <component
    :is="tag"
    :class="cardClasses"
    :to="tag === 'router-link' ? to : undefined"
    :href="tag === 'a' ? href : undefined"
    v-bind="$attrs"
  >
    <!-- Card Header -->
    <div v-if="title || subtitle || $slots.header" :class="headerClasses">
      <slot name="header">
        <div v-if="title || subtitle">
          <h3 v-if="title" :class="titleClasses">{{ title }}</h3>
          <p v-if="subtitle" :class="subtitleClasses">{{ subtitle }}</p>
        </div>
      </slot>
      
      <div v-if="$slots.actions" class="ml-auto">
        <slot name="actions" />
      </div>
    </div>
    
    <!-- Card Media -->
    <div v-if="image || $slots.media" :class="mediaClasses">
      <slot name="media">
        <img
          v-if="image"
          :src="image"
          :alt="imageAlt || title"
          class="w-full h-full object-cover"
        />
      </slot>
    </div>
    
    <!-- Card Content -->
    <div v-if="$slots.default" :class="contentClasses">
      <slot />
    </div>
    
    <!-- Card Footer -->
    <div v-if="$slots.footer" :class="footerClasses">
      <slot name="footer" />
    </div>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface CardProps {
  /**
   * Card title
   */
  title?: string
  
  /**
   * Card subtitle
   */
  subtitle?: string
  
  /**
   * Card image URL
   */
  image?: string
  
  /**
   * Image alt text
   */
  imageAlt?: string
  
  /**
   * Card variant
   */
  variant?: 'default' | 'elevated' | 'bordered' | 'outline'
  
  /**
   * Card size
   */
  size?: 'sm' | 'md' | 'lg'
  
  /**
   * Enable hover effects
   */
  hover?: boolean
  
  /**
   * Make card clickable
   */
  clickable?: boolean
  
  /**
   * HTML tag to render
   */
  tag?: 'div' | 'article' | 'section' | 'a' | 'router-link'
  
  /**
   * Router link to prop (when tag is router-link)
   */
  to?: string | object
  
  /**
   * Href attribute (when tag is a)
   */
  href?: string
  
  /**
   * Remove default padding
   */
  noPadding?: boolean
  
  /**
   * Loading state
   */
  loading?: boolean
}

const props = withDefaults(defineProps<CardProps>(), {
  variant: 'default',
  size: 'md',
  hover: false,
  clickable: false,
  tag: 'div',
  noPadding: false,
  loading: false
})

const cardClasses = computed(() => {
  const classes = ['card']
  
  // Variant classes
  switch (props.variant) {
    case 'elevated':
      classes.push('card-elevated')
      break
    case 'bordered':
      classes.push('card-bordered')
      break
    case 'outline':
      classes.push('border-2', 'bg-transparent')
      break
  }
  
  // Size classes
  switch (props.size) {
    case 'sm':
      classes.push('p-4')
      break
    case 'lg':
      classes.push('p-8')
      break
    default:
      if (!props.noPadding) classes.push('p-6')
  }
  
  // Interaction classes
  if (props.hover || props.clickable) {
    classes.push('card-hover')
  }
  
  if (props.clickable) {
    classes.push('cursor-pointer')
  }
  
  // Remove default padding if specified
  if (props.noPadding) {
    classes.push('!p-0')
  }
  
  // Loading state
  if (props.loading) {
    classes.push('animate-pulse')
  }
  
  return classes.join(' ')
})

const headerClasses = computed(() => {
  const classes = ['flex', 'items-start', 'justify-between']
  
  if (!props.noPadding) {
    switch (props.size) {
      case 'sm':
        classes.push('p-4', 'pb-3')
        break
      case 'lg':
        classes.push('p-8', 'pb-6')
        break
      default:
        classes.push('p-6', 'pb-4')
    }
  } else {
    switch (props.size) {
      case 'sm':
        classes.push('p-4')
        break
      case 'lg':
        classes.push('p-8')
        break
      default:
        classes.push('p-6')
    }
  }
  
  return classes.join(' ')
})

const titleClasses = computed(() => {
  const classes = ['font-semibold', 'text-text-primary']
  
  switch (props.size) {
    case 'sm':
      classes.push('text-base')
      break
    case 'lg':
      classes.push('text-2xl')
      break
    default:
      classes.push('text-xl')
  }
  
  return classes.join(' ')
})

const subtitleClasses = computed(() => {
  const classes = ['text-text-muted', 'mt-1']
  
  switch (props.size) {
    case 'sm':
      classes.push('text-xs')
      break
    case 'lg':
      classes.push('text-base')
      break
    default:
      classes.push('text-sm')
  }
  
  return classes.join(' ')
})

const mediaClasses = computed(() => {
  const classes = ['overflow-hidden']
  
  if (props.noPadding) {
    if (props.title || props.subtitle) {
      classes.push('mt-0')
    }
  } else {
    classes.push('-mx-6', 'mb-4')
    if (props.title || props.subtitle) {
      classes.push('-mt-4')
    } else {
      classes.push('-mt-6')
    }
  }
  
  return classes.join(' ')
})

const contentClasses = computed(() => {
  const classes = ['text-text-secondary']
  
  if (!props.noPadding) {
    switch (props.size) {
      case 'sm':
        classes.push('px-4')
        break
      case 'lg':
        classes.push('px-8')
        break
      default:
        classes.push('px-6')
    }
  }
  
  return classes.join(' ')
})

const footerClasses = computed(() => {
  const classes = ['mt-4', 'pt-4', 'border-t', 'border-border']
  
  if (!props.noPadding) {
    switch (props.size) {
      case 'sm':
        classes.push('px-4', 'pb-4')
        break
      case 'lg':
        classes.push('px-8', 'pb-8')
        break
      default:
        classes.push('px-6', 'pb-6')
    }
  }
  
  return classes.join(' ')
})
</script>
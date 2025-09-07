<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="min-h-screen bg-black">
    <!-- Navigation Header -->
    <header class="bg-black border-b border-gray-800">
      <div class="container mx-auto px-4 py-4">
        <nav class="flex items-center justify-between">
          <!-- Logo -->
          <RouterLink
            to="/"
            class="text-2xl font-bold text-white hover:text-primary transition-colors"
          >
            万星<span class="text-primary">AI</span>
          </RouterLink>

          <!-- Navigation Links -->
          <div class="flex space-x-8">
            <RouterLink
              to="/"
              class="text-gray-300 hover:text-white transition-colors"
              :class="{ 'text-primary': $route.path === '/' }"
            >
              首页
            </RouterLink>
            <RouterLink
              to="/about"
              class="text-gray-300 hover:text-white transition-colors"
              :class="{ 'text-primary': $route.path === '/about' }"
            >
              关于我们
            </RouterLink>
          </div>
        </nav>
      </div>
    </header>

    <!-- Main Content -->
    <RouterView />
  </div>
</template>

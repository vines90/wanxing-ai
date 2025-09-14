<template>
  <div class="code-block my-6 rounded-lg overflow-hidden bg-gray-900 border border-gray-700">
    <!-- Header -->
    <div class="code-header bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-gray-700">
      <div class="flex items-center space-x-3">
        <!-- Language badge -->
        <span class="language-badge bg-primary-500 text-white px-2 py-1 rounded text-xs font-medium">
          {{ displayLanguage }}
        </span>
        
        <!-- Filename if provided -->
        <span v-if="content.filename" class="text-gray-300 text-sm">
          {{ content.filename }}
        </span>
      </div>
      
      <div class="flex items-center space-x-2">
        <!-- Line numbers toggle -->
        <button
          v-if="content.showLineNumbers !== false"
          @click="toggleLineNumbers"
          class="text-gray-400 hover:text-gray-200 text-xs px-2 py-1 rounded transition-colors"
          :class="{ 'bg-gray-700': showLineNumbers }"
        >
          {{ showLineNumbers ? '隐藏' : '显示' }}行号
        </button>
        
        <!-- Copy button -->
        <button
          @click="copyCode"
          class="copy-btn text-gray-400 hover:text-gray-200 text-xs px-2 py-1 bg-gray-700 rounded hover:bg-gray-600 transition-colors flex items-center space-x-1"
        >
          <svg v-if="!copied" class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
          </svg>
          <svg v-else class="w-3 h-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <span>{{ copied ? '已复制' : '复制' }}</span>
        </button>
      </div>
    </div>

    <!-- Code content -->
    <div class="code-content relative">
      <pre 
        class="text-sm leading-relaxed p-4 overflow-x-auto"
        :class="{ 'line-numbers': showLineNumbers }"
      ><code 
        :class="`language-${content.language}`"
        v-html="highlightedCode"
      ></code></pre>
      
      <!-- Line numbers overlay -->
      <div 
        v-if="showLineNumbers" 
        class="line-numbers-overlay absolute top-0 left-0 p-4 pointer-events-none select-none text-gray-500 text-sm leading-relaxed"
      >
        <div 
          v-for="lineNumber in lineCount" 
          :key="lineNumber"
          class="line-number"
        >
          {{ lineNumber }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { BlogCodeContent } from '@/types'

interface Props {
  content: BlogCodeContent
}

const props = defineProps<Props>()

// Local state
const copied = ref(false)
const showLineNumbers = ref(props.content.showLineNumbers !== false)

// Language display names
const languageNames: Record<string, string> = {
  javascript: 'JavaScript',
  typescript: 'TypeScript',
  python: 'Python',
  java: 'Java',
  cpp: 'C++',
  c: 'C',
  csharp: 'C#',
  php: 'PHP',
  ruby: 'Ruby',
  go: 'Go',
  rust: 'Rust',
  sql: 'SQL',
  html: 'HTML',
  css: 'CSS',
  scss: 'SCSS',
  sass: 'Sass',
  json: 'JSON',
  xml: 'XML',
  yaml: 'YAML',
  markdown: 'Markdown',
  bash: 'Bash',
  shell: 'Shell',
  powershell: 'PowerShell',
  dockerfile: 'Dockerfile',
  vue: 'Vue',
  react: 'React',
  svelte: 'Svelte',
}

// Computed
const displayLanguage = computed(() => {
  return languageNames[props.content.language] || props.content.language.toUpperCase()
})

const lineCount = computed(() => {
  return props.content.code.split('\n').length
})

const highlightedCode = computed(() => {
  // Basic syntax highlighting (in a real app, use Prism.js or similar)
  let code = escapeHtml(props.content.code)
  
  // Simple highlighting based on language
  switch (props.content.language) {
    case 'javascript':
    case 'typescript':
      code = highlightJavaScript(code)
      break
    case 'python':
      code = highlightPython(code)
      break
    case 'css':
      code = highlightCSS(code)
      break
    case 'html':
      code = highlightHTML(code)
      break
    case 'json':
      code = highlightJSON(code)
      break
    default:
      // Basic highlighting for other languages
      code = basicHighlight(code)
  }
  
  return code
})

// Methods
const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(props.content.code)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy code:', err)
  }
}

const toggleLineNumbers = () => {
  showLineNumbers.value = !showLineNumbers.value
}

const escapeHtml = (text: string): string => {
  const div = document.createElement('div')
  div.textContent = text
  return div.innerHTML
}

const highlightJavaScript = (code: string): string => {
  // Keywords
  code = code.replace(/\b(const|let|var|function|if|else|for|while|do|switch|case|break|continue|return|try|catch|finally|throw|class|extends|import|export|default|async|await|typeof|instanceof)\b/g, '<span class="text-purple-400">$1</span>')
  
  // Strings
  code = code.replace(/(["'`])([^"'`]*?)\1/g, '<span class="text-green-400">$1$2$1</span>')
  
  // Comments
  code = code.replace(/\/\/.*$/gm, '<span class="text-gray-500">$&</span>')
  code = code.replace(/\/\*[\s\S]*?\*\//g, '<span class="text-gray-500">$&</span>')
  
  // Numbers
  code = code.replace(/\b\d+(\.\d+)?\b/g, '<span class="text-yellow-400">$&</span>')
  
  return code
}

const highlightPython = (code: string): string => {
  // Keywords
  code = code.replace(/\b(def|class|if|elif|else|for|while|with|try|except|finally|import|from|as|return|yield|lambda|pass|break|continue|global|nonlocal|True|False|None)\b/g, '<span class="text-purple-400">$1</span>')
  
  // Strings
  code = code.replace(/(["'])([^"']*?)\1/g, '<span class="text-green-400">$1$2$1</span>')
  
  // Comments
  code = code.replace(/#.*$/gm, '<span class="text-gray-500">$&</span>')
  
  // Numbers
  code = code.replace(/\b\d+(\.\d+)?\b/g, '<span class="text-yellow-400">$&</span>')
  
  return code
}

const highlightCSS = (code: string): string => {
  // Properties
  code = code.replace(/([a-z-]+)(\s*:)/g, '<span class="text-blue-400">$1</span>$2')
  
  // Values
  code = code.replace(/:(\s*)([^;{}\n]+)/g, ': <span class="text-green-400">$2</span>')
  
  // Selectors
  code = code.replace(/([.#]?[a-zA-Z][a-zA-Z0-9-]*)\s*{/g, '<span class="text-yellow-400">$1</span> {')
  
  return code
}

const highlightHTML = (code: string): string => {
  // Tags
  code = code.replace(/&lt;(\/?[a-zA-Z][a-zA-Z0-9]*)[^&]*?&gt;/g, (match) => {
    return match.replace(/&lt;(\/?[a-zA-Z][a-zA-Z0-9]*)/g, '&lt;<span class="text-red-400">$1</span>')
  })
  
  // Attributes
  code = code.replace(/([a-zA-Z-]+)=(&quot;[^&]*&quot;)/g, '<span class="text-yellow-400">$1</span>=<span class="text-green-400">$2</span>')
  
  return code
}

const highlightJSON = (code: string): string => {
  // Keys
  code = code.replace(/(&quot;[^&]+&quot;)(\s*:)/g, '<span class="text-blue-400">$1</span>$2')
  
  // String values
  code = code.replace(/:(\s*)(&quot;[^&]*&quot;)/g, ': <span class="text-green-400">$2</span>')
  
  // Numbers, booleans, null
  code = code.replace(/:\s*(true|false|null|\d+(\.\d+)?)/g, ': <span class="text-yellow-400">$1</span>')
  
  return code
}

const basicHighlight = (code: string): string => {
  // Just highlight strings and comments for unknown languages
  code = code.replace(/(["'])([^"']*?)\1/g, '<span class="text-green-400">$1$2$1</span>')
  code = code.replace(/\/\/.*$/gm, '<span class="text-gray-500">$&</span>')
  code = code.replace(/#.*$/gm, '<span class="text-gray-500">$&</span>')
  
  return code
}
</script>

<style scoped>
.line-numbers pre {
  padding-left: 3rem;
}

.line-numbers-overlay {
  width: 3rem;
  text-align: right;
  padding-right: 1rem;
  border-right: 1px solid #374151;
  background: #1f2937;
}

.line-number {
  height: 1.5rem;
  line-height: 1.5rem;
}

/* Custom scrollbar for code blocks */
.code-content pre::-webkit-scrollbar {
  height: 8px;
}

.code-content pre::-webkit-scrollbar-track {
  background: #1f2937;
}

.code-content pre::-webkit-scrollbar-thumb {
  background: #4b5563;
  border-radius: 4px;
}

.code-content pre::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
}
</style>




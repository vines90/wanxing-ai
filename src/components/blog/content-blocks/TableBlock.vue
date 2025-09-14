<template>
  <div class="table-block my-6">
    <!-- Caption -->
    <div v-if="content.caption" class="table-caption text-center text-sm text-text-muted mb-3">
      {{ content.caption }}
    </div>
    
    <!-- Table Container -->
    <div class="table-container bg-background-card rounded-lg border border-border overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <!-- Header -->
          <thead v-if="content.headers.length > 0" class="bg-background-elevated">
            <tr>
              <th
                v-for="(header, index) in content.headers"
                :key="index"
                class="px-4 py-3 text-left text-sm font-semibold text-text-primary border-b border-border"
              >
                {{ header }}
              </th>
            </tr>
          </thead>
          
          <!-- Body -->
          <tbody>
            <tr
              v-for="(row, rowIndex) in content.rows"
              :key="rowIndex"
              class="hover:bg-background-elevated transition-colors"
              :class="{ 'border-b border-border': rowIndex < content.rows.length - 1 }"
            >
              <td
                v-for="(cell, cellIndex) in row"
                :key="cellIndex"
                class="px-4 py-3 text-sm text-text-secondary"
                :class="getCellClass(cellIndex)"
              >
                <!-- Render cell content -->
                <div v-if="isCellEmpty(cell)" class="text-text-muted italic">
                  —
                </div>
                <div v-else-if="isUrl(cell)" class="table-cell-content">
                  <a :href="cell" target="_blank" rel="noopener noreferrer" class="text-primary-400 hover:text-primary-300 underline">
                    {{ formatUrl(cell) }}
                  </a>
                </div>
                <div v-else-if="isNumber(cell)" class="table-cell-content text-right font-mono">
                  {{ formatNumber(cell) }}
                </div>
                <div v-else class="table-cell-content">
                  {{ cell }}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
    <!-- Table Actions -->
    <div class="table-actions mt-3 flex justify-end space-x-2">
      <button
        @click="exportToCsv"
        class="text-xs text-text-muted hover:text-text-primary flex items-center space-x-1 px-2 py-1 rounded hover:bg-background-elevated transition-colors"
      >
        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
        <span>导出CSV</span>
      </button>
      
      <button
        @click="copyTable"
        class="text-xs text-text-muted hover:text-text-primary flex items-center space-x-1 px-2 py-1 rounded hover:bg-background-elevated transition-colors"
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
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { BlogTableContent } from '@/types'

interface Props {
  content: BlogTableContent
}

const props = defineProps<Props>()

// Local state
const copied = ref(false)

// Methods
const getCellClass = (cellIndex: number): string => {
  // Add special styling for specific columns if needed
  return ''
}

const isCellEmpty = (cell: string): boolean => {
  return !cell || cell.trim() === '' || cell.trim() === '-'
}

const isUrl = (cell: string): boolean => {
  try {
    new URL(cell)
    return true
  } catch {
    return false
  }
}

const isNumber = (cell: string): boolean => {
  return !isNaN(Number(cell)) && cell.trim() !== ''
}

const formatUrl = (url: string): string => {
  try {
    const urlObj = new URL(url)
    return urlObj.hostname + (urlObj.pathname !== '/' ? urlObj.pathname : '')
  } catch {
    return url
  }
}

const formatNumber = (value: string): string => {
  const num = Number(value)
  if (Number.isInteger(num)) {
    return num.toLocaleString()
  }
  return num.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })
}

const copyTable = async () => {
  try {
    let text = ''
    
    // Add headers
    if (props.content.headers.length > 0) {
      text += props.content.headers.join('\t') + '\n'
    }
    
    // Add rows
    for (const row of props.content.rows) {
      text += row.join('\t') + '\n'
    }
    
    await navigator.clipboard.writeText(text)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy table:', err)
  }
}

const exportToCsv = () => {
  let csvContent = ''
  
  // Add headers
  if (props.content.headers.length > 0) {
    csvContent += props.content.headers.map(escapeCSV).join(',') + '\n'
  }
  
  // Add rows
  for (const row of props.content.rows) {
    csvContent += row.map(escapeCSV).join(',') + '\n'
  }
  
  // Create download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `table-${Date.now()}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}

const escapeCSV = (cell: string): string => {
  if (cell.includes(',') || cell.includes('"') || cell.includes('\n')) {
    return `"${cell.replace(/"/g, '""')}"`
  }
  return cell
}
</script>

<style scoped>
.table-container {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.table-cell-content {
  word-break: break-word;
  hyphens: auto;
}

/* Custom scrollbar for table */
.table-container .overflow-x-auto::-webkit-scrollbar {
  height: 6px;
}

.table-container .overflow-x-auto::-webkit-scrollbar-track {
  background: #1f2937;
}

.table-container .overflow-x-auto::-webkit-scrollbar-thumb {
  background: #4b5563;
  border-radius: 3px;
}

.table-container .overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
}

/* Responsive table */
@media (max-width: 640px) {
  .table-container table {
    font-size: 0.875rem;
  }
  
  .table-container th,
  .table-container td {
    padding: 0.5rem;
  }
}
</style>




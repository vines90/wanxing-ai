<template>
  <div class="rich-text-editor">
    <!-- Toolbar -->
    <div class="editor-toolbar bg-background-card border border-border rounded-t-lg p-3 flex flex-wrap gap-2">
      <!-- Text Formatting -->
      <div class="toolbar-group">
        <button
          @click="editor?.chain().focus().toggleBold().run()"
          :class="{ 'active': editor?.isActive('bold') }"
          class="toolbar-btn"
          title="粗体"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M3 17h2.5l1.5-4h6l1.5 4H17l-6-16H9L3 17zm3.5-6L8 6.5 9.5 11h-3z"/>
          </svg>
        </button>
        
        <button
          @click="editor?.chain().focus().toggleItalic().run()"
          :class="{ 'active': editor?.isActive('italic') }"
          class="toolbar-btn"
          title="斜体"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4h-8z"/>
          </svg>
        </button>
        
        <button
          @click="editor?.chain().focus().toggleStrike().run()"
          :class="{ 'active': editor?.isActive('strike') }"
          class="toolbar-btn"
          title="删除线"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 10h2v6h-2v-6zm0-8h2v6h-2V2z"/>
          </svg>
        </button>
        
        <button
          @click="editor?.chain().focus().toggleHighlight().run()"
          :class="{ 'active': editor?.isActive('highlight') }"
          class="toolbar-btn"
          title="高亮"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.854 6.75a.25.25 0 00-.177-.427L8.75 4.75a.25.25 0 00-.177.073L2.427 10.969a.25.25 0 000 .354l6.146 6.146a.25.25 0 00.354 0l6.146-6.146a.25.25 0 00.073-.177l1.573-8.927a.25.25 0 00-.073-.25z"/>
          </svg>
        </button>
      </div>

      <div class="toolbar-divider"></div>

      <!-- Headings -->
      <div class="toolbar-group">
        <button
          @click="editor?.chain().focus().toggleHeading({ level: 1 }).run()"
          :class="{ 'active': editor?.isActive('heading', { level: 1 }) }"
          class="toolbar-btn"
          title="标题1"
        >
          H1
        </button>
        
        <button
          @click="editor?.chain().focus().toggleHeading({ level: 2 }).run()"
          :class="{ 'active': editor?.isActive('heading', { level: 2 }) }"
          class="toolbar-btn"
          title="标题2"
        >
          H2
        </button>
        
        <button
          @click="editor?.chain().focus().toggleHeading({ level: 3 }).run()"
          :class="{ 'active': editor?.isActive('heading', { level: 3 }) }"
          class="toolbar-btn"
          title="标题3"
        >
          H3
        </button>
      </div>

      <div class="toolbar-divider"></div>

      <!-- Lists -->
      <div class="toolbar-group">
        <button
          @click="editor?.chain().focus().toggleBulletList().run()"
          :class="{ 'active': editor?.isActive('bulletList') }"
          class="toolbar-btn"
          title="无序列表"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M4 6a2 2 0 100-4 2 2 0 000 4zM6 8H2v2h4V8zM6 12H2v2h4v-2zM6 16H2v2h4v-2zM10 8h8v2h-8V8zM10 12h8v2h-8v-2zM10 16h8v2h-8v-2zM10 4h8v2h-8V4z"/>
          </svg>
        </button>
        
        <button
          @click="editor?.chain().focus().toggleOrderedList().run()"
          :class="{ 'active': editor?.isActive('orderedList') }"
          class="toolbar-btn"
          title="有序列表"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 4h2v2H2V4zM2 8h2v2H2V8zM2 12h2v2H2v-2zM2 16h2v2H2v-2zM6 4h12v2H6V4zM6 8h12v2H6V8zM6 12h12v2H6v-2zM6 16h12v2H6v-2z"/>
          </svg>
        </button>
      </div>

      <div class="toolbar-divider"></div>

      <!-- Alignment -->
      <div class="toolbar-group">
        <button
          @click="editor?.chain().focus().setTextAlign('left').run()"
          :class="{ 'active': editor?.isActive({ textAlign: 'left' }) }"
          class="toolbar-btn"
          title="左对齐"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M3 4h14v2H3V4zM3 8h8v2H3V8zM3 12h14v2H3v-2zM3 16h8v2H3v-2z"/>
          </svg>
        </button>
        
        <button
          @click="editor?.chain().focus().setTextAlign('center').run()"
          :class="{ 'active': editor?.isActive({ textAlign: 'center' }) }"
          class="toolbar-btn"
          title="居中对齐"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M3 4h14v2H3V4zM5 8h10v2H5V8zM3 12h14v2H3v-2zM5 16h10v2H5v-2z"/>
          </svg>
        </button>
        
        <button
          @click="editor?.chain().focus().setTextAlign('right').run()"
          :class="{ 'active': editor?.isActive({ textAlign: 'right' }) }"
          class="toolbar-btn"
          title="右对齐"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M3 4h14v2H3V4zM9 8h8v2H9V8zM3 12h14v2H3v-2zM9 16h8v2H9v-2z"/>
          </svg>
        </button>
      </div>

      <div class="toolbar-divider"></div>

      <!-- Media & Special -->
      <div class="toolbar-group">
        <button
          @click="openImageDialog"
          class="toolbar-btn"
          title="插入图片"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"/>
          </svg>
        </button>
        
        <button
          @click="editor?.chain().focus().toggleCodeBlock().run()"
          :class="{ 'active': editor?.isActive('codeBlock') }"
          class="toolbar-btn"
          title="代码块"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265L11.5 8l1.449 3.684a1 1 0 11-1.898.632L9.683 8l1.368-4.316a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L4.414 9l1.293 1.293a1 1 0 11-1.414 1.414L2.586 10a2 2 0 010-2.828l1.707-1.707a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l1.707 1.707a2 2 0 010 2.828L15.707 12.707a1 1 0 11-1.414-1.414L15.586 10l-1.293-1.293a1 1 0 010-1.414z" clip-rule="evenodd"/>
          </svg>
        </button>
        
        <button
          @click="editor?.chain().focus().toggleBlockquote().run()"
          :class="{ 'active': editor?.isActive('blockquote') }"
          class="toolbar-btn"
          title="引用"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M2.5 3A1.5 1.5 0 001 4.5v.5c0 .828.5 1.5 1.125 1.5S3.25 5.828 3.25 5v-.5c0-.138.112-.25.25-.25h1v3.75A2.25 2.25 0 012.25 10.5H2a1 1 0 000 2h.25A4.25 4.25 0 006.5 8.25V4.5A1.5 1.5 0 005 3H2.5zM12.5 3A1.5 1.5 0 0011 4.5v.5c0 .828.5 1.5 1.125 1.5s1.125-.672 1.125-1.5v-.5c0-.138.112-.25.25-.25h1v3.75a2.25 2.25 0 01-2.25 2.25H12a1 1 0 000 2h.25a4.25 4.25 0 004.25-4.25V4.5A1.5 1.5 0 0015 3h-2.5z" clip-rule="evenodd"/>
          </svg>
        </button>
        
        <button
          @click="insertTable"
          class="toolbar-btn"
          title="插入表格"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 1v2h2V5H5zm4 0v2h2V5H9zm4 0v2h2V5h-2zM5 9v2h2V9H5zm4 0v2h2V9H9zm4 0v2h2V9h-2zM5 13v2h2v-2H5zm4 0v2h2v-2H9zm4 0v2h2v-2h-2z" clip-rule="evenodd"/>
          </svg>
        </button>
      </div>

      <div class="toolbar-divider"></div>

      <!-- Actions -->
      <div class="toolbar-group">
        <button
          @click="editor?.chain().focus().undo().run()"
          :disabled="!editor?.can().undo()"
          class="toolbar-btn"
          title="撤销"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 110 14H8a1 1 0 110-2h3a5 5 0 100-10H5.414l2.293 2.293a1 1 0 11-1.414 1.414L2.586 9a2 2 0 010-2.828l3.707-3.707a1 1 0 011.414 0z" clip-rule="evenodd"/>
          </svg>
        </button>
        
        <button
          @click="editor?.chain().focus().redo().run()"
          :disabled="!editor?.can().redo()"
          class="toolbar-btn"
          title="重做"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M12.293 3.293a1 1 0 011.414 0l3.707 3.707a2 2 0 010 2.828l-3.707 3.707a1 1 0 01-1.414-1.414L14.586 9H9a5 5 0 100 10h3a1 1 0 110 2H9A7 7 0 119 7h5.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Editor Content -->
    <div class="editor-content border border-t-0 border-border rounded-b-lg min-h-[400px] bg-background">
      <editor-content :editor="editor" class="prose prose-invert max-w-none p-6" />
    </div>

    <!-- Image Upload Modal -->
    <ImageUploadModal
      v-if="showImageModal"
      @close="showImageModal = false"
      @image-selected="insertImage"
    />

    <!-- Word Count -->
    <div class="editor-footer flex justify-between items-center mt-2 text-sm text-text-muted">
      <div>
        字数: {{ editor?.storage.characterCount.characters() || 0 }}
        | 单词: {{ editor?.storage.characterCount.words() || 0 }}
      </div>
      <div>
        预计阅读时间: {{ estimatedReadTime }} 分钟
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import { Image } from '@tiptap/extension-image'
import { Link } from '@tiptap/extension-link'
import { Table } from '@tiptap/extension-table'
import { TableRow } from '@tiptap/extension-table-row'
import { TableHeader } from '@tiptap/extension-table-header'
import { TableCell } from '@tiptap/extension-table-cell'
import { Highlight } from '@tiptap/extension-highlight'
import { TextAlign } from '@tiptap/extension-text-align'
import { CharacterCount } from '@tiptap/extension-character-count'
import ImageUploadModal from './ImageUploadModal.vue'

interface Props {
  modelValue: string
  placeholder?: string
  readonly?: boolean
}

interface Emits {
  'update:modelValue': [value: string]
  'content-change': [content: string]
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '开始写作...',
  readonly: false
})

const emit = defineEmits<Emits>()

// Local state
const editor = ref<Editor>()
const showImageModal = ref(false)

// Computed
const estimatedReadTime = computed(() => {
  const words = editor.value?.storage.characterCount.words() || 0
  return Math.ceil(words / 200) // 假设每分钟读200字
})

// Initialize editor
onMounted(() => {
  editor.value = new Editor({
    content: props.modelValue,
    editable: !props.readonly,
    extensions: [
      StarterKit,
      Image.configure({
        inline: true,
        allowBase64: true,
        HTMLAttributes: {
          class: 'editor-image',
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'editor-link',
        },
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Highlight.configure({
        multicolor: true,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      CharacterCount,
    ],
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      emit('update:modelValue', html)
      emit('content-change', html)
    },
    editorProps: {
      attributes: {
        class: 'prose prose-invert focus:outline-none',
        placeholder: props.placeholder,
      },
    },
  })
})

// Watch for external content changes
watch(() => props.modelValue, (newValue) => {
  if (editor.value && editor.value.getHTML() !== newValue) {
    editor.value.commands.setContent(newValue)
  }
})

// Watch for readonly changes
watch(() => props.readonly, (readonly) => {
  if (editor.value) {
    editor.value.setEditable(!readonly)
  }
})

// Cleanup
onBeforeUnmount(() => {
  if (editor.value) {
    editor.value.destroy()
  }
})

// Methods
const openImageDialog = () => {
  showImageModal.value = true
}

const insertImage = (imageData: { src: string; alt: string; caption?: string }) => {
  if (editor.value) {
    editor.value.chain().focus().setImage({
      src: imageData.src,
      alt: imageData.alt,
      title: imageData.caption,
    }).run()
  }
  showImageModal.value = false
}

const insertTable = () => {
  if (editor.value) {
    editor.value.chain().focus().insertTable({
      rows: 3,
      cols: 3,
      withHeaderRow: true,
    }).run()
  }
}
</script>

<style scoped>
.toolbar-group {
  @apply flex gap-1;
}

.toolbar-btn {
  @apply px-2 py-1 rounded bg-transparent text-text-secondary hover:bg-background-elevated hover:text-text-primary transition-colors;
}

.toolbar-btn.active {
  @apply bg-primary-500 text-white;
}

.toolbar-btn:disabled {
  @apply opacity-50 cursor-not-allowed;
}

.toolbar-divider {
  @apply w-px bg-border my-1;
}

/* Editor content styles */
:deep(.ProseMirror) {
  outline: none;
  min-height: 350px;
  padding: 1rem;
}

:deep(.ProseMirror p) {
  margin: 0.5rem 0;
  color: #e5e5e5;
}

:deep(.ProseMirror h1) {
  font-size: 2rem;
  font-weight: bold;
  color: #ffffff;
  margin: 1.5rem 0 1rem 0;
}

:deep(.ProseMirror h2) {
  font-size: 1.5rem;
  font-weight: bold;
  color: #ffffff;
  margin: 1.25rem 0 0.75rem 0;
}

:deep(.ProseMirror h3) {
  font-size: 1.25rem;
  font-weight: bold;
  color: #ffffff;
  margin: 1rem 0 0.5rem 0;
}

:deep(.ProseMirror ul, .ProseMirror ol) {
  padding-left: 1.5rem;
  margin: 0.5rem 0;
}

:deep(.ProseMirror li) {
  margin: 0.25rem 0;
  color: #e5e5e5;
}

:deep(.ProseMirror blockquote) {
  border-left: 4px solid #e31937;
  padding-left: 1rem;
  margin: 1rem 0;
  font-style: italic;
  color: #d1d5db;
}

:deep(.ProseMirror pre) {
  background: #1f2937;
  border: 1px solid #374151;
  border-radius: 0.5rem;
  padding: 1rem;
  margin: 1rem 0;
  overflow-x: auto;
}

:deep(.ProseMirror code) {
  background: #1f2937;
  color: #fbbf24;
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
}

:deep(.ProseMirror table) {
  border-collapse: collapse;
  width: 100%;
  margin: 1rem 0;
}

:deep(.ProseMirror th, .ProseMirror td) {
  border: 1px solid #374151;
  padding: 0.5rem;
  text-align: left;
}

:deep(.ProseMirror th) {
  background: #1f2937;
  font-weight: bold;
  color: #ffffff;
}

:deep(.ProseMirror td) {
  color: #e5e5e5;
}

:deep(.ProseMirror .editor-image) {
  max-width: 100%;
  height: auto;
  border-radius: 0.5rem;
  margin: 1rem 0;
}

:deep(.ProseMirror .editor-link) {
  color: #3b82f6;
  text-decoration: underline;
}

:deep(.ProseMirror mark) {
  background: #fbbf24;
  color: #000;
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;
}
</style>




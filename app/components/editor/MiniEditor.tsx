'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import CharacterCount from '@tiptap/extension-character-count'
import { Mark, mergeAttributes } from '@tiptap/core'

// Custom Mark for Dotted Underline
const DottedUnderline = Mark.create({
  name: 'dottedUnderline',
  parseHTML() {
    return [{ tag: 'span[data-dotted]' }]
  },
  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes(HTMLAttributes, { 'data-dotted': 'true', class: 'underline decoration-dotted decoration-2 underline-offset-[8px] decoration-neutral-300' }), 0]
  },
})

// Custom Mark for Black Text
const BlackText = Mark.create({
  name: 'blackText',
  parseHTML() {
    return [{ tag: 'span[data-black]' }]
  },
  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes(HTMLAttributes, { 'data-black': 'true', class: 'text-neutral-900' }), 0]
  },
})


interface MiniEditorProps {
  value: string
  onChange: (value: string) => void
  maxLength: number
  className?: string
}

export default function MiniEditor({ value, onChange, maxLength, className = '' }: MiniEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bold: false,
        italic: false,
      }),
      BlackText,
      DottedUnderline,
      CharacterCount.configure({
        limit: maxLength,
      }),
    ],
    content: value,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: `outline-none w-full ${className}`,
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  if (!editor) return null

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1 mb-1 bg-neutral-50 p-1 rounded-lg border border-neutral-100 self-start">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleMark('blackText').run()}
          className={`px-2 py-1 rounded text-sm transition-colors font-medium flex items-center gap-1 ${
            editor.isActive('blackText') ? 'bg-white shadow-sm text-neutral-900' : 'text-neutral-500 hover:bg-white hover:text-neutral-800'
          }`}
          title="Make Text Black"
        >
          <div className="w-3 h-3 rounded-full bg-neutral-900"></div> Black
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleMark('dottedUnderline').run()}
          className={`px-2 py-1 rounded text-sm transition-colors underline decoration-dotted underline-offset-4 ${
            editor.isActive('dottedUnderline') ? 'bg-white shadow-sm text-neutral-900' : 'text-neutral-500 hover:bg-white hover:text-neutral-800'
          }`}
          title="Dotted Underline"
        >
          U
        </button>
      </div>

      <EditorContent editor={editor} className="border border-neutral-200 rounded-lg p-3 min-h-[80px] focus-within:border-neutral-400 bg-white" />
    </div>
  )
}

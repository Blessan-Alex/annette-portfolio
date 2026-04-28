'use client'

import { useState, useCallback } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Link from '@tiptap/extension-link'
import imageCompression from 'browser-image-compression'
import { createClient } from '@/utils/supabase/client'
import { Highlight } from './extensions/Highlight'
import { Marginalia } from './extensions/Marginalia'
import { TypewriterBlock, DividerBlock, DoodleEndBlock } from './extensions/Blocks'
import { ResizableImage } from './extensions/ResizableImage'

interface EditorProps {
  initialContent?: string
  onChange?: (content: string) => void
}

const HIGHLIGHT_COLORS = [
  { color: '#FADBD8', label: 'Rose' },
  { color: '#FCF3CF', label: 'Yellow' },
  { color: '#E8F8F5', label: 'Mint' },
  { color: '#F5EEF8', label: 'Lavender' },
]

function Divider() {
  return <div className="w-[1px] h-5 bg-neutral-200 mx-0.5 shrink-0" />
}

function ToolBtn({
  active,
  onClick,
  title,
  children,
  className = '',
}: {
  active?: boolean
  onClick: () => void
  title: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`px-2.5 py-1.5 rounded-lg text-sm transition-colors shrink-0 ${
        active
          ? 'bg-neutral-800 text-white'
          : 'text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800'
      } ${className}`}
    >
      {children}
    </button>
  )
}

export default function Editor({ initialContent, onChange }: EditorProps) {
  const [toolbarVisible, setToolbarVisible] = useState(true)
  const [blocksOpen, setBlocksOpen] = useState(false)
  const [linkUrl, setLinkUrl] = useState('')
  const [showLinkInput, setShowLinkInput] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        blockquote: {
          HTMLAttributes: { class: 'editor-blockquote' },
        },
        code: {
          HTMLAttributes: { class: 'editor-code' },
        },
        codeBlock: {
          HTMLAttributes: { class: 'editor-code-block' },
        },
      }),
      Placeholder.configure({ placeholder: 'Write something beautiful...' }),
      ResizableImage,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: 'text-neutral-700 underline underline-offset-4 decoration-neutral-400 hover:decoration-neutral-700 transition-colors' },
      }),
      Highlight,
      Marginalia,
      TypewriterBlock,
      DividerBlock,
      DoodleEndBlock,
    ],
    content: initialContent || '',
    immediatelyRender: false,
    editorProps: {
      attributes: { class: 'focus:outline-none max-w-[65ch] w-full min-h-[600px]' },
    },
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML())
    },
  })

  const handleImageUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !editor) return
    try {
      const compressed = await imageCompression(file, { maxSizeMB: 5, maxWidthOrHeight: 1920, useWebWorker: true })
      const supabase = createClient()
      const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`
      const { error } = await supabase.storage.from('media').upload(fileName, compressed)
      if (error) throw error
      const { data } = supabase.storage.from('media').getPublicUrl(fileName)
      editor.chain().focus().setImage({ src: data.publicUrl }).run()
    } catch (err) {
      console.error('Upload failed:', err)
      alert('Upload failed. Check your Supabase media bucket is public and has upload policies.')
    }
    e.target.value = ''
  }, [editor])

  const handleSetLink = useCallback(() => {
    if (!linkUrl) {
      editor?.chain().focus().unsetLink().run()
    } else {
      editor?.chain().focus().setLink({ href: linkUrl }).run()
    }
    setShowLinkInput(false)
    setLinkUrl('')
  }, [editor, linkUrl])

  const wordCount = editor
    ? editor.state.doc.textContent.trim().split(/\s+/).filter(Boolean).length
    : 0
  const readTime = Math.max(1, Math.round(wordCount / 200))

  if (!editor) return null

  return (
    <div className="w-full flex flex-col relative">
      {/* Editor content */}
      <div className="flex justify-center pb-48">
        <EditorContent editor={editor} className="w-full flex justify-center" />
      </div>

      {/* Floating Toolbar */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2">

        {/* Blocks panel (above toolbar, slides in) */}
        {blocksOpen && (
          <div className="bg-white/95 backdrop-blur-xl border border-neutral-200 rounded-2xl shadow-xl px-3 py-2.5 flex flex-wrap gap-1 max-w-sm">
            <span className="w-full text-[10px] text-neutral-400 uppercase tracking-widest mb-1 px-1">Blocks</span>
            <ToolBtn title="Marginalia (right)" onClick={() => { editor.chain().focus().insertContent('<div data-type="marginalia" side="right">Add note...</div>').run(); setBlocksOpen(false) }}>
              ↳ Right note
            </ToolBtn>
            <ToolBtn title="Marginalia (left)" onClick={() => { editor.chain().focus().insertContent('<div data-type="marginalia" side="left">Add note...</div>').run(); setBlocksOpen(false) }}>
              ↲ Left note
            </ToolBtn>
            <ToolBtn title="Typewriter block" onClick={() => { editor.chain().focus().insertContent('<div data-type="typewriter">Poem or verse...</div>').run(); setBlocksOpen(false) }}>
              ✦ Typewriter
            </ToolBtn>
            <ToolBtn title="Divider" onClick={() => { editor.chain().focus().insertContent('<hr data-type="divider">').run(); setBlocksOpen(false) }}>
              — Divider
            </ToolBtn>
            <ToolBtn title="End icon" onClick={() => { editor.chain().focus().insertContent('<div data-type="doodle-end"></div>').run(); setBlocksOpen(false) }}>
              ◎ End icon
            </ToolBtn>
          </div>
        )}

        {/* Link input */}
        {showLinkInput && (
          <div className="bg-white/95 backdrop-blur-xl border border-neutral-200 rounded-2xl shadow-xl px-3 py-2.5 flex gap-2 w-72">
            <input
              type="url"
              value={linkUrl}
              onChange={e => setLinkUrl(e.target.value)}
              placeholder="https://..."
              className="flex-1 text-sm border border-neutral-200 rounded-lg px-2 py-1 outline-none focus:border-neutral-400"
              onKeyDown={e => e.key === 'Enter' && handleSetLink()}
              autoFocus
            />
            <button type="button" onClick={handleSetLink} className="px-3 py-1 bg-neutral-900 text-white text-sm rounded-lg">Set</button>
            <button type="button" onClick={() => setShowLinkInput(false)} className="px-2 py-1 text-neutral-400 hover:text-neutral-700">✕</button>
          </div>
        )}

        {/* Main floating toolbar */}
        {toolbarVisible && (
          <div className="bg-white/95 backdrop-blur-xl border border-neutral-200 rounded-2xl shadow-xl px-3 py-2 flex items-center gap-1 flex-wrap max-w-[90vw]">

            {/* Text style */}
            <ToolBtn active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()} title="Bold">
              <strong>B</strong>
            </ToolBtn>
            <ToolBtn active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()} title="Italic">
              <em>I</em>
            </ToolBtn>
            <ToolBtn active={editor.isActive('strike')} onClick={() => editor.chain().focus().toggleStrike().run()} title="Strikethrough">
              <s>S</s>
            </ToolBtn>

            <Divider />

            {/* Structure */}
            <ToolBtn active={editor.isActive('heading', { level: 1 })} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} title="Heading 1">
              H1
            </ToolBtn>
            <ToolBtn active={editor.isActive('heading', { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} title="Heading 2">
              H2
            </ToolBtn>
            <ToolBtn active={editor.isActive('blockquote')} onClick={() => editor.chain().focus().toggleBlockquote().run()} title="Block Quote">
              "
            </ToolBtn>
            <ToolBtn active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()} title="Bullet list">
              •
            </ToolBtn>
            <ToolBtn active={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()} title="Numbered list">
              1.
            </ToolBtn>
            <ToolBtn active={editor.isActive('code')} onClick={() => editor.chain().focus().toggleCode().run()} title="Inline code">
              {'<>'}
            </ToolBtn>

            <Divider />

            {/* Link */}
            <ToolBtn
              active={editor.isActive('link')}
              onClick={() => { setShowLinkInput(v => !v); setBlocksOpen(false) }}
              title="Insert link"
            >
              🔗
            </ToolBtn>

            <Divider />

            {/* Highlight colors */}
            {HIGHLIGHT_COLORS.map(({ color, label }) => (
              <button
                key={color}
                type="button"
                title={`Highlight: ${label}`}
                onClick={() => editor.chain().focus().toggleMark('highlight', { color }).run()}
                className="w-5 h-5 rounded-full border border-neutral-300 hover:scale-125 transition-transform shrink-0"
                style={{ backgroundColor: color }}
              />
            ))}

            <Divider />

            {/* Blocks toggle */}
            <ToolBtn
              active={blocksOpen}
              onClick={() => { setBlocksOpen(v => !v); setShowLinkInput(false) }}
              title="Insert special block"
            >
              ⊕
            </ToolBtn>

            {/* Image upload */}
            <label className="px-2.5 py-1.5 rounded-lg text-sm text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800 transition-colors cursor-pointer shrink-0" title="Upload image">
              📷
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </label>

            <Divider />

            {/* Word count */}
            <span className="text-[11px] text-neutral-400 font-sans whitespace-nowrap px-1">
              {wordCount}w · {readTime}m
            </span>

            {/* Hide button */}
            <button
              type="button"
              onClick={() => setToolbarVisible(false)}
              title="Hide toolbar"
              className="text-neutral-300 hover:text-neutral-500 transition-colors ml-1 text-xs"
            >
              ✕
            </button>
          </div>
        )}

        {/* Re-show button when hidden */}
        {!toolbarVisible && (
          <button
            type="button"
            onClick={() => setToolbarVisible(true)}
            className="bg-white/90 backdrop-blur-xl border border-neutral-200 rounded-full shadow-lg px-4 py-2 text-xs text-neutral-500 hover:text-neutral-800 transition-colors"
          >
            ✦ Show toolbar
          </button>
        )}
      </div>
    </div>
  )
}

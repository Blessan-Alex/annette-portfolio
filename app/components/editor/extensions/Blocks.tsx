import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer, NodeViewWrapper, NodeViewContent } from '@tiptap/react'

// 1. Typewriter Block
function TypewriterComponent() {
  return (
    <NodeViewWrapper className="text-center font-mono text-[14px] text-neutral-400 leading-loose py-8 bg-neutral-50/50 rounded-xl my-8 px-4" as="div">
      <NodeViewContent />
    </NodeViewWrapper>
  )
}

export const TypewriterBlock = Node.create({
  name: 'typewriterBlock',
  group: 'block',
  content: 'inline*',

  parseHTML() {
    return [{ tag: 'div[data-type="typewriter"]' }]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'typewriter' }), 0]
  },

  addNodeView() {
    return ReactNodeViewRenderer(TypewriterComponent)
  },
})

// 2. Divider
function DividerComponent() {
  return (
    <NodeViewWrapper as="div" className="relative group">
      <div className="w-full h-[1px] border-t border-dotted border-neutral-300 my-16"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white px-2 text-xs text-neutral-400 font-sans tracking-widest uppercase pointer-events-none">Divider</div>
    </NodeViewWrapper>
  )
}

export const DividerBlock = Node.create({
  name: 'dividerBlock',
  group: 'block',
  atom: true, // doesn't contain content

  parseHTML() {
    return [{ tag: 'hr[data-type="divider"]' }]
  },

  renderHTML({ HTMLAttributes }) {
    return ['hr', mergeAttributes(HTMLAttributes, { 'data-type': 'divider' })]
  },

  addNodeView() {
    return ReactNodeViewRenderer(DividerComponent)
  },
})

// 3. Doodle End
function DoodleEndComponent() {
  return (
    <NodeViewWrapper as="div" className="relative group">
      <div className="pt-32 pb-16 flex justify-center opacity-30">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
          <path d="M12 18a6 6 0 100-12 6 6 0 000 12z"/>
          <path d="M12 14a2 2 0 100-4 2 2 0 000 4z"/>
        </svg>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white px-2 text-xs text-neutral-400 font-sans tracking-widest uppercase pointer-events-none mt-12">Article End</div>
    </NodeViewWrapper>
  )
}

export const DoodleEndBlock = Node.create({
  name: 'doodleEndBlock',
  group: 'block',
  atom: true,

  parseHTML() {
    return [{ tag: 'div[data-type="doodle-end"]' }]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'doodle-end' })]
  },

  addNodeView() {
    return ReactNodeViewRenderer(DoodleEndComponent)
  },
})

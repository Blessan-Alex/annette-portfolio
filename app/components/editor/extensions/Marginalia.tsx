import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer, NodeViewWrapper, NodeViewContent } from '@tiptap/react'

function MarginaliaComponent({ node }: any) {
  const isRight = node.attrs.side === 'right'

  if (isRight) {
    return (
      <NodeViewWrapper className="relative inline-block w-full" as="div">
        <div contentEditable={false} className="opacity-0 w-0 h-0 absolute overflow-hidden">Marginalia:</div>
        <span className="hidden md:block absolute top-0 -right-[280px] w-56 font-mono text-[13px] text-neutral-400 leading-relaxed cursor-text">
          <NodeViewContent />
        </span>
        <span className="block md:hidden mt-4 pl-4 border-l border-[#FADBD8] font-mono text-[13px] text-neutral-400 cursor-text">
          <NodeViewContent />
        </span>
      </NodeViewWrapper>
    )
  }

  return (
    <NodeViewWrapper className="relative inline-block w-full" as="div">
      <div contentEditable={false} className="opacity-0 w-0 h-0 absolute overflow-hidden">Marginalia:</div>
      <span className="hidden md:block absolute top-2 -left-[280px] w-56 font-mono text-[13px] text-[#D4A373] text-right leading-relaxed cursor-text">
        <NodeViewContent />
      </span>
      <span className="block md:hidden mt-4 pr-4 border-r border-[#D4A373] font-mono text-[13px] text-[#D4A373] text-right cursor-text">
        <NodeViewContent />
      </span>
    </NodeViewWrapper>
  )
}

export const Marginalia = Node.create({
  name: 'marginalia',
  group: 'block',
  content: 'inline*',

  addAttributes() {
    return {
      side: {
        default: 'right',
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="marginalia"]',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'marginalia' }), 0]
  },

  addNodeView() {
    return ReactNodeViewRenderer(MarginaliaComponent)
  },
})

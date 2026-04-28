'use client'

import { NodeViewWrapper } from '@tiptap/react'
import { useRef, useCallback } from 'react'

export function ResizableImageView({ node, updateAttributes, deleteNode }: any) {
  const containerRef = useRef<HTMLDivElement>(null)

  const startResize = useCallback((direction: 'se' | 'sw') => (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const startX = e.clientX
    const startWidth = containerRef.current?.offsetWidth || 400

    const onMouseMove = (e: MouseEvent) => {
      const delta = e.clientX - startX
      const newWidth = Math.max(80, direction === 'se'
        ? startWidth + delta
        : startWidth - delta)
      updateAttributes({ width: Math.round(newWidth) })
    }

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
  }, [updateAttributes])

  const width = node.attrs.width

  return (
    <NodeViewWrapper>
      <div
        ref={containerRef}
        className="relative inline-block group my-8"
        style={{ width: width ? `${width}px` : 'auto', maxWidth: '100%' }}
        contentEditable={false}
      >
        <img
          src={node.attrs.src}
          alt={node.attrs.alt || ''}
          className="rounded-lg shadow-sm w-full block"
          draggable={false}
        />

        {/* Drag handle — bottom-right */}
        <div
          onMouseDown={startResize('se')}
          className="absolute bottom-2 right-2 w-4 h-4 rounded-full bg-white border-2 border-neutral-400 shadow cursor-se-resize opacity-0 group-hover:opacity-100 transition-opacity z-10"
          title="Drag to resize"
        />

        {/* Drag handle — bottom-left */}
        <div
          onMouseDown={startResize('sw')}
          className="absolute bottom-2 left-2 w-4 h-4 rounded-full bg-white border-2 border-neutral-400 shadow cursor-sw-resize opacity-0 group-hover:opacity-100 transition-opacity z-10"
          title="Drag to resize"
        />

        {/* Top actions (Badge & Delete) */}
        <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {width && (
            <div className="px-1.5 py-0.5 bg-black/50 text-white text-[10px] font-mono rounded">
              {width}px
            </div>
          )}
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); deleteNode(); }}
            className="w-6 h-6 flex items-center justify-center bg-black/50 hover:bg-red-500 text-white text-[14px] rounded transition-colors"
            title="Delete image"
          >
            <span className="material-symbols-outlined text-[14px]">delete</span>
          </button>
        </div>
      </div>
    </NodeViewWrapper>
  )
}

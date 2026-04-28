'use client'

import { useState } from 'react'
import { deleteContent } from '../actions'

export function DeleteButton({ id, title }: { id: string, title: string }) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (confirm(`Are you sure you want to completely delete "${title}"? This cannot be undone.`)) {
      setIsDeleting(true)
      try {
        await deleteContent(id)
      } catch (err) {
        console.error(err)
        alert('Failed to delete. Please try again.')
        setIsDeleting(false)
      }
    }
  }

  return (
    <button 
      onClick={handleDelete}
      disabled={isDeleting}
      className="text-red-500 hover:text-red-700 transition-colors p-2 disabled:opacity-50"
      title="Delete"
    >
      <span className="material-symbols-outlined text-[18px]">
        {isDeleting ? 'hourglass_empty' : 'delete'}
      </span>
    </button>
  )
}

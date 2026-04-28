'use client'

import { useEffect, useState } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const [note, setNote] = useState('')

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  const handleReport = () => {
    const errorDetails = `Error: ${error.message}\nDigest: ${error.digest || 'N/A'}\nStack: ${error.stack}`
    const message = `*Issue Report:*\n${note ? `User Note: ${note}\n\n` : ''}*Error Details (Hidden from user):*\n${errorDetails}`
    
    // URL encode the message for WhatsApp
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/9188563150?text=${encodedMessage}`, '_blank')
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-surface-bright p-6">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl border border-neutral-200 shadow-xl text-center">
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="material-symbols-outlined text-red-500 text-[32px]">warning</span>
        </div>
        
        <h2 className="font-serif text-[32px] text-neutral-900 mb-2 leading-tight">Oops! Something went wrong.</h2>
        <p className="font-sans text-neutral-500 text-sm mb-8">
          We encountered an unexpected error. You can try again, or report this directly to the developer to get it fixed!
        </p>

        <div className="text-left mb-6">
          <label className="block font-sans text-xs font-semibold text-neutral-600 mb-2 uppercase tracking-wide">
            Add a note (optional)
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="What were you trying to do?"
            className="w-full font-sans text-sm p-3 rounded-xl border border-neutral-200 outline-none focus:border-neutral-400 bg-neutral-50 resize-none h-24 transition-colors"
          />
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={handleReport}
            className="w-full py-3 bg-[#25D366] hover:bg-[#1ebd5a] text-white font-sans text-sm font-medium rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            Report to Developer <span className="material-symbols-outlined text-[18px]">send</span>
          </button>
          
          <button
            onClick={() => reset()}
            className="w-full py-3 bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50 font-sans text-sm font-medium rounded-xl transition-colors"
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  )
}

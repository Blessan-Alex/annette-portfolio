'use client'

import { useState, useRef } from 'react'
import Editor from '@/app/components/editor/Editor'
import { saveArticle } from './actions'
import imageCompression from 'browser-image-compression'
import { createClient } from '@/utils/supabase/client'

export default function NewArticlePage() {
  const [content, setContent] = useState('')
  const [thumbnailUrl, setThumbnailUrl] = useState('')
  const [thumbnailPreview, setThumbnailPreview] = useState('')
  const [uploading, setUploading] = useState(false)

  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const compressed = await imageCompression(file, { maxSizeMB: 2, maxWidthOrHeight: 1200, useWebWorker: true })
      const supabase = createClient()
      const fileName = `thumb-${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`
      const { error } = await supabase.storage.from('media').upload(fileName, compressed)
      if (error) throw error
      const { data } = supabase.storage.from('media').getPublicUrl(fileName)
      setThumbnailUrl(data.publicUrl)
      setThumbnailPreview(data.publicUrl)
    } catch (err) {
      console.error('Thumbnail upload failed:', err)
      alert('Thumbnail upload failed.')
    }
    setUploading(false)
    e.target.value = ''
  }

  return (
    <div className="w-full flex flex-col gap-8 max-w-4xl mx-auto pb-48">
      <header>
        <h1 className="font-serif text-3xl md:text-[42px] text-on-surface">New File</h1>
        <p className="font-sans text-neutral-500 text-sm">Drafting a new entry...</p>
      </header>

      <form action={saveArticle} className="flex flex-col gap-6">
        {/* Thumbnail */}
        <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6 p-4 bg-neutral-50 rounded-2xl border border-neutral-100">
          <div className="shrink-0">
            {thumbnailPreview ? (
              <img src={thumbnailPreview} alt="Thumbnail" className="w-28 h-20 object-cover rounded-xl border border-neutral-200" />
            ) : (
              <div className="w-28 h-20 rounded-xl border-2 border-dashed border-neutral-300 flex items-center justify-center bg-white">
                <span className="material-symbols-outlined text-neutral-300 text-[28px]">image</span>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-sans text-sm font-medium text-neutral-700">Cover Image</span>
            <p className="font-sans text-xs text-neutral-400">Shown as thumbnail on the articles grid</p>
            <label className="cursor-pointer px-3 py-1.5 bg-white border border-neutral-200 rounded-lg font-sans text-xs font-medium text-neutral-600 hover:bg-neutral-50 transition-colors w-fit">
              {uploading ? 'Uploading...' : thumbnailPreview ? 'Change image' : 'Upload cover'}
              <input type="file" accept="image/*" className="hidden" onChange={handleThumbnailUpload} disabled={uploading} />
            </label>
          </div>
        </div>
        <input type="hidden" name="thumbnail_url" value={thumbnailUrl} />

        {/* Title & subtitle */}
        <div className="flex flex-col gap-1 border-b border-neutral-100 pb-4">
          <input
            type="text" name="title"
            placeholder="Article Title"
            className="w-full font-serif text-3xl md:text-[36px] bg-transparent border-none outline-none placeholder-neutral-300 px-0"
            required
          />
          <input
            type="text" name="subtext"
            placeholder="A brief subtitle..."
            className="w-full font-sans text-base md:text-lg text-neutral-400 bg-transparent border-none outline-none placeholder-neutral-200 px-0"
          />
        </div>

        {/* Content type */}
        <div className="flex gap-3">
          {['article', 'journal', 'doodle'].map(t => (
            <label key={t} className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="type" value={t} defaultChecked={t === 'article'} className="accent-neutral-900" />
              <span className="font-sans text-sm capitalize text-neutral-600">{t}</span>
            </label>
          ))}
        </div>

        {/* Hidden content field */}
        <input type="hidden" name="content" value={content} />

        <div className="w-full mt-4 editor-container">
          <Editor onChange={(html) => setContent(html)} />
        </div>

        {/* Fixed action bar */}
        <div className="fixed top-5 right-4 md:top-auto md:bottom-8 md:right-8 flex gap-2 md:gap-3 z-[60]">
          <a href="/admin" className="px-4 md:px-5 py-2 md:py-2.5 rounded-full bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50 transition-colors shadow-sm font-sans text-xs md:text-sm">Cancel</a>
          <button type="submit" className="px-4 md:px-5 py-2 md:py-2.5 rounded-full bg-neutral-900 text-white hover:bg-neutral-800 transition-colors shadow-md font-sans text-xs md:text-sm font-medium">Publish</button>
        </div>
      </form>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { saveHomepageSettings } from './actions'
import imageCompression from 'browser-image-compression'
import { createClient } from '@/utils/supabase/client'

export default function HomepageEditor({ initialCards, initialMasonryItems, allContent }: any) {
  const [cards, setCards] = useState(initialCards)
  const [masonryItems, setMasonryItems] = useState<string[]>(initialMasonryItems)
  const [uploadingImage, setUploadingImage] = useState<string | null>(null)

  const handleCardChange = (id: string, field: string, value: any) => {
    setCards((prev: any) => prev.map((c: any) => c.id === id ? { ...c, [field]: value } : c))
  }

  const handleTagsChange = (id: string, tagsString: string) => {
    const tags = tagsString.split(',').map(t => t.trim()).filter(Boolean)
    handleCardChange(id, 'tags', tags)
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, cardId: string) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadingImage(cardId)
    try {
      const compressed = await imageCompression(file, { maxSizeMB: 2, maxWidthOrHeight: 1200, useWebWorker: true })
      const supabase = createClient()
      const fileName = `home-${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`
      const { error } = await supabase.storage.from('media').upload(fileName, compressed)
      if (error) throw error
      const { data } = supabase.storage.from('media').getPublicUrl(fileName)
      handleCardChange(cardId, 'image_url', data.publicUrl)
    } catch (err) {
      console.error('Upload failed:', err)
      alert('Image upload failed.')
    }
    setUploadingImage(null)
    e.target.value = ''
  }

  // Masonry item selection logic
  const toggleMasonryItem = (contentId: string) => {
    if (masonryItems.includes(contentId)) {
      setMasonryItems(prev => prev.filter(id => id !== contentId))
    } else {
      setMasonryItems(prev => [...prev, contentId])
    }
  }

  const moveMasonryItem = (index: number, direction: -1 | 1) => {
    const newItems = [...masonryItems]
    const swapIndex = index + direction
    if (swapIndex < 0 || swapIndex >= newItems.length) return
    const temp = newItems[index]
    newItems[index] = newItems[swapIndex]
    newItems[swapIndex] = temp
    setMasonryItems(newItems)
  }

  return (
    <form action={saveHomepageSettings} className="flex flex-col gap-12">
      <input type="hidden" name="featured_cards" value={JSON.stringify(cards)} />
      <input type="hidden" name="masonry_items" value={JSON.stringify(masonryItems)} />

      <section>
        <h2 className="font-serif text-2xl text-on-surface mb-6 border-b border-neutral-100 pb-2">Featured Bento Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card: any) => (
            <div key={card.id} className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
                <span className="font-sans font-medium text-neutral-800 uppercase text-xs tracking-wider">Slot: {card.type}</span>
                <input 
                  type="text" 
                  value={card.label || ''} 
                  onChange={e => handleCardChange(card.id, 'label', e.target.value)} 
                  placeholder="Badge Label (e.g. Prose)"
                  className="font-sans text-xs px-2 py-1 border border-neutral-200 rounded bg-neutral-50 outline-none focus:border-neutral-400"
                />
              </div>

              {card.type !== 'image' && (
                <input 
                  type="text" 
                  value={card.title || ''} 
                  onChange={e => handleCardChange(card.id, 'title', e.target.value)} 
                  placeholder="Card Title"
                  className="font-serif text-xl border-none outline-none placeholder-neutral-300 w-full"
                />
              )}

              {card.type === 'journal' && (
                <input 
                  type="text" 
                  value={card.sub_label || ''} 
                  onChange={e => handleCardChange(card.id, 'sub_label', e.target.value)} 
                  placeholder="Sub-label (e.g. Current Read)"
                  className="font-sans text-sm text-neutral-500 border-none outline-none placeholder-neutral-300 w-full"
                />
              )}

              {(card.type === 'prose' || card.type === 'poetry') && (
                <textarea 
                  value={card.body || ''} 
                  onChange={e => handleCardChange(card.id, 'body', e.target.value)} 
                  placeholder="Snippet or poem verses..."
                  className="font-sans text-sm text-neutral-600 border border-neutral-200 rounded-lg p-3 outline-none focus:border-neutral-400 w-full resize-none h-24"
                />
              )}

              {card.type === 'image' && (
                <div className="flex flex-col gap-2">
                  {card.image_url ? (
                    <img src={card.image_url} alt="Card preview" className="w-full h-32 object-cover rounded-lg border border-neutral-200" />
                  ) : (
                    <div className="w-full h-32 bg-neutral-50 border-2 border-dashed border-neutral-200 rounded-lg flex items-center justify-center text-neutral-400 text-sm">No image selected</div>
                  )}
                  <label className="cursor-pointer text-xs font-medium text-center py-2 bg-neutral-100 hover:bg-neutral-200 transition-colors rounded-lg">
                    {uploadingImage === card.id ? 'Uploading...' : 'Upload Image'}
                    <input type="file" accept="image/*" className="hidden" onChange={e => handleImageUpload(e, card.id)} disabled={uploadingImage === card.id} />
                  </label>
                </div>
              )}

              <div className="flex flex-col gap-2 mt-auto pt-4 border-t border-neutral-100">
                {(card.type === 'prose' || card.type === 'poetry') && (
                  <input 
                    type="text" 
                    value={card.date || ''} 
                    onChange={e => handleCardChange(card.id, 'date', e.target.value)} 
                    placeholder="Date (e.g. Oct 12, 2023)"
                    className="font-sans text-xs text-neutral-500 border-none outline-none placeholder-neutral-300 w-full"
                  />
                )}
                {card.type === 'journal' && (
                  <input 
                    type="text" 
                    value={(card.tags || []).join(', ')} 
                    onChange={e => handleTagsChange(card.id, e.target.value)} 
                    placeholder="Tags (comma separated)"
                    className="font-sans text-xs text-neutral-500 border-none outline-none placeholder-neutral-300 w-full"
                  />
                )}
                {card.type === 'prose' && (
                  <input 
                    type="text" 
                    value={card.link_url || ''} 
                    onChange={e => handleCardChange(card.id, 'link_url', e.target.value)} 
                    placeholder="Link URL (e.g. /articles/slug)"
                    className="font-sans text-xs text-blue-500 border-none outline-none placeholder-neutral-300 w-full"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-serif text-2xl text-on-surface mb-2 border-b border-neutral-100 pb-2">More of my world</h2>
        <p className="font-sans text-sm text-neutral-500 mb-6">Select the items you want to appear in the masonry grid, and drag to order them.</p>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Selected Items (Ordered) */}
          <div className="flex-1 bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
            <h3 className="font-sans font-medium text-neutral-800 text-sm mb-4">Selected Items (Top to Bottom)</h3>
            {masonryItems.length === 0 ? (
              <p className="text-xs text-neutral-400 italic">No items selected.</p>
            ) : (
              <div className="flex flex-col gap-2">
                {masonryItems.map((id, index) => {
                  const content = allContent.find((c: any) => c.id === id)
                  if (!content) return null
                  return (
                    <div key={id} className="flex items-center justify-between p-3 bg-neutral-50 border border-neutral-100 rounded-xl">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[10px] text-neutral-400 w-4">{index + 1}.</span>
                        <span className="font-sans text-sm text-neutral-900">{content.title}</span>
                        <span className="font-sans text-[10px] uppercase text-neutral-400 px-2 py-0.5 bg-neutral-200/50 rounded-full">{content.type}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button type="button" onClick={() => moveMasonryItem(index, -1)} disabled={index === 0} className="p-1 text-neutral-400 hover:text-neutral-900 disabled:opacity-30"><span className="material-symbols-outlined text-[16px]">arrow_upward</span></button>
                        <button type="button" onClick={() => moveMasonryItem(index, 1)} disabled={index === masonryItems.length - 1} className="p-1 text-neutral-400 hover:text-neutral-900 disabled:opacity-30"><span className="material-symbols-outlined text-[16px]">arrow_downward</span></button>
                        <button type="button" onClick={() => toggleMasonryItem(id)} className="p-1 text-red-400 hover:text-red-600 ml-2"><span className="material-symbols-outlined text-[16px]">close</span></button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Available Items */}
          <div className="flex-1 bg-neutral-50 border border-neutral-200 rounded-2xl p-6 shadow-sm max-h-[500px] overflow-y-auto">
            <h3 className="font-sans font-medium text-neutral-800 text-sm mb-4">Available Content</h3>
            <div className="flex flex-col gap-2">
              {allContent.filter((c: any) => !masonryItems.includes(c.id)).map((content: any) => (
                <div key={content.id} className="flex items-center justify-between p-3 bg-white border border-neutral-100 rounded-xl hover:border-neutral-300 transition-colors cursor-pointer" onClick={() => toggleMasonryItem(content.id)}>
                  <div className="flex items-center gap-3">
                    <span className="font-sans text-sm text-neutral-700">{content.title}</span>
                    <span className="font-sans text-[10px] uppercase text-neutral-400 px-2 py-0.5 bg-neutral-100 rounded-full">{content.type}</span>
                  </div>
                  <span className="material-symbols-outlined text-[16px] text-neutral-400">add</span>
                </div>
              ))}
              {allContent.filter((c: any) => !masonryItems.includes(c.id)).length === 0 && (
                <p className="text-xs text-neutral-400 italic">All content has been selected.</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Fixed action bar */}
      <div className="fixed top-5 right-4 md:top-auto md:bottom-8 md:right-8 flex gap-2 md:gap-3 z-[60]">
        <button type="submit" className="px-5 py-2.5 rounded-full bg-neutral-900 text-white hover:bg-neutral-800 transition-colors shadow-md font-sans text-sm font-medium">Save Homepage</button>
      </div>
    </form>
  )
}

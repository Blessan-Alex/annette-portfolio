import { createClient } from '@/utils/supabase/server'
import HomepageEditor from './HomepageEditor'

export default async function HomepageSettingsPage() {
  const supabase = await createClient()

  // 1. Fetch settings
  const { data: settings } = await supabase.from('homepage_settings').select('*').eq('id', 1).single()

  // 2. Fetch all published content for the Masonry selector
  const { data: allContent } = await supabase
    .from('content')
    .select('id, title, type, category, published_at')
    .not('published_at', 'is', null)
    .order('published_at', { ascending: false })

  // Defaults if empty
  const defaultCards = [
    { id: 'card-1', type: 'prose', label: 'Prose', title: '', body: '', date: '', link_url: '' },
    { id: 'card-2', type: 'poetry', label: 'Poetry', title: '', body: '', date: '' },
    { id: 'card-3', type: 'image', label: 'Sketchbook', image_url: '' },
    { id: 'card-4', type: 'journal', label: 'Journal', sub_label: 'Current Read', title: '', tags: [] }
  ]

  const featuredCards = settings?.featured_cards || defaultCards
  const masonryItems = settings?.masonry_items || []

  return (
    <div className="w-full max-w-5xl mx-auto pb-48">
      <header className="mb-12">
        <h1 className="font-serif text-[42px] text-on-surface">Homepage Editor</h1>
        <p className="font-sans text-neutral-500 text-sm">Customize the featured bento cards and select items for "More of my world".</p>
      </header>

      <HomepageEditor 
        initialCards={featuredCards} 
        initialMasonryItems={masonryItems} 
        allContent={allContent || []} 
      />
    </div>
  )
}

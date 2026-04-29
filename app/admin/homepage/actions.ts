'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function saveHomepageSettings(formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const featuredCardsRaw = formData.get('featured_cards') as string
  const masonryItemsRaw = formData.get('masonry_items') as string
  const heroParagraphsRaw = formData.get('hero_paragraphs') as string
  const navigationLinksRaw = formData.get('navigation_links') as string

  let featuredCards = []
  let masonryItems = []
  let heroParagraphs = []
  let navigationLinks = []
  
  try {
    if (featuredCardsRaw) featuredCards = JSON.parse(featuredCardsRaw)
    if (masonryItemsRaw) masonryItems = JSON.parse(masonryItemsRaw)
    if (heroParagraphsRaw) heroParagraphs = JSON.parse(heroParagraphsRaw)
    if (navigationLinksRaw) navigationLinks = JSON.parse(navigationLinksRaw)
  } catch (err) {
    console.error('JSON parse error', err)
    throw new Error('Invalid JSON payload')
  }

  // Rename content types if a category was renamed
  const { data: existing } = await supabase.from('homepage_settings').select('id, navigation_links').eq('id', 1).single()

  if (existing) {
    // Check for renamed categories and update content types
    const oldLinks = existing.navigation_links || []
    for (const newLink of navigationLinks as any[]) {
      if (!newLink.type) continue
      const oldLink = oldLinks.find((o: any) => o.id === newLink.id)
      if (oldLink && oldLink.type && oldLink.type !== newLink.type) {
        await supabase.from('content').update({ type: newLink.type }).eq('type', oldLink.type)
      }
    }

    await supabase.from('homepage_settings').update({
      featured_cards: featuredCards,
      masonry_items: masonryItems,
      hero_paragraphs: heroParagraphs,
      navigation_links: navigationLinks,
      updated_at: new Date().toISOString()
    }).eq('id', 1)
  } else {
    await supabase.from('homepage_settings').insert({
      id: 1,
      featured_cards: featuredCards,
      masonry_items: masonryItems,
      hero_paragraphs: heroParagraphs,
      navigation_links: navigationLinks
    })
  }

  revalidatePath('/')
  revalidatePath('/admin/homepage')
  
  redirect('/admin')
}

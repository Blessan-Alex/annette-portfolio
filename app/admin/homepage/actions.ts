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

  let featuredCards = []
  let masonryItems = []
  
  try {
    if (featuredCardsRaw) featuredCards = JSON.parse(featuredCardsRaw)
    if (masonryItemsRaw) masonryItems = JSON.parse(masonryItemsRaw)
  } catch (err) {
    console.error('JSON parse error', err)
    throw new Error('Invalid JSON payload')
  }

  // Ensure record exists
  const { data: existing } = await supabase.from('homepage_settings').select('id').eq('id', 1).single()

  if (existing) {
    await supabase.from('homepage_settings').update({
      featured_cards: featuredCards,
      masonry_items: masonryItems,
      updated_at: new Date().toISOString()
    }).eq('id', 1)
  } else {
    await supabase.from('homepage_settings').insert({
      id: 1,
      featured_cards: featuredCards,
      masonry_items: masonryItems
    })
  }

  revalidatePath('/')
  revalidatePath('/admin/homepage')
  
  redirect('/admin')
}

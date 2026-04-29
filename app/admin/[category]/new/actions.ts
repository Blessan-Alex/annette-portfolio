'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { getNavLinks } from '@/utils/navigation.server'

export async function saveArticle(formData: FormData) {
  const supabase = await createClient()

  const title = formData.get('title') as string
  const subtext = formData.get('subtext') as string
  const contentHTML = formData.get('content') as string
  const type = (formData.get('type') as string) || 'article'
  const thumbnailUrl = (formData.get('thumbnail_url') as string) || null
  const id = formData.get('id') as string | null
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')

  // Validate type against active navigation categories
  const navLinks = await getNavLinks()
  const validTypes = navLinks.filter(n => n.type).map(n => n.type)
  if (!validTypes.includes(type)) {
    throw new Error(`Invalid content type: "${type}". Valid types: ${validTypes.join(', ')}`)
  }

  const payload = {
    title,
    subtext,
    slug,
    type,
    thumbnail_url: thumbnailUrl,
    content_data: { html: contentHTML },
    published_at: new Date().toISOString(),
  }

  let result;
  if (id) {
    result = await supabase.from('content').update(payload).eq('id', id).select().single()
  } else {
    result = await supabase.from('content').insert(payload).select().single()
  }

  const { data, error } = result

  if (error) {
    console.error('Error saving article:', error)
    throw new Error('Failed to save article')
  }

  revalidatePath('/', 'layout')
  redirect('/admin')
}

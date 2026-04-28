'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function deleteContent(id: string) {
  const supabase = await createClient()

  // Verify auth
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    throw new Error('Unauthorized')
  }

  const { error } = await supabase
    .from('content')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Delete error:', error)
    throw new Error('Failed to delete content')
  }

  // Revalidate to update UI immediately
  revalidatePath('/admin')
  revalidatePath('/')
  revalidatePath('/articles')
  revalidatePath('/journals')
  revalidatePath('/doodles')
}

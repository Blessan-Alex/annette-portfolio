import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (user) {
    await supabase.auth.signOut()
  }

  revalidatePath('/', 'layout')

  // Use host header so it works correctly in both dev and production
  // req.url returns 0.0.0.0 in Next.js dev — host header is always correct
  const host = req.headers.get('host') || 'localhost:3000'
  const protocol = req.headers.get('x-forwarded-proto') || 'http'
  const origin = `${protocol}://${host}`

  return NextResponse.redirect(new URL('/', origin), { status: 302 })
}

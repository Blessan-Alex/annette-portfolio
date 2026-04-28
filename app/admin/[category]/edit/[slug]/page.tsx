import { createClient } from '@/utils/supabase/server'
import { notFound, redirect } from 'next/navigation'
import EditArticleForm from './EditArticleForm'

export default async function EditArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  const supabase = await createClient()

  // Verify auth
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/login')
  }

  const { data: article } = await supabase
    .from('content')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!article) {
    notFound()
  }

  return <EditArticleForm article={article} />
}

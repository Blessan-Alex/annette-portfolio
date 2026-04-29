import { getNavLinks } from '@/utils/navigation.server'
import NewArticleForm from './NewArticleForm'

export default async function NewArticlePage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params
  const navLinks = await getNavLinks()
  
  // Derive the default type from the URL category (e.g. 'articles' -> 'article')
  const navLink = navLinks.find(n => n.path === `/${category}`)
  const defaultType = navLink?.type || navLinks.find(n => n.type)?.type || 'article'

  return <NewArticleForm navLinks={navLinks} defaultType={defaultType} />
}

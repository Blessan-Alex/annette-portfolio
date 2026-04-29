import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import AdminShell from './components/AdminShell'
import { getNavLinks } from '@/utils/navigation.server'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/login')
  }

  const navLinks = await getNavLinks()

  return <AdminShell email={user.email!} navLinks={navLinks}>{children}</AdminShell>
}

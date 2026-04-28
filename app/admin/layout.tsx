import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import AdminShell from './components/AdminShell'

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

  return <AdminShell email={user.email!}>{children}</AdminShell>
}

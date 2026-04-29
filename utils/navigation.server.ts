import { createClient } from '@/utils/supabase/server'
import { DEFAULT_NAV_LINKS } from './navigation'
import type { NavLink } from './navigation'

export async function getNavLinks(): Promise<NavLink[]> {
  const supabase = await createClient()
  const { data: settings } = await supabase
    .from('homepage_settings')
    .select('navigation_links')
    .eq('id', 1)
    .single()

  return settings?.navigation_links || DEFAULT_NAV_LINKS
}

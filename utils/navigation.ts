export interface NavLink {
  id: string
  label: string
  path: string
  type: string | null // null for home link
}

export const RESERVED_SLUGS = [
  'admin', 'api', 'login', 'auth', 'settings', '_next', 'icon', 'favicon',
  'image', 'font', 'public', 'static',
]

export const DEFAULT_NAV_LINKS: NavLink[] = [
  { id: 'home', label: 'Annette', path: '/', type: null },
  { id: 'article', label: 'Articles', path: '/articles', type: 'article' },
  { id: 'journal', label: 'Journals', path: '/journals', type: 'journal' },
  { id: 'doodle', label: 'Doodles', path: '/doodles', type: 'doodle' },
]

export function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
}

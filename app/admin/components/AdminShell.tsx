'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'motion/react'
import type { NavLink } from '@/utils/navigation'

export default function AdminShell({ email, navLinks, children }: { email: string; navLinks: NavLink[]; children: React.ReactNode }) {
  const categoryLinks = navLinks.filter(n => n.type !== null)
  const sidebarItems = [
    { name: 'Overview', path: '/admin', exact: true },
    { name: 'Homepage', path: '/admin/homepage' },
    ...categoryLinks.map(n => ({ name: n.label, path: `/admin/${n.path.replace('/', '')}` })),
  ]
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <div className="min-h-screen flex bg-surface-bright selection:bg-neutral-200 selection:text-neutral-900 w-full relative">
      {/* Mobile Overlay */}
      <AnimatePresence>
        {!collapsed && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-neutral-900/20 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setCollapsed(true)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence initial={false}>
        {!collapsed && (
          <motion.aside
            key="sidebar"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 256, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="fixed md:sticky top-0 left-0 border-r border-neutral-200 bg-white flex flex-col h-screen shadow-2xl md:shadow-sm z-50 overflow-hidden shrink-0"
          >
            <div className="p-6 flex flex-col h-full w-64">
              {/* Branding */}
              <div className="mt-12 mb-10">
                <Link href="/" className="block group">
                  <span className="font-display text-[26px] font-light tracking-tight text-on-surface leading-tight group-hover:opacity-80 transition-opacity">
                    The Annette Files
                  </span>
                  <p className="font-sans text-[12px] text-neutral-400 mt-1 tracking-wide">
                    something&apos;s cooking...
                  </p>
                </Link>
              </div>

              {/* Nav */}
              <nav className="flex flex-col gap-1.5 flex-grow">
              {sidebarItems.map(item => {
                  const active = (item as any).exact
                    ? pathname === item.path
                    : pathname.startsWith(item.path)
                  return (
                    <Link
                      key={item.path}
                      href={item.path}
                      className={`font-sans text-sm px-4 py-2.5 rounded-xl transition-colors ${
                        active
                          ? 'bg-neutral-900 text-white font-medium'
                          : 'text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900'
                      }`}
                    >
                      {item.name}
                    </Link>
                  )
                })}
              </nav>

              {/* Footer */}
              <div className="pt-6 border-t border-neutral-100">
                <p className="font-sans text-xs text-neutral-400 mb-3 truncate">{email}</p>
                <form action="/auth/signout" method="post">
                  <button className="font-sans text-sm text-red-400 hover:text-red-600 transition-colors">
                    Sign Out
                  </button>
                </form>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <button
        onClick={() => setCollapsed(c => !c)}
        title={collapsed ? 'Show sidebar' : 'Hide sidebar'}
        className="fixed top-5 left-4 z-[60] w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-neutral-200 shadow-sm hover:bg-neutral-50 transition-colors"
      >
        <span className="material-symbols-outlined text-[16px] text-neutral-500">
          {collapsed ? 'menu' : 'menu_open'}
        </span>
      </button>

      {/* Main Content */}
      <main className="flex-1 p-4 pt-24 md:p-16 overflow-y-auto max-w-[1200px] mx-auto min-w-0 w-full">
        {children}
      </main>
    </div>
  )
}

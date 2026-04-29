"use client";

import { useState } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { NavLink } from '@/utils/navigation';

export default function Navbar({ navLinks }: { navLinks: NavLink[] }) {
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <nav
        className="fixed z-50 top-4 left-1/2 -translate-x-1/2 md:top-7 md:left-12 md:translate-x-0 flex items-center p-1 gap-1 bg-white/70 backdrop-blur-xl border border-neutral-200/50 rounded-2xl shadow-sm"
        onMouseLeave={() => setHoveredTab(null)}
      >
        {navLinks.map((item) => {
          const active = isActive(item.path);
          const showPill = hoveredTab === item.id || (hoveredTab === null && active);
          return (
            <Link
              key={item.id}
              href={item.path}
              onMouseEnter={() => setHoveredTab(item.id)}
              className={`relative px-4 py-1.5 rounded-xl font-sans font-medium text-sm transition-colors duration-300 z-10 ${
                showPill ? 'text-neutral-900' : 'text-neutral-500'
              }`}
            >
              {showPill && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-neutral-100 rounded-xl -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              {item.label}
            </Link>
          );
        })}
      </nav>

    </>
  );
}

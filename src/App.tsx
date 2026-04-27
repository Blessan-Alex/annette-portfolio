/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { articles, journals, doodles, ContentItem } from './content';

const navItems = ['Annette', 'Articles', 'Journals', 'Doodles'];

function Navbar({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (tab: string) => void }) {
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  return (
    <nav 
      className="fixed z-50 top-4 left-1/2 -translate-x-1/2 md:top-7 md:left-12 md:translate-x-0 flex items-center p-1 gap-1 bg-white/70 backdrop-blur-xl border border-neutral-200/50 rounded-2xl shadow-sm"
      onMouseLeave={() => setHoveredTab(null)}
    >
      {navItems.map((item) => {
        const showPill = hoveredTab === item || (hoveredTab === null && item === activeTab);
        return (
          <a
            key={item}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab(item);
            }}
            onMouseEnter={() => setHoveredTab(item)}
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
            {item}
          </a>
        );
      })}
    </nav>
  );
}

function MasonryCard({ item, onSelect }: { item: ContentItem, onSelect: (id: string, tabName: string) => void }) {
  if (item.thumbnail) {
    return (
      <div className="mb-4 md:mb-6 break-inside-avoid">
        <article onClick={() => onSelect(item.id, item.tabName)} className="bento-card border border-neutral-100 shadow-sm min-h-[400px] relative group overflow-hidden cursor-pointer bg-white">
          <img 
            alt={item.title} 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            src={item.thumbnail} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute top-6 left-6 right-6 flex justify-between items-start opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="font-sans font-label-sm text-label-sm text-white drop-shadow-md">{item.category || item.tabName}</span>
            <span className="material-symbols-outlined text-white drop-shadow-md">north_east</span>
          </div>
          <div className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
            <h3 className="font-serif text-[28px] text-white leading-tight drop-shadow-md">{item.title}</h3>
            <p className="font-sans text-sm text-white/90 drop-shadow-md">{item.subtext}</p>
          </div>
        </article>
      </div>
    );
  }

  // Text-only card
  return (
    <div className="mb-4 md:mb-6 break-inside-avoid">
      <article onClick={() => onSelect(item.id, item.tabName)} className="bento-card bg-white border border-neutral-100 shadow-sm p-8 flex flex-col min-h-[250px] group cursor-pointer justify-between">
        <div>
          <div className="flex justify-between items-start mb-6">
            <span className="font-sans font-label-sm text-label-sm text-outline">{item.category || item.tabName}</span>
            <span className="material-symbols-outlined text-outline opacity-0 group-hover:opacity-100 transition-opacity">north_east</span>
          </div>
          <h3 className="font-serif text-[32px] leading-[1.1] text-on-surface mb-4">{item.title}</h3>
          <p className="font-sans text-body-md text-on-surface-variant line-clamp-4">{item.subtext}</p>
        </div>
        <div className="mt-6 flex justify-between items-center">
          <span className="font-sans text-sm text-outline">{item.date}</span>
        </div>
      </article>
    </div>
  );
}

function MasonryGrid({ items, onSelect }: { items: ContentItem[], onSelect: (id: string, tabName: string) => void }) {
  return (
    <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 md:gap-6">
      {items.map(item => (
        <MasonryCard key={item.id} item={item} onSelect={onSelect} />
      ))}
    </div>
  );
}

function IndexPage({ title, subtext, items, onSelect }: { title: string, subtext: string, items: ContentItem[], onSelect: (id: string, tabName: string) => void }) {
  const formattedTitle = title.toLowerCase() + ".";
  return (
    <main className="flex flex-col min-h-screen max-w-[1600px] mx-auto px-6 py-32 md:p-16 md:pt-40">
      <div className="w-full">
        <h1 className="font-display text-[64px] md:text-[96px] text-on-surface mb-6 leading-none tracking-tight">
          {formattedTitle}
        </h1>
        <p className="font-sans text-body-lg text-on-surface-variant mb-16 max-w-2xl">
          {subtext}
        </p>
        
        <MasonryGrid items={items} onSelect={onSelect} />
      </div>
    </main>
  );
}

function ContentDetailPage({ title, children, onBack }: { title: string, children: React.ReactNode, onBack: () => void }) {
  return (
    <main className="min-h-screen w-full max-w-[1600px] mx-auto px-6 py-32 md:py-48 flex flex-col items-center selection:bg-[#FADBD8] selection:text-neutral-900 bg-surface-bright overflow-x-hidden relative">
      <button 
        onClick={onBack}
        className="absolute top-8 left-8 md:top-12 md:left-12 font-sans font-medium text-sm text-neutral-400 hover:text-neutral-900 transition-colors flex items-center gap-2"
      >
        <span className="material-symbols-outlined text-[18px]">arrow_back</span>
        Back
      </button>

      {/* Article Header */}
      <header className="w-full max-w-2xl text-center mb-24">
        <h1 className="font-serif text-[64px] md:text-[96px] text-on-surface mb-8 italic font-light tracking-tight px-4">
          {title}
        </h1>
        <div className="w-16 h-[1px] bg-neutral-300 mx-auto"></div>
      </header>

      {/* Article Body */}
      <article className="w-full max-w-[65ch] font-sans text-[18px] leading-[1.8] text-[#333333] space-y-12">
        {children}
      </article>
    </main>
  );
}

export default function App() {
  const [view, setView] = useState<{ tab: string, itemId: string | null }>({ tab: 'Annette', itemId: null });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  const activeTab = view.tab;
  const setActiveTab = (tab: string) => setView({ tab, itemId: null });

  const renderContent = () => {
    if (view.tab === 'Annette') {
      return (
        <>
        <main className="flex flex-col md:flex-row min-h-screen max-w-[1600px] mx-auto">
          {/* Left Column: Hero (Sticky) */}
          <section className="w-full md:w-[50%] min-h-[70vh] md:min-h-screen md:sticky top-0 px-6 py-20 md:p-16 md:pt-28 flex flex-col justify-start bg-surface-bright overflow-y-auto">
          <div className="w-full max-w-2xl mx-auto md:mx-0 pb-16">
            <h1 className="font-display text-[31px] md:text-[37px] text-neutral-400 mb-10 leading-[1.1] [-word-spacing:-0.1em] font-light">
              Hey there, I am <span className="text-neutral-900">Annette</span> 👋 Welcome to my <span className="underline decoration-dotted decoration-2 underline-offset-[8px] decoration-neutral-300">little corner of the internet</span> 🌻 I like building creative things, and I am currently exploring the intersection of <span className="text-neutral-900">art</span> and <span className="text-neutral-900">words</span>.
            </h1>
            <p className="font-display text-[31px] md:text-[37px] text-neutral-400 mb-10 leading-[1.1] [-word-spacing:-0.1em] font-light">
              In my free time, I enjoy whipping up <span className="text-neutral-900">spaghetti</span>, avocado shakes and hitting the <span className="text-neutral-900">gym</span>.
            </p>
            <p className="font-display text-[31px] md:text-[37px] text-neutral-400 leading-[1.1] [-word-spacing:-0.1em] font-light">
              I also have a thing for <span className="text-neutral-900">holding</span> onto the small things, the kind you tuck away and keep <span className="text-neutral-900">forever</span>.
            </p>
          </div>
        </section>

        {/* Right Column: Content (Scrollable Bento Grid) */}
        <section className="w-full md:w-[50%] px-6 py-8 md:p-16 md:pt-24 pb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-4xl">
            
            {/* Bento Card 1: Prose */}
            <article className="bento-card bg-white border border-neutral-100 shadow-sm col-span-1 md:col-span-2 p-8 md:p-12 flex flex-col justify-between min-h-[300px]">
              <div>
                <span className="inline-block px-3 py-1 bg-neutral-50 rounded-full font-label-sm text-label-sm text-on-surface-variant mb-4 uppercase tracking-wider">Prose</span>
                <h2 className="font-h2 text-h1 text-on-surface mb-4 mt-2">The Wait at St. Pancras</h2>
                <p className="font-body-md text-body-md text-on-surface-variant line-clamp-3">
                  There is a specific kind of silence that falls over a train station just before dawn. It's not empty, but rather expectant. The architecture itself seems to hold its breath.
                </p>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <span className="font-label-sm text-label-sm text-outline">Oct 12, 2023</span>
                <a className="w-10 h-10 rounded-full bg-neutral-50 flex items-center justify-center hover:bg-neutral-100 transition-colors" href="#">
                  <span className="material-symbols-outlined">north_east</span>
                </a>
              </div>
            </article>

            {/* Bento Card 2: Poetry */}
            <article className="bento-card bg-white border border-neutral-100 shadow-sm col-span-1 p-8 flex flex-col justify-between min-h-[300px]">
              <div>
                <span className="inline-block px-3 py-1 bg-neutral-50 rounded-full font-label-sm text-label-sm text-on-surface-variant mb-4 uppercase tracking-wider">Poetry</span>
                <h2 className="font-h2 text-h1 text-on-surface mb-4 mt-2">Monsoon Echoes</h2>
                <p className="font-body-md text-body-md text-on-surface-variant italic">
                  Rain hits the glass,<br />
                  A rhythm unlearned.<br />
                  Streets wash away.
                </p>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <span className="font-label-sm text-label-sm text-outline">Sep 28, 2023</span>
              </div>
            </article>

            {/* Bento Card 3: Image Only */}
            <div className="bento-card border border-neutral-100 shadow-sm col-span-1 min-h-[300px] relative group overflow-hidden">
              <img 
                alt="Sketchbook" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBUHVYoDlp6xExNf2bv27S8a6T1s-PXGGTG62lTkjLZrloNUJ3P7cyfOskXoYEUPwHXE6diX0SuO2xOLPDTHwdiwhDutniMFX5NVqfBa80bMRYkWhMcOZ4MQ6Jaq4EgU7cvDnppgy0Wc1CkvNItHvRTBIQ6fRHyC1u1OsY0Yz4OZPoF6sYZNHi9gBm0Heu3emFv4t_8OKzImA0hmi48tc0mTczv45UonqUbsAvJsNCB70xQDWVoVDLdwsvxA4kAAhdD_hInUbsZ83T" 
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500"></div>
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="w-10 h-10 rounded-full bg-white/80 backdrop-blur flex items-center justify-center text-on-surface">
                  <span className="material-symbols-outlined">zoom_in</span>
                </span>
              </div>
            </div>

            {/* Bento Card 4: Journal */}
            <article className="bento-card bg-white border border-neutral-100 shadow-sm col-span-1 md:col-span-2 p-8 md:p-12 flex flex-col justify-between min-h-[250px]">
              <div className="flex items-center gap-4 mb-4">
                <span className="inline-block px-3 py-1 bg-neutral-50 rounded-full font-sans font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Journal</span>
                <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                <span className="font-sans font-label-sm text-label-sm text-outline">Current Read</span>
              </div>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mt-4">
                <h2 className="font-serif font-h1 text-[36px] leading-[1.2] text-on-surface">The Architecture of Happiness</h2>
                <div className="flex -space-x-2">
                  <span className="inline-block px-3 py-1 bg-neutral-50 border border-neutral-100 rounded-full font-sans font-label-sm text-label-sm text-on-surface-variant">#design</span>
                  <span className="inline-block px-3 py-1 bg-neutral-50 border border-neutral-100 rounded-full font-sans font-label-sm text-label-sm text-on-surface-variant">#space</span>
                </div>
              </div>
            </article>

          </div>
        </section>
        </main>

        {/* Dynamic Messy Masonry Grid Section */}
        <section className="w-full max-w-[1600px] mx-auto px-6 py-16 md:px-16 md:py-24 border-t border-neutral-100 mt-12">
          <h2 className="font-serif text-[42px] text-on-surface mb-12 text-center md:text-left">More of my world.</h2>
          <MasonryGrid 
            items={[articles[0], journals[1], doodles[2], articles[2], doodles[0], journals[4], articles[3], journals[2]]} 
            onSelect={(id, tabName) => setView({ tab: tabName, itemId: id })} 
          />
        </section>
        </>
      );
    }

    let items: ContentItem[] = [];
    let subtext = "";
    if (view.tab === 'Articles') {
      items = articles;
      subtext = "Long-form thoughts on design, silence, and the places in between.";
    } else if (view.tab === 'Journals') {
      items = journals;
      subtext = "Short entries, reflections, and notes from the margins.";
    } else if (view.tab === 'Doodles') {
      items = doodles;
      subtext = "Visual experiments, CSS sketches, and uncontrolled chaos.";
    }

    if (view.itemId) {
      const selectedItem = items.find(i => i.id === view.itemId);
      if (selectedItem) {
        return (
          <ContentDetailPage 
            title={selectedItem.title} 
            onBack={() => setView({ tab: view.tab, itemId: null })}
          >
            {selectedItem.renderContent()}
          </ContentDetailPage>
        );
      }
    }

    return (
      <IndexPage 
        title={view.tab} 
        subtext={subtext} 
        items={items} 
        onSelect={(id, tabName) => setView({ tab: tabName, itemId: id })} 
      />
    );
  };

  return (
    <div className="bg-surface-bright text-on-surface font-sans text-body-md antialiased min-h-screen selection:bg-neutral-200 selection:text-neutral-900 flex flex-col">
      {/* Navigation */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-grow">
        {renderContent()}
      </div>

      {/* Footer */}
      <footer className="w-full py-12 border-t border-neutral-200 dark:border-neutral-800 bg-transparent flex flex-col items-center justify-center space-y-4 text-center max-w-2xl mx-auto px-8">
        <div className="flex gap-6 font-serif text-sm tracking-wide">
          <a className="text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300 opacity-80 hover:opacity-100 transition-opacity" href="#">Privacy</a>
          <a className="text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300 opacity-80 hover:opacity-100 transition-opacity" href="#">Terms</a>
          <a className="text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300 opacity-80 hover:opacity-100 transition-opacity" href="#">Archive</a>
        </div>
        <p className="font-serif text-sm tracking-wide text-neutral-900 dark:text-neutral-100 opacity-80 hover:opacity-100 transition-opacity">
          © 2024 Amelia. All thoughts preserved.
        </p>
      </footer>
    </div>
  );
}

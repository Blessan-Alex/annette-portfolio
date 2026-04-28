import MasonryGrid from '../components/MasonryGrid';
import { createClient } from '@/utils/supabase/server';

export default async function Home() {
  const supabase = await createClient();

  // 1. Fetch homepage settings
  const { data: settings } = await supabase.from('homepage_settings').select('*').eq('id', 1).single();

  const featuredCards = settings?.featured_cards || [];
  const masonryIds = settings?.masonry_items || [];

  // 2. Fetch all content explicitly ordered by masonry_items array
  let masonryContent = [];
  if (masonryIds.length > 0) {
    const { data: contentItems } = await supabase
      .from('content')
      .select('*')
      .in('id', masonryIds);
    
    // Sort items exactly as defined in the masonryIds array
    if (contentItems) {
      masonryContent = masonryIds.map((id: string) => contentItems.find(c => c.id === id)).filter(Boolean);
    }
  } else {
    // Fallback if settings empty
    const { data: recent } = await supabase.from('content').select('*').not('published_at', 'is', null).order('published_at', { ascending: false }).limit(10);
    masonryContent = recent || [];
  }

  // Helpers to get specific card data
  const proseCard = featuredCards.find((c: any) => c.type === 'prose');
  const poetryCard = featuredCards.find((c: any) => c.type === 'poetry');
  const imageCard = featuredCards.find((c: any) => c.type === 'image');
  const journalCard = featuredCards.find((c: any) => c.type === 'journal');
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
            {proseCard && (
              <article className="bento-card bg-white border border-neutral-100 shadow-sm col-span-1 md:col-span-2 p-8 md:p-12 flex flex-col justify-between min-h-[300px]">
                <div>
                  <span className="inline-block px-3 py-1 bg-neutral-50 rounded-full font-label-sm text-label-sm text-on-surface-variant mb-4 uppercase tracking-wider">{proseCard.label}</span>
                  <h2 className="font-h2 text-h1 text-on-surface mb-4 mt-2">{proseCard.title}</h2>
                  <p className="font-body-md text-body-md text-on-surface-variant line-clamp-3">
                    {proseCard.body}
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-outline">{proseCard.date}</span>
                  {proseCard.link_url && (
                    <a className="w-10 h-10 rounded-full bg-neutral-50 flex items-center justify-center hover:bg-neutral-100 transition-colors" href={proseCard.link_url}>
                      <span className="material-symbols-outlined">north_east</span>
                    </a>
                  )}
                </div>
              </article>
            )}

            {/* Bento Card 2: Poetry */}
            {poetryCard && (
              <article className="bento-card bg-white border border-neutral-100 shadow-sm col-span-1 p-8 flex flex-col justify-between min-h-[300px]">
                <div>
                  <span className="inline-block px-3 py-1 bg-neutral-50 rounded-full font-label-sm text-label-sm text-on-surface-variant mb-4 uppercase tracking-wider">{poetryCard.label}</span>
                  <h2 className="font-h2 text-h1 text-on-surface mb-4 mt-2">{poetryCard.title}</h2>
                  <p className="font-body-md text-body-md text-on-surface-variant italic whitespace-pre-wrap">
                    {poetryCard.body}
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-outline">{poetryCard.date}</span>
                </div>
              </article>
            )}

            {/* Bento Card 3: Image Only */}
            {imageCard && (
              <div className="bento-card border border-neutral-100 shadow-sm col-span-1 min-h-[300px] relative group overflow-hidden bg-neutral-50">
                {imageCard.image_url && (
                  <img 
                    alt={imageCard.label} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    src={imageCard.image_url} 
                  />
                )}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500"></div>
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="w-10 h-10 rounded-full bg-white/80 backdrop-blur flex items-center justify-center text-on-surface">
                    <span className="material-symbols-outlined">zoom_in</span>
                  </span>
                </div>
              </div>
            )}

            {/* Bento Card 4: Journal */}
            {journalCard && (
              <article className="bento-card bg-white border border-neutral-100 shadow-sm col-span-1 md:col-span-2 p-8 md:p-12 flex flex-col justify-between min-h-[250px]">
                <div className="flex items-center gap-4 mb-4">
                  <span className="inline-block px-3 py-1 bg-neutral-50 rounded-full font-sans font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">{journalCard.label}</span>
                  <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                  <span className="font-sans font-label-sm text-label-sm text-outline">{journalCard.sub_label}</span>
                </div>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mt-4">
                  <h2 className="font-serif font-h1 text-[36px] leading-[1.2] text-on-surface">{journalCard.title}</h2>
                  <div className="flex -space-x-2">
                    {journalCard.tags?.map((tag: string) => (
                      <span key={tag} className="inline-block px-3 py-1 bg-neutral-50 border border-neutral-100 rounded-full font-sans font-label-sm text-label-sm text-on-surface-variant">{tag}</span>
                    ))}
                  </div>
                </div>
              </article>
            )}

          </div>
        </section>
      </main>

      {/* Dynamic Messy Masonry Grid Section */}
      <section className="w-full max-w-[1600px] mx-auto px-6 py-16 md:px-16 md:py-24 border-t border-neutral-100 mt-12">
        <h2 className="font-serif text-[42px] text-on-surface mb-12 text-center md:text-left">More of my world.</h2>
        {masonryContent && masonryContent.length > 0 ? (
          <MasonryGrid 
            items={masonryContent.map((item: any) => ({
              id: item.slug,
              title: item.title,
              subtext: item.subtext,
              date: new Date(item.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
              tabName: item.type === 'article' ? 'Articles' : item.type === 'journal' ? 'Journals' : 'Doodles',
              category: item.category,
              thumbnail: item.thumbnail_url,
            }))} 
          />
        ) : (
          <div className="py-24 text-center border-2 border-dashed border-neutral-200 rounded-2xl">
            <p className="font-sans text-neutral-400">Content database is empty. Please run the Data Migration in the admin panel.</p>
          </div>
        )}
      </section>
    </>
  );
}

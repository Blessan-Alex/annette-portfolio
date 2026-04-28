import { notFound } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import { parseContent } from '@/utils/parser';

export default async function ContentDetail({ params }: { params: Promise<{ category: string, id: string }> }) {
  const { category, id } = await params;
  
  const supabase = await createClient();
  const { data: item } = await supabase
    .from('content')
    .select('*')
    .eq('slug', id)
    .single();

  if (!item) notFound();

  return (
    <main className="min-h-screen w-full max-w-[1600px] mx-auto px-6 py-32 md:py-48 flex flex-col items-center selection:bg-[#FADBD8] selection:text-neutral-900 bg-surface-bright relative">
      <Link 
        href={`/${category}`}
        className="absolute top-8 left-8 md:top-12 md:left-12 font-sans font-medium text-sm text-neutral-400 hover:text-neutral-900 transition-colors flex items-center gap-2"
      >
        <span className="material-symbols-outlined text-[18px]">arrow_back</span>
        Back
      </Link>

      <header className="w-full max-w-2xl text-center mb-24">
        <h1 className="font-serif text-[64px] md:text-[96px] text-on-surface mb-8 italic font-light tracking-tight px-4">
          {item.title}
        </h1>
        <div className="w-16 h-[1px] bg-neutral-300 mx-auto"></div>
      </header>

      <article className="w-full max-w-[65ch] font-sans text-[18px] leading-[1.8] text-[#333333] space-y-12">
        {item.content_data && parseContent(item.content_data.html)}
      </article>
    </main>
  );
}

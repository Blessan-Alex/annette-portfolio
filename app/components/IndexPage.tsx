import MasonryGrid from './MasonryGrid';
import { ContentItem } from '../../utils/types';

export default function IndexPage({ title, subtext, items }: { title: string, subtext: string, items: ContentItem[] }) {
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
        
        <MasonryGrid items={items} />
      </div>
    </main>
  );
}

import Link from 'next/link';
import Image from 'next/image';
import { ContentItem } from '../../utils/types';

function MasonryCard({ item, priority = false }: { item: ContentItem; priority?: boolean }) {
  const href = `/${item.tabName.toLowerCase()}/${item.id}`;

  if (item.thumbnail) {
    return (
      <div className="mb-4 md:mb-6 break-inside-avoid">
        <Link href={href} className="bento-card border border-neutral-100 shadow-sm min-h-[400px] relative group overflow-hidden cursor-pointer bg-white block">
          <Image 
            alt={item.title} 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            src={item.thumbnail} 
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            priority={priority}
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
        </Link>
      </div>
    );
  }

  return (
    <div className="mb-4 md:mb-6 break-inside-avoid">
      <Link href={href} className="bento-card bg-white border border-neutral-100 shadow-sm p-8 flex flex-col min-h-[250px] group cursor-pointer justify-between block">
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
      </Link>
    </div>
  );
}

export default function MasonryGrid({ items }: { items: ContentItem[] }) {
  return (
    <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 md:gap-6">
      {items.map((item, index) => (
        <MasonryCard key={item.id} item={item} priority={index < 4} />
      ))}
    </div>
  );
}

import { notFound } from 'next/navigation';
import IndexPage from '../../components/IndexPage';
import { createClient } from '@/utils/supabase/server';

export default async function Category({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  
  let type = '';
  let title = '';
  let subtext = '';

  if (category === 'articles') {
    type = 'article';
    title = 'Articles';
    subtext = "Long-form thoughts on design, silence, and the places in between.";
  } else if (category === 'journals') {
    type = 'journal';
    title = 'Journals';
    subtext = "Short entries, reflections, and notes from the margins.";
  } else if (category === 'doodles') {
    type = 'doodle';
    title = 'Doodles';
    subtext = "Visual experiments, CSS sketches, and uncontrolled chaos.";
  } else {
    notFound();
  }

  const supabase = await createClient();
  const { data: dbItems } = await supabase
    .from('content')
    .select('*')
    .eq('type', type)
    .not('published_at', 'is', null)
    .order('published_at', { ascending: false });

  const items = dbItems ? dbItems.map((item: any) => ({
    id: item.slug,
    title: item.title,
    subtext: item.subtext,
    date: new Date(item.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    tabName: item.type === 'article' ? 'Articles' : item.type === 'journal' ? 'Journals' : 'Doodles',
    category: item.category,
    thumbnail: item.thumbnail_url,
  })) : [];

  return <IndexPage title={title} subtext={subtext} items={items as any} />;
}

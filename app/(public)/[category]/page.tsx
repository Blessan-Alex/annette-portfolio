import { notFound } from 'next/navigation';
import IndexPage from '../../components/IndexPage';
import { createClient } from '@/utils/supabase/server';
import { getNavLinks } from '@/utils/navigation.server';

export default async function Category({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  
  const navLinks = await getNavLinks();
  const navLink = navLinks.find(n => n.path === `/${category}`);
  
  if (!navLink || !navLink.type) {
    notFound();
  }

  const supabase = await createClient();
  const { data: dbItems } = await supabase
    .from('content')
    .select('*')
    .eq('type', navLink.type)
    .not('published_at', 'is', null)
    .order('published_at', { ascending: false });

  const items = dbItems ? dbItems.map((item: any) => {
    const itemNav = navLinks.find(n => n.type === item.type);
    return {
      id: item.slug,
      title: item.title,
      subtext: item.subtext,
      date: new Date(item.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      tabName: itemNav?.label || item.type,
      category: item.category,
      thumbnail: item.thumbnail_url,
    };
  }) : [];

  return <IndexPage title={navLink.label} subtext={`All ${navLink.label.toLowerCase()} entries.`} items={items as any} />;
}

import { createClient } from '@/utils/supabase/server'
import { DeleteButton } from '../components/DeleteButton'

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params
  
  // Extract the singular type (e.g. 'articles' -> 'article')
  const type = category.replace(/s$/, '')

  const supabase = await createClient()

  const { data: contentItems } = await supabase
    .from('content')
    .select('id, title, slug, type, published_at')
    .eq('type', type)
    .order('created_at', { ascending: false })

  return (
    <div className="flex flex-col gap-12 w-full">
      <header>
        <h1 className="font-serif text-[48px] text-on-surface mb-2 capitalize">{category}</h1>
        <p className="font-sans text-on-surface-variant text-body-md">Manage your {type} entries.</p>
      </header>

      <section className="bento-card bg-white p-8 border border-neutral-100 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-serif text-[28px] text-on-surface capitalize">All {category}</h2>
          <a href={`/admin/${category}/new`} className="px-4 py-2 bg-neutral-900 text-white rounded-lg font-sans text-sm font-medium hover:bg-neutral-800 transition-colors">
            Write New
          </a>
        </div>
        
        {contentItems && contentItems.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left font-sans text-sm">
              <thead>
                <tr className="border-b border-neutral-200 text-neutral-500">
                  <th className="font-medium pb-4 pr-4">Title</th>
                  <th className="font-medium pb-4 px-4">Status</th>
                  <th className="font-medium pb-4 pl-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {contentItems.map((item) => (
                  <tr key={item.id} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors group">
                    <td className="py-4 pr-4 font-medium text-neutral-900">{item.title}</td>
                    <td className="py-4 px-4">
                      {item.published_at ? (
                        <span className="inline-block px-2 py-1 bg-green-50 text-green-700 text-xs rounded-md">Published</span>
                      ) : (
                        <span className="inline-block px-2 py-1 bg-orange-50 text-orange-700 text-xs rounded-md">Draft</span>
                      )}
                    </td>
                    <td className="py-4 pl-4 text-right space-x-2">
                      <a 
                        href={`/admin/${category}/edit/${item.slug}`}
                        className="inline-block p-2 text-neutral-400 hover:text-neutral-900 transition-colors"
                        title="Edit"
                      >
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                      </a>
                      <DeleteButton id={item.id} title={item.title} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed border-neutral-100 rounded-2xl">
            <span className="material-symbols-outlined text-[48px] text-neutral-300 mb-4">edit_document</span>
            <p className="font-sans text-neutral-500">No {type}s created yet. Start writing your first post!</p>
          </div>
        )}
      </section>
    </div>
  )
}

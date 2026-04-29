import { createClient } from '@/utils/supabase/server'
import { DeleteButton } from './components/DeleteButton'
import { getNavLinks } from '@/utils/navigation.server'

export default async function AdminDashboard() {
  const supabase = await createClient()
  const navLinks = await getNavLinks()
  const categoryLinks = navLinks.filter(n => n.type !== null)

  const { data: contentItems } = await supabase
    .from('content')
    .select('id, title, slug, type, published_at, category')
    .order('created_at', { ascending: false })

  return (
    <div className="flex flex-col gap-12 w-full">
      <header>
        <h1 className="font-serif text-[48px] text-on-surface mb-2">Dashboard</h1>
        <p className="font-sans text-on-surface-variant text-body-md">Welcome to your digital garden's backend.</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categoryLinks.map(link => {
          const count = contentItems?.filter(i => i.type === link.type).length || 0
          return (
            <div key={link.id} className="bento-card bg-white p-6 border border-neutral-100 shadow-sm flex flex-col justify-between min-h-[160px]">
              <div>
                <span className="font-sans text-xs uppercase tracking-wider text-outline mb-2 block">{link.label}</span>
                <span className="font-serif text-[42px] text-on-surface">{count}</span>
              </div>
              <a href={`/admin/${link.path.replace('/', '')}/new`} className="font-sans text-sm text-neutral-500 hover:text-neutral-900 flex items-center gap-1">New {link.label.replace(/s$/, '')} <span className="material-symbols-outlined text-[16px]">arrow_forward</span></a>
            </div>
          )
        })}
      </section>

      <section className="bento-card bg-white p-8 border border-neutral-100 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-serif text-[28px] text-on-surface">All Content</h2>
          <a href={`/admin/${categoryLinks[0]?.path.replace('/', '') || 'articles'}/new`} className="px-4 py-2 bg-neutral-900 text-white rounded-lg font-sans text-sm font-medium hover:bg-neutral-800 transition-colors">
            Write New
          </a>
        </div>
        
        {contentItems && contentItems.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left font-sans text-sm">
              <thead>
                <tr className="border-b border-neutral-200 text-neutral-500">
                  <th className="font-medium pb-4 pr-4">Title</th>
                  <th className="font-medium pb-4 px-4">Type</th>
                  <th className="font-medium pb-4 px-4">Status</th>
                  <th className="font-medium pb-4 pl-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {contentItems.map((item) => {
                  const itemNav = categoryLinks.find(n => n.type === item.type)
                  const categoryPath = itemNav?.path.replace('/', '') || `${item.type}s`
                  return (
                    <tr key={item.id} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors group">
                      <td className="py-4 pr-4 font-medium text-neutral-900">{item.title}</td>
                      <td className="py-4 px-4 text-neutral-500 capitalize">{itemNav?.label || item.type}</td>
                      <td className="py-4 px-4">
                        {item.published_at ? (
                          <span className="inline-block px-2 py-1 bg-green-50 text-green-700 text-xs rounded-md">Published</span>
                        ) : (
                          <span className="inline-block px-2 py-1 bg-orange-50 text-orange-700 text-xs rounded-md">Draft</span>
                        )}
                      </td>
                      <td className="py-4 pl-4 text-right space-x-2">
                        <a 
                          href={`/admin/${categoryPath}/edit/${item.slug}`}
                          className="inline-block p-2 text-neutral-400 hover:text-neutral-900 transition-colors"
                          title="Edit"
                        >
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </a>
                        <DeleteButton id={item.id} title={item.title} />
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed border-neutral-100 rounded-2xl">
            <span className="material-symbols-outlined text-[48px] text-neutral-300 mb-4">edit_document</span>
            <p className="font-sans text-neutral-500">No content created yet. Start writing your first post!</p>
          </div>
        )}
      </section>
    </div>
  )
}

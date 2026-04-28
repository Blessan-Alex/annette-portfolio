import { login } from './actions'

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-surface-bright p-6">
      <div className="w-full max-w-sm bento-card bg-white p-8 border border-neutral-100 shadow-sm flex flex-col gap-6">
        <div className="text-center">
          <h1 className="font-serif text-[32px] text-on-surface mb-2">Welcome back.</h1>
          <p className="font-sans text-sm text-on-surface-variant">Sign in to your digital corner.</p>
        </div>
        
        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="font-sans text-sm font-medium text-on-surface">Email</label>
            <input 
              id="email" 
              name="email" 
              type="email" 
              required 
              className="px-4 py-2 rounded-xl border border-neutral-200 focus:outline-none focus:border-neutral-400 font-sans text-sm bg-neutral-50 text-neutral-900"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="font-sans text-sm font-medium text-on-surface">Password</label>
            <input 
              id="password" 
              name="password" 
              type="password" 
              required 
              className="px-4 py-2 rounded-xl border border-neutral-200 focus:outline-none focus:border-neutral-400 font-sans text-sm bg-neutral-50 text-neutral-900"
            />
          </div>
          <button 
            formAction={login}
            className="mt-4 w-full py-2.5 bg-neutral-900 text-white rounded-xl font-sans text-sm font-medium hover:bg-neutral-800 transition-colors"
          >
            Sign In
          </button>
        </form>
      </div>
    </main>
  )
}

# The Annette Files

A minimalistic, elegantly designed personal portfolio and digital garden. Built with Next.js 14 (App Router), Tailwind CSS, and Supabase for a seamless reading and writing experience.

## Features
- **Public Digital Garden**: A masonry-grid portfolio showcasing prose, poetry, sketches, and journal entries.
- **Bento Grid Homepage**: Dynamically curated featured slots (editable via the admin panel).
- **Admin CRM**: A fully custom Content Management System for creating, editing, and deleting entries.
- **TipTap Editor**: Notion-like writing experience with blockquotes, resizable image drag-handles, marginalia footnote support, and highlighting tools.
- **Supabase Auth & Storage**: Secure admin logins and auto-compressed image uploads to a Supabase bucket.

## Tech Stack
- **Framework:** Next.js 14 (React)
- **Styling:** Tailwind CSS (with glassmorphism and custom typography)
- **Database & Auth:** Supabase (PostgreSQL)
- **Editor:** TipTap
- **Animations:** Framer Motion

---

## Local Development

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Create a `.env.local` file in the root directory and add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
   *(Note: You do not need a `GEMINI_API_KEY`. The core app relies entirely on Supabase).*

3. **Run the Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the public site, or navigate to `/login` to access the Admin CRM.

---

## Database Setup

If you are setting this up from scratch, you must create the appropriate tables (`content` and `homepage_settings`) and Row-Level Security (RLS) policies in your Supabase project. Migration scripts can be found inside `supabase/migrations/`. 

Run them via the Supabase CLI:
```bash
npx supabase db push
```
Or manually execute the SQL files in your Supabase SQL Editor.

---

## Deployment (Vercel)

This project is perfectly optimized for Vercel deployment.

1. **Push to GitHub**: Make sure your project is pushed to a GitHub repository.
2. **Import to Vercel**: Log in to Vercel and click **Add New... > Project**. Import your GitHub repository.
3. **Set Environment Variables**: In the Vercel configuration screen, expand the "Environment Variables" section. Add the exact same variables from your `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. **Deploy**: Click Deploy! Vercel will automatically detect that this is a Next.js project, build it, and provide you with a live URL.

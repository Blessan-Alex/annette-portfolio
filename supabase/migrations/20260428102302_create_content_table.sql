-- Create enum type for content
CREATE TYPE content_type AS ENUM ('article', 'journal', 'doodle');

-- Create the unified content table
CREATE TABLE public.content (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    type content_type NOT NULL,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    subtext TEXT,
    content_data JSONB,
    thumbnail_url TEXT,
    category TEXT,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Setup Row Level Security (RLS)
ALTER TABLE public.content ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read published content
CREATE POLICY "Public can view published content" ON public.content
    FOR SELECT
    USING (published_at IS NOT NULL AND published_at <= NOW());

-- Policy: Only authenticated users (admins) can insert/update/delete
CREATE POLICY "Admins can manage content" ON public.content
    FOR ALL
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

-- Create an updated_at trigger
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_content_modtime
    BEFORE UPDATE ON public.content
    FOR EACH ROW
    EXECUTE FUNCTION update_modified_column();

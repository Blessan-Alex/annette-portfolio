CREATE TABLE public.homepage_settings (
    id INTEGER PRIMARY KEY DEFAULT 1,
    featured_cards JSONB NOT NULL DEFAULT '[]'::jsonb,
    masonry_items JSONB NOT NULL DEFAULT '[]'::jsonb,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CHECK (id = 1) -- Ensure only one row exists
);

-- Setup Row Level Security (RLS)
ALTER TABLE public.homepage_settings ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read settings
CREATE POLICY "Public can view homepage settings" ON public.homepage_settings
    FOR SELECT
    USING (true);

-- Policy: Only authenticated users (admins) can update
CREATE POLICY "Admins can manage homepage settings" ON public.homepage_settings
    FOR UPDATE
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

-- Insert initial row with current hardcoded layout
INSERT INTO public.homepage_settings (id, featured_cards, masonry_items) VALUES (
    1,
    '[
      {
        "id": "card-1",
        "type": "prose",
        "label": "Prose",
        "title": "The Wait at St. Pancras",
        "body": "There is a specific kind of silence that falls over a train station just before dawn. It''s not empty, but rather expectant. The architecture itself seems to hold its breath.",
        "date": "Oct 12, 2023",
        "link_url": "/articles/elsewhere"
      },
      {
        "id": "card-2",
        "type": "poetry",
        "label": "Poetry",
        "title": "Monsoon Echoes",
        "body": "Rain hits the glass,\nA rhythm unlearned.\nStreets wash away.",
        "date": "Sep 28, 2023"
      },
      {
        "id": "card-3",
        "type": "image",
        "label": "Sketchbook",
        "image_url": "https://lh3.googleusercontent.com/aida-public/AB6AXuCBUHVYoDlp6xExNf2bv27S8a6T1s-PXGGTG62lTkjLZrloNUJ3P7cyfOskXoYEUPwHXE6diX0SuO2xOLPDTHwdiwhDutniMFX5NVqfBa80bMRYkWhMcOZ4MQ6Jaq4EgU7cvDnppgy0Wc1CkvNItHvRTBIQ6fRHyC1u1OsY0Yz4OZPoF6sYZNHi9gBm0Heu3emFv4t_8OKzImA0hmi48tc0mTczv45UonqUbsAvJsNCB70xQDWVoVDLdwsvxA4kAAhdD_hInUbsZ83T"
      },
      {
        "id": "card-4",
        "type": "journal",
        "label": "Journal",
        "sub_label": "Current Read",
        "title": "The Architecture of Happiness",
        "tags": ["#design", "#space"]
      }
    ]'::jsonb,
    '[]'::jsonb
);

-- Create FAQs table
CREATE TABLE public.faqs (
  id BIGSERIAL PRIMARY KEY,
  domain TEXT NOT NULL,
  q_en TEXT NOT NULL,
  a_en TEXT NOT NULL,
  q_ta TEXT NOT NULL,
  a_ta TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS (but allow public read access for chatbot)
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read FAQs
CREATE POLICY "FAQs are publicly readable"
ON public.faqs
FOR SELECT
USING (true);

-- Create index for faster searching
CREATE INDEX idx_faqs_q_en ON public.faqs USING gin(to_tsvector('english', q_en));
CREATE INDEX idx_faqs_q_ta ON public.faqs USING gin(to_tsvector('tamil', q_ta));
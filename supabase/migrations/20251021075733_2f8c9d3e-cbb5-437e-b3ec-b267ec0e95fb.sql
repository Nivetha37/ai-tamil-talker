-- Enable RLS on chats table (if not already enabled)
ALTER TABLE public.chats ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert chats (public chatbot usage)
CREATE POLICY "Anyone can insert chats"
ON public.chats
FOR INSERT
WITH CHECK (true);

-- Allow anyone to read chats (for dashboard analytics)
CREATE POLICY "Anyone can read chats"
ON public.chats
FOR SELECT
USING (true);
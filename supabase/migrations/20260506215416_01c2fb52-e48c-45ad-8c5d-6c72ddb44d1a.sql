
-- Add new columns
ALTER TABLE public.watchlist
  ADD COLUMN IF NOT EXISTS mood TEXT,
  ADD COLUMN IF NOT EXISTS poster_color TEXT,
  ADD COLUMN IF NOT EXISTS watch_status TEXT NOT NULL DEFAULT 'Plan to Watch',
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now();

-- Validate watch_status values via trigger (avoid CHECK constraints per guidelines)
CREATE OR REPLACE FUNCTION public.validate_watchlist_status()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF NEW.watch_status NOT IN ('Plan to Watch', 'Watching', 'Completed') THEN
    RAISE EXCEPTION 'Invalid watch_status: %', NEW.watch_status;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS validate_watchlist_status_trigger ON public.watchlist;
CREATE TRIGGER validate_watchlist_status_trigger
BEFORE INSERT OR UPDATE ON public.watchlist
FOR EACH ROW EXECUTE FUNCTION public.validate_watchlist_status();

-- updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS update_watchlist_updated_at ON public.watchlist;
CREATE TRIGGER update_watchlist_updated_at
BEFORE UPDATE ON public.watchlist
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Add UPDATE RLS policy (only owner can update)
DROP POLICY IF EXISTS "Users can update their own watchlist" ON public.watchlist;
CREATE POLICY "Users can update their own watchlist"
ON public.watchlist
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

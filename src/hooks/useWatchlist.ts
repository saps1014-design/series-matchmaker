import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Series } from "@/data/series";
import { useToast } from "@/hooks/use-toast";

interface WatchlistItem {
  id: string;
  series_title: string;
  series_description: string | null;
  series_platform: string;
  series_genre: string;
  series_rating: number | null;
}

export function useWatchlist(userId: string | null) {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchWatchlist = useCallback(async () => {
    if (!userId) { setWatchlist([]); return; }
    setLoading(true);
    const { data, error } = await supabase
      .from("watchlist")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast({ title: "Error loading watchlist", description: error.message, variant: "destructive" });
    } else {
      setWatchlist(data || []);
    }
    setLoading(false);
  }, [userId, toast]);

  useEffect(() => { fetchWatchlist(); }, [fetchWatchlist]);

  const addToWatchlist = useCallback(async (series: Series) => {
    if (!userId) return;
    const { error } = await supabase.from("watchlist").insert({
      user_id: userId,
      series_title: series.title,
      series_description: series.description,
      series_platform: series.platform,
      series_genre: series.genre,
      series_rating: series.rating,
    });
    if (error) {
      if (error.code === "23505") {
        toast({ title: "Already in watchlist", description: `${series.title} is already in your watchlist.` });
      } else {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      }
    } else {
      toast({ title: "Added to watchlist", description: `${series.title} saved.` });
      fetchWatchlist();
    }
  }, [userId, fetchWatchlist, toast]);

  const removeFromWatchlist = useCallback(async (title: string) => {
    if (!userId) return;
    const { error } = await supabase.from("watchlist").delete().eq("series_title", title);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      fetchWatchlist();
    }
  }, [userId, fetchWatchlist, toast]);

  const isInWatchlist = useCallback(
    (title: string) => watchlist.some(w => w.series_title === title),
    [watchlist]
  );

  return { watchlist, loading, addToWatchlist, removeFromWatchlist, isInWatchlist };
}

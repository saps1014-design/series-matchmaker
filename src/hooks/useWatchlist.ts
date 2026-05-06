import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Series } from "@/data/series";
import { useToast } from "@/hooks/use-toast";

export type WatchStatus = "Plan to Watch" | "Watching" | "Completed";
export const WATCH_STATUSES: WatchStatus[] = ["Plan to Watch", "Watching", "Completed"];

export interface WatchlistItem {
  id: string;
  series_title: string;
  series_description: string | null;
  series_platform: string;
  series_genre: string;
  series_rating: number | null;
  mood: string | null;
  poster_color: string | null;
  watch_status: WatchStatus;
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
      setWatchlist((data || []) as WatchlistItem[]);
    }
    setLoading(false);
  }, [userId, toast]);

  useEffect(() => { fetchWatchlist(); }, [fetchWatchlist]);

  const addToWatchlist = useCallback(async (series: Series) => {
    if (!userId) {
      toast({ title: "Sign in required", description: "Please sign in to save to your watchlist.", variant: "destructive" });
      return;
    }
    const { error } = await supabase.from("watchlist").insert({
      user_id: userId,
      series_title: series.title,
      series_description: series.description,
      series_platform: series.platform,
      series_genre: series.genre,
      series_rating: series.rating,
      watch_status: "Plan to Watch",
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

  const updateStatus = useCallback(async (title: string, status: WatchStatus) => {
    if (!userId) return;
    // Optimistic update
    setWatchlist(prev => prev.map(w => w.series_title === title ? { ...w, watch_status: status } : w));
    const { error } = await supabase
      .from("watchlist")
      .update({ watch_status: status })
      .eq("series_title", title)
      .eq("user_id", userId);
    if (error) {
      toast({ title: "Could not update status", description: error.message, variant: "destructive" });
      fetchWatchlist();
    }
  }, [userId, fetchWatchlist, toast]);

  const isInWatchlist = useCallback(
    (title: string) => watchlist.some(w => w.series_title === title),
    [watchlist]
  );

  return { watchlist, loading, addToWatchlist, removeFromWatchlist, updateStatus, isInWatchlist };
}

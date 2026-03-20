import { useState, useEffect, useCallback } from "react";

const FAVORITES_KEY = "series-finder-favorites";

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = useCallback((title: string) => {
    setFavorites(prev =>
      prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]
    );
  }, []);

  const isFavorite = useCallback(
    (title: string) => favorites.includes(title),
    [favorites]
  );

  return { favorites, toggleFavorite, isFavorite };
}

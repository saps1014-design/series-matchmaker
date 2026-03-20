import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { platforms, genres, getRecommendations, seriesData, type Series } from "@/data/series";
import { Tv, Clapperboard, Heart, Bookmark, LogIn, LogOut, Search, Star } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";
import { useWatchlist } from "@/hooks/useWatchlist";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";

const SeriesCard = ({
  series,
  isFavorite,
  isInWatchlist,
  onToggleFavorite,
  onToggleWatchlist,
  isLoggedIn,
}: {
  series: Series;
  isFavorite: boolean;
  isInWatchlist: boolean;
  onToggleFavorite: () => void;
  onToggleWatchlist: () => void;
  isLoggedIn: boolean;
}) => (
  <div className="rounded-lg border bg-card p-4 shadow-sm transition-colors hover:bg-accent">
    <div className="flex items-start justify-between gap-2">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-foreground truncate">{series.title}</h3>
          <span className="flex items-center gap-0.5 text-xs text-muted-foreground shrink-0">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            {series.rating}
          </span>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">{series.description}</p>
      </div>
      <div className="flex gap-1 shrink-0">
        <button
          onClick={onToggleFavorite}
          className="rounded-md p-1.5 hover:bg-muted transition-colors"
          title={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
        </button>
        {isLoggedIn && (
          <button
            onClick={onToggleWatchlist}
            className="rounded-md p-1.5 hover:bg-muted transition-colors"
            title={isInWatchlist ? "Remove from watchlist" : "Add to watchlist"}
          >
            <Bookmark className={`h-4 w-4 ${isInWatchlist ? "fill-primary text-primary" : "text-muted-foreground"}`} />
          </button>
        )}
      </div>
    </div>
  </div>
);

const Index = () => {
  const [platform, setPlatform] = useState("");
  const [genre, setGenre] = useState("");
  const [results, setResults] = useState<Series[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [minRating, setMinRating] = useState([0]);

  const { isFavorite, toggleFavorite, favorites } = useFavorites();
  const { user, signOut } = useAuth();
  const { isInWatchlist, addToWatchlist, removeFromWatchlist, watchlist } = useWatchlist(user?.id ?? null);

  const handleSearch = () => {
    if (!platform || !genre) return;
    setResults(getRecommendations(platform, genre));
    setHasSearched(true);
  };

  const filterResults = (list: Series[]) =>
    list.filter(s => {
      const matchesSearch = !searchQuery || s.title.toLowerCase().includes(searchQuery.toLowerCase()) || s.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRating = s.rating >= minRating[0];
      return matchesSearch && matchesRating;
    });

  const filteredResults = filterResults(results);

  const favoriteSeries: Series[] = seriesData.filter(s => favorites.includes(s.title));

  const watchlistSeries: Series[] = watchlist.map(w => ({
    title: w.series_title,
    description: w.series_description || "",
    platform: w.series_platform,
    genre: w.series_genre,
    rating: w.series_rating || 0,
  }));

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-2xl px-4 py-10">
        <header className="mb-8 text-center">
          <div className="mb-2 flex items-center justify-center gap-2">
            <Tv className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold tracking-tight text-foreground">Series Finder</h1>
          </div>
          <p className="text-muted-foreground">Find your next binge-worthy show by platform and genre.</p>
          <div className="mt-3 flex justify-center">
            {user ? (
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span>{user.email}</span>
                <Button variant="ghost" size="sm" onClick={signOut}>
                  <LogOut className="mr-1 h-4 w-4" /> Sign Out
                </Button>
              </div>
            ) : (
              <Button variant="outline" size="sm" asChild>
                <Link to="/auth"><LogIn className="mr-1 h-4 w-4" /> Sign in for Watchlist</Link>
              </Button>
            )}
          </div>
        </header>

        <Tabs defaultValue="search" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="search">
              <Search className="mr-1 h-4 w-4" /> Search
            </TabsTrigger>
            <TabsTrigger value="favorites">
              <Heart className="mr-1 h-4 w-4" /> Favorites ({favorites.length})
            </TabsTrigger>
            <TabsTrigger value="watchlist">
              <Bookmark className="mr-1 h-4 w-4" /> Watchlist ({watchlist.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="search" className="space-y-6">
            <div className="rounded-xl border bg-card p-6 shadow-sm space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Platform</label>
                  <Select value={platform} onValueChange={setPlatform}>
                    <SelectTrigger><SelectValue placeholder="Select platform" /></SelectTrigger>
                    <SelectContent>
                      {platforms.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Genre</label>
                  <Select value={genre} onValueChange={setGenre}>
                    <SelectTrigger><SelectValue placeholder="Select genre" /></SelectTrigger>
                    <SelectContent>
                      {genres.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by title or description..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Minimum Rating: {minRating[0].toFixed(1)}
                </label>
                <Slider value={minRating} onValueChange={setMinRating} min={0} max={10} step={0.5} />
              </div>

              <Button className="w-full" size="lg" onClick={handleSearch} disabled={!platform || !genre}>
                <Clapperboard className="mr-2 h-4 w-4" /> Get Recommendations
              </Button>
            </div>

            {hasSearched && (
              <div className="space-y-3">
                <h2 className="text-lg font-semibold text-foreground">
                  {filteredResults.length > 0
                    ? `${filteredResults.length} results for ${genre} on ${platform}`
                    : `No results found for ${genre} on ${platform}`}
                </h2>
                {filteredResults.map((s, i) => (
                  <SeriesCard
                    key={i}
                    series={s}
                    isFavorite={isFavorite(s.title)}
                    isInWatchlist={isInWatchlist(s.title)}
                    onToggleFavorite={() => toggleFavorite(s.title)}
                    onToggleWatchlist={() => isInWatchlist(s.title) ? removeFromWatchlist(s.title) : addToWatchlist(s)}
                    isLoggedIn={!!user}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="favorites" className="space-y-3">
            {favoriteSeries.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No favorites yet. Click the ❤️ icon to add series.</p>
            ) : (
              favoriteSeries.map((s: Series, i: number) => (
                <SeriesCard
                  key={i}
                  series={s}
                  isFavorite={true}
                  isInWatchlist={isInWatchlist(s.title)}
                  onToggleFavorite={() => toggleFavorite(s.title)}
                  onToggleWatchlist={() => isInWatchlist(s.title) ? removeFromWatchlist(s.title) : addToWatchlist(s)}
                  isLoggedIn={!!user}
                />
              ))
            )}
          </TabsContent>

          <TabsContent value="watchlist" className="space-y-3">
            {!user ? (
              <div className="text-center py-8 space-y-3">
                <p className="text-muted-foreground">Sign in to save series to your watchlist.</p>
                <Button variant="outline" asChild>
                  <Link to="/auth"><LogIn className="mr-1 h-4 w-4" /> Sign In</Link>
                </Button>
              </div>
            ) : watchlistSeries.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">Your watchlist is empty. Click the 🔖 icon to save series.</p>
            ) : (
              watchlistSeries.map((s, i) => (
                <SeriesCard
                  key={i}
                  series={s}
                  isFavorite={isFavorite(s.title)}
                  isInWatchlist={true}
                  onToggleFavorite={() => toggleFavorite(s.title)}
                  onToggleWatchlist={() => removeFromWatchlist(s.title)}
                  isLoggedIn={true}
                />
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;

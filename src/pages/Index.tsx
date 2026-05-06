import { useEffect, useMemo, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import {
  platforms,
  genres,
  moods,
  getRecommendations,
  getTrending,
  getByMood,
  seriesData,
  platformStyles,
  type Series,
  type Mood,
} from "@/data/series";
import {
  Tv,
  Clapperboard,
  Heart,
  Bookmark,
  LogIn,
  LogOut,
  Search,
  Star,
  Sparkles,
  Shuffle,
  TrendingUp,
  Sun,
  Moon,
  Wand2,
} from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";
import { useWatchlist } from "@/hooks/useWatchlist";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Visual poster placeholder using gradients per platform + initials
const platformGradients: Record<string, string> = {
  Netflix: "from-red-600 via-rose-500 to-orange-500",
  "Prime Video": "from-blue-600 via-sky-500 to-cyan-400",
  "Disney+": "from-indigo-700 via-blue-600 to-cyan-500",
  Max: "from-purple-700 via-fuchsia-600 to-pink-500",
  "Apple TV+": "from-zinc-700 via-zinc-800 to-black",
};

const SeriesPoster = ({ series, size = "md" }: { series: Series; size?: "sm" | "md" }) => {
  const initials = series.title
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0]?.toUpperCase())
    .join("");
  const gradient = platformGradients[series.platform] ?? "from-primary to-primary/60";
  const sizeCls = size === "sm" ? "h-16 w-16 text-lg" : "h-20 w-20 sm:h-24 sm:w-24 text-xl sm:text-2xl";
  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden rounded-xl bg-gradient-to-br shadow-md ring-1 ring-black/10 dark:ring-white/10",
        gradient,
        sizeCls
      )}
      aria-hidden="true"
    >
      <div className="absolute inset-0 flex items-center justify-center font-bold text-white drop-shadow-sm tracking-tight">
        {initials}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
      <Tv className="absolute bottom-1.5 right-1.5 h-3 w-3 text-white/80" />
    </div>
  );
};

const StarRating = ({ rating }: { rating: number }) => {
  // Convert 0-10 scale to 0-5 stars
  const stars = rating / 2;
  return (
    <div className="flex items-center gap-0.5" title={`${rating.toFixed(1)} / 10`}>
      {[0, 1, 2, 3, 4].map(i => {
        const fill = Math.max(0, Math.min(1, stars - i));
        return (
          <div key={i} className="relative h-3.5 w-3.5">
            <Star className="absolute inset-0 h-3.5 w-3.5 text-muted-foreground/40" />
            <div className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
            </div>
          </div>
        );
      })}
      <span className="ml-1 text-xs font-medium text-muted-foreground">{rating.toFixed(1)}</span>
    </div>
  );
};

const SeriesCard = ({
  series,
  isFavorite,
  isInWatchlist,
  onToggleFavorite,
  onToggleWatchlist,
  isLoggedIn,
  highlight = false,
}: {
  series: Series;
  isFavorite: boolean;
  isInWatchlist: boolean;
  onToggleFavorite: () => void;
  onToggleWatchlist: () => void;
  isLoggedIn: boolean;
  highlight?: boolean;
}) => (
  <div
    className={cn(
      "group relative rounded-2xl border bg-card p-5 shadow-[var(--shadow-card)] transition-all duration-300",
      "hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)] hover:border-primary/40 animate-fade-in focus-within:ring-2 focus-within:ring-primary/40",
      highlight && "ring-2 ring-primary/40"
    )}
  >
    <div className="flex items-start gap-4">
      <SeriesPoster series={series} />
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1.5">
          <Badge variant="outline" className={cn("border text-[10px] sm:text-xs", platformStyles[series.platform])}>
            {series.platform}
          </Badge>
          <Badge variant="secondary" className="rounded-full text-[10px] sm:text-xs">{series.genre}</Badge>
        </div>
        <h3 className="font-semibold text-foreground text-base sm:text-lg leading-tight group-hover:text-primary transition-colors break-words">
          {series.title}
        </h3>
        <div className="mt-1"><StarRating rating={series.rating} /></div>
        <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2 sm:line-clamp-3">{series.description}</p>
      </div>
      <div className="flex flex-col gap-1 shrink-0">
        <button
          onClick={onToggleFavorite}
          aria-label={isFavorite ? `Remove ${series.title} from favorites` : `Add ${series.title} to favorites`}
          aria-pressed={isFavorite}
          className="rounded-full p-2.5 min-h-[40px] min-w-[40px] flex items-center justify-center hover:bg-muted active:scale-95 transition-all hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
          title={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart className={cn("h-4 w-4 transition-colors", isFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground")} />
        </button>
        {isLoggedIn && (
          <button
            onClick={onToggleWatchlist}
            aria-label={isInWatchlist ? `Remove ${series.title} from watchlist` : `Add ${series.title} to watchlist`}
            aria-pressed={isInWatchlist}
            className="rounded-full p-2.5 min-h-[40px] min-w-[40px] flex items-center justify-center hover:bg-muted active:scale-95 transition-all hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
            title={isInWatchlist ? "Remove from watchlist" : "Add to watchlist"}
          >
            <Bookmark className={cn("h-4 w-4 transition-colors", isInWatchlist ? "fill-primary text-primary" : "text-muted-foreground")} />
          </button>
        )}
      </div>
    </div>
  </div>
);

const SeriesCardSkeleton = () => (
  <div className="rounded-2xl border bg-card p-5 shadow-[var(--shadow-card)]">
    <div className="flex items-start gap-4">
      <Skeleton className="h-20 w-20 sm:h-24 sm:w-24 rounded-xl shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="flex gap-2">
          <Skeleton className="h-4 w-16 rounded-full" />
          <Skeleton className="h-4 w-12 rounded-full" />
        </div>
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
      </div>
    </div>
  </div>
);

const ThemeToggle = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const current = theme === "system" ? resolvedTheme : theme;
  return (
    <Button
      variant="outline"
      size="icon"
      className="rounded-full"
      onClick={() => setTheme(current === "dark" ? "light" : "dark")}
      title="Toggle theme"
      aria-label="Toggle dark mode"
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
};

const FILTERS_KEY = "sf:filters:v1";
type PersistedFilters = {
  platform: string;
  genre: string;
  mood: Mood | "";
  searchQuery: string;
  minRating: number;
};
const loadFilters = (): PersistedFilters | null => {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(FILTERS_KEY);
    return raw ? (JSON.parse(raw) as PersistedFilters) : null;
  } catch {
    return null;
  }
};

const Index = () => {
  const persisted = useMemo(loadFilters, []);
  const [platform, setPlatform] = useState(persisted?.platform ?? "");
  const [genre, setGenre] = useState(persisted?.genre ?? "");
  const [mood, setMood] = useState<Mood | "">(persisted?.mood ?? "");
  const [results, setResults] = useState<Series[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchQuery, setSearchQuery] = useState(persisted?.searchQuery ?? "");
  const [minRating, setMinRating] = useState<number[]>([persisted?.minRating ?? 0]);
  const [surprise, setSurprise] = useState<Series | null>(null);
  const [reasonText, setReasonText] = useState<string>("");

  const { isFavorite, toggleFavorite, favorites } = useFavorites();
  const { user, signOut } = useAuth();
  const { isInWatchlist, addToWatchlist, removeFromWatchlist, watchlist, loading: watchlistLoading } = useWatchlist(user?.id ?? null);

  // Persist filter state
  useEffect(() => {
    try {
      const data: PersistedFilters = { platform, genre, mood, searchQuery, minRating: minRating[0] };
      window.localStorage.setItem(FILTERS_KEY, JSON.stringify(data));
    } catch {
      // ignore
    }
  }, [platform, genre, mood, searchQuery, minRating]);

  const buildReason = (p: string, g: string, m: Mood | "") => {
    const parts: string[] = [];
    if (p) parts.push(p);
    if (g) parts.push(g);
    if (m) parts.push(`a ${m.toLowerCase()} mood`);
    if (parts.length === 0) return "";
    return `Recommended because you selected ${parts.join(" and ")}.`;
  };

  const computeResults = (p: string, g: string, m: Mood | "") => {
    let list: Series[] = [];
    if (p && g) {
      list = getRecommendations(p, g);
    } else if (m) {
      list = getByMood(m, 20);
      if (p) list = list.filter(s => s.platform === p);
    } else if (p) {
      list = seriesData.filter(s => s.platform === p);
    }
    return list;
  };

  const handleSearch = () => {
    if (!platform && !genre && !mood) {
      toast.error("Pick at least a platform, genre, or mood");
      return;
    }
    setResults(computeResults(platform, genre, mood));
    setReasonText(buildReason(platform, genre, mood));
    setSurprise(null);
    setHasSearched(true);
  };

  const handleSurprise = () => {
    const pool = computeResults(platform, genre, mood);
    const source = pool.length > 0 ? pool : seriesData;
    const pick = source[Math.floor(Math.random() * source.length)];
    setSurprise(pick);
    setReasonText(buildReason(platform, genre, mood) || "A handpicked surprise just for you.");
    setHasSearched(true);
    toast.success(`Surprise pick: ${pick.title}`);
  };

  const filterResults = (list: Series[]) =>
    list.filter(s => {
      const matchesSearch = !searchQuery || s.title.toLowerCase().includes(searchQuery.toLowerCase()) || s.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRating = s.rating >= minRating[0];
      return matchesSearch && matchesRating;
    });

  const filteredResults = filterResults(results);
  const trending = useMemo(() => getTrending(6), []);
  const quickPicks = useMemo(() => {
    // Random 3 high-rated picks (rating >= 8.3), stable per mount
    const pool = seriesData.filter(s => s.rating >= 8.3);
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);
  }, []);

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
      <div
        className="absolute inset-x-0 top-0 h-[420px] -z-0 opacity-80"
        style={{ background: "var(--gradient-hero)" }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 py-6 sm:py-10">
        <div className="flex items-center justify-end gap-2 mb-4">
          {user ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="hidden sm:inline">{user.email}</span>
              <Button variant="ghost" size="sm" onClick={signOut}>
                <LogOut className="mr-1 h-4 w-4" /> Sign Out
              </Button>
            </div>
          ) : (
            <Button variant="outline" size="sm" asChild>
              <Link to="/auth"><LogIn className="mr-1 h-4 w-4" /> Sign in</Link>
            </Button>
          )}
          <ThemeToggle />
        </div>

        <header className="mb-10 text-center animate-fade-in">
          <div className="mb-3 inline-flex items-center justify-center gap-2 rounded-full border bg-card/60 backdrop-blur px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-primary" /> Smart TV recommendations
          </div>
          <div className="mb-3 flex items-center justify-center gap-3">
            <Tv className="h-9 w-9 text-primary" />
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight bg-clip-text text-transparent" style={{ backgroundImage: "var(--gradient-primary)" }}>
              Series Finder
            </h1>
          </div>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Discover your next binge by platform, genre, and mood — or let us surprise you.
          </p>
        </header>

        <Tabs defaultValue="search" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 rounded-full p-1 h-auto">
            <TabsTrigger value="search">
              <Search className="mr-1 h-4 w-4" /> <span className="hidden sm:inline">Search</span>
            </TabsTrigger>
            <TabsTrigger value="trending">
              <TrendingUp className="mr-1 h-4 w-4" /> <span className="hidden sm:inline">Trending</span>
            </TabsTrigger>
            <TabsTrigger value="favorites">
              <Heart className="mr-1 h-4 w-4" /> <span className="hidden sm:inline">Favorites</span><span className="ml-1">({favorites.length})</span>
            </TabsTrigger>
            <TabsTrigger value="watchlist">
              <Bookmark className="mr-1 h-4 w-4" /> <span className="hidden sm:inline">Watchlist</span><span className="ml-1">({watchlist.length})</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="search" className="space-y-6">
            <div className="rounded-2xl border bg-card/80 backdrop-blur p-6 shadow-[var(--shadow-card)] space-y-5">
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

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-1.5">
                  <Wand2 className="h-3.5 w-3.5 text-primary" /> Mood
                </label>
                <div className="flex flex-wrap gap-2">
                  {moods.map(m => (
                    <button
                      key={m}
                      onClick={() => setMood(mood === m ? "" : m)}
                      className={cn(
                        "rounded-full border px-3 py-1.5 text-sm transition-all hover:scale-105",
                        mood === m
                          ? "border-primary bg-primary text-primary-foreground shadow-[var(--shadow-elegant)]"
                          : "border-border bg-card text-muted-foreground hover:text-foreground hover:border-primary/40"
                      )}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by title or description..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="pl-9 rounded-full"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Minimum Rating: {minRating[0].toFixed(1)}
                </label>
                <Slider value={minRating} onValueChange={setMinRating} min={0} max={10} step={0.5} />
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  className="flex-1 rounded-full shadow-[var(--shadow-elegant)] transition-transform hover:scale-[1.02] active:scale-[0.98] min-h-[48px]"
                  size="lg"
                  onClick={handleSearch}
                >
                  <Clapperboard className="mr-2 h-4 w-4" /> Get Recommendations
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full transition-transform hover:scale-[1.02] active:scale-[0.98] min-h-[48px]"
                  onClick={handleSurprise}
                >
                  <Shuffle className="mr-2 h-4 w-4" /> Surprise Me
                </Button>
              </div>
            </div>

            {!hasSearched && quickPicks.length > 0 && (
              <div className="space-y-3 animate-fade-in">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-semibold">Quick Picks Tonight</h2>
                </div>
                <p className="text-sm text-muted-foreground">A few highlights to get you started.</p>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {quickPicks.map((s, i) => (
                    <SeriesCard
                      key={i}
                      series={s}
                      highlight
                      isFavorite={isFavorite(s.title)}
                      isInWatchlist={isInWatchlist(s.title)}
                      onToggleFavorite={() => toggleFavorite(s.title)}
                      onToggleWatchlist={() => isInWatchlist(s.title) ? removeFromWatchlist(s.title) : addToWatchlist(s)}
                      isLoggedIn={!!user}
                    />
                  ))}
                </div>
              </div>
            )}

            {reasonText && hasSearched && (
              <div className="rounded-xl border border-primary/30 bg-accent/50 px-4 py-3 text-sm text-accent-foreground flex items-start gap-2 animate-fade-in">
                <Sparkles className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>{reasonText}</span>
              </div>
            )}

            {surprise && (
              <div className="space-y-3 animate-fade-in">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Shuffle className="h-4 w-4 text-primary" /> Your Surprise Pick
                </h2>
                <SeriesCard
                  series={surprise}
                  highlight
                  isFavorite={isFavorite(surprise.title)}
                  isInWatchlist={isInWatchlist(surprise.title)}
                  onToggleFavorite={() => toggleFavorite(surprise.title)}
                  onToggleWatchlist={() => isInWatchlist(surprise.title) ? removeFromWatchlist(surprise.title) : addToWatchlist(surprise)}
                  isLoggedIn={!!user}
                />
              </div>
            )}

            {hasSearched && !surprise && (
              <div className="space-y-3">
                {filteredResults.length > 0 ? (
                  <>
                    <h2 className="text-lg font-semibold text-foreground">
                      {filteredResults.length} {filteredResults.length === 1 ? "result" : "results"}
                    </h2>
                    <div className="grid gap-4 sm:grid-cols-2">
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
                  </>
                ) : (
                  <div className="rounded-2xl border border-dashed bg-card/50 p-8 text-center space-y-4 animate-fade-in">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent">
                      <Search className="h-6 w-6 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-lg font-semibold">No perfect matches found</h3>
                      <p className="text-sm text-muted-foreground">Try another mood or use Surprise Me.</p>
                    </div>
                    <Button onClick={handleSurprise} className="rounded-full" size="lg">
                      <Shuffle className="mr-2 h-4 w-4" /> Surprise Me Instead
                    </Button>
                  </div>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="trending" className="space-y-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">Trending Now</h2>
            </div>
            <p className="text-sm text-muted-foreground">The highest-rated series people are watching right now.</p>
            <div className="grid gap-4 sm:grid-cols-2">
              {trending.map((s, i) => (
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
          </TabsContent>

          <TabsContent value="favorites" className="space-y-3">
            {favoriteSeries.length === 0 ? (
              <div className="rounded-2xl border border-dashed bg-card/50 p-8 text-center space-y-3 animate-fade-in">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent">
                  <Heart className="h-6 w-6 text-red-500" />
                </div>
                <h3 className="text-lg font-semibold">No favorites yet</h3>
                <p className="text-sm text-muted-foreground">Tap the ❤️ icon on any series to save it here.</p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {favoriteSeries.map((s: Series, i: number) => (
                  <SeriesCard
                    key={i}
                    series={s}
                    isFavorite={true}
                    isInWatchlist={isInWatchlist(s.title)}
                    onToggleFavorite={() => toggleFavorite(s.title)}
                    onToggleWatchlist={() => isInWatchlist(s.title) ? removeFromWatchlist(s.title) : addToWatchlist(s)}
                    isLoggedIn={!!user}
                  />
                ))}
              </div>
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
              <div className="rounded-2xl border border-dashed bg-card/50 p-8 text-center space-y-3 animate-fade-in">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent">
                  <Bookmark className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">Your watchlist is empty</h3>
                <p className="text-sm text-muted-foreground">Tap the 🔖 icon on any series to add it.</p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {watchlistSeries.map((s, i) => (
                  <SeriesCard
                    key={i}
                    series={s}
                    isFavorite={isFavorite(s.title)}
                    isInWatchlist={true}
                    onToggleFavorite={() => toggleFavorite(s.title)}
                    onToggleWatchlist={() => removeFromWatchlist(s.title)}
                    isLoggedIn={true}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;

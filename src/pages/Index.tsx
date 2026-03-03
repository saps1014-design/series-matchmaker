import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { platforms, genres, getRecommendations, type Series } from "@/data/series";
import { Tv, Clapperboard } from "lucide-react";

const Index = () => {
  const [platform, setPlatform] = useState("");
  const [genre, setGenre] = useState("");
  const [results, setResults] = useState<Series[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    if (!platform || !genre) return;
    setResults(getRecommendations(platform, genre));
    setHasSearched(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-2xl px-4 py-16">
        <header className="mb-12 text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <Tv className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold tracking-tight text-foreground">
              Series Finder
            </h1>
          </div>
          <p className="text-muted-foreground">
            Find your next binge-worthy show by platform and genre.
          </p>
        </header>

        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Platform</label>
              <Select value={platform} onValueChange={setPlatform}>
                <SelectTrigger>
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  {platforms.map(p => (
                    <SelectItem key={p} value={p}>{p}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Genre</label>
              <Select value={genre} onValueChange={setGenre}>
                <SelectTrigger>
                  <SelectValue placeholder="Select genre" />
                </SelectTrigger>
                <SelectContent>
                  {genres.map(g => (
                    <SelectItem key={g} value={g}>{g}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button
            className="mt-6 w-full"
            size="lg"
            onClick={handleSearch}
            disabled={!platform || !genre}
          >
            <Clapperboard className="mr-2 h-4 w-4" />
            Get Recommendations
          </Button>
        </div>

        {hasSearched && (
          <div className="mt-8 space-y-3">
            <h2 className="text-lg font-semibold text-foreground">
              {results.length > 0
                ? `${results.length} results for ${genre} on ${platform}`
                : `No results found for ${genre} on ${platform}`}
            </h2>
            {results.map((s, i) => (
              <div
                key={i}
                className="rounded-lg border bg-card p-4 shadow-sm transition-colors hover:bg-accent"
              >
                <h3 className="font-semibold text-foreground">{s.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;

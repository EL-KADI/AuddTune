
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SongResult } from "@/services/auddAPI";
import { Play, Clock } from "lucide-react";

interface RecentSearchesProps {
  latestResult: SongResult | null;
}

const RecentSearches: React.FC<RecentSearchesProps> = ({ latestResult }) => {
  const [recentSearches, setRecentSearches] = useState<SongResult[]>([]);

  useEffect(() => {
  
    const savedSearches = localStorage.getItem("recentSearches");
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);

  useEffect(() => {
    if (latestResult) {
      const updatedSearches = [
        latestResult,
        ...recentSearches.filter(
          (search) => !(search.artist === latestResult.artist && search.title === latestResult.title)
        ),
      ].slice(0, 5); 

      setRecentSearches(updatedSearches);
      localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
    }
  }, [latestResult]);

  if (recentSearches.length === 0) return null;

  return (
    <section className="py-16 px-6">
      <div className="container mx-auto">
        <Card className="bg-black/40 backdrop-blur-md border-white/10">
          <CardHeader className="bg-gradient-to-r from-music-tertiary/20 to-music-primary/20 pb-2">
            <CardTitle className="flex items-center gap-2 text-xl md:text-2xl text-white">
              <Clock className="h-5 w-5" />
              Recent Searches
            </CardTitle>
            <CardDescription className="text-white/70">
              Your recently identified songs
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentSearches.map((song, index) => {
             
                const getArtworkUrl = (): string => {
                  if (song.apple_music?.artwork?.url) {
                    return song.apple_music.artwork.url.replace('{w}', '120').replace('{h}', '120');
                  }
                  if (song.spotify?.album?.images?.[0]?.url) {
                    return song.spotify.album.images[0].url;
                  }
                  if (song.deezer?.album?.cover_medium) {
                    return song.deezer.album.cover_medium;
                  }
                  return "https://placehold.co/120x120/8B5CF6/FFFFFF?text=No+Image";
                };

                const artworkUrl = getArtworkUrl();

                return (
                  <div 
                    key={`${song.artist}-${song.title}-${index}`} 
                    className="flex items-center gap-3 bg-white/5 rounded-lg p-3 hover:bg-music-primary/10 transition-colors music-hover"
                  >
                    <div className="relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                      <img 
                        src={artworkUrl} 
                        alt={song.title} 
                        className="w-full h-full object-cover"
                      />
                      <a 
                        href={song.song_link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                      >
                        <Play className="h-6 w-6 text-white" />
                      </a>
                    </div>
                    <div className="overflow-hidden">
                      <p className="font-medium text-white text-sm truncate">{song.title}</p>
                      <p className="text-white/70 text-xs truncate">{song.artist}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default RecentSearches;

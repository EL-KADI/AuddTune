
import React from "react";
import { SongResult as SongResultType } from "@/services/auddAPI";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Music, Play } from "lucide-react";

interface SongResultProps {
  result: SongResultType | null;
}

const SongResult: React.FC<SongResultProps> = ({ result }) => {
  if (!result) return null;

 
  const getArtworkUrl = (): string => {
    if (result.apple_music?.artwork?.url) {
      return result.apple_music.artwork.url.replace('{w}', '300').replace('{h}', '300');
    }
    if (result.spotify?.album?.images?.[0]?.url) {
      return result.spotify.album.images[0].url;
    }
    if (result.deezer?.album?.cover_medium) {
      return result.deezer.album.cover_medium;
    }
    return "https://placehold.co/300x300/8B5CF6/FFFFFF?text=No+Image";
  };


  const getPreviewUrl = (): string | null => {
    if (result.apple_music?.previews?.[0]?.url) {
      return result.apple_music.previews[0].url;
    }
    if (result.spotify?.preview_url) {
      return result.spotify.preview_url;
    }
    if (result.deezer?.preview) {
      return result.deezer.preview;
    }
    return null;
  };

  const artworkUrl = getArtworkUrl();
  const previewUrl = getPreviewUrl();

  return (
    <div className="animate-scale-in">
      <Card className="overflow-hidden bg-black/40 backdrop-blur-md border-white/10">
        <CardHeader className="bg-gradient-to-r from-music-primary/20 to-music-tertiary/20 pb-2">
          <CardTitle className="text-xl md:text-2xl text-white">
            Found a match!
          </CardTitle>
          <CardDescription className="text-white/70">
            Here's what we identified
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="relative w-full md:w-36 h-36 rounded-lg overflow-hidden music-hover">
              <img 
                src={artworkUrl} 
                alt={`${result.title} by ${result.artist}`}
                className="w-full h-full object-cover"
              />
              {previewUrl && (
                <a 
                  href={previewUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                >
                  <Play className="h-12 w-12 text-white" />
                </a>
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-music-secondary">{result.title}</h3>
              <p className="text-xl text-white/80 mb-4">{result.artist}</p>
              
              <div className="space-y-1 text-sm text-white/60">
                {result.album && <p><span className="font-semibold">Album:</span> {result.album}</p>}
                {result.release_date && <p><span className="font-semibold">Released:</span> {result.release_date}</p>}
                {result.label && <p><span className="font-semibold">Label:</span> {result.label}</p>}
              </div>
              
              <div className="mt-6 flex flex-wrap gap-2">
                {result.song_link && (
                  <a href={result.song_link} target="_blank" rel="noopener noreferrer">
                    <Button size="sm" variant="outline" className="border-music-primary/50 hover:bg-music-primary/20 text-music-secondary">
                      <Music className="h-4 w-4 mr-2" />
                      Listen
                    </Button>
                  </a>
                )}
                
                {result.spotify?.external_urls?.spotify && (
                  <a href={result.spotify.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                    <Button size="sm" variant="outline" className="border-[#1DB954]/50 hover:bg-[#1DB954]/20 text-[#1DB954]">
                      <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                      </svg>
                      Spotify
                    </Button>
                  </a>
                )}
                
                {result.apple_music?.url && (
                  <a href={result.apple_music.url} target="_blank" rel="noopener noreferrer">
                    <Button size="sm" variant="outline" className="border-[#FA586A]/50 hover:bg-[#FA586A]/20 text-[#FA586A]">
                      <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 00-1.877-.726 10.496 10.496 0 00-1.564-.15c-.04-.003-.083-.01-.124-.013H5.986c-.152.01-.303.017-.455.026-.747.043-1.49.123-2.193.4-1.336.53-2.3 1.452-2.865 2.78-.192.448-.292.925-.363 1.408-.056.392-.088.785-.1 1.18 0 .032-.007.062-.01.093v12.223c.01.14.017.283.027.424.05.815.154 1.624.497 2.373.65 1.42 1.738 2.353 3.234 2.801.42.127.856.187 1.293.228.555.053 1.11.06 1.667.06h11.03a12.5 12.5 0 001.57-.083c.822-.088 1.593-.28 2.298-.713a5.223 5.223 0 001.89-2.048c.267-.513.434-1.064.52-1.636.127-.856.15-1.717.15-2.582 0-.156 0-.31-.006-.468V6.123zm-6.423 3.99v5.712c0 .417-.058.827-.244 1.206-.29.59-.76.962-1.388 1.14-.35.1-.706.157-1.07.173-.95.045-1.773-.6-1.943-1.536a1.88 1.88 0 01-.023-.346c.012-2.06 1.73-2.97 3.67-2.76v-.6a.476.476 0 00-.203-.466c-.148-.084-.322-.12-.49-.144a4.018 4.018 0 00-2.405.396c-.31.17-.616.37-.887.607a2.953 2.953 0 00-.994 1.798c-.058.333-.076.666-.05 1.01.08 1.085.516 1.9 1.497 2.502a5.35 5.35 0 002.705.734 7.3 7.3 0 001.714-.198c.367-.1.727-.258 1.052-.48.854-.58 1.277-1.43 1.37-2.454.03-.367.035-.754.057-1.148.5-.1 0-5.1 0-5.1V10.2c0-.48-.012-.468-.506-.617-1.157-.345-2.325-.235-3.454.287-.19.088-.376.184-.53.326zm-8.365 1.59c.725-.868 1.82-1.17 2.814-1.204.84-.033 1.65.132 2.373.588.07.045.18.148.18.226.007 1.426 0 2.85.006 4.28a.755.755 0 01-.12.112c-.544.315-1.13.45-1.752.404a3.69 3.69 0 01-1.367-.308c-.86-.4-1.8-1.2-1.14-2.66.374-.806 1.047-1.184 1.208-1.246.14-.053.216-.247-.023-.41-.905-.615-1.23-1.468-1.22-2.5.006-.845.382-1.534.912-2.127 1.324-1.48 3.434-1.805 5.35-1.308 1.087.28 1.91.864 2.455 1.84.293.536.437 1.105.44 1.712.003.887-.268 1.665-.83 2.32a4.296 4.296 0 01-2.99 1.438c-.35.017-.7.003-1.052 0-.08 0-.12-.033-.137-.11a39.78 39.78 0 01-.08-.672c-.01-.134.03-.183.16-.188.35-.005.697-.042 1.026-.152a2.55 2.55 0 001.458-1.08c.397-.63.493-1.307.3-1.987a2.176 2.176 0 00-1.894-1.57c-.96-.104-1.778.256-2.26 1.088-.312.538-.363 1.233-.205 1.874.115.47.14.856-.088 1.21z" fill="currentColor"/>
                      </svg>
                      Apple Music
                    </Button>
                  </a>
                )}
               
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SongResult;

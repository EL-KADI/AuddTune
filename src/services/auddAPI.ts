
import { toast } from "sonner";

const API_ENDPOINT = "https://api.audd.io/";
const API_TOKEN = "fac53c4ba2c513e9794a8dde58b15cf7";

export interface RecognizeByUrlParams {
  url: string;
  returnMeta?: string[];
  market?: string;
}

export interface RecognizeByFileParams {
  file: File;
  returnMeta?: string[];
  market?: string;
}

export interface SongResult {
  artist: string;
  title: string;
  album: string;
  release_date: string;
  label: string;
  timecode: string;
  song_link: string;
  apple_music?: {
    previews: { url: string }[];
    artwork: { url: string };
    url: string;
  };
  spotify?: {
    external_urls: { spotify: string };
    preview_url: string;
    album: { images: { url: string }[] };
  };
  deezer?: {
    preview: string;
    link: string;
    album: { cover_medium: string };
  };
}

export interface RecognizeResponse {
  status: string;
  result: SongResult | null;
  error?: { error_code: number; error_message: string };
}

class AuddAPIService {
  private apiToken = API_TOKEN;
  private apiEndpoint = API_ENDPOINT;

  // Function to validate if a URL is likely to contain audio
  isValidAudioUrl(url: string): boolean {
    if (!url) return false;
    
    // Check if URL is properly formatted
    try {
      new URL(url);
    } catch (e) {
      return false;
    }
    
    // Check common audio/video platforms and file extensions
    const supportedDomains = [
      'youtube.com', 'youtu.be', 'soundcloud.com', 'spotify.com',
      'deezer.com', 'instagram.com', 'twitter.com', 'facebook.com',
      'tiktok.com'
    ];
    
    const audioExtensions = ['.mp3', '.wav', '.m4a', '.aac', '.ogg', '.flac', '.wma', '.mp4', '.avi'];
    
    // Check domain
    const urlObj = new URL(url);
    const domainMatch = supportedDomains.some(domain => urlObj.hostname.includes(domain));
    
    // Check file extension
    const extensionMatch = audioExtensions.some(ext => url.toLowerCase().endsWith(ext));
    
    return domainMatch || extensionMatch;
  }

  async recognizeSongByUrl(params: RecognizeByUrlParams): Promise<RecognizeResponse> {
    const { url, returnMeta = ["apple_music", "spotify", "deezer"], market = "us" } = params;
    
    // Validate URL before sending request
    if (!this.isValidAudioUrl(url)) {
      return {
        status: "error",
        result: null,
        error: {
          error_code: 600,
          error_message: "Invalid audio URL. Please provide a direct link to an audio file or a supported platform (YouTube, SoundCloud, etc.)"
        }
      };
    }

    const formData = new FormData();
    formData.append("api_token", this.apiToken);
    formData.append("url", url);
    formData.append("return", returnMeta.join(","));
    formData.append("market", market);

    try {
      console.log("Sending request to AudD API with URL:", url);
      const response = await fetch(this.apiEndpoint, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("AudD API response:", data);
      return data;
    } catch (error) {
      console.error("Error recognizing song:", error);
      toast.error("Failed to recognize song. Please try again.");
      throw error;
    }
  }

  async recognizeSongByFile(params: RecognizeByFileParams): Promise<RecognizeResponse> {
    const { file, returnMeta = ["apple_music", "spotify", "deezer"], market = "us" } = params;

    const formData = new FormData();
    formData.append("api_token", this.apiToken);
    formData.append("file", file);
    formData.append("return", returnMeta.join(","));
    formData.append("market", market);

    try {
      const response = await fetch(this.apiEndpoint, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error recognizing song:", error);
      toast.error("Failed to recognize song. Please try again.");
      throw error;
    }
  }
}

export const auddAPI = new AuddAPIService();


import { useState } from "react";
import { toast } from "sonner";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SongResult from "@/components/SongResult";
import RecentSearches from "@/components/RecentSearches";
import Footer from "@/components/Footer";
import { auddAPI, SongResult as SongResultType } from "@/services/auddAPI";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [songResult, setSongResult] = useState<SongResultType | null>(null);
  const [noMatch, setNoMatch] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleRecognize = async (urlOrFile: string | File) => {
    setIsLoading(true);
    setNoMatch(false);
    setSongResult(null);
    setErrorMessage(null);
    
    try {
      let response;
      
      if (typeof urlOrFile === "string") {
        console.log("Recognizing song by URL:", urlOrFile);
        response = await auddAPI.recognizeSongByUrl({ url: urlOrFile });
      } else {
        console.log("Recognizing song by File:", urlOrFile.name);
        response = await auddAPI.recognizeSongByFile({ file: urlOrFile });
      }
      
      console.log("Recognition response:", response);
      
      if (response.status === "success") {
        if (response.result) {
          setSongResult(response.result);
          toast.success("Song successfully identified!");
        } else {
          setNoMatch(true);
          toast.error("No matches found. Try with a different audio sample.");
        }
      } else {
        const errorMsg = response.error?.error_message || "An error occurred during recognition";
        setErrorMessage(errorMsg);
        toast.error(errorMsg);
        
        // Set noMatch to true to display the error message section
        setNoMatch(true);
      }
    } catch (error) {
      console.error("Recognition error:", error);
      setErrorMessage("Failed to process your request. Please try again.");
      toast.error("Failed to process your request. Please try again.");
      setNoMatch(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-music-dark text-white">
      <Header />
      
      <main className="flex-grow pt-16">
        <Hero onRecognize={handleRecognize} isLoading={isLoading} />
        
        {(songResult || noMatch) && (
          <section className="py-16 px-6">
            <div className="container mx-auto">
              {songResult ? (
                <SongResult result={songResult} />
              ) : (
                <div className="bg-black/40 backdrop-blur-md p-8 rounded-xl border border-white/10 text-center animate-fade-in">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {errorMessage ? "Recognition Failed" : "No Match Found"}
                  </h3>
                  <p className="text-white/70">
                    {errorMessage || "We couldn't identify the song from your audio. Try with a different audio sample or URL."}
                  </p>
                  {typeof errorMessage === 'string' && errorMessage.includes("fingerprint") && (
                    <div className="mt-4 text-sm text-white/70 bg-music-primary/10 p-4 rounded">
                      <p className="mb-2"><strong>Tips for better results:</strong></p>
                      <ul className="list-disc list-inside text-left space-y-1">
                        <li>Use direct links to audio files or from supported platforms</li>
                        <li>For YouTube videos, use the regular watch URL (e.g., https://youtube.com/watch?v=...)</li>
                        <li>Make sure your audio sample is 2-12 seconds long</li>
                        <li>Ensure the audio is clear with minimal background noise</li>
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>
        )}
        
        <RecentSearches latestResult={songResult} />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;

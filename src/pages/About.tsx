
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Music, Headphones, Server, Globe } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-music-dark text-white">
      <Header />
      
      <main className="flex-grow pt-24 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gradient">About AuddTune</h1>
            <p className="text-xl text-white/80">Discover the music playing around you</p>
          </div>
          
          <div className="bg-black/40 backdrop-blur-md p-8 rounded-xl border border-white/10 mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Music className="mr-3 text-music-primary" />
              Our Mission
            </h2>
            <p className="text-lg mb-6 text-white/90">
              AuddTune was created with a simple goal: to help music lovers identify songs quickly and easily. 
              Our advanced audio recognition technology can identify millions of songs in seconds, whether from an 
              uploaded file, a URL, or directly from your device's microphone.
            </p>
            <p className="text-lg text-white/90">
              We believe that music is meant to be shared and enjoyed by everyone. That's why we've built a 
              tool that makes discovering new music as simple as pressing a button.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-black/30 backdrop-blur-md p-6 rounded-xl border border-white/10 flex flex-col items-center text-center">
              <Headphones className="text-music-primary h-12 w-12 mb-4" />
              <h3 className="text-xl font-bold mb-2">Instant Recognition</h3>
              <p className="text-white/70">
                Identify songs in seconds using our powerful audio fingerprinting technology
              </p>
            </div>
            
            <div className="bg-black/30 backdrop-blur-md p-6 rounded-xl border border-white/10 flex flex-col items-center text-center">
              <Server className="text-music-primary h-12 w-12 mb-4" />
              <h3 className="text-xl font-bold mb-2">Multiple Sources</h3>
              <p className="text-white/70">
                Upload files, paste URLs, or record directly from your device's microphone
              </p>
            </div>
            
            <div className="bg-black/30 backdrop-blur-md p-6 rounded-xl border border-white/10 flex flex-col items-center text-center">
              <Globe className="text-music-primary h-12 w-12 mb-4" />
              <h3 className="text-xl font-bold mb-2">Extensive Database</h3>
              <p className="text-white/70">
                Access metadata from multiple sources including Apple Music, Spotify, and Deezer
              </p>
            </div>
          </div>
          
          <div className="bg-black/40 backdrop-blur-md p-8 rounded-xl border border-white/10 mb-12">
            <h2 className="text-2xl font-bold mb-6">How It Works</h2>
            <ol className="list-decimal list-inside space-y-4 text-white/90">
              <li>
                <span className="font-semibold">Capture the Audio:</span> Upload a file, provide a URL, or record directly
              </li>
              <li>
                <span className="font-semibold">Audio Processing:</span> Our system creates an audio fingerprint from your sample
              </li>
              <li>
                <span className="font-semibold">Database Matching:</span> The fingerprint is compared against millions of songs
              </li>
              <li>
                <span className="font-semibold">Results Delivery:</span> We provide you with the song information and streaming links
              </li>
            </ol>
          </div>
          
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-4">Powered by AudD API</h2>
            <p className="text-white/80">
              AuddTune is powered by AudD's advanced music recognition technology. 
              Learn more about their API at <a href="https://audd.io" target="_blank" rel="noopener noreferrer" className="text-music-primary hover:underline">audd.io</a>.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;

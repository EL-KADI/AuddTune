
import { Heart, Music } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black/50 py-8 px-6 border-t border-music-primary/20">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Music className="h-6 w-6 text-music-primary" />
            <span className="text-xl font-bold text-gradient">AuddTune</span>
          </div>
          
          <div className="text-white/60 text-sm">
            <p>Powered by AudD Music Recognition API</p>
          </div>
          
     
        </div>
        
        <div className="mt-8 pt-4 border-t border-white/10 text-center pb-8 2xl:pb-0 text-white/40 text-xs">
          <p>© {new Date().getFullYear()} AuddTune. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

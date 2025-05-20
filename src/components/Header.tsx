
import { Music } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full bg-music-dark/80 backdrop-blur-md fixed top-0 z-50 py-4 px-6 md:px-12 border-b border-music-primary/20">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <Music className="h-8 w-8 text-music-primary animate-pulse-slow" />
          <h1 className="text-2xl font-bold text-gradient">AuddTune</h1>
        </Link>
        <nav>
          <ul className="flex gap-6">
            <li>
              <Link to="/" className="text-white/80 hover:text-white transition-colors cursor-pointer">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-white/80 hover:text-white transition-colors cursor-pointer">
                About
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

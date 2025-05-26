
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { AlertTriangle, Star } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'py-2 bg-survival-dark/80 backdrop-blur-md shadow-md'
          : 'py-4 bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center space-x-2">
          <div className="relative flex items-center">
            <AlertTriangle className="w-6 h-6 text-survival-accent" />
            <div className="ml-2">
              <h1 className="text-lg font-bold text-white">Survivalist GPT</h1>
              <p className="text-xs text-gray-400">Presented by AiWebTools.Ai</p>
            </div>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4">
          <a
            href="https://chatgpt.com/g/g-9hq2xSwvf-survivalist-gpt"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-sm"
          >
            USE SURVIVALIST GPT NOW
          </a>
          <a
            href="https://docs.google.com/document/d/e/2PACX-1vTEt3ZfmBvY6GU_57TqL26ODSe1qpKWOnzq3cDjHjeS3qBbqGINPAyxlxAdE8v39LhJYpYdDo3d8m9e/pub"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary text-xs px-4 py-2 relative group"
          >
            <Star className="w-4 h-4 mr-2 inline-block text-yellow-400 animate-pulse-soft drop-shadow-[0_0_8px_rgba(255,215,0,0.8)]" />
            DOWNLOAD OPEN SOURCE PROMPT FOR LOCAL DEPLOYMENT
            <div className="absolute inset-0 rounded-full bg-yellow-400/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
          </a>
          <a
            href="https://www.aiwebtools.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary text-sm"
          >
            MORE AI TOOLS
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-6 h-6 flex flex-col justify-around">
            <span
              className={cn(
                'bg-white block h-0.5 w-full rounded-sm transition-all duration-300',
                isMobileMenuOpen && 'rotate-45 translate-y-[8px]'
              )}
            ></span>
            <span
              className={cn(
                'bg-white block h-0.5 w-full rounded-sm transition-all duration-300',
                isMobileMenuOpen && 'opacity-0'
              )}
            ></span>
            <span
              className={cn(
                'bg-white block h-0.5 w-full rounded-sm transition-all duration-300',
                isMobileMenuOpen && '-rotate-45 -translate-y-[8px]'
              )}
            ></span>
          </div>
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          'md:hidden absolute top-full left-0 right-0 bg-survival-dark/95 backdrop-blur-md transition-all duration-300 ease-in-out border-t border-survival-accent/20',
          isMobileMenuOpen
            ? 'max-h-[300px] opacity-100 border-opacity-100'
            : 'max-h-0 opacity-0 border-opacity-0 pointer-events-none'
        )}
      >
        <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
          <a
            href="https://chatgpt.com/g/g-9hq2xSwvf-survivalist-gpt"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-center text-sm"
          >
            USE SURVIVALIST GPT NOW
          </a>
          <a
            href="https://docs.google.com/document/d/e/2PACX-1vTEt3ZfmBvY6GU_57TqL26ODSe1qpKWOnzq3cDjHjeS3qBbqGINPAyxlxAdE8v39LhJYpYdDo3d8m9e/pub"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary text-center text-xs relative group"
          >
            <Star className="w-4 h-4 mr-2 inline-block text-yellow-400 animate-pulse-soft drop-shadow-[0_0_8px_rgba(255,215,0,0.8)]" />
            DOWNLOAD OPEN SOURCE PROMPT FOR LOCAL DEPLOYMENT
            <div className="absolute inset-0 rounded-full bg-yellow-400/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
          </a>
          <a
            href="https://www.aiwebtools.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary text-center text-sm"
          >
            MORE AI TOOLS
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

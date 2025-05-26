
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
          ? 'py-2 bg-survival-dark/95 backdrop-blur-md shadow-lg border-b border-survival-accent/20'
          : 'py-3 bg-survival-dark/90 backdrop-blur-sm shadow-md'
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center space-x-3">
          <div className="relative flex items-center">
            <AlertTriangle className="w-7 h-7 md:w-6 md:h-6 text-survival-accent" />
            <div className="ml-3 md:ml-2">
              <h1 className="text-xl md:text-lg font-bold text-white">Survivalist GPT</h1>
              <p className="text-xs text-gray-400">Presented by AiWebTools.Ai</p>
              <p className="text-xs text-red-400">Made with love ❤️</p>
            </div>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-3">
          <a
            href="https://chatgpt.com/g/g-9hq2xSwvf-survivalist-gpt"
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-survival-accent to-survival-brightAccent rounded-full shadow-lg hover:shadow-xl hover:shadow-survival-accent/25 transform hover:scale-105 transition-all duration-300 ease-out group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-survival-brightAccent to-survival-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative z-10">USE SURVIVALIST GPT NOW</span>
          </a>
          <a
            href="https://docs.google.com/document/d/e/2PACX-1vTEt3ZfmBvY6GU_57TqL26ODSe1qpKWOnzq3cDjHjeS3qBbqGINPAyxlxAdE8v39LhJYpYdDo3d8m9e/pub"
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center justify-center px-5 py-3 text-xs font-medium text-white bg-gradient-to-r from-yellow-600 to-yellow-500 rounded-full shadow-lg hover:shadow-xl hover:shadow-yellow-500/25 transform hover:scale-105 transition-all duration-300 ease-out group overflow-hidden border border-yellow-400/30"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Star className="w-4 h-4 mr-2 relative z-10 text-yellow-200 group-hover:text-white transition-colors" />
            <span className="relative z-10">DOWNLOAD OPEN SOURCE PROMPT</span>
            <div className="absolute inset-0 rounded-full bg-yellow-400/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </a>
          <a
            href="https://www.aiwebtools.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center justify-center px-5 py-3 text-sm font-medium text-white bg-gradient-to-r from-survival-metal to-survival-dark rounded-full border border-survival-accent/30 shadow-lg hover:shadow-xl hover:shadow-survival-accent/20 transform hover:scale-105 transition-all duration-300 ease-out group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-survival-accent/20 to-survival-green/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative z-10">MORE AI TOOLS</span>
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-3 rounded-full bg-survival-accent/20 hover:bg-survival-accent/30 transition-colors"
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
          'lg:hidden absolute top-full left-0 right-0 bg-survival-dark transition-all duration-300 ease-in-out border-t border-survival-accent/30 shadow-lg',
          isMobileMenuOpen
            ? 'max-h-[400px] opacity-100 border-opacity-100'
            : 'max-h-0 opacity-0 border-opacity-0 pointer-events-none'
        )}
      >
        <div className="container mx-auto px-4 py-6 flex flex-col space-y-4">
          <a
            href="https://chatgpt.com/g/g-9hq2xSwvf-survivalist-gpt"
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center justify-center w-full px-6 py-4 text-base font-semibold text-white bg-gradient-to-r from-survival-accent to-survival-brightAccent rounded-xl shadow-lg hover:shadow-xl hover:shadow-survival-accent/25 transform hover:scale-105 transition-all duration-300 ease-out group overflow-hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-survival-brightAccent to-survival-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative z-10">USE SURVIVALIST GPT NOW</span>
          </a>
          <a
            href="https://docs.google.com/document/d/e/2PACX-1vTEt3ZfmBvY6GU_57TqL26ODSe1qpKWOnzq3cDjHjeS3qBbqGINPAyxlxAdE8v39LhJYpYdDo3d8m9e/pub"
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center justify-center w-full px-6 py-4 text-sm font-medium text-white bg-gradient-to-r from-yellow-600 to-yellow-500 rounded-xl shadow-lg hover:shadow-xl hover:shadow-yellow-500/25 transform hover:scale-105 transition-all duration-300 ease-out group overflow-hidden border border-yellow-400/30"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Star className="w-5 h-5 mr-3 relative z-10 text-yellow-200 group-hover:text-white transition-colors" />
            <span className="relative z-10 text-center">DOWNLOAD OPEN SOURCE PROMPT FOR LOCAL DEPLOYMENT</span>
            <div className="absolute inset-0 rounded-xl bg-yellow-400/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </a>
          <a
            href="https://www.aiwebtools.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center justify-center w-full px-6 py-4 text-base font-medium text-white bg-gradient-to-r from-survival-metal to-survival-dark rounded-xl border border-survival-accent/30 shadow-lg hover:shadow-xl hover:shadow-survival-accent/20 transform hover:scale-105 transition-all duration-300 ease-out group overflow-hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-survival-accent/20 to-survival-green/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative z-10">MORE AI TOOLS</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;


import { cn } from '@/lib/utils';
import { AlertTriangle, Mail, Phone, Star } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-survival-dark py-12 border-t border-survival-accent/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo and Description */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-survival-accent" />
              <div>
                <h2 className="text-xl font-bold text-white">Survivalist GPT</h2>
                <p className="text-xs text-gray-400">Presented by AiWebTools.Ai</p>
                <p className="text-xs text-red-400">Made with love ❤️</p>
              </div>
            </div>
            <p className="text-gray-400 max-w-md mb-6">
              Your AI-powered survival expert, providing comprehensive guidance for battlefield scenarios 
              and wilderness survival with advanced capabilities including image processing and web search.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a 
                href="https://www.aiwebtools.ai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="relative inline-flex items-center justify-center px-5 py-3 text-sm font-semibold text-white bg-gradient-to-r from-survival-metal to-survival-dark rounded-full border border-survival-accent/30 shadow-lg hover:shadow-xl hover:shadow-survival-accent/20 transform hover:scale-105 transition-all duration-300 ease-out group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-survival-accent/20 to-survival-green/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10">More AI Tools</span>
              </a>
              <a 
                href="https://docs.google.com/document/d/e/2PACX-1vTEt3ZfmBvY6GU_57TqL26ODSe1qpKWOnzq3cDjHjeS3qBbqGINPAyxlxAdE8v39LhJYpYdDo3d8m9e/pub" 
                target="_blank" 
                rel="noopener noreferrer"
                className="relative inline-flex items-center justify-center px-5 py-3 text-sm font-medium text-white bg-gradient-to-r from-yellow-600 to-yellow-500 rounded-full shadow-lg hover:shadow-xl hover:shadow-yellow-500/25 transform hover:scale-105 transition-all duration-300 ease-out group overflow-hidden border border-yellow-400/30"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Star className="w-4 h-4 mr-2 relative z-10 text-yellow-200 group-hover:text-white transition-colors animate-pulse-soft" />
                <span className="relative z-10">Download Open Source Prompt</span>
                <div className="absolute inset-0 rounded-full bg-yellow-400/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="https://chatgpt.com/g/g-9hq2xSwvf-survivalist-gpt" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="relative inline-flex items-center px-4 py-2 text-sm font-bold text-white bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 rounded-full shadow-xl hover:shadow-2xl hover:shadow-orange-500/40 transform hover:scale-110 transition-all duration-300 ease-out group overflow-hidden border-2 border-yellow-400/50 animate-pulse-soft"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-red-500 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <AlertTriangle className="w-4 h-4 mr-2 relative z-10 text-yellow-100 group-hover:rotate-12 transition-transform animate-pulse" />
                  <span className="relative z-10 font-extrabold tracking-wide">USE SURVIVALIST GPT NOW</span>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400/30 to-red-400/30 blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
              </li>
              <li>
                <a 
                  href="https://docs.google.com/document/d/e/2PACX-1vTEt3ZfmBvY6GU_57TqL26ODSe1qpKWOnzq3cDjHjeS3qBbqGINPAyxlxAdE8v39LhJYpYdDo3d8m9e/pub" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-survival-accent transition-colors flex items-center"
                >
                  <Star className="w-3 h-3 mr-1 text-yellow-400 animate-pulse-soft" />
                  Download Open Source Prompt
                </a>
              </li>
              <li>
                <a 
                  href="https://www.aiwebtools.ai" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-survival-accent transition-colors"
                >
                  More AI Tools
                </a>
              </li>
              <li>
                <a 
                  href="https://aiwebtools.lovable.app/disclaimers" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-survival-accent transition-colors"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a 
                  href="https://openai.com/policies/privacy-policy/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-survival-accent transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Information</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="tel:+14758008096" 
                  className="flex items-center text-gray-400 hover:text-survival-accent transition-colors"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  <span>(475) 800-8096</span>
                </a>
              </li>
              <li>
                <a 
                  href="mailto:Contact@ai-webtools.com" 
                  className="flex items-center text-gray-400 hover:text-survival-accent transition-colors"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  <span>Contact@ai-webtools.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-survival-accent/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            <a 
              href="https://www.aiwebtools.ai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-survival-accent transition-colors"
            >
              &copy; 2025 AI WEB TOOLS LLC All rights reserved.
            </a>
          </p>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6">
            <a 
              href="https://chatgpt.com/g/g-9hq2xSwvf-survivalist-gpt" 
              target="_blank" 
              rel="noopener noreferrer"
              className="relative inline-flex items-center px-4 py-2 text-sm font-bold text-white bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 rounded-full shadow-xl hover:shadow-2xl hover:shadow-orange-500/40 transform hover:scale-110 transition-all duration-300 ease-out group overflow-hidden border border-yellow-400/50 animate-pulse-soft"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-red-500 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <AlertTriangle className="w-3 h-3 mr-1 relative z-10 text-yellow-100 group-hover:rotate-12 transition-transform" />
              <span className="relative z-10 font-extrabold">USE SURVIVALIST GPT NOW</span>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400/30 to-red-400/30 blur-md opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
            <a 
              href="https://docs.google.com/document/d/e/2PACX-1vTEt3ZfmBvY6GU_57TqL26ODSe1qpKWOnzq3cDjHjeS3qBbqGINPAyxlxAdE8v39LhJYpYdDo3d8m9e/pub" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-survival-accent transition-colors text-sm flex items-center justify-center"
            >
              <Star className="w-3 h-3 mr-1 text-yellow-400 animate-pulse-soft" />
              DOWNLOAD PROMPT
            </a>
            <a 
              href="https://www.aiwebtools.ai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-survival-accent transition-colors text-sm text-center"
            >
              MORE AI TOOLS
            </a>
          </div>
        </div>
      </div>

      {/* Floating "More AI Tools" button */}
      <div className="fixed bottom-6 right-6 z-30">
        <a 
          href="https://www.aiwebtools.ai" 
          target="_blank" 
          rel="noopener noreferrer"
          className={cn(
            "relative inline-flex items-center justify-center px-5 py-3 text-sm font-semibold text-white bg-gradient-to-r from-survival-accent to-survival-brightAccent rounded-full shadow-xl hover:shadow-2xl hover:shadow-survival-accent/30 transform hover:scale-105 transition-all duration-300 ease-out group overflow-hidden"
          )}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-survival-brightAccent to-survival-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <span className="relative z-10">More AI Tools</span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;

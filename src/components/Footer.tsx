
import { cn } from '@/lib/utils';
import { AlertTriangle, Mail, Phone } from 'lucide-react';

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
              </div>
            </div>
            <p className="text-gray-400 max-w-md">
              Your AI-powered survival expert, providing comprehensive guidance for battlefield scenarios 
              and wilderness survival with advanced capabilities including image processing and web search.
            </p>
            <div className="mt-6">
              <a 
                href="https://www.aiwebtools.ai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-survival-accent/20 text-survival-accent hover:bg-survival-accent/30 transition-colors"
              >
                More AI Tools
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
                  className="text-gray-400 hover:text-survival-accent transition-colors"
                >
                  Use Survivalist GPT Now
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
                  href="https://aiwebtools.ai/terms-of-services" 
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
          <div className="flex space-x-6">
            <a 
              href="https://chatgpt.com/g/g-9hq2xSwvf-survivalist-gpt" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-survival-accent transition-colors text-sm"
            >
              USE SURVIVALIST GPT NOW
            </a>
            <a 
              href="https://www.aiwebtools.ai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-survival-accent transition-colors text-sm"
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
            "flex items-center justify-center px-4 py-3 rounded-full",
            "bg-survival-accent text-white shadow-lg hover:bg-survival-brightAccent",
            "transition-all duration-300 transform hover:scale-105"
          )}
        >
          More AI Tools
        </a>
      </div>
    </footer>
  );
};

export default Footer;

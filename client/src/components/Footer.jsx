import React from 'react';
import { Globe, MessageCircle, Briefcase, Mail, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="w-full border-t border-white/10 bg-background/80 backdrop-blur-md pt-12 pb-8 relative z-10 mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500 mb-2">
              Portfolio.
            </h3>
            <p className="text-muted text-sm max-w-sm">
              Building digital products, brands, and experiences. Let's create something amazing together.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-accent/20 hover:text-accent transition-colors duration-300">
              <Globe size={20} />
            </a>
            <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-accent/20 hover:text-accent transition-colors duration-300">
              <Briefcase size={20} />
            </a>
            <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-accent/20 hover:text-accent transition-colors duration-300">
              <MessageCircle size={20} />
            </a>
            <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-accent/20 hover:text-accent transition-colors duration-300">
              <Mail size={20} />
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Designed & Built by Dhruv Gola. All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center text-sm text-gray-400 hover:text-white transition-colors duration-300 group"
          >
            Back to top
            <div className="ml-2 p-1.5 rounded-full bg-white/5 group-hover:bg-accent/20 group-hover:text-accent transition-colors duration-300">
              <ArrowUp size={14} />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

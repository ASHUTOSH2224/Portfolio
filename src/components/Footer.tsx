import React from 'react';
import { Heart, ArrowUp } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Brand */}
          <div>
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
              Ashutosh
            </div>
            <p className="text-gray-400 text-sm">
              Full Stack Developer & AI Engineer
            </p>
          </div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-gray-400 text-sm flex items-center justify-center">
              Made with <Heart className="w-4 h-4 text-red-500 mx-1" fill="currentColor" /> by Ashutosh
            </p>
            <p className="text-gray-500 text-xs mt-1">
              © {currentYear} All rights reserved.
            </p>
          </div>

          {/* Back to Top */}
          <div className="flex justify-end">
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-800/50 border border-gray-700 text-gray-300 rounded-lg hover:border-blue-500 hover:text-blue-400 transition-all duration-200 transform hover:scale-105"
            >
              <ArrowUp size={16} />
              <span className="text-sm">Back to Top</span>
            </button>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-500 text-xs">
            This portfolio showcases my passion for creating innovative solutions through code.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
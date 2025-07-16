import React from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-surface-secondary py-12 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <p className="text-text-secondary">&copy; {new Date().getFullYear()} Ashutosh</p>
          <div className="flex items-center space-x-4">
            <a href="https://github.com/ASHUTOSH2224" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-accent-primary">
              <Github className="w-6 h-6" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-accent-primary">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-accent-primary">
              <Twitter className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
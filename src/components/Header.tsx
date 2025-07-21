import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  
  const navItems = [
    {
      name: 'Services',
      href: '#services',
      dropdown: [
        { name: 'Web Development', href: '#web-dev', description: 'Full-stack web applications' },
        { name: 'AI & Machine Learning', href: '#ai-ml', description: 'Intelligent solutions' },
        { name: 'Mobile Development', href: '#mobile', description: 'Cross-platform apps' },
        { name: 'DevOps & Cloud', href: '#devops', description: 'Infrastructure & deployment' }
      ]
    },
    {
      name: 'Projects',
      href: '#projects',
      dropdown: [
        { name: 'Featured Work', href: '#featured', description: 'Highlighted projects' },
        { name: 'All Projects', href: '#all-projects', description: 'Complete portfolio' },
        { name: 'Case Studies', href: '#case-studies', description: 'Detailed analysis' }
      ]
    },
    {
      name: 'About',
      href: '#about',
      dropdown: [
        { name: 'Experience', href: '#experience', description: 'Professional background' },
        { name: 'Skills', href: '#skills', description: 'Technical expertise' },
        { name: 'Certifications', href: '#certifications', description: 'Professional credentials' }
      ]
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDropdownToggle = (itemName: string) => {
    setActiveDropdown(activeDropdown === itemName ? null : itemName);
  };

  const closeDropdowns = () => {
    setActiveDropdown(null);
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-black/80 backdrop-blur-md border-b border-gray-800' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-r from-vercel-blue to-vercel-purple rounded-lg flex items-center justify-center transform rotate-45">
                  <div className="w-4 h-4 bg-white rounded-sm transform -rotate-45"></div>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-vercel-green rounded-full animate-pulse"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white">Ashutosh</span>
                <span className="text-xs text-vercel-blue font-medium">Full Stack Developer</span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                <button
                  onClick={() => handleDropdownToggle(item.name)}
                  onMouseEnter={() => setActiveDropdown(item.name)}
                  className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors duration-200 py-2"
                >
                  <span>{item.name}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {/* Dropdown Menu */}
                {activeDropdown === item.name && (
                  <div 
                    className="absolute top-full left-0 mt-2 w-80 bg-gray-900 border border-gray-700 rounded-lg shadow-xl"
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <div className="p-4">
                      {item.dropdown?.map((dropdownItem) => (
                        <a
                          key={dropdownItem.name}
                          href={dropdownItem.href}
                          onClick={closeDropdowns}
                          className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors duration-200 group"
                        >
                          <div className="flex-1">
                            <div className="text-white font-medium group-hover:text-vercel-blue transition-colors duration-200">
                              {dropdownItem.name}
                            </div>
                            <div className="text-gray-400 text-sm mt-1">
                              {dropdownItem.description}
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-vercel-blue transition-colors duration-200" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              href="#contact"
              className="text-gray-300 hover:text-white transition-colors duration-200 px-4 py-2 border border-gray-700 rounded-lg hover:border-gray-600"
            >
              Contact
            </a>
            <a
              href="#contact"
              className="bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200"
            >
              Hire Me
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-gray-300 hover:text-white transition-colors duration-200"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden bg-gray-900 border-t border-gray-800 animate-fade-in">
            <nav className="py-4 space-y-2">
              {navItems.map((item) => (
                <div key={item.name}>
                  <button
                    onClick={() => handleDropdownToggle(item.name)}
                    className="flex items-center justify-between w-full px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-200"
                  >
                    <span>{item.name}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                      activeDropdown === item.name ? 'rotate-180' : ''
                    }`} />
                  </button>
                  
                  {activeDropdown === item.name && (
                    <div className="bg-gray-800 border-t border-gray-700">
                      {item.dropdown?.map((dropdownItem) => (
                        <a
                          key={dropdownItem.name}
                          href={dropdownItem.href}
                          onClick={() => {
                            setIsOpen(false);
                            setActiveDropdown(null);
                          }}
                          className="block px-8 py-3 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors duration-200"
                        >
                          <div className="font-medium">{dropdownItem.name}</div>
                          <div className="text-sm text-gray-500">{dropdownItem.description}</div>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              <div className="px-4 pt-4 space-y-3">
                <a
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center py-3 text-gray-300 border border-gray-700 rounded-lg hover:border-gray-600 hover:text-white transition-colors duration-200"
                >
                  Contact
                </a>
                <a
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center py-3 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200"
                >
                  Hire Me
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
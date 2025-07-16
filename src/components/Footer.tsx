import React from 'react';
import { Github, Linkedin, Mail, Heart, ArrowUp } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: Github,
      href: 'https://github.com/ASHUTOSH2224',
      label: 'GitHub'
    },
    {
      icon: Linkedin,
      href: 'https://linkedin.com/in/ashutosh-singh-4b9a93230',
      label: 'LinkedIn'
    },
    {
      icon: Mail,
      href: 'mailto:2224ashutosh@gmail.com',
      label: 'Email'
    }
  ];

  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <footer className="bg-gradient-to-t from-black to-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-gradient mb-2">Ashutosh</h3>
              <p className="text-gray-400 leading-relaxed">
                Full Stack Developer & AI Engineer passionate about creating innovative 
                digital solutions that make a difference.
              </p>
            </div>
            
            <div className="flex items-center space-x-2 text-green-400">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Available for new projects</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Quick Links</h4>
            <nav className="space-y-3">
              {quickLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 transform"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Let's Connect</h4>
            <div className="space-y-4">
              <p className="text-gray-400">
                Ready to discuss your next project? 
                <br />
                <a 
                  href="mailto:2224ashutosh@gmail.com" 
                  className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
                >
                  Let's talk!
                </a>
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 glass rounded-lg hover:bg-gray-800 transition-all duration-300 hover:scale-110 group"
                      aria-label={social.label}
                    >
                      <IconComponent className="w-5 h-5 text-gray-400 group-hover:text-white" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-gray-400">
              <span>© {currentYear} Ashutosh. Made with</span>
              <Heart className="w-4 h-4 text-red-500 animate-pulse" />
              <span>and lots of coffee</span>
            </div>
            
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-all duration-300 group"
            >
              <span>Back to top</span>
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
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
    <footer className="bg-apple-gray-50 border-t border-apple-gray-200">
      <div className="container py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <div>
              <h3 className="text-headline font-sf-pro-display font-semibold text-apple-gray-700 mb-3">
                Ashutosh
              </h3>
              <p className="text-body text-apple-gray-500 leading-relaxed">
                Full Stack Developer & AI Engineer passionate about creating innovative 
                digital solutions that make a difference in the world.
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="status-dot status-online"></div>
              <span className="text-caption text-apple-green font-medium">Available for new projects</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-body font-semibold text-apple-gray-700 mb-6">Quick links</h4>
            <nav className="space-y-3">
              {quickLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-body text-apple-gray-500 hover:text-apple-blue transition-colors duration-200"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-body font-semibold text-apple-gray-700 mb-6">Let's connect</h4>
            <div className="space-y-4">
              <p className="text-body text-apple-gray-500 leading-relaxed">
                Ready to discuss your next project? 
                <br />
                <a 
                  href="mailto:2224ashutosh@gmail.com" 
                  className="btn-link"
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
                      className="p-3 bg-apple-gray-100 hover:bg-apple-gray-200 rounded-apple-md transition-all duration-200 hover:scale-105 group"
                      aria-label={social.label}
                    >
                      <IconComponent className="w-4 h-4 text-apple-gray-600 group-hover:text-apple-blue" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-apple-gray-200 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-caption text-apple-gray-400">
              <span>© {currentYear} Ashutosh. Made with</span>
              <Heart className="w-4 h-4 text-apple-red animate-pulse-slow" />
              <span>and lots of coffee</span>
            </div>
            
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-2 text-caption text-apple-gray-400 hover:text-apple-blue transition-colors duration-200 group"
            >
              <span>Back to top</span>
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-200" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
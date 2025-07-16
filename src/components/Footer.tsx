import React from 'react';
import { Github, Linkedin, Mail, Heart, ArrowUp, Code2 } from 'lucide-react';

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
    <footer className="bg-gradient-to-t from-surface-primary to-surface-secondary border-t border-surface-border">
      <div className="container-custom py-20">
        <div className="grid md:grid-cols-3 gap-16 mb-16">
          {/* Brand Section */}
          <div className="space-y-8">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gradient font-display">Ashutosh</h3>
            </div>
            <p className="text-text-secondary leading-relaxed text-lg">
              Full Stack Developer & AI Engineer passionate about creating innovative 
              digital solutions that make a difference in the world.
            </p>
            
            <div className="flex items-center space-x-3 text-accent-success">
              <div className="w-3 h-3 bg-accent-success rounded-full animate-pulse"></div>
              <span className="font-medium text-lg">Available for new projects</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-2xl font-semibold text-text-primary mb-8 font-display">Quick Links</h4>
            <nav className="space-y-4">
              {quickLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-text-muted hover:text-accent-primary transition-colors duration-300 hover:translate-x-2 transform text-lg"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-2xl font-semibold text-text-primary mb-8 font-display">Let's Connect</h4>
            <div className="space-y-6">
              <p className="text-text-secondary text-lg leading-relaxed">
                Ready to discuss your next project? 
                <br />
                <a 
                  href="mailto:2224ashutosh@gmail.com" 
                  className="text-accent-primary hover:text-accent-secondary transition-colors duration-300 font-semibold"
                >
                  Let's talk!
                </a>
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-6">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 glass-effect rounded-2xl hover:bg-surface-elevated transition-all duration-300 hover:scale-110 group hover-glow"
                      aria-label={social.label}
                    >
                      <IconComponent className="w-6 h-6 text-text-muted group-hover:text-accent-primary" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-surface-border pt-10">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
            <div className="flex items-center space-x-3 text-text-muted text-lg">
              <span>© {currentYear} Ashutosh. Made with</span>
              <Heart className="w-5 h-5 text-accent-error animate-pulse" />
              <span>and lots of coffee</span>
            </div>
            
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-3 text-text-muted hover:text-accent-primary transition-all duration-300 group glass-effect px-6 py-3 rounded-2xl hover-glow"
            >
              <span className="text-lg">Back to top</span>
              <ArrowUp className="w-5 h-5 group-hover:-translate-y-2 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
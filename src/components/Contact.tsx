import React, { useState } from 'react';
import { Mail, MessageCircle, Send, Phone, MapPin, Calendar, Github, Linkedin, ExternalLink } from 'lucide-react';
import CalendlyModal from './CalendlyModal';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'alex@example.com',
      href: 'mailto:alex@example.com',
      color: 'from-accent-primary to-accent-secondary'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+1 (555) 123-4567',
      href: 'tel:+15551234567',
      color: 'from-accent-secondary to-accent-tertiary'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Remote',
      href: '#',
      color: 'from-accent-tertiary to-accent-primary'
    },
    {
      icon: Calendar,
      label: 'Availability',
      value: 'Open to opportunities',
      href: '#',
      color: 'from-accent-primary to-accent-tertiary'
    }
  ];

  const platforms = [
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: 'https://linkedin.com/in/alex',
      username: '@alex-dev',
      color: 'hover:border-accent-primary/50 hover:text-accent-primary'
    },
    {
      name: 'GitHub',
      icon: Github,
      href: 'https://github.com/alex',
      username: '@alex',
      color: 'hover:border-accent-secondary/50 hover:text-accent-secondary'
    },
    {
      name: 'Portfolio',
      icon: ExternalLink,
      href: '#',
      username: 'portfolio.dev',
      color: 'hover:border-accent-tertiary/50 hover:text-accent-tertiary'
    }
  ];

  return (
    <>
      <section id="contact" className="py-20 bg-surface-primary relative overflow-hidden">
        {/* Light Theme Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-surface-accent/20 via-surface-secondary/10 to-surface-accent/20"></div>
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-accent-primary/8 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent-secondary/6 rounded-full blur-3xl animate-float delay-300"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">
              Let's Work Together
            </h2>
            <p className="text-xl text-text-muted max-w-3xl mx-auto">
              Ready to bring your ideas to life? I'm available for freelance projects, full-time opportunities, and consulting.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="bg-surface-card border border-surface-border rounded-2xl p-8 shadow-card hover:shadow-glow-orange transition-all duration-300 animate-fade-in-left">
              <h3 className="text-2xl font-semibold text-text-primary mb-6 flex items-center">
                <MessageCircle className="w-6 h-6 text-accent-primary mr-3" />
                Send Message
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-surface-secondary border border-surface-border rounded-lg text-text-primary placeholder-text-muted focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/50 transition-all duration-300"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-surface-secondary border border-surface-border rounded-lg text-text-primary placeholder-text-muted focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/50 transition-all duration-300"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-text-secondary mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-surface-secondary border border-surface-border rounded-lg text-text-primary placeholder-text-muted focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/50 transition-all duration-300"
                    placeholder="Project inquiry, collaboration, etc."
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-text-secondary mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full px-4 py-3 bg-surface-secondary border border-surface-border rounded-lg text-text-primary placeholder-text-muted focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/50 transition-all duration-300 resize-none"
                    placeholder="Tell me about your project or how I can help you..."
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-accent-primary to-accent-secondary text-white font-semibold rounded-lg hover:shadow-glow-orange transition-all duration-300 transform hover:scale-105 group relative overflow-hidden"
                >
                  <Send size={20} className="group-hover:animate-bounce" />
                  <span className="relative z-10">Send Message</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </button>
              </form>
            </div>

            {/* Contact Info & Social Links */}
            <div className="space-y-8 animate-fade-in-right">
              {/* Contact Information */}
              <div className="bg-surface-card border border-surface-border rounded-2xl p-8 shadow-card hover:shadow-glow-orange transition-all duration-300">
                <h3 className="text-2xl font-semibold text-text-primary mb-6">Contact Information</h3>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className={`p-3 bg-gradient-to-r ${info.color} rounded-lg glow-orange`}>
                        <info.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-text-secondary text-sm">{info.label}</p>
                        <a href={info.href} className="text-text-primary hover:text-accent-primary transition-colors duration-300">
                          {info.value}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid sm:grid-cols-2 gap-4">
                <button
                  onClick={() => setIsCalendlyOpen(true)}
                  className="flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-accent-primary to-accent-secondary text-white font-semibold rounded-lg hover:shadow-glow-orange transition-all duration-300 transform hover:scale-105 group relative overflow-hidden"
                >
                  <Calendar size={20} className="group-hover:animate-bounce" />
                  <span className="relative z-10">Schedule Call</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </button>
                <button className="flex items-center justify-center space-x-2 px-6 py-4 border-2 border-accent-primary/40 text-accent-primary font-semibold rounded-lg hover:border-accent-primary hover:bg-accent-primary/5 transition-all duration-300 transform hover:scale-105 group">
                  <ExternalLink size={20} className="group-hover:animate-bounce" />
                  <span>Download Resume</span>
                </button>
              </div>

              {/* Social Platforms */}
              <div className="bg-surface-card border border-surface-border rounded-2xl p-8 shadow-card hover:shadow-glow-orange transition-all duration-300">
                <h3 className="text-2xl font-semibold text-text-primary mb-6">Connect With Me</h3>
                <div className="space-y-4">
                  {platforms.map((platform, index) => (
                    <a
                      key={index}
                      href={platform.href}
                      className={`flex items-center justify-between p-4 bg-surface-secondary border border-surface-border rounded-lg transition-all duration-300 group ${platform.color}`}
                    >
                      <div className="flex items-center space-x-3">
                        <platform.icon className="w-5 h-5" />
                        <div>
                          <p className="text-text-primary font-medium">{platform.name}</p>
                          <p className="text-text-muted text-sm">{platform.username}</p>
                        </div>
                      </div>
                      <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calendly Modal */}
      <CalendlyModal 
        isOpen={isCalendlyOpen} 
        onClose={() => setIsCalendlyOpen(false)} 
      />
    </>
  );
};

export default Contact;
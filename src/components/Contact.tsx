import React, { useState } from 'react';
import { Mail, MessageCircle, Send, Phone, MapPin, Calendar, Github, Linkedin, ExternalLink } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

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
      value: 'ashutosh@example.com',
      href: 'mailto:ashutosh@example.com',
      color: 'from-accent-primary to-accent-secondary'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 9876543210',
      href: 'tel:+919876543210',
      color: 'from-accent-secondary to-accent-tertiary'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Remote, India',
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
      href: '#',
      username: '@ashutosh-dev',
      color: 'hover:border-accent-primary/50 hover:text-accent-primary'
    },
    {
      name: 'GitHub',
      icon: Github,
      href: '#',
      username: '@ashutosh-dev',
      color: 'hover:border-accent-secondary/50 hover:text-accent-secondary'
    },
    {
      name: 'LeetCode',
      icon: ExternalLink,
      href: '#',
      username: '@ashutosh_dev',
      color: 'hover:border-accent-tertiary/50 hover:text-accent-tertiary'
    },
    {
      name: 'Fiverr',
      icon: ExternalLink,
      href: '#',
      username: '@ashutosh_pro',
      color: 'hover:border-accent-primary/50 hover:text-accent-primary'
    },
    {
      name: 'Upwork',
      icon: ExternalLink,
      href: '#',
      username: '@ashutosh_fullstack',
      color: 'hover:border-accent-secondary/50 hover:text-accent-secondary'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-matteBlack-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 matrix-bg opacity-15"></div>
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-accent-primary/3 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent-secondary/2 rounded-full blur-3xl animate-float delay-300"></div>
      
      <div className="container-max relative z-10">
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
          <div className="glass-effect border border-surface-border rounded-2xl p-8 hover-glow transition-all duration-300 animate-fade-in-left">
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
                    className="w-full px-4 py-3 glass-effect border border-surface-border rounded-lg text-text-primary placeholder-text-muted focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/50 transition-all duration-300"
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
                    className="w-full px-4 py-3 glass-effect border border-surface-border rounded-lg text-text-primary placeholder-text-muted focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/50 transition-all duration-300"
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
                  className="w-full px-4 py-3 glass-effect border border-surface-border rounded-lg text-text-primary placeholder-text-muted focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/50 transition-all duration-300"
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
                  className="w-full px-4 py-3 glass-effect border border-surface-border rounded-lg text-text-primary placeholder-text-muted focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/50 transition-all duration-300 resize-none"
                  placeholder="Tell me about your project or how I can help you..."
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-accent-primary to-accent-secondary text-matteBlack-800 font-semibold rounded-lg hover:shadow-glow-lg transition-all duration-300 transform hover:scale-105 group relative overflow-hidden"
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
            <div className="glass-effect border border-surface-border rounded-2xl p-8 hover-glow transition-all duration-300">
              <h3 className="text-2xl font-semibold text-text-primary mb-6">Contact Information</h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.href}
                    className="flex items-center space-x-4 text-text-secondary hover:text-text-primary transition-colors duration-300 group"
                  >
                    <div className={`p-3 bg-gradient-to-r ${info.color} rounded-lg group-hover:scale-110 transition-transform duration-300 shadow-glow-sm`}>
                      <info.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-text-muted">{info.label}</div>
                      <div className="font-medium">{info.value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Professional Platforms */}
            <div className="glass-effect border border-surface-border rounded-2xl p-8 hover-glow transition-all duration-300">
              <h3 className="text-2xl font-semibold text-text-primary mb-6">Find Me On</h3>
              <div className="space-y-4">
                {platforms.map((platform, index) => (
                  <a
                    key={index}
                    href={platform.href}
                    className={`flex items-center justify-between p-4 glass-effect border border-surface-border rounded-lg ${platform.color} transition-all duration-300 transform hover:scale-105 group`}
                  >
                    <div className="flex items-center space-x-3">
                      <platform.icon className="w-5 h-5 group-hover:animate-bounce" />
                      <div>
                        <div className="font-medium">{platform.name}</div>
                        <div className="text-sm text-text-muted">{platform.username}</div>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 group-hover:animate-bounce" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid sm:grid-cols-2 gap-4">
              <button className="flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-accent-primary to-accent-secondary text-matteBlack-800 font-semibold rounded-lg hover:shadow-glow-lg transition-all duration-300 transform hover:scale-105 group relative overflow-hidden">
                <Calendar size={20} className="group-hover:animate-bounce" />
                <span className="relative z-10">Schedule Call</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </button>
              <button className="flex items-center justify-center space-x-2 px-6 py-4 border-2 border-accent-primary/40 text-accent-primary font-semibold rounded-lg hover:border-accent-primary hover:bg-accent-primary/5 transition-all duration-300 transform hover:scale-105 group">
                <ExternalLink size={20} className="group-hover:animate-bounce" />
                <span>View Resume</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
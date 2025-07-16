import React, { useState } from 'react';
import { Send, Mail, Phone, MapPin, Calendar, Github, Linkedin, Twitter, CheckCircle, AlertCircle, MessageSquare } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    budget: '',
    timeline: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        budget: '',
        timeline: ''
      });
      
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }, 2000);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: '2224ashutosh@gmail.com',
      href: 'mailto:2224ashutosh@gmail.com',
      color: 'text-accent-primary'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 XXX XXX XXXX',
      href: 'tel:+91XXXXXXXXXX',
      color: 'text-accent-secondary'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'India',
      href: '#',
      color: 'text-accent-tertiary'
    },
    {
      icon: Calendar,
      label: 'Availability',
      value: 'Open for projects',
      href: '#',
      color: 'text-accent-success'
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com/ASHUTOSH2224',
      color: 'hover:text-text-primary'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/ashutosh-singh-4b9a93230',
      color: 'hover:text-accent-primary'
    },
    {
      icon: Twitter,
      label: 'Twitter',
      href: '#',
      color: 'hover:text-accent-primary'
    }
  ];

  return (
    <section id="contact" className="section-padding bg-gradient-to-b from-surface-primary to-surface-secondary">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-7xl font-bold text-gradient mb-8 animate-fade-in-up font-display">
            Let's Work Together
          </h2>
          <p className="text-2xl text-text-secondary max-w-4xl mx-auto animate-fade-in-up delay-200 font-light">
            Ready to bring your ideas to life? Let's discuss your project and create something amazing together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-20">
          {/* Contact Form */}
          <div className="animate-fade-in-left">
            <div className="modern-card p-10">
              <div className="flex items-center mb-8">
                <MessageSquare className="w-8 h-8 text-accent-primary mr-4" />
                <h3 className="text-3xl font-bold text-text-primary font-display">Send a Message</h3>
              </div>
              
              {submitStatus === 'success' && (
                <div className="flex items-center space-x-4 bg-accent-success/10 border border-accent-success/20 rounded-2xl p-6 mb-8 animate-fade-in-up">
                  <CheckCircle className="w-6 h-6 text-accent-success" />
                  <span className="text-accent-success text-lg">Message sent successfully! I'll get back to you soon.</span>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="flex items-center space-x-4 bg-accent-error/10 border border-accent-error/20 rounded-2xl p-6 mb-8 animate-fade-in-up">
                  <AlertCircle className="w-6 h-6 text-accent-error" />
                  <span className="text-accent-error text-lg">Something went wrong. Please try again.</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label htmlFor="name" className="block text-lg font-medium text-text-secondary mb-3">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-6 py-4 glass-effect rounded-2xl text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-primary transition-all duration-300 text-lg"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-lg font-medium text-text-secondary mb-3">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-6 py-4 glass-effect rounded-2xl text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-primary transition-all duration-300 text-lg"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-lg font-medium text-text-secondary mb-3">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-6 py-4 glass-effect rounded-2xl text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-primary transition-all duration-300 text-lg"
                    placeholder="What's this about?"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label htmlFor="budget" className="block text-lg font-medium text-text-secondary mb-3">
                      Project Budget
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 glass-effect rounded-2xl text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary transition-all duration-300 text-lg"
                    >
                      <option value="">Select budget range</option>
                      <option value="under-5k">Under $5,000</option>
                      <option value="5k-10k">$5,000 - $10,000</option>
                      <option value="10k-25k">$10,000 - $25,000</option>
                      <option value="25k-50k">$25,000 - $50,000</option>
                      <option value="50k-plus">$50,000+</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="timeline" className="block text-lg font-medium text-text-secondary mb-3">
                      Timeline
                    </label>
                    <select
                      id="timeline"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 glass-effect rounded-2xl text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary transition-all duration-300 text-lg"
                    >
                      <option value="">Select timeline</option>
                      <option value="asap">ASAP</option>
                      <option value="1-month">Within 1 month</option>
                      <option value="2-3-months">2-3 months</option>
                      <option value="3-6-months">3-6 months</option>
                      <option value="6-plus-months">6+ months</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-lg font-medium text-text-secondary mb-3">
                    Project Details *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-6 py-4 glass-effect rounded-2xl text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-primary transition-all duration-300 resize-none text-lg"
                    placeholder="Tell me about your project, goals, and requirements..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary py-5 text-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-4">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                      <span>Sending...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-4">
                      <Send className="w-6 h-6" />
                      <span>Send Message</span>
                    </div>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div className="animate-fade-in-right">
            <div className="space-y-10">
              {/* Contact Details */}
              <div className="modern-card p-10">
                <h3 className="text-3xl font-bold text-text-primary mb-8 font-display">Get in Touch</h3>
                <div className="space-y-8">
                  {contactInfo.map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                      <div key={index} className="flex items-center space-x-6 group">
                        <div className={`p-4 bg-gradient-primary rounded-2xl group-hover:scale-110 transition-transform duration-300`}>
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <p className="text-text-muted text-lg">{item.label}</p>
                          <a
                            href={item.href}
                            className={`text-text-primary font-medium text-xl hover:text-gradient transition-all duration-300 ${item.color}`}
                          >
                            {item.value}
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Social Links */}
              <div className="modern-card p-10">
                <h3 className="text-2xl font-bold text-text-primary mb-8 font-display">Connect With Me</h3>
                <div className="flex space-x-6">
                  {socialLinks.map((social, index) => {
                    const IconComponent = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-5 glass-effect rounded-2xl hover:bg-surface-elevated transition-all duration-300 hover:scale-110 group ${social.color} hover-glow`}
                      >
                        <IconComponent className="w-8 h-8 text-text-muted group-hover:text-current" />
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Quick Response */}
              <div className="modern-card p-10">
                <h3 className="text-2xl font-bold text-text-primary mb-6 font-display">Quick Response</h3>
                <p className="text-text-muted mb-6 text-lg leading-relaxed">
                  I typically respond to messages within 24 hours. For urgent inquiries, 
                  feel free to reach out directly via email or phone.
                </p>
                <div className="flex items-center space-x-3 text-accent-success">
                  <div className="w-3 h-3 bg-accent-success rounded-full animate-pulse"></div>
                  <span className="font-medium text-lg">Usually responds within a few hours</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
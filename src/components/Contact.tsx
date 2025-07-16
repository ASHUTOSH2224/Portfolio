import React, { useState } from 'react';
import { Send, Mail, Phone, MapPin, Calendar, Github, Linkedin, Twitter, CheckCircle, AlertCircle } from 'lucide-react';

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
      href: 'mailto:2224ashutosh@gmail.com'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 XXX XXX XXXX',
      href: 'tel:+91XXXXXXXXXX'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'India',
      href: '#'
    },
    {
      icon: Calendar,
      label: 'Availability',
      value: 'Open for projects',
      href: '#'
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com/ASHUTOSH2224',
      color: 'hover:text-gray-300'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/ashutosh-singh-4b9a93230',
      color: 'hover:text-blue-400'
    },
    {
      icon: Twitter,
      label: 'Twitter',
      href: '#',
      color: 'hover:text-blue-400'
    }
  ];

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold text-gradient mb-6 animate-fade-in-up">
            Let's Work Together
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto animate-fade-in-up delay-200">
            Ready to bring your ideas to life? Let's discuss your project and create something amazing together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="animate-fade-in-left">
            <div className="modern-card p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
              
              {submitStatus === 'success' && (
                <div className="flex items-center space-x-3 bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-6 animate-fade-in-up">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-green-400">Message sent successfully! I'll get back to you soon.</span>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="flex items-center space-x-3 bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6 animate-fade-in-up">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                  <span className="text-red-400">Something went wrong. Please try again.</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 glass rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 glass rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 glass rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    placeholder="What's this about?"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-gray-300 mb-2">
                      Project Budget
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 glass rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
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
                    <label htmlFor="timeline" className="block text-sm font-medium text-gray-300 mb-2">
                      Timeline
                    </label>
                    <select
                      id="timeline"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 glass rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
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
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Project Details *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 glass rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 resize-none"
                    placeholder="Tell me about your project, goals, and requirements..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-3">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Sending...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-3">
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </div>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div className="animate-fade-in-right">
            <div className="space-y-8">
              {/* Contact Details */}
              <div className="modern-card p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Get in Touch</h3>
                <div className="space-y-6">
                  {contactInfo.map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                      <div key={index} className="flex items-center space-x-4 group">
                        <div className="p-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg group-hover:scale-110 transition-transform duration-300">
                          <IconComponent className="w-6 h-6 text-blue-400" />
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">{item.label}</p>
                          <a
                            href={item.href}
                            className="text-white font-medium hover:text-gradient transition-all duration-300"
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
              <div className="modern-card p-8">
                <h3 className="text-xl font-bold text-white mb-6">Connect With Me</h3>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => {
                    const IconComponent = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-4 glass rounded-xl hover:bg-gray-800 transition-all duration-300 hover:scale-110 group ${social.color}`}
                      >
                        <IconComponent className="w-6 h-6 text-gray-400 group-hover:text-current" />
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Quick Response */}
              <div className="modern-card p-8">
                <h3 className="text-xl font-bold text-white mb-4">Quick Response</h3>
                <p className="text-gray-400 mb-4">
                  I typically respond to messages within 24 hours. For urgent inquiries, 
                  feel free to reach out directly via email or phone.
                </p>
                <div className="flex items-center space-x-2 text-green-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Usually responds within a few hours</span>
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
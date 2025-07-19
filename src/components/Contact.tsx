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
      href: 'mailto:2224ashutosh@gmail.com',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 XXX XXX XXXX',
      href: 'tel:+91XXXXXXXXXX',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'India',
      href: '#',
    },
    {
      icon: Calendar,
      label: 'Availability',
      value: 'Open for projects',
      href: '#',
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com/ASHUTOSH2224',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/ashutosh-singh-4b9a93230',
    },
    {
      icon: Twitter,
      label: 'Twitter',
      href: '#',
    }
  ];

  return (
    <section id="contact" className="section-large bg-bg-secondary">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-display-medium font-inter font-bold text-white mb-6 animate-fade-in-up">
            Let's work together
          </h2>
          <p className="text-subheadline text-gray-400 max-w-2xl mx-auto animate-fade-in-up delay-200">
            Ready to bring your ideas to life? Let's discuss your project and create something amazing together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="animate-fade-in-up delay-300">
            <div className="card-large p-8">
              <h3 className="text-headline font-inter font-bold text-white mb-6">
                Send a message
              </h3>
              
              {submitStatus === 'success' && (
                <div className="flex items-center space-x-3 bg-vercel-green bg-opacity-10 border border-vercel-green border-opacity-20 rounded-vercel-md p-4 mb-6 animate-fade-in">
                  <CheckCircle className="w-5 h-5 text-vercel-green" />
                  <span className="text-body text-vercel-green">Message sent successfully! I'll get back to you soon.</span>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="flex items-center space-x-3 bg-vercel-red bg-opacity-10 border border-vercel-red border-opacity-20 rounded-vercel-md p-4 mb-6 animate-fade-in">
                  <AlertCircle className="w-5 h-5 text-vercel-red" />
                  <span className="text-body text-vercel-red">Something went wrong. Please try again.</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-body font-medium text-white mb-2">
                      Full name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="form-input"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-body font-medium text-white mb-2">
                      Email address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="form-input"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-body font-medium text-white mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                    placeholder="What's this about?"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="budget" className="block text-body font-medium text-white mb-2">
                      Project budget
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="form-input form-select"
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
                    <label htmlFor="timeline" className="block text-body font-medium text-white mb-2">
                      Timeline
                    </label>
                    <select
                      id="timeline"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleInputChange}
                      className="form-input form-select"
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
                  <label htmlFor="message" className="block text-body font-medium text-white mb-2">
                    Project details
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="form-input form-textarea"
                    placeholder="Tell me about your project, goals, and requirements..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-3">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Sending...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-3">
                      <Send className="w-4 h-4" />
                      <span>Send message</span>
                    </div>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="animate-fade-in-up delay-400">
            <div className="space-y-8">
              {/* Contact Info */}
              <div>
                <h3 className="text-headline font-inter font-bold text-white mb-6">
                  Get in touch
                </h3>
                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <a
                      key={info.label}
                      href={info.href}
                      className="flex items-center space-x-4 p-4 bg-bg-elevated border border-gray-800 rounded-vercel-lg hover:border-gray-700 transition-all duration-200 group animate-fade-in-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex-shrink-0 w-10 h-10 bg-vercel-blue bg-opacity-10 rounded-vercel-md flex items-center justify-center group-hover:bg-opacity-20 transition-all duration-200">
                        <info.icon className="w-5 h-5 text-vercel-blue" />
                      </div>
                      <div>
                        <p className="text-caption text-gray-400 font-medium">{info.label}</p>
                        <p className="text-body text-white font-medium">{info.value}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-headline font-inter font-bold text-white mb-6">
                  Follow me
                </h3>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-bg-elevated border border-gray-800 rounded-vercel-md hover:border-gray-700 hover:bg-gray-800 transition-all duration-200 animate-fade-in-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <social.icon className="w-5 h-5 text-gray-300" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Availability Status */}
              <div className="p-6 bg-bg-elevated border border-gray-800 rounded-vercel-lg">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="status-dot status-online"></div>
                  <h4 className="text-body font-semibold text-white">Current Status</h4>
                </div>
                <p className="text-body text-gray-400 mb-4">
                  I'm currently available for new projects and collaborations. Let's discuss how we can work together to bring your ideas to life.
                </p>
                <div className="flex items-center space-x-2">
                  <span className="text-caption text-gray-500">Response time:</span>
                  <span className="text-caption text-vercel-green font-medium">Within 24 hours</span>
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
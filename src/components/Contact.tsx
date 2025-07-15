import React, { useState } from 'react';
import { Mail, MessageCircle, Send, Phone, MapPin, Calendar, Github, Linkedin, ExternalLink } from 'lucide-react';
import CalendlyModal from './CalendlyModal';
import { useAnalytics } from '../hooks/useAnalytics';
import contactService from '../services/contactService';
import toast from 'react-hot-toast';

const Contact: React.FC = () => {
  const { trackEvent, trackConversion } = useAnalytics();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Track form field interaction
    try {
      await trackEvent('click', `contact_form_${name}`, value, {
        fieldName: name,
        formType: 'contact',
        action: 'input',
        element: `contact_form_${name}_input`
      });
    } catch (error) {
      console.error('Failed to track form input:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Track form submission attempt
      await trackEvent('form_submit', 'contact_form', 'attempt', {
        formType: 'contact',
        fields: Object.keys(formData),
        action: 'submit',
        element: 'contact_form_submit_button'
      });

      // Submit form
      await contactService.submitContactForm(formData);

      // Track successful conversion
      await trackConversion('contact_form', 'success', {
        formType: 'contact',
        fields: Object.keys(formData)
      });

      setSubmitted(true);
      toast.success('Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Failed to submit contact form:', error);
      setError('Failed to send message. Please try again later.');
      toast.error('Failed to send message');

      // Track form submission failure
      await trackEvent('form_submit', 'contact_form', 'error', {
        formType: 'contact',
        error: error instanceof Error ? error.message : 'Unknown error',
        action: 'submit_error',
        element: 'contact_form_submit_button'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCalendlyClick = async () => {
    try {
      await trackEvent('click', 'calendly_button', 'open', {
        source: 'contact_section',
        action: 'open',
        element: 'calendly_open_button'
      });
      setIsCalendlyOpen(true);
    } catch (error) {
      console.error('Failed to track calendly click:', error);
    }
  };

  const handleCalendlyClose = async () => {
    try {
      await trackEvent('click', 'calendly_button', 'close', {
        source: 'contact_section',
        action: 'close',
        element: 'calendly_close_button'
      });
      setIsCalendlyOpen(false);
    } catch (error) {
      console.error('Failed to track calendly close:', error);
    }
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
    <section id="contact" className="py-20 bg-surface-primary relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-surface-accent/30 via-surface-secondary/20 to-surface-accent/30"></div>
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-accent-primary/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent-secondary/8 rounded-full blur-3xl animate-float delay-300"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="font-mono text-accent-primary">$ </span>
            <span className="bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">
              Let's Connect
            </span>
          </h2>
          <p className="text-xl text-text-muted max-w-3xl mx-auto">
            <span className="font-mono text-accent-primary">{'// '}</span>
            Have a project in mind or want to explore opportunities?
            <br />
            <span className="font-mono text-accent-primary">{'// '}</span>
            Let's discuss how we can work together!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-surface-card/80 backdrop-blur-lg border border-surface-border/50 rounded-2xl p-8 shadow-xl hover:shadow-2xl hover:shadow-accent-primary/10 transition-all duration-500 animate-fade-in-up">
            <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-surface-secondary/50 border border-surface-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-primary/50 focus:border-accent-primary/50 transition-all duration-300"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-surface-secondary/50 border border-surface-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-primary/50 focus:border-accent-primary/50 transition-all duration-300"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-text-secondary mb-2">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-surface-secondary/50 border border-surface-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-primary/50 focus:border-accent-primary/50 transition-all duration-300"
                  placeholder="What's this about?"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-text-secondary mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-surface-secondary/50 border border-surface-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-primary/50 focus:border-accent-primary/50 transition-all duration-300 resize-none"
                  placeholder="Tell me about your project or opportunity..."
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full flex items-center justify-center px-8 py-4 bg-gradient-to-r from-accent-primary to-accent-secondary text-white font-bold rounded-xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-accent-primary/30 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-accent-secondary to-accent-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative flex items-center gap-3">
                  <Send className="w-5 h-5 group-hover:animate-bounce" />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </span>
                {/* Ripple effect */}
                <div className="absolute inset-0 bg-white/20 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-700 opacity-0 group-hover:opacity-100"></div>
              </button>
              {error && (
                <div className="text-red-500 text-sm mt-2">{error}</div>
              )}
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            {/* Contact Cards */}
            <div className="grid sm:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.href}
                  className={`group bg-surface-card/80 backdrop-blur-lg border border-surface-border/50 rounded-2xl p-6 hover:shadow-2xl transition-all duration-500 animate-fade-in-up hover:-translate-y-1`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${info.color} p-3 mb-4`}>
                    <info.icon className="w-full h-full text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-text-primary mb-1">{info.label}</h4>
                  <p className="text-text-muted">{info.value}</p>
                </a>
              ))}
            </div>

            {/* Social Platforms */}
            <div className="bg-surface-card/80 backdrop-blur-lg border border-surface-border/50 rounded-2xl p-8 animate-fade-in-up delay-300">
              <h4 className="text-xl font-bold mb-6 bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">Connect on Social</h4>
              <div className="grid gap-4">
                {platforms.map((platform, index) => (
                  <a
                    key={index}
                    href={platform.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-4 p-4 border border-surface-border rounded-xl ${platform.color} transition-all duration-300 group hover:-translate-x-1`}
                  >
                    <platform.icon className="w-5 h-5" />
                    <div>
                      <h5 className="font-medium text-text-primary">{platform.name}</h5>
                      <p className="text-sm text-text-muted">{platform.username}</p>
                    </div>
                    <ExternalLink className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </a>
                ))}
              </div>
            </div>

            {/* Calendly Button */}
            <button
              onClick={handleCalendlyClick}
              className="group relative w-full flex items-center justify-center px-8 py-4 bg-surface-card border-2 border-accent-primary/40 text-accent-primary font-bold rounded-xl hover:border-accent-primary hover:bg-accent-primary hover:text-white transition-all duration-500 hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent-primary/30 animate-fade-in-up delay-500"
            >
              <span className="relative flex items-center gap-3">
                <Calendar className="w-5 h-5 group-hover:animate-bounce" />
                Schedule a Call
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Calendly Modal */}
      {isCalendlyOpen && (
        <CalendlyModal isOpen={isCalendlyOpen} onClose={handleCalendlyClose} />
      )}
    </section>
  );
};

export default Contact;
import React, { useState } from 'react';
import { Mail, Send } from 'lucide-react';
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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

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
      await trackEvent('form_submit', 'contact_form', 'attempt', {
        formType: 'contact',
        fields: Object.keys(formData),
        action: 'submit',
        element: 'contact_form_submit_button'
      });

      await contactService.submitContactForm(formData);

      await trackConversion('contact_form', 'success', {
        formType: 'contact',
        fields: Object.keys(formData)
      });

      toast.success('Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Failed to submit contact form:', error);
      setError('Failed to send message. Please try again later.');
      toast.error('Failed to send message');

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

  return (
    <section id="contact" className="py-20 bg-surface-primary relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">
              Let's build something together
            </span>
          </h2>
          <p className="text-xl text-text-muted max-w-3xl mx-auto">
            Contact me to schedule a free consultation.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-surface-card/80 backdrop-blur-lg border border-surface-border/50 rounded-2xl p-8 shadow-xl">
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
              <div className="flex justify-end">
                <a href="mailto:contact@example.com" className="group relative flex items-center justify-center px-8 py-4 bg-gradient-to-r from-accent-primary to-accent-secondary text-white font-bold rounded-xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-accent-primary/30">
                  <span className="relative flex items-center gap-3">
                    <Mail className="w-5 h-5" />
                    Send Message
                  </span>
                </a>
              </div>
              {error && (
                <div className="text-red-500 text-sm mt-2">{error}</div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
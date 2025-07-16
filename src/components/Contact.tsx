import React from 'react';
import { Send } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-20 bg-surface-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-text-primary">
            Let's build something together
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            I'm currently available for freelance work. If you have a project in mind, or just want to say hi, feel free to send me a message.
          </p>
        </div>
        <div className="max-w-3xl mx-auto">
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-2">Name</label>
              <input type="text" id="name" name="name" required className="w-full px-4 py-3 bg-surface-secondary border border-surface-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-primary" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2">Email</label>
              <input type="email" id="email" name="email" required className="w-full px-4 py-3 bg-surface-secondary border border-surface-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-primary" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-text-secondary mb-2">Message</label>
              <textarea id="message" name="message" required rows={5} className="w-full px-4 py-3 bg-surface-secondary border border-surface-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-primary resize-none"></textarea>
            </div>
            <div className="flex justify-end">
              <button type="submit" className="group relative flex items-center justify-center px-8 py-4 bg-accent-primary text-white font-bold rounded-lg overflow-hidden transition-all duration-500 hover:shadow-lg hover:bg-accent-primary/90">
                <span className="relative flex items-center gap-3">
                  <Send className="w-5 h-5" />
                  Send Message
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
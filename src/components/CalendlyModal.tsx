import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface CalendlyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

declare global {
  interface Window {
    Calendly: any;
  }
}

const CalendlyModal: React.FC<CalendlyModalProps> = ({ isOpen, onClose }) => {
  const calendlyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Disable body scroll when modal is open
      document.body.style.overflow = 'hidden';

      // Add custom dark theme styles
      const styleElement = document.createElement('style');
      styleElement.id = 'calendly-dark-theme';
      styleElement.innerHTML = `
        .calendly-inline-widget {
          background: #0a0a0a !important;
        }
        
        .calendly-inline-widget iframe {
          background: #0a0a0a !important;
          filter: invert(1) hue-rotate(180deg) brightness(0.9) contrast(1.1) !important;
          border-radius: 0 0 1rem 1rem !important;
        }
        
        .calendly-container iframe {
          background: #0a0a0a !important;
        }
      `;
      document.head.appendChild(styleElement);

      // Load Calendly widget script
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      script.onload = () => {
        // Initialize Calendly widget after script loads with dark theme
        if (window.Calendly && calendlyRef.current) {
          window.Calendly.initInlineWidget({
            url: 'https://calendly.com/2224ashutosh/30min',
            parentElement: calendlyRef.current,
            prefill: {},
            utm: {},
            styles: {
              height: '100%'
            }
          });
          
          // Hide loading state after widget loads
          setTimeout(() => {
            const loadingElement = document.querySelector('.calendly-loading');
            if (loadingElement) {
              (loadingElement as HTMLElement).style.display = 'none';
            }
          }, 2000);
        }
      };
      
      // Only add script if it doesn't exist
      const existingScript = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]');
      if (!existingScript) {
        document.head.appendChild(script);
      } else if (window.Calendly && calendlyRef.current) {
        // If script already exists, just initialize
        window.Calendly.initInlineWidget({
          url: 'https://calendly.com/2224ashutosh/30min',
          parentElement: calendlyRef.current,
          prefill: {},
          utm: {},
          styles: {
            height: '100%'
          }
        });
        
        // Hide loading state after widget loads
        setTimeout(() => {
          const loadingElement = document.querySelector('.calendly-loading');
          if (loadingElement) {
            (loadingElement as HTMLElement).style.display = 'none';
          }
        }, 2000);
      }

      return () => {
        document.body.style.overflow = 'unset';
        // Clean up calendly widget
        if (calendlyRef.current) {
          calendlyRef.current.innerHTML = '';
        }
        // Remove custom styles
        const customStyles = document.getElementById('calendly-dark-theme');
        if (customStyles) {
          document.head.removeChild(customStyles);
        }
      };
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-matteBlack-800/90 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      ></div>
      
      {/* Modal */}
      <div className="relative w-full max-w-4xl mx-4 h-[90vh] max-h-[800px] glass-effect rounded-2xl border border-surface-border overflow-hidden animate-scale-in bg-matteBlack-700">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-surface-border bg-matteBlack-600">
          <div>
            <h3 className="text-xl font-semibold text-text-primary">Schedule a Call</h3>
            <p className="text-text-muted text-sm">Book a 30-minute consultation to discuss your project</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-text-muted hover:text-accent-primary transition-colors duration-200 glass-effect rounded-lg hover-glow"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Calendly Widget Container */}
        <div className="h-full pb-16 bg-matteBlack-800 relative">
          <div
            ref={calendlyRef}
            className="h-full w-full calendly-container"
            style={{ 
              minWidth: '320px', 
              height: '100%',
              background: '#0a0a0a'
            }}
          ></div>
          
          {/* Loading state */}
          <div className="absolute inset-0 flex items-center justify-center bg-matteBlack-800 calendly-loading">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-accent-primary mb-4"></div>
              <p className="text-text-muted">Loading calendar...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendlyModal; 
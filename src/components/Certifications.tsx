import React from 'react';
import { Award, ExternalLink } from 'lucide-react';

const Certifications: React.FC = () => {
  const certifications = [
    {
      name: 'Certified JavaScript Developer',
      issuer: 'Tech Certification Institute',
      date: '2023-01-15',
      link: '#',
    },
    {
      name: 'Advanced React Specialist',
      issuer: 'Modern Web Academy',
      date: '2022-11-20',
      link: '#',
    },
    {
      name: 'Full-Stack Web Development',
      issuer: 'Code University',
      date: '2022-06-10',
      link: '#',
    },
  ];

  return (
    <section id="certifications" className="py-20 bg-surface-secondary animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-text-primary">
            Certifications
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            A showcase of my commitment to continuous learning and professional development.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <div key={index} className="bg-surface-card rounded-2xl p-8 border border-surface-border shadow-card animate-fade-in-up" style={{ animationDelay: `${index * 0.2}s` }}>
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-surface-accent p-3 rounded-full">
                  <Award className="w-6 h-6 text-accent-primary" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary">{cert.name}</h3>
              </div>
              <p className="text-text-secondary mb-2">Issuer: {cert.issuer}</p>
              <p className="text-text-secondary mb-6">Date: {new Date(cert.date).toLocaleDateString()}</p>
              <a href={cert.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-accent-primary font-medium">
                <ExternalLink className="w-4 h-4" />
                <span>View Credential</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
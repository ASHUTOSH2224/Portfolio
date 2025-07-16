import React from 'react';
import { Award, ExternalLink, Calendar, CheckCircle, Star, Trophy } from 'lucide-react';

const Certifications: React.FC = () => {
  const certifications = [
    {
      id: 1,
      title: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      date: '2023-08-15',
      expiryDate: '2026-08-15',
      credentialId: 'AWS-CSA-2023-001',
      verifyUrl: '#',
      badge: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=100&h=100&fit=crop',
      skills: ['Cloud Architecture', 'AWS Services', 'Scalability', 'Security'],
      featured: true,
      category: 'Cloud Computing'
    },
    {
      id: 2,
      title: 'Google Cloud Professional Developer',
      issuer: 'Google Cloud',
      date: '2023-06-20',
      expiryDate: '2025-06-20',
      credentialId: 'GCP-PD-2023-002',
      verifyUrl: '#',
      badge: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=100&h=100&fit=crop',
      skills: ['GCP Services', 'Kubernetes', 'DevOps', 'Microservices'],
      featured: true,
      category: 'Cloud Computing'
    },
    {
      id: 3,
      title: 'MongoDB Certified Developer',
      issuer: 'MongoDB University',
      date: '2023-04-10',
      expiryDate: '2025-04-10',
      credentialId: 'MDB-DEV-2023-003',
      verifyUrl: '#',
      badge: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=100&h=100&fit=crop',
      skills: ['NoSQL', 'Database Design', 'Aggregation', 'Performance'],
      featured: false,
      category: 'Database'
    },
    {
      id: 4,
      title: 'Meta React Developer Professional',
      issuer: 'Meta (Facebook)',
      date: '2023-02-28',
      expiryDate: null,
      credentialId: 'META-REACT-2023-004',
      verifyUrl: '#',
      badge: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=100&h=100&fit=crop',
      skills: ['React', 'JavaScript', 'Frontend', 'Component Design'],
      featured: true,
      category: 'Web Development'
    },
    {
      id: 5,
      title: 'TensorFlow Developer Certificate',
      issuer: 'TensorFlow',
      date: '2022-12-15',
      expiryDate: '2025-12-15',
      credentialId: 'TF-DEV-2022-005',
      verifyUrl: '#',
      badge: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=100&h=100&fit=crop',
      skills: ['Machine Learning', 'Deep Learning', 'Neural Networks', 'Python'],
      featured: false,
      category: 'AI/ML'
    },
    {
      id: 6,
      title: 'Docker Certified Associate',
      issuer: 'Docker Inc.',
      date: '2022-10-05',
      expiryDate: '2024-10-05',
      credentialId: 'DOCKER-DCA-2022-006',
      verifyUrl: '#',
      badge: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=100&h=100&fit=crop',
      skills: ['Containerization', 'DevOps', 'Orchestration', 'Deployment'],
      featured: false,
      category: 'DevOps'
    }
  ];

  const categories = ['All', 'Cloud Computing', 'Web Development', 'AI/ML', 'Database', 'DevOps'];
  const [activeCategory, setActiveCategory] = React.useState('All');

  const filteredCertifications = activeCategory === 'All' 
    ? certifications 
    : certifications.filter(cert => cert.category === activeCategory);

  const featuredCertifications = certifications.filter(cert => cert.featured);

  const isExpiringSoon = (expiryDate: string | null) => {
    if (!expiryDate) return false;
    const expiry = new Date(expiryDate);
    const now = new Date();
    const threeMonthsFromNow = new Date(now.getTime() + (90 * 24 * 60 * 60 * 1000));
    return expiry <= threeMonthsFromNow && expiry > now;
  };

  const isExpired = (expiryDate: string | null) => {
    if (!expiryDate) return false;
    return new Date(expiryDate) < new Date();
  };

  return (
    <section id="certifications" className="section-padding bg-gradient-to-b from-surface-secondary to-surface-tertiary">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-7xl font-bold text-gradient mb-8 animate-fade-in-up font-display">
            Certifications
          </h2>
          <p className="text-2xl text-text-secondary max-w-4xl mx-auto animate-fade-in-up delay-200 font-light">
            Professional certifications that validate my expertise and commitment to continuous learning
          </p>
        </div>

        {/* Featured Certifications */}
        <div className="mb-24">
          <div className="flex items-center justify-center mb-12">
            <Trophy className="w-8 h-8 text-accent-primary mr-3" />
            <h3 className="text-3xl font-bold text-text-primary animate-fade-in-up font-display">Featured Certifications</h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuredCertifications.map((cert, index) => (
              <div 
                key={cert.id}
                className="group modern-card p-8 hover-lift animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <img 
                      src={cert.badge} 
                      alt={`${cert.issuer} badge`}
                      className="w-16 h-16 rounded-2xl object-cover"
                    />
                    <div>
                      <span className="tag">{cert.category}</span>
                      <div className="flex items-center space-x-2 mt-2">
                        <Star className="w-4 h-4 text-accent-primary fill-current" />
                        <span className="text-sm text-accent-primary font-medium">Featured</span>
                      </div>
                    </div>
                  </div>
                  <div className={`px-3 py-2 rounded-full text-sm font-medium ${
                    isExpired(cert.expiryDate) ? 'bg-accent-error/20 text-accent-error' :
                    isExpiringSoon(cert.expiryDate) ? 'bg-accent-warning/20 text-accent-warning' :
                    'bg-accent-success/20 text-accent-success'
                  }`}>
                    {isExpired(cert.expiryDate) ? 'Expired' :
                     isExpiringSoon(cert.expiryDate) ? 'Expiring Soon' :
                     'Active'}
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-text-primary mb-3 group-hover:text-gradient transition-all duration-300 font-display">
                  {cert.title}
                </h3>
                
                <p className="text-text-muted mb-6 text-lg">{cert.issuer}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {cert.skills.slice(0, 3).map((skill, skillIndex) => (
                    <span key={skillIndex} className="tag">
                      {skill}
                    </span>
                  ))}
                  {cert.skills.length > 3 && (
                    <span className="text-text-muted">+{cert.skills.length - 3}</span>
                  )}
                </div>
                
                <div className="flex items-center justify-between text-sm text-text-muted mb-6">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>Issued: {new Date(cert.date).toLocaleDateString()}</span>
                  </div>
                  {cert.expiryDate && (
                    <span>Expires: {new Date(cert.expiryDate).toLocaleDateString()}</span>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-muted">ID: {cert.credentialId}</span>
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-accent-primary hover:text-accent-secondary font-medium group/link"
                  >
                    <span>Verify</span>
                    <ExternalLink className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-6 mb-16 animate-fade-in-up">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-8 py-4 rounded-full font-medium text-lg transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-gradient-primary text-white shadow-glow'
                  : 'glass-effect text-text-muted hover:text-accent-primary hover:bg-surface-elevated'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* All Certifications */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredCertifications.map((cert, index) => (
            <div 
              key={cert.id}
              className="group modern-card p-8 hover-lift animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <img 
                    src={cert.badge} 
                    alt={`${cert.issuer} badge`}
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  <span className="tag">{cert.category}</span>
                </div>
                <div className={`px-3 py-2 rounded-full text-sm font-medium ${
                  isExpired(cert.expiryDate) ? 'bg-accent-error/20 text-accent-error' :
                  isExpiringSoon(cert.expiryDate) ? 'bg-accent-warning/20 text-accent-warning' :
                  'bg-accent-success/20 text-accent-success'
                }`}>
                  {isExpired(cert.expiryDate) ? 'Expired' :
                   isExpiringSoon(cert.expiryDate) ? 'Expiring Soon' :
                   'Active'}
                </div>
              </div>

              <h3 className="text-xl font-bold text-text-primary mb-3 group-hover:text-gradient transition-all duration-300 font-display">
                {cert.title}
              </h3>
              
              <p className="text-text-muted mb-6">{cert.issuer}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {cert.skills.slice(0, 4).map((skill, skillIndex) => (
                  <span key={skillIndex} className="tag text-sm">
                    {skill}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center justify-between text-sm text-text-muted mb-6">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(cert.date).toLocaleDateString()}</span>
                </div>
                {cert.expiryDate && !isExpired(cert.expiryDate) && (
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-accent-success" />
                    <span className="text-accent-success">Valid</span>
                  </div>
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-muted">ID: {cert.credentialId}</span>
                <a
                  href={cert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-accent-primary hover:text-accent-secondary font-medium group/link"
                >
                  <span>Verify</span>
                  <ExternalLink className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-24 text-center animate-fade-in-up delay-800">
          <div className="glass-card p-12 max-w-5xl mx-auto">
            <div className="flex items-center justify-center mb-8">
              <Award className="w-12 h-12 text-accent-primary mr-4" />
              <h3 className="text-3xl font-bold text-text-primary font-display">Certification Stats</h3>
            </div>
            <div className="grid md:grid-cols-4 gap-10">
              <div>
                <div className="text-4xl font-bold text-gradient mb-3">{certifications.length}</div>
                <div className="text-text-muted text-lg">Total Certifications</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-accent-success mb-3">
                  {certifications.filter(cert => !isExpired(cert.expiryDate)).length}
                </div>
                <div className="text-text-muted text-lg">Active</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-accent-warning mb-3">
                  {certifications.filter(cert => isExpiringSoon(cert.expiryDate)).length}
                </div>
                <div className="text-text-muted text-lg">Expiring Soon</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-accent-primary mb-3">
                  {new Set(certifications.map(cert => cert.category)).size}
                </div>
                <div className="text-text-muted text-lg">Categories</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
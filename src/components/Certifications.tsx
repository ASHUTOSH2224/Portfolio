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
    <section id="certifications" className="section-large bg-bg-primary">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-display-medium font-inter font-bold text-white mb-6 animate-fade-in-up">
            Certifications
          </h2>
          <p className="text-subheadline text-gray-400 max-w-2xl mx-auto animate-fade-in-up delay-200">
            Professional certifications that validate my expertise and commitment to continuous learning
          </p>
        </div>

        {/* Featured Certifications */}
        <div className="mb-20">
          <div className="flex items-center justify-center mb-12">
            <Trophy className="w-6 h-6 text-vercel-orange mr-3" />
            <h3 className="text-headline font-inter font-bold text-white animate-fade-in-up">
              Featured certifications
            </h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCertifications.map((cert, index) => (
              <div 
                key={cert.id}
                className="card-large p-6 group hover:shadow-vercel-xl transition-all duration-300 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={cert.badge} 
                      alt={`${cert.issuer} badge`}
                      className="w-12 h-12 rounded-vercel-md object-cover"
                    />
                    <div>
                      <span className="tag tag-blue">{cert.category}</span>
                      <div className="flex items-center space-x-1 mt-2">
                        <Star className="w-3 h-3 text-vercel-orange fill-current" />
                        <span className="text-caption text-vercel-orange font-medium">Featured</span>
                      </div>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-caption font-medium ${
                    isExpired(cert.expiryDate) ? 'bg-vercel-red bg-opacity-10 text-vercel-red' :
                    isExpiringSoon(cert.expiryDate) ? 'bg-vercel-orange bg-opacity-10 text-vercel-orange' :
                    'bg-vercel-green bg-opacity-10 text-vercel-green'
                  }`}>
                    {isExpired(cert.expiryDate) ? 'Expired' :
                     isExpiringSoon(cert.expiryDate) ? 'Expiring soon' :
                     'Active'}
                  </div>
                </div>

                <h3 className="text-body font-semibold text-white mb-3 group-hover:text-vercel-blue transition-colors duration-300">
                  {cert.title}
                </h3>
                
                <p className="text-caption text-gray-400 mb-4">{cert.issuer}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {cert.skills.slice(0, 3).map((skill, skillIndex) => (
                    <span key={skillIndex} className="tag text-xs">
                      {skill}
                    </span>
                  ))}
                  {cert.skills.length > 3 && (
                    <span className="text-gray-500 text-xs">+{cert.skills.length - 3}</span>
                  )}
                </div>
                
                <div className="flex items-center justify-between text-caption text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>Issued: {new Date(cert.date).toLocaleDateString()}</span>
                  </div>
                  {cert.expiryDate && (
                    <span>Expires: {new Date(cert.expiryDate).toLocaleDateString()}</span>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-caption text-gray-500">ID: {cert.credentialId}</span>
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-link text-caption flex items-center space-x-1 group/link"
                  >
                    <span>Verify</span>
                    <ExternalLink className="w-3 h-3 group-hover/link:translate-x-1 transition-transform duration-200" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-in-up">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-vercel-md font-medium text-body transition-all duration-200 ${
                activeCategory === category
                  ? 'bg-vercel-blue text-white shadow-vercel-md'
                  : 'bg-bg-elevated text-gray-400 hover:text-white hover:bg-gray-800 border border-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* All Certifications */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCertifications.map((cert, index) => (
            <div 
              key={cert.id}
              className="card p-6 group hover:shadow-vercel-lg transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <img 
                    src={cert.badge} 
                    alt={`${cert.issuer} badge`}
                    className="w-10 h-10 rounded-vercel-sm object-cover"
                  />
                  <span className="tag tag-blue">{cert.category}</span>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  isExpired(cert.expiryDate) ? 'bg-vercel-red bg-opacity-10 text-vercel-red' :
                  isExpiringSoon(cert.expiryDate) ? 'bg-vercel-orange bg-opacity-10 text-vercel-orange' :
                  'bg-vercel-green bg-opacity-10 text-vercel-green'
                }`}>
                  {isExpired(cert.expiryDate) ? 'Expired' :
                   isExpiringSoon(cert.expiryDate) ? 'Expiring soon' :
                   'Active'}
                </div>
              </div>

              <h3 className="text-body font-semibold text-white mb-3 group-hover:text-vercel-blue transition-colors duration-300">
                {cert.title}
              </h3>
              
              <p className="text-caption text-gray-400 mb-4">{cert.issuer}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {cert.skills.slice(0, 2).map((skill, skillIndex) => (
                  <span key={skillIndex} className="tag text-xs">
                    {skill}
                  </span>
                ))}
                {cert.skills.length > 2 && (
                  <span className="text-gray-500 text-xs">+{cert.skills.length - 2}</span>
                )}
              </div>
              
              <div className="flex items-center justify-between text-caption text-gray-500 mb-4">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-3 h-3" />
                  <span>{new Date(cert.date).toLocaleDateString()}</span>
                </div>
                {cert.expiryDate && (
                  <span>Expires: {new Date(cert.expiryDate).toLocaleDateString()}</span>
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-caption text-gray-500">ID: {cert.credentialId}</span>
                <a
                  href={cert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-link text-caption flex items-center space-x-1 group/link"
                >
                  <span>Verify</span>
                  <ExternalLink className="w-3 h-3 group-hover/link:translate-x-1 transition-transform duration-200" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-20 animate-fade-in-up delay-600">
          <div className="product-showcase max-w-4xl mx-auto p-8">
            <div className="flex items-center justify-center mb-6">
              <Award className="w-8 h-8 text-vercel-blue mr-3" />
              <h3 className="text-headline font-inter font-bold text-white">
                Continuous learning
              </h3>
            </div>
            <p className="text-body text-gray-400 leading-relaxed mb-8 max-w-2xl mx-auto">
              I'm committed to staying current with the latest technologies and best practices 
              through continuous learning and professional development.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {['AWS', 'GCP', 'Azure', 'Kubernetes', 'Serverless', 'Blockchain'].map((tech, index) => (
                <span 
                  key={tech}
                  className="tag tag-purple animate-fade-in"
                  style={{ animationDelay: `${0.7 + index * 0.1}s` }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
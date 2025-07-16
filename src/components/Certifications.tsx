import React from 'react';
import { Award, ExternalLink, Calendar, CheckCircle, Star } from 'lucide-react';

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
    <section id="certifications" className="py-24 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold text-gradient mb-6 animate-fade-in-up">
            Certifications
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto animate-fade-in-up delay-200">
            Professional certifications that validate my expertise and commitment to continuous learning
          </p>
        </div>

        {/* Featured Certifications */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-white mb-8 animate-fade-in-up">⭐ Featured Certifications</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCertifications.map((cert, index) => (
              <div 
                key={cert.id}
                className="group modern-card p-6 hover-lift animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={cert.badge} 
                      alt={`${cert.issuer} badge`}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <span className="tag text-xs">{cert.category}</span>
                      <div className="flex items-center space-x-1 mt-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className="text-xs text-yellow-400">Featured</span>
                      </div>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    isExpired(cert.expiryDate) ? 'bg-red-500/20 text-red-400' :
                    isExpiringSoon(cert.expiryDate) ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-green-500/20 text-green-400'
                  }`}>
                    {isExpired(cert.expiryDate) ? 'Expired' :
                     isExpiringSoon(cert.expiryDate) ? 'Expiring Soon' :
                     'Active'}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-gradient transition-all duration-300">
                  {cert.title}
                </h3>
                
                <p className="text-gray-400 text-sm mb-4">{cert.issuer}</p>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {cert.skills.slice(0, 3).map((skill, skillIndex) => (
                    <span key={skillIndex} className="tag text-xs">
                      {skill}
                    </span>
                  ))}
                  {cert.skills.length > 3 && (
                    <span className="text-gray-500 text-xs">+{cert.skills.length - 3}</span>
                  )}
                </div>
                
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>Issued: {new Date(cert.date).toLocaleDateString()}</span>
                  </div>
                  {cert.expiryDate && (
                    <span>Expires: {new Date(cert.expiryDate).toLocaleDateString()}</span>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">ID: {cert.credentialId}</span>
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 text-xs font-medium group/link"
                  >
                    <span>Verify</span>
                    <ExternalLink className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform duration-300" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in-up">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  : 'glass text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* All Certifications */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCertifications.map((cert, index) => (
            <div 
              key={cert.id}
              className="group modern-card p-6 hover-lift animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <img 
                    src={cert.badge} 
                    alt={`${cert.issuer} badge`}
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                  <span className="tag text-xs">{cert.category}</span>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  isExpired(cert.expiryDate) ? 'bg-red-500/20 text-red-400' :
                  isExpiringSoon(cert.expiryDate) ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-green-500/20 text-green-400'
                }`}>
                  {isExpired(cert.expiryDate) ? 'Expired' :
                   isExpiringSoon(cert.expiryDate) ? 'Expiring Soon' :
                   'Active'}
                </div>
              </div>

              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-gradient transition-all duration-300">
                {cert.title}
              </h3>
              
              <p className="text-gray-400 text-sm mb-4">{cert.issuer}</p>
              
              <div className="flex flex-wrap gap-1 mb-4">
                {cert.skills.slice(0, 4).map((skill, skillIndex) => (
                  <span key={skillIndex} className="tag text-xs">
                    {skill}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-3 h-3" />
                  <span>{new Date(cert.date).toLocaleDateString()}</span>
                </div>
                {cert.expiryDate && !isExpired(cert.expiryDate) && (
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="w-3 h-3 text-green-400" />
                    <span className="text-green-400">Valid</span>
                  </div>
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">ID: {cert.credentialId}</span>
                <a
                  href={cert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 text-xs font-medium group/link"
                >
                  <span>Verify</span>
                  <ExternalLink className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform duration-300" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-20 text-center animate-fade-in-up delay-800">
          <div className="glass-card p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-6">Certification Stats</h3>
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="text-3xl font-bold text-gradient mb-2">{certifications.length}</div>
                <div className="text-gray-400 text-sm">Total Certifications</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-400 mb-2">
                  {certifications.filter(cert => !isExpired(cert.expiryDate)).length}
                </div>
                <div className="text-gray-400 text-sm">Active</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-400 mb-2">
                  {certifications.filter(cert => isExpiringSoon(cert.expiryDate)).length}
                </div>
                <div className="text-gray-400 text-sm">Expiring Soon</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-400 mb-2">
                  {new Set(certifications.map(cert => cert.category)).size}
                </div>
                <div className="text-gray-400 text-sm">Categories</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
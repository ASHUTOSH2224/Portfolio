import React from 'react';
import { Award, ExternalLink, Calendar, CheckCircle } from 'lucide-react';

const Certifications: React.FC = () => {
  const certifications = [
    {
      title: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      date: '2023',
      credentialId: 'AWS-SAA-C03-2023',
      verifyUrl: '#',
      status: 'Active',
      description: 'Expertise in designing distributed systems on AWS cloud platform',
      color: 'from-accent-primary to-accent-secondary'
    },
    {
      title: 'React Developer Certificate',
      issuer: 'Meta (Facebook)',
      date: '2023',
      credentialId: 'META-REACT-2023',
      verifyUrl: '#',
      status: 'Active',
      description: 'Advanced React development and modern frontend practices',
      color: 'from-accent-secondary to-accent-tertiary'
    },
    {
      title: 'TypeScript Professional',
      issuer: 'Microsoft',
      date: '2022',
      credentialId: 'TS-PRO-2022',
      verifyUrl: '#',
      status: 'Active',
      description: 'Type-safe JavaScript development and advanced TypeScript features',
      color: 'from-accent-tertiary to-accent-primary'
    },
    {
      title: 'MongoDB Certified Developer',
      issuer: 'MongoDB University',
      date: '2022',
      credentialId: 'MONGO-DEV-2022',
      verifyUrl: '#',
      status: 'Active',
      description: 'Database design and development with MongoDB',
      color: 'from-accent-primary to-accent-tertiary'
    },
    {
      title: 'Docker Certified Associate',
      issuer: 'Docker Inc.',
      date: '2022',
      credentialId: 'DCA-2022',
      verifyUrl: '#',
      status: 'Active',
      description: 'Containerization and orchestration expertise',
      color: 'from-accent-secondary to-accent-primary'
    },
    {
      title: 'JavaScript Algorithms & Data Structures',
      issuer: 'freeCodeCamp',
      date: '2021',
      credentialId: 'FCC-JS-2021',
      verifyUrl: '#',
      status: 'Active',
      description: 'Advanced JavaScript programming and algorithmic thinking',
      color: 'from-accent-tertiary to-accent-secondary'
    }
  ];

  return (
    <section id="certifications" className="py-20 bg-surface-primary relative overflow-hidden">
      {/* Light Theme Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-surface-accent/20 via-surface-secondary/10 to-surface-accent/20"></div>
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-accent-primary/8 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-accent-secondary/6 rounded-full blur-3xl animate-float delay-400"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">
            Certifications
          </h2>
          <p className="text-xl text-text-muted max-w-3xl mx-auto">
            Professional certifications that validate my expertise across multiple technologies and platforms
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="group bg-surface-card border border-surface-border rounded-2xl p-6 hover:scale-105 transition-all duration-300 shadow-card hover:shadow-glow-orange hover:border-accent-primary/30 animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Certification Header */}
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 bg-gradient-to-r ${cert.color} rounded-lg group-hover:scale-110 transition-transform duration-300 glow-orange`}>
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-accent-primary" />
                  <span className="text-xs text-accent-primary font-medium">{cert.status}</span>
                </div>
              </div>

              {/* Certification Info */}
              <h3 className="text-lg font-bold text-text-primary mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-accent-primary group-hover:to-accent-secondary group-hover:bg-clip-text transition-all duration-300">
                {cert.title}
              </h3>
              
              <p className="text-accent-primary font-medium mb-2">{cert.issuer}</p>
              
              <p className="text-text-secondary text-sm mb-4 leading-relaxed group-hover:text-text-primary transition-colors duration-300">
                {cert.description}
              </p>

              {/* Certification Details */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center text-text-muted text-sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>Issued: {cert.date}</span>
                </div>
                <div className="text-text-muted text-xs">
                  <span className="font-mono">ID: {cert.credentialId}</span>
                </div>
              </div>

              {/* Verify Button */}
              <a
                href={cert.verifyUrl}
                className="flex items-center justify-center space-x-2 w-full px-4 py-2 bg-surface-secondary border border-surface-border text-text-muted rounded-lg hover:border-accent-primary/50 hover:text-accent-primary transition-all duration-300 transform hover:scale-105 group"
              >
                <ExternalLink size={16} className="group-hover:animate-bounce" />
                <span>Verify Certificate</span>
              </a>
            </div>
          ))}
        </div>

        {/* Continuous Learning */}
        <div className="mt-16 text-center animate-fade-in-up delay-800">
          <div className="bg-surface-card border border-surface-border rounded-2xl p-8 max-w-4xl mx-auto shadow-card hover:shadow-glow-orange transition-all duration-300">
            <h3 className="text-2xl font-semibold text-text-primary mb-4 flex items-center justify-center">
              <Award className="w-6 h-6 text-accent-primary mr-3" />
              Continuous Learning Journey
            </h3>
            <p className="text-text-secondary leading-relaxed mb-6">
              I believe in continuous improvement and staying updated with the latest technologies. 
              Currently pursuing advanced certifications in cloud computing, advanced React patterns, and modern development practices.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {['Advanced React', 'Cloud Architecture', 'System Design', 'DevOps'].map((upcoming, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-surface-secondary border border-accent-primary/30 text-accent-primary rounded-full text-sm animate-fade-in"
                  style={{ animationDelay: `${(index * 100) + 1000}ms` }}
                >
                  {upcoming} (In Progress)
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
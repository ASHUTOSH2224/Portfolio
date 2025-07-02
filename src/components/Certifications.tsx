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
      color: 'from-orange-500 to-red-500'
    },
    {
      title: 'TensorFlow Developer Certificate',
      issuer: 'Google',
      date: '2023',
      credentialId: 'TF-DEV-2023',
      verifyUrl: '#',
      status: 'Active',
      description: 'Proficiency in building and deploying ML models with TensorFlow',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Meta React Developer Professional',
      issuer: 'Meta (Facebook)',
      date: '2022',
      credentialId: 'META-REACT-2022',
      verifyUrl: '#',
      status: 'Active',
      description: 'Advanced React development and modern frontend practices',
      color: 'from-blue-600 to-purple-600'
    },
    {
      title: 'MongoDB Certified Developer',
      issuer: 'MongoDB University',
      date: '2022',
      credentialId: 'MONGO-DEV-2022',
      verifyUrl: '#',
      status: 'Active',
      description: 'Database design and development with MongoDB',
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Docker Certified Associate',
      issuer: 'Docker Inc.',
      date: '2022',
      credentialId: 'DCA-2022',
      verifyUrl: '#',
      status: 'Active',
      description: 'Containerization and orchestration expertise',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      title: 'Python Institute PCPP1',
      issuer: 'Python Institute',
      date: '2021',
      credentialId: 'PCPP1-2021',
      verifyUrl: '#',
      status: 'Active',
      description: 'Professional Python programming certification',
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  return (
    <section id="certifications" className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Certifications
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Professional certifications that validate my expertise across multiple technologies and platforms
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="group bg-gradient-to-br from-gray-800/50 to-gray-700/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:scale-105 transition-all duration-300 hover:shadow-xl"
            >
              {/* Certification Header */}
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 bg-gradient-to-r ${cert.color} rounded-lg group-hover:scale-110 transition-transform duration-300`}>
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-xs text-green-400 font-medium">{cert.status}</span>
                </div>
              </div>

              {/* Certification Info */}
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-500 group-hover:bg-clip-text transition-all duration-300">
                {cert.title}
              </h3>
              
              <p className="text-blue-400 font-medium mb-2">{cert.issuer}</p>
              
              <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                {cert.description}
              </p>

              {/* Certification Details */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center text-gray-400 text-sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>Issued: {cert.date}</span>
                </div>
                <div className="text-gray-400 text-xs">
                  <span className="font-mono">ID: {cert.credentialId}</span>
                </div>
              </div>

              {/* Verify Button */}
              <a
                href={cert.verifyUrl}
                className="flex items-center justify-center space-x-2 w-full px-4 py-2 bg-gray-800/50 border border-gray-600 text-gray-300 rounded-lg hover:border-blue-500 hover:text-blue-400 transition-all duration-200 transform hover:scale-105"
              >
                <ExternalLink size={16} />
                <span>Verify Certificate</span>
              </a>
            </div>
          ))}
        </div>

        {/* Continuous Learning */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold text-white mb-4 flex items-center justify-center">
              <Award className="w-6 h-6 text-yellow-400 mr-3" />
              Continuous Learning Journey
            </h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              I believe in continuous improvement and staying updated with the latest technologies. 
              Currently pursuing advanced certifications in Kubernetes, AI/ML Engineering, and Cloud Security.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {['Kubernetes CKA', 'AWS ML Specialty', 'Google Cloud AI', 'Azure DevOps'].map((upcoming, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 text-yellow-400 rounded-full text-sm"
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
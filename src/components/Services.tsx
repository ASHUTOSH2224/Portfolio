import React from 'react';
import { Code, Brain, Smartphone, Cloud, Database, Shield, Zap, Globe } from 'lucide-react';

const Services: React.FC = () => {
  const services = [
    {
      icon: Code,
      title: 'Full-Stack Development',
      description: 'End-to-end web application development with modern technologies and best practices.',
      features: ['React/Next.js', 'Node.js/Express', 'TypeScript', 'REST APIs', 'GraphQL', 'Testing'],
      color: 'from-vercel-blue to-vercel-purple',
      animation: 'animate-card-slide-in'
    },
    {
      icon: Brain,
      title: 'AI & Machine Learning',
      description: 'Intelligent solutions powered by cutting-edge AI and machine learning technologies.',
      features: ['TensorFlow/PyTorch', 'Natural Language Processing', 'Computer Vision', 'Predictive Analytics', 'Chatbots', 'Recommendation Systems'],
      color: 'from-vercel-purple to-vercel-pink',
      animation: 'animate-card-slide-in'
    },
    {
      icon: Smartphone,
      title: 'Mobile Development',
      description: 'Cross-platform mobile applications for iOS and Android with native performance.',
      features: ['React Native', 'Flutter', 'Native iOS/Android', 'PWA Development', 'App Store Optimization', 'Performance Tuning'],
      color: 'from-vercel-pink to-vercel-orange',
      animation: 'animate-card-slide-in'
    },
    {
      icon: Cloud,
      title: 'Cloud & DevOps',
      description: 'Scalable cloud infrastructure and automated deployment pipelines.',
      features: ['AWS/Azure/GCP', 'Docker & Kubernetes', 'CI/CD Pipelines', 'Infrastructure as Code', 'Monitoring & Logging', 'Security'],
      color: 'from-vercel-orange to-vercel-green',
      animation: 'animate-card-slide-in'
    },
    {
      icon: Database,
      title: 'Database Design',
      description: 'Optimized database architecture and data management solutions.',
      features: ['SQL & NoSQL', 'Database Optimization', 'Data Migration', 'Backup & Recovery', 'Data Security', 'Performance Tuning'],
      color: 'from-vercel-green to-vercel-blue',
      animation: 'animate-card-slide-in'
    },
    {
      icon: Shield,
      title: 'Security & Compliance',
      description: 'Enterprise-grade security implementations and compliance frameworks.',
      features: ['Authentication & Authorization', 'Data Encryption', 'GDPR Compliance', 'Security Audits', 'Penetration Testing', 'Security Training'],
      color: 'from-vercel-blue to-vercel-purple',
      animation: 'animate-card-slide-in'
    }
  ];

  return (
    <section id="services" className="py-24 bg-black">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-in-up">
            Services I Offer
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto animate-fade-in-up delay-200">
            Comprehensive development services to bring your ideas to life with cutting-edge technology
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={service.title}
              className={`bg-black border border-gray-800 rounded-xl p-8 hover:border-vercel-blue transition-all duration-300 animate-card-slide-in card-hover-effect`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-vercel-blue transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <div className="space-y-3">
                {service.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-vercel-blue rounded-full"></div>
                    <span className="text-sm text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Hover Effect */}
              <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center text-vercel-blue text-sm font-medium">
                  <span>Learn more</span>
                  <Zap className="w-4 h-4 ml-2" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Process Section */}
        <div className="mt-32">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-white mb-6">
              My Development Process
            </h3>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              A systematic approach to delivering high-quality solutions
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Discovery', description: 'Understanding your requirements and goals' },
              { step: '02', title: 'Planning', description: 'Creating detailed project roadmap and architecture' },
              { step: '03', title: 'Development', description: 'Building your solution with best practices' },
              { step: '04', title: 'Deployment', description: 'Launching and maintaining your application' }
            ].map((process, index) => (
              <div 
                key={process.step}
                className="text-center animate-card-slide-in card-hover-effect"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="w-20 h-20 bg-gradient-to-r from-vercel-blue to-vercel-purple rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl font-bold text-white">{process.step}</span>
                </div>
                <h4 className="text-xl font-bold text-white mb-3">{process.title}</h4>
                <p className="text-gray-400">{process.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <div className="bg-black border border-gray-800 rounded-2xl p-12 max-w-4xl mx-auto animate-card-slide-in card-glow-effect">
            <h3 className="text-3xl font-bold text-white mb-6">
              Ready to start your project?
            </h3>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Let's discuss your requirements and create something amazing together. I'm here to help you build the next big thing.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#contact"
                className="bg-white text-black px-8 py-4 rounded-lg font-medium text-lg hover:bg-gray-100 transition-all duration-200 flex items-center space-x-2"
              >
                <span>Get Started</span>
                <Globe className="w-5 h-5" />
              </a>
              <a
                href="#projects"
                className="bg-black text-white border border-gray-700 px-8 py-4 rounded-lg font-medium text-lg hover:bg-gray-900 hover:border-gray-600 transition-all duration-200"
              >
                View Portfolio
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services; 
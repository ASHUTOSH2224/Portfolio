import React from 'react';
import { Code, Smartphone, Layout, Server, Database } from 'lucide-react';

const Services: React.FC = () => {
  const services = [
    {
      title: 'Web App Development',
      description: 'I build custom web applications that are fast, scalable, and secure. I use modern technologies like React, Next.js, and Node.js to create high-quality solutions that meet your business needs.',
      icon: Code,
    },
    {
      title: 'Mobile App Development',
      description: 'I create cross-platform mobile applications for iOS and Android using Flutter and React Native. I focus on building beautiful, intuitive, and high-performance apps that your users will love.',
      icon: Smartphone,
    },
    {
      title: 'UI/UX Design',
      description: 'I design user-friendly interfaces that are both beautiful and effective. I work with you to create a design that reflects your brand and provides a seamless user experience.',
      icon: Layout,
    },
    {
      title: 'API Integration & Backend',
      description: 'I build robust and scalable backend systems and APIs. I have experience with Node.js, Python, and a variety of databases, including PostgreSQL and MongoDB.',
      icon: Server,
    },
    {
      title: 'Maintenance & Optimization',
      description: 'I provide ongoing maintenance and support to ensure your application is always up-to-date and running smoothly. I also offer performance optimization services to improve speed and efficiency.',
      icon: Database,
    },
  ];

  return (
    <section id="services" className="py-20 bg-surface-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-text-primary">
            Services
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            I offer a range of services to help you build and grow your business.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-surface-card rounded-2xl p-8 border border-surface-border shadow-card">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-surface-accent p-3 rounded-full">
                  <service.icon className="w-6 h-6 text-accent-primary" />
                </div>
                <h3 className="text-2xl font-semibold text-text-primary">{service.title}</h3>
              </div>
              <p className="text-text-secondary leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

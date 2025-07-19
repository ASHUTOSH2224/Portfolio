import React from 'react';
import { Code, Brain, Rocket, Award, Users, Coffee, Target } from 'lucide-react';

const About: React.FC = () => {
  const stats = [
    { icon: Code, label: 'Projects Completed', value: '50+', color: 'apple-blue' },
    { icon: Users, label: 'Happy Clients', value: '30+', color: 'apple-green' },
    { icon: Coffee, label: 'Cups of Coffee', value: '1000+', color: 'apple-orange' },
    { icon: Award, label: 'Years Experience', value: '3+', color: 'apple-purple' }
  ];

  const highlights = [
    {
      icon: Brain,
      title: 'AI & Machine Learning',
      description: 'Building intelligent systems that solve real-world problems with cutting-edge technology.',
    },
    {
      icon: Code,
      title: 'Full Stack Development',
      description: 'Creating seamless experiences from frontend interfaces to robust backend systems.',
    },
    {
      icon: Rocket,
      title: 'Performance Optimization',
      description: 'Delivering lightning-fast, scalable applications that perform at enterprise scale.',
    }
  ];

  return (
    <section id="about" className="section-large bg-apple-gray-50">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-display-medium font-sf-pro-display font-semibold text-apple-gray-700 mb-6 animate-fade-in-up">
            About me
          </h2>
          <p className="text-subheadline text-apple-gray-500 max-w-2xl mx-auto animate-fade-in-up delay-200">
            Passionate about creating digital solutions that make a difference
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-20 items-center mb-20">
          {/* Content */}
          <div className="space-y-8 animate-fade-in-up delay-300">
            <div className="space-y-6">
              <h3 className="text-headline font-sf-pro-display font-semibold text-apple-gray-700">
                Turning ideas into reality
              </h3>
              <div className="space-y-4 text-body text-apple-gray-500 leading-relaxed">
                <p>
                  With a <span className="text-apple-blue font-medium">B.Tech in Computer Science</span>, 
                  I've dedicated my career to mastering full-stack development and artificial intelligence.
                </p>
                <p>
                  As <span className="text-apple-purple font-medium">Head of Software Architecture</span> at Scalixity, 
                  I lead teams in building scalable, intelligent systems that drive business growth.
                </p>
                <p>
                  I believe in <span className="text-apple-green font-medium">clean code</span>, 
                  innovative solutions, and continuous learning.
                </p>
              </div>
            </div>

            {/* Highlights */}
            <div className="space-y-4">
              {highlights.map((item, index) => (
                <div 
                  key={index}
                  className="card p-6 hover:shadow-apple-lg transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${(index + 4) * 0.1}s` }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-apple-blue bg-opacity-10 rounded-apple-md">
                      <item.icon className="w-6 h-6 text-apple-blue" />
                    </div>
                    <div>
                      <h4 className="text-body font-medium text-apple-gray-700 mb-2">{item.title}</h4>
                      <p className="text-caption text-apple-gray-500">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-6 animate-fade-in-up delay-400">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="card-large p-8 text-center group hover:scale-105 transition-all duration-300 animate-scale-in"
                style={{ animationDelay: `${(index + 6) * 0.1}s` }}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-${stat.color} bg-opacity-10 rounded-apple-lg mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className={`w-8 h-8 text-${stat.color}`} />
                </div>
                <div className={`text-display-small font-sf-pro-display font-semibold text-${stat.color} mb-2`}>
                  {stat.value}
                </div>
                <div className="text-caption text-apple-gray-500 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Preview */}
        <div className="text-center animate-fade-in-up delay-600">
          <h3 className="text-headline font-sf-pro-display font-semibold text-apple-gray-700 mb-8">
            Core technologies
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {['React', 'Node.js', 'Python', 'TypeScript', 'AI/ML', 'AWS', 'MongoDB', 'Docker'].map((tech, index) => (
              <span 
                key={tech}
                className="tag tag-blue animate-fade-in delay-700"
                style={{ animationDelay: `${0.7 + index * 0.1}s` }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-20 animate-fade-in-up delay-800">
          <div className="product-showcase max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Target className="w-8 h-8 text-apple-blue mr-3" />
              <h3 className="text-headline font-sf-pro-display font-semibold text-apple-gray-700">
                Ready to collaborate?
              </h3>
            </div>
            <p className="text-body text-apple-gray-500 mb-8 leading-relaxed max-w-2xl mx-auto">
              Let's work together to bring your ideas to life with cutting-edge technology and innovative solutions.
            </p>
            <a
              href="#contact"
              className="btn-primary"
            >
              Start a project
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
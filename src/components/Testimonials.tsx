import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CEO, TechStart Inc.',
      content: 'Ashutosh delivered an exceptional e-commerce platform that exceeded our expectations. His attention to detail and technical expertise are unmatched.',
      rating: 5,
      project: 'E-commerce Platform',
      avatar: 'SJ'
    },
    {
      name: 'Michael Chen',
      role: 'Product Manager, InnovateCorp',
      content: 'Working with Ashutosh was a game-changer for our AI project. He brought complex machine learning concepts to life with elegant, scalable solutions.',
      rating: 5,
      project: 'AI Recommendation System',
      avatar: 'MC'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Founder, CreativeStudio',
      content: 'The mobile app Ashutosh built for us is not only beautiful but also performs flawlessly. His development process was transparent and collaborative.',
      rating: 5,
      project: 'Mobile Application',
      avatar: 'ER'
    },
    {
      name: 'David Thompson',
      role: 'CTO, DataFlow Solutions',
      content: 'Ashutosh\'s expertise in cloud architecture and DevOps transformed our infrastructure. We\'ve seen a 40% improvement in deployment speed.',
      rating: 5,
      project: 'Cloud Infrastructure',
      avatar: 'DT'
    },
    {
      name: 'Lisa Wang',
      role: 'Marketing Director, GrowthCo',
      content: 'The marketing website Ashutosh created helped us increase conversions by 60%. His understanding of both technical and business needs is impressive.',
      rating: 5,
      project: 'Marketing Website',
      avatar: 'LW'
    },
    {
      name: 'Alex Kumar',
      role: 'Startup Founder, NextGen',
      content: 'From concept to launch, Ashutosh guided us through every step. His full-stack development skills and strategic thinking are invaluable.',
      rating: 5,
      project: 'SaaS Platform',
      avatar: 'AK'
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star 
        key={index} 
        className={`w-4 h-4 ${index < rating ? 'text-yellow-400 fill-current' : 'text-gray-600'}`} 
      />
    ));
  };

  return (
    <section id="testimonials" className="py-24 bg-black">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-in-up">
            What Clients Say
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto animate-fade-in-up delay-200">
            Don't just take my word for it. Here's what my clients have to say about working together.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.name}
              className="bg-black border border-gray-800 rounded-xl p-8 hover:border-vercel-blue transition-all duration-300 animate-card-slide-in card-hover-effect"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Quote Icon */}
              <div className="mb-6">
                <Quote className="w-8 h-8 text-vercel-blue" />
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4">
                {renderStars(testimonial.rating)}
                <span className="text-sm text-gray-400 ml-2">({testimonial.rating}.0)</span>
              </div>

              {/* Content */}
              <p className="text-gray-300 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Project Badge */}
              <div className="mb-6">
                <span className="px-3 py-1 bg-vercel-blue bg-opacity-10 text-vercel-blue text-sm font-medium rounded-lg border border-vercel-blue border-opacity-20">
                  {testimonial.project}
                </span>
              </div>

              {/* Author */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-vercel-blue to-vercel-purple rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{testimonial.avatar}</span>
                </div>
                <div>
                  <h4 className="text-white font-semibold">{testimonial.name}</h4>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: '50+', label: 'Projects Completed', icon: '🚀' },
              { number: '100%', label: 'Client Satisfaction', icon: '⭐' },
              { number: '24/7', label: 'Support Available', icon: '🛠️' },
              { number: '2+', label: 'Years Experience', icon: '📈' }
            ].map((stat, index) => (
              <div 
                key={stat.label}
                className="text-center animate-card-slide-in card-3d-effect"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="text-4xl mb-4">{stat.icon}</div>
                <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <div className="bg-black border border-gray-800 rounded-2xl p-12 max-w-4xl mx-auto animate-card-slide-in card-glow-effect">
            <h3 className="text-3xl font-bold text-white mb-6">
              Ready to join my satisfied clients?
            </h3>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Let's work together to bring your vision to life. I'm committed to delivering exceptional results that exceed expectations.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#contact"
                className="bg-white text-black px-8 py-4 rounded-lg font-medium text-lg hover:bg-gray-100 transition-all duration-200 flex items-center space-x-2"
              >
                <span>Start Your Project</span>
                <Star className="w-5 h-5" />
              </a>
              <a
                href="#projects"
                className="bg-black text-white border border-gray-700 px-8 py-4 rounded-lg font-medium text-lg hover:bg-gray-900 hover:border-gray-600 transition-all duration-200"
              >
                View My Work
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 
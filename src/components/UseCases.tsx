import React from 'react';
import { Brain, ShoppingCart, TrendingUp, Building2, Globe, Wrench, Sparkles } from 'lucide-react';

const UseCases: React.FC = () => {
  const useCases = [
    {
      icon: Brain,
      title: 'AI Applications',
      description: 'Deploy at the speed of AI',
      color: 'from-vercel-blue to-vercel-purple',
      features: ['Machine Learning Models', 'Natural Language Processing', 'Computer Vision', 'Predictive Analytics']
    },
    {
      icon: ShoppingCart,
      title: 'E-commerce Platforms',
      description: 'Power storefronts that convert',
      color: 'from-vercel-green to-vercel-blue',
      features: ['Payment Integration', 'Inventory Management', 'Customer Analytics', 'Mobile Commerce']
    },
    {
      icon: TrendingUp,
      title: 'Marketing Sites',
      description: 'Launch campaigns fast',
      color: 'from-vercel-orange to-vercel-pink',
      features: ['Landing Pages', 'SEO Optimization', 'Analytics Integration', 'A/B Testing']
    },
    {
      icon: Building2,
      title: 'Multi-tenant Platforms',
      description: 'Scale apps with one codebase',
      color: 'from-vercel-purple to-vercel-blue',
      features: ['User Management', 'Data Isolation', 'Custom Branding', 'API Management']
    },
    {
      icon: Globe,
      title: 'Web Applications',
      description: 'Ship features, not infrastructure',
      color: 'from-vercel-pink to-vercel-orange',
      features: ['Full-stack Development', 'Real-time Features', 'Database Design', 'API Development']
    },
    {
      icon: Wrench,
      title: 'Developer Tools',
      description: 'Build better developer experiences',
      color: 'from-vercel-blue to-vercel-green',
      features: ['CLI Tools', 'SDKs & Libraries', 'Documentation', 'Testing Frameworks']
    }
  ];

  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            What can I build for you?
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            From AI-powered applications to scalable web platforms, I help bring your ideas to life with cutting-edge technology.
          </p>
        </div>

        {/* Use Cases Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <div 
              key={useCase.title}
              className="group bg-black border border-gray-800 rounded-xl p-6 hover:border-vercel-blue transition-all duration-300 hover:shadow-2xl hover:shadow-vercel-blue/20 animate-card-slide-in card-hover-effect"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${useCase.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <useCase.icon className="w-6 h-6 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-vercel-blue transition-colors duration-300">
                {useCase.title}
              </h3>
              <p className="text-gray-400 mb-6">
                {useCase.description}
              </p>

              {/* Features */}
              <div className="space-y-2">
                {useCase.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-vercel-blue rounded-full"></div>
                    <span className="text-sm text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Hover Effect */}
              <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center text-vercel-blue text-sm font-medium">
                  <span>Learn more</span>
                  <Sparkles className="w-4 h-4 ml-2" />
                </div>
              </div>
            </div>
          ))}
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
                <span>Start Project</span>
                <Sparkles className="w-5 h-5" />
              </a>
              <a
                href="#projects"
                className="bg-gray-800 text-white border border-gray-700 px-8 py-4 rounded-lg font-medium text-lg hover:bg-gray-700 hover:border-gray-600 transition-all duration-200"
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

export default UseCases; 
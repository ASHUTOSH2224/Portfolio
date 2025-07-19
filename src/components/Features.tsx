import React from 'react';
import { Code, MessageSquare, BarChart3, GitBranch, Zap, Globe } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: GitBranch,
      title: "Git-connected Deploys",
      subtitle: "From localhost to https, in seconds.",
      description: "Deploy from Git or your CLI.",
      visual: (
        <div className="space-y-4">
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 font-mono text-sm">
            <div className="text-gray-400">$ git push</div>
            <div className="text-green-400">Enumerating objects: 1, done.</div>
            <div className="text-green-400">Counting objects: 100% (1/1), done.</div>
            <div className="text-green-400">Writing objects: 100% (1/1), 72 bytes, done</div>
            <div className="text-green-400">To github.com:ashutosh/portfolio.git</div>
            <div className="text-blue-400">21326a9..8</div>
          </div>
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-400 text-sm">ashutosh.dev</span>
            </div>
            <div className="text-gray-300 text-lg font-medium">What will you ship?</div>
          </div>
        </div>
      )
    },
    {
      icon: MessageSquare,
      title: "Collaborative Development",
      subtitle: "Every deploy is remarkable.",
      description: "Chat with your team on real, production-grade UI, not just designs.",
      visual: (
        <div className="space-y-4">
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
            <div className="text-gray-300 mb-3">Swapped out the <code className="bg-gray-800 px-1 rounded">button</code> for some variants we needed.</div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-medium">P</div>
              <div className="text-gray-300">How about this instead?</div>
            </div>
            <div className="flex items-start space-x-3 mt-3">
              <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center text-white text-xs font-medium">R</div>
              <div className="text-gray-300">I like it. Does this work with the brand tweaks @mamuso?</div>
            </div>
            <div className="flex items-start space-x-3 mt-3">
              <div className="text-gray-300">This looks great! ↑</div>
              <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      icon: BarChart3,
      title: "Performance Analytics",
      subtitle: "Route-aware observability.",
      description: "Monitor and analyze the performance and traffic of your projects.",
      visual: (
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-gray-300 text-sm">Homepage</span>
              <span className="text-gray-500 text-sm">601,342</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span className="text-gray-300 text-sm">Projects</span>
              <span className="text-gray-500 text-sm">253,809</span>
            </div>
          </div>
          <div className="h-32 bg-gray-800 rounded-lg p-4">
            <div className="h-full flex items-end space-x-1">
              {[20, 35, 25, 45, 30, 50, 40, 60, 55, 70, 65, 80].map((height, index) => (
                <div 
                  key={index}
                  className="flex-1 bg-gradient-to-t from-blue-500 to-blue-600 rounded-sm"
                  style={{ height: `${height}%` }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-6">
        {features.map((feature, index) => (
          <div key={index} className={`flex flex-col lg:flex-row items-center gap-16 mb-32 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
            {/* Content */}
            <div className="flex-1 space-y-6">
              <div className="flex items-center space-x-3">
                <feature.icon className="w-6 h-6 text-vercel-blue" />
                <h3 className="text-2xl font-bold text-white">{feature.title}</h3>
              </div>
              <div className="space-y-4">
                <p className="text-3xl md:text-4xl font-bold text-white leading-tight">
                  {feature.subtitle}
                </p>
                <p className="text-xl text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>

            {/* Visual */}
            <div className="flex-1">
              {feature.visual}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features; 
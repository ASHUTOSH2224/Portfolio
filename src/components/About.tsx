import React from 'react';
import { GraduationCap, Briefcase, Award, Code2 } from 'lucide-react';

const About: React.FC = () => {
  const stats = [
    { label: 'Years Experience', value: '5+' },
    { label: 'Projects Completed', value: '50+' },
    { label: 'Technologies Mastered', value: '20+' },
    { label: 'Clients Satisfied', value: '30+' },
  ];

  return (
    <section id="about" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Passionate about building intelligent, scalable, and secure applications that solve real-world problems
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Story */}
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
              <h3 className="text-2xl font-semibold text-white mb-4 flex items-center">
                <Code2 className="w-6 h-6 text-blue-400 mr-3" />
                My Journey
              </h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                With a B.Tech in Computer Science Engineering, I've dedicated my career to mastering 
                the art of full-stack development and artificial intelligence. My journey began with 
                curiosity about how technology can transform businesses and improve lives.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Today, as Head of Software Architecture at Scalixity, I lead the development of 
                cutting-edge AI-powered business platforms, combining my expertise in MERN stack, 
                Python, and machine learning to create solutions that are both innovative and practical.
              </p>
            </div>

            {/* Experience & Education */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/20 border border-blue-800/30 rounded-xl p-6">
                <Briefcase className="w-8 h-8 text-blue-400 mb-4" />
                <h4 className="font-semibold text-white mb-2">Current Role</h4>
                <p className="text-blue-300 font-medium">Head of Software Architecture</p>
                <p className="text-gray-400 text-sm">Scalixity • Remote</p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-900/20 to-purple-800/20 border border-purple-800/30 rounded-xl p-6">
                <GraduationCap className="w-8 h-8 text-purple-400 mb-4" />
                <h4 className="font-semibold text-white mb-2">Education</h4>
                <p className="text-purple-300 font-medium">B.Tech in CSE</p>
                <p className="text-gray-400 text-sm">Computer Science Engineering</p>
              </div>
            </div>
          </div>

          {/* Right Column - Stats */}
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-800/50 to-gray-700/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 text-center hover:scale-105 transition-transform duration-300"
                >
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Specialties */}
            <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
              <h4 className="text-xl font-semibold text-white mb-6 flex items-center">
                <Award className="w-5 h-5 text-yellow-400 mr-3" />
                Key Specialties
              </h4>
              <div className="space-y-4">
                {[
                  'Full-Stack Web Development (MERN)',
                  'Mobile App Development',
                  'Machine Learning & AI Automation',
                  'API Development & MLOps',
                  'System Architecture & Scalability'
                ].map((specialty, index) => (
                  <div key={index} className="flex items-center text-gray-300">
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mr-4"></div>
                    {specialty}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
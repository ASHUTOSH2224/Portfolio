import React from 'react';
import { Code, Database, Brain, Cloud, Smartphone, Zap } from 'lucide-react';

const Skills: React.FC = () => {
  const skillCategories = [
    {
      title: 'Frontend Development',
      icon: Code,
      gradient: 'from-blue-500 to-cyan-500',
      skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'HTML5', 'CSS3', 'JavaScript ES6+']
    },
    {
      title: 'Backend Development',
      icon: Database,
      gradient: 'from-green-500 to-emerald-500',
      skills: ['Node.js', 'Express.js', 'FastAPI', 'Flask', 'MongoDB', 'PostgreSQL', 'Redis']
    },
    {
      title: 'Machine Learning & AI',
      icon: Brain,
      gradient: 'from-purple-500 to-pink-500',
      skills: ['Python', 'TensorFlow', 'Keras', 'scikit-learn', 'OpenAI API', 'Natural Language Processing']
    },
    {
      title: 'Cloud & DevOps',
      icon: Cloud,
      gradient: 'from-orange-500 to-red-500',
      skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'GitHub Actions', 'MLOps']
    },
    {
      title: 'Mobile Development',
      icon: Smartphone,
      gradient: 'from-indigo-500 to-purple-500',
      skills: ['React Native', 'Flutter', 'iOS Development', 'Android Development', 'Cross-platform']
    },
    {
      title: 'Tools & Technologies',
      icon: Zap,
      gradient: 'from-yellow-500 to-orange-500',
      skills: ['Git', 'VS Code', 'Postman', 'Figma', 'Jupyter Notebook', 'Linux']
    }
  ];

  return (
    <section id="skills" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Technical Skills
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A comprehensive toolkit for building modern, scalable, and intelligent applications
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="group bg-gradient-to-br from-gray-800/50 to-gray-700/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 hover:scale-105 transition-all duration-300 hover:shadow-xl"
            >
              {/* Category Header */}
              <div className="flex items-center mb-6">
                <div className={`p-3 bg-gradient-to-r ${category.gradient} rounded-lg mr-4 group-hover:scale-110 transition-transform duration-300`}>
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-500 group-hover:bg-clip-text transition-all duration-300">
                  {category.title}
                </h3>
              </div>

              {/* Skills List */}
              <div className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className="flex items-center text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    <div className={`w-2 h-2 bg-gradient-to-r ${category.gradient} rounded-full mr-4 opacity-70 group-hover:opacity-100 transition-opacity duration-300`}></div>
                    <span className="text-sm font-medium">{skill}</span>
                  </div>
                ))}
              </div>

              {/* Proficiency Indicator */}
              <div className="mt-6 pt-6 border-t border-gray-700">
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>Proficiency</span>
                  <span>Expert</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className={`bg-gradient-to-r ${category.gradient} h-2 rounded-full transition-all duration-1000 group-hover:w-full`} style={{ width: '85%' }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Skills */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold text-white mb-8">Additional Expertise</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              'System Architecture', 'API Design', 'Database Optimization', 'Performance Tuning',
              'Security Best Practices', 'Agile Methodologies', 'Team Leadership', 'Technical Writing'
            ].map((skill, index) => (
              <span
                key={index}
                className="px-6 py-3 bg-gradient-to-r from-gray-800/50 to-gray-700/50 border border-gray-600 text-gray-300 rounded-full hover:border-blue-500 hover:text-blue-400 transition-all duration-300 transform hover:scale-105"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
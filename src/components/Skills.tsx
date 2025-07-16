import React, { useState } from 'react';
import { Code, Database, Brain, Cloud, Smartphone, Zap, Server, Globe, Shield, Cpu } from 'lucide-react';

const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('Frontend');

  const skillCategories = [
    {
      name: 'Frontend',
      icon: Globe,
      color: 'from-blue-500 to-cyan-500',
      skills: [
        { name: 'React', level: 95, description: 'Advanced component architecture & hooks' },
        { name: 'TypeScript', level: 90, description: 'Type-safe development & advanced patterns' },
        { name: 'Next.js', level: 88, description: 'SSR, SSG & full-stack applications' },
        { name: 'Tailwind CSS', level: 92, description: 'Responsive design & custom components' },
        { name: 'Vue.js', level: 75, description: 'Component-based development' },
        { name: 'Flutter', level: 80, description: 'Cross-platform mobile development' }
      ]
    },
    {
      name: 'Backend',
      icon: Server,
      color: 'from-green-500 to-emerald-500',
      skills: [
        { name: 'Node.js', level: 93, description: 'Scalable server-side applications' },
        { name: 'Python', level: 90, description: 'Web development & data processing' },
        { name: 'Express.js', level: 88, description: 'RESTful APIs & middleware' },
        { name: 'FastAPI', level: 85, description: 'High-performance Python APIs' },
        { name: 'GraphQL', level: 78, description: 'Efficient data querying' },
        { name: 'Microservices', level: 82, description: 'Distributed system architecture' }
      ]
    },
    {
      name: 'AI/ML',
      icon: Brain,
      color: 'from-purple-500 to-pink-500',
      skills: [
        { name: 'TensorFlow', level: 85, description: 'Deep learning & neural networks' },
        { name: 'PyTorch', level: 80, description: 'Research & production ML models' },
        { name: 'OpenAI GPT', level: 88, description: 'Language models & AI integration' },
        { name: 'scikit-learn', level: 87, description: 'Classical ML algorithms' },
        { name: 'Computer Vision', level: 75, description: 'Image processing & recognition' },
        { name: 'NLP', level: 82, description: 'Text processing & analysis' }
      ]
    },
    {
      name: 'Database',
      icon: Database,
      color: 'from-orange-500 to-red-500',
      skills: [
        { name: 'MongoDB', level: 90, description: 'NoSQL database design & optimization' },
        { name: 'PostgreSQL', level: 85, description: 'Relational database management' },
        { name: 'Redis', level: 82, description: 'Caching & session management' },
        { name: 'Firebase', level: 88, description: 'Real-time database & authentication' },
        { name: 'Elasticsearch', level: 75, description: 'Search & analytics engine' },
        { name: 'MySQL', level: 80, description: 'Traditional relational databases' }
      ]
    },
    {
      name: 'DevOps',
      icon: Cloud,
      color: 'from-indigo-500 to-blue-500',
      skills: [
        { name: 'Docker', level: 88, description: 'Containerization & orchestration' },
        { name: 'AWS', level: 85, description: 'Cloud infrastructure & services' },
        { name: 'Kubernetes', level: 78, description: 'Container orchestration' },
        { name: 'CI/CD', level: 82, description: 'Automated deployment pipelines' },
        { name: 'Nginx', level: 80, description: 'Web server & reverse proxy' },
        { name: 'Monitoring', level: 75, description: 'Application performance monitoring' }
      ]
    },
    {
      name: 'Tools',
      icon: Zap,
      color: 'from-yellow-500 to-orange-500',
      skills: [
        { name: 'Git', level: 92, description: 'Version control & collaboration' },
        { name: 'VS Code', level: 95, description: 'Development environment mastery' },
        { name: 'Postman', level: 88, description: 'API testing & documentation' },
        { name: 'Figma', level: 75, description: 'UI/UX design & prototyping' },
        { name: 'Jira', level: 80, description: 'Project management & tracking' },
        { name: 'Slack', level: 85, description: 'Team communication & integration' }
      ]
    }
  ];

  const currentCategory = skillCategories.find(cat => cat.name === activeCategory);

  return (
    <section id="skills" className="py-24 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold text-gradient mb-6 animate-fade-in-up">
            Skills & Expertise
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto animate-fade-in-up delay-200">
            A comprehensive toolkit for building modern, scalable applications
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-16 animate-fade-in-up delay-300">
          {skillCategories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <button
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                className={`group flex items-center space-x-3 px-6 py-4 rounded-2xl font-semibold transition-all duration-300 ${
                  activeCategory === category.name
                    ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                    : 'glass text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <IconComponent className="w-5 h-5" />
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        {currentCategory && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-up delay-400">
            {currentCategory.skills.map((skill, index) => (
              <div 
                key={skill.name}
                className="modern-card p-6 group hover-lift animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white group-hover:text-gradient transition-all duration-300">
                    {skill.name}
                  </h3>
                  <span className="text-2xl font-bold text-gradient">
                    {skill.level}%
                  </span>
                </div>
                
                <p className="text-gray-400 text-sm mb-4">
                  {skill.description}
                </p>
                
                <div className="progress-bar mb-4">
                  <div 
                    className="progress-fill"
                    style={{ 
                      width: `${skill.level}%`,
                      background: `linear-gradient(90deg, ${currentCategory.color.split(' ')[1]}, ${currentCategory.color.split(' ')[3]})`
                    }}
                  ></div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Proficiency</span>
                  <span className={`font-medium ${
                    skill.level >= 90 ? 'text-green-400' :
                    skill.level >= 80 ? 'text-blue-400' :
                    skill.level >= 70 ? 'text-yellow-400' :
                    'text-gray-400'
                  }`}>
                    {skill.level >= 90 ? 'Expert' :
                     skill.level >= 80 ? 'Advanced' :
                     skill.level >= 70 ? 'Intermediate' :
                     'Beginner'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Additional Info */}
        <div className="mt-20 text-center animate-fade-in-up delay-800">
          <div className="glass-card p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">Always Learning</h3>
            <p className="text-gray-400 leading-relaxed mb-6">
              Technology evolves rapidly, and so do I. I'm constantly exploring new frameworks, 
              tools, and methodologies to stay at the forefront of software development. 
              Currently diving deep into Web3, Blockchain, and Advanced AI/ML techniques.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {['Web3', 'Blockchain', 'Rust', 'Go', 'Quantum Computing', 'AR/VR'].map((tech, index) => (
                <span 
                  key={tech}
                  className="tag animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  🚀 {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
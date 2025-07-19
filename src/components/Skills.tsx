import React, { useState } from 'react';
import { Code, Database, Brain, Cloud, Smartphone, Globe, Server, Zap } from 'lucide-react';

const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('Frontend');

  const skillCategories = [
    {
      name: 'Frontend',
      icon: Globe,
      color: 'apple-blue',
      skills: [
        { name: 'React', level: 95, description: 'Advanced component architecture & hooks' },
        { name: 'TypeScript', level: 90, description: 'Type-safe development & patterns' },
        { name: 'Next.js', level: 88, description: 'SSR, SSG & full-stack applications' },
        { name: 'Tailwind CSS', level: 92, description: 'Responsive design & components' },
        { name: 'Vue.js', level: 75, description: 'Component-based development' },
        { name: 'Flutter', level: 80, description: 'Cross-platform mobile development' }
      ]
    },
    {
      name: 'Backend',
      icon: Server,
      color: 'apple-green',
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
      color: 'apple-purple',
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
      color: 'apple-orange',
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
      color: 'apple-pink',
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
      color: 'apple-yellow',
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
    <section id="skills" className="section-large bg-apple-gray-50">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-display-medium font-sf-pro-display font-semibold text-apple-gray-700 mb-6 animate-fade-in-up">
            Skills & expertise
          </h2>
          <p className="text-subheadline text-apple-gray-500 max-w-2xl mx-auto animate-fade-in-up delay-200">
            A comprehensive toolkit for building modern, scalable applications
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-16 animate-fade-in-up delay-300">
          {skillCategories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <button
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                className={`flex items-center space-x-3 px-6 py-3 rounded-full font-medium text-body transition-all duration-200 ${
                  activeCategory === category.name
                    ? `bg-${category.color} text-white shadow-apple-md`
                    : 'bg-white text-apple-gray-600 hover:bg-apple-gray-100 shadow-apple-sm'
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up delay-400">
            {currentCategory.skills.map((skill, index) => (
              <div 
                key={skill.name}
                className="card p-6 group hover:shadow-apple-lg transition-all duration-300 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-body font-semibold text-apple-gray-700 group-hover:text-apple-blue transition-colors duration-300">
                    {skill.name}
                  </h3>
                  <span className={`text-subheadline font-semibold text-${currentCategory.color}`}>
                    {skill.level}%
                  </span>
                </div>
                
                <p className="text-caption text-apple-gray-500 mb-4 leading-relaxed">
                  {skill.description}
                </p>
                
                <div className="progress-bar mb-4">
                  <div 
                    className={`progress-fill bg-${currentCategory.color}`}
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-caption text-apple-gray-400">Proficiency</span>
                  <span className={`text-caption font-medium px-2 py-1 rounded-apple-sm ${
                    skill.level >= 90 ? 'bg-apple-green bg-opacity-10 text-apple-green' :
                    skill.level >= 80 ? 'bg-apple-blue bg-opacity-10 text-apple-blue' :
                    skill.level >= 70 ? 'bg-apple-orange bg-opacity-10 text-apple-orange' :
                    'bg-apple-gray-200 text-apple-gray-500'
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
        <div className="text-center mt-20 animate-fade-in-up delay-800">
          <div className="product-showcase max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Code className="w-8 h-8 text-apple-blue mr-3" />
              <h3 className="text-headline font-sf-pro-display font-semibold text-apple-gray-700">
                Always learning
              </h3>
            </div>
            <p className="text-body text-apple-gray-500 leading-relaxed mb-8 max-w-2xl mx-auto">
              Technology evolves rapidly, and so do I. I'm constantly exploring new frameworks, 
              tools, and methodologies to stay at the forefront of software development.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {['Web3', 'Blockchain', 'Rust', 'Go', 'Quantum Computing', 'AR/VR'].map((tech, index) => (
                <span 
                  key={tech}
                  className="tag tag-purple animate-fade-in"
                  style={{ animationDelay: `${0.9 + index * 0.1}s` }}
                >
                  {tech}
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
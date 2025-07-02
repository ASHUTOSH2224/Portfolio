import React from 'react';
import { Code, Database, Brain, Cloud, Smartphone, Zap } from 'lucide-react';

const Skills: React.FC = () => {
  const skillCategories = [
    {
      title: 'Frontend Development',
      icon: Code,
      gradient: 'from-accent-primary to-accent-secondary',
      skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'HTML5', 'CSS3', 'JavaScript ES6+']
    },
    {
      title: 'Backend Development',
      icon: Database,
      gradient: 'from-accent-secondary to-accent-tertiary',
      skills: ['Node.js', 'Express.js', 'FastAPI', 'Flask', 'MongoDB', 'PostgreSQL', 'Redis']
    },
    {
      title: 'Machine Learning & AI',
      icon: Brain,
      gradient: 'from-accent-tertiary to-accent-primary',
      skills: ['Python', 'TensorFlow', 'Keras', 'scikit-learn', 'OpenAI API', 'Natural Language Processing']
    },
    {
      title: 'Cloud & DevOps',
      icon: Cloud,
      gradient: 'from-accent-primary to-accent-tertiary',
      skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'GitHub Actions', 'MLOps']
    },
    {
      title: 'Mobile Development',
      icon: Smartphone,
      gradient: 'from-accent-secondary to-accent-primary',
      skills: ['React Native', 'Flutter', 'iOS Development', 'Android Development', 'Cross-platform']
    },
    {
      title: 'Tools & Technologies',
      icon: Zap,
      gradient: 'from-accent-tertiary to-accent-secondary',
      skills: ['Git', 'VS Code', 'Postman', 'Figma', 'Jupyter Notebook', 'Linux']
    }
  ];

  return (
    <section id="skills" className="py-20 bg-matteBlack-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 matrix-bg opacity-20"></div>
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-accent-primary/3 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-secondary/2 rounded-full blur-3xl animate-float delay-400"></div>
      
      <div className="container-max relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">
            Technical Skills
          </h2>
          <p className="text-xl text-text-muted max-w-3xl mx-auto">
            A comprehensive toolkit for building modern, scalable, and intelligent applications
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="group glass-effect border border-surface-border rounded-2xl p-8 hover:scale-105 transition-all duration-300 hover-glow hover:border-accent-primary/30 animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Category Header */}
              <div className="flex items-center mb-6">
                <div className={`p-3 bg-gradient-to-r ${category.gradient} rounded-lg mr-4 group-hover:scale-110 transition-transform duration-300 shadow-glow-sm`}>
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-accent-primary group-hover:to-accent-secondary group-hover:bg-clip-text transition-all duration-300">
                  {category.title}
                </h3>
              </div>

              {/* Skills List */}
              <div className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className="flex items-center text-text-secondary hover:text-text-primary transition-colors duration-300 group"
                  >
                    <div className={`w-2 h-2 bg-gradient-to-r ${category.gradient} rounded-full mr-4 opacity-70 group-hover:opacity-100 transition-opacity duration-300 group-hover:animate-pulse`}></div>
                    <span className="text-sm font-medium">{skill}</span>
                  </div>
                ))}
              </div>

              {/* Proficiency Indicator */}
              <div className="mt-6 pt-6 border-t border-surface-border">
                <div className="flex justify-between text-sm text-text-muted mb-2">
                  <span>Proficiency</span>
                  <span>Expert</span>
                </div>
                <div className="w-full bg-surface-primary rounded-full h-2">
                  <div className={`bg-gradient-to-r ${category.gradient} h-2 rounded-full transition-all duration-1000 group-hover:w-full shadow-glow-sm`} style={{ width: '85%' }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Skills */}
        <div className="mt-16 text-center animate-fade-in-up delay-800">
          <h3 className="text-2xl font-semibold text-text-primary mb-8">Additional Expertise</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              'System Architecture', 'API Design', 'Database Optimization', 'Performance Tuning',
              'Security Best Practices', 'Agile Methodologies', 'Team Leadership', 'Technical Writing'
            ].map((skill, index) => (
              <span
                key={index}
                className="px-6 py-3 glass-effect border border-surface-border text-text-secondary rounded-full hover:border-accent-primary/50 hover:text-accent-primary transition-all duration-300 transform hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${(index * 100) + 1000}ms` }}
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
import React from 'react';
import { Code, Database, Brain, Cloud, Smartphone, Zap, Terminal, Monitor, Server } from 'lucide-react';

const Skills: React.FC = () => {
  const skillCategories = [
    {
      title: 'Frontend Development',
      icon: Monitor,
      skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'HTML5', 'CSS3', 'JavaScript ES6+'],
      description: 'Building modern, responsive user interfaces'
    },
    {
      title: 'Backend Development',
      icon: Server,
      skills: ['Node.js', 'Express.js', 'FastAPI', 'Flask', 'MongoDB', 'PostgreSQL', 'Redis'],
      description: 'Scalable server architectures and APIs'
    },
    {
      title: 'Machine Learning & AI',
      icon: Brain,
      skills: ['Python', 'TensorFlow', 'Keras', 'scikit-learn', 'OpenAI API', 'Natural Language Processing'],
      description: 'Intelligent systems and data analysis'
    },
    {
      title: 'Cloud & DevOps',
      icon: Cloud,
      skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'GitHub Actions', 'MLOps'],
      description: 'Automated deployment and scaling'
    },
    {
      title: 'Mobile Development',
      icon: Smartphone,
      skills: ['React Native', 'Flutter', 'iOS Development', 'Android Development', 'Cross-platform'],
      description: 'Cross-platform mobile solutions'
    },
    {
      title: 'Tools & Technologies',
      icon: Zap,
      skills: ['Git', 'VS Code', 'Postman', 'Figma', 'Jupyter Notebook', 'Linux'],
      description: 'Development workflow optimization'
    }
  ];

  return (
    <section id="skills" className="py-20 bg-surface-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">
              Skills
            </span>
          </h2>
          <p className="text-xl text-text-muted max-w-3xl mx-auto">
            A comprehensive toolkit for building modern, scalable, and intelligent applications.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="group code-editor"
            >
              <div className="code-header">
                <div className="flex items-center gap-2">
                  <div className="terminal-button red"></div>
                  <div className="terminal-button yellow"></div>
                  <div className="terminal-button green"></div>
                </div>
                <div className="code-tab active">
                  <category.icon className="w-3 h-3" />
                  <span>{category.title.replace(/\s+/g, '').toLowerCase()}.ts</span>
                </div>
              </div>

              <div className="code-content">
                <div className="mb-4">
                  <div className="code-line">
                    <span className="line-number">1</span>
                    <span className="line-content">
                      <span className="syntax-comment">// {category.title}</span>
                    </span>
                  </div>
                  <div className="code-line">
                    <span className="line-number">2</span>
                    <span className="line-content">
                      <span className="syntax-comment">// {category.description}</span>
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="code-line">
                    <span className="line-number">3</span>
                    <span className="line-content">
                      <span className="syntax-keyword">const</span>
                      <span className="text-text-primary"> skills = [</span>
                    </span>
                  </div>
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="code-line">
                      <span className="line-number">{skillIndex + 4}</span>
                      <span className="line-content">
                        <span className="ml-4 syntax-string">"{skill}"</span>
                        <span className="text-text-primary">{skillIndex < category.skills.length - 1 ? ',' : ''}</span>
                      </span>
                    </div>
                  ))}
                  <div className="code-line">
                    <span className="line-number">{category.skills.length + 4}</span>
                    <span className="line-content">
                      <span className="text-text-primary">];</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
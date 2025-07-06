import React, { useState, useEffect } from 'react';
import { Code, Database, Brain, Cloud, Smartphone, Zap, Terminal, Monitor, Server } from 'lucide-react';

const Skills: React.FC = () => {
  const [activeTerminal, setActiveTerminal] = useState(0);
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0);

  const skillCategories = [
    {
      title: 'Frontend Development',
      icon: Monitor,
      gradient: 'from-accent-primary to-accent-secondary',
      borderColor: 'border-accent-primary/30',
      skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'HTML5', 'CSS3', 'JavaScript ES6+'],
      command: 'npm install',
      description: 'Building modern, responsive user interfaces'
    },
    {
      title: 'Backend Development',
      icon: Server,
      gradient: 'from-accent-secondary to-accent-tertiary',
      borderColor: 'border-accent-secondary/30',
      skills: ['Node.js', 'Express.js', 'FastAPI', 'Flask', 'MongoDB', 'PostgreSQL', 'Redis'],
      command: 'pip install',
      description: 'Scalable server architectures and APIs'
    },
    {
      title: 'Machine Learning & AI',
      icon: Brain,
      gradient: 'from-accent-tertiary to-accent-primary',
      borderColor: 'border-accent-tertiary/30',
      skills: ['Python', 'TensorFlow', 'Keras', 'scikit-learn', 'OpenAI API', 'Natural Language Processing'],
      command: 'python train.py',
      description: 'Intelligent systems and data analysis'
    },
    {
      title: 'Cloud & DevOps',
      icon: Cloud,
      gradient: 'from-accent-primary to-accent-tertiary',
      borderColor: 'border-accent-primary/30',
      skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'GitHub Actions', 'MLOps'],
      command: 'docker compose up',
      description: 'Automated deployment and scaling'
    },
    {
      title: 'Mobile Development',
      icon: Smartphone,
      gradient: 'from-accent-secondary to-accent-primary',
      borderColor: 'border-accent-secondary/30',
      skills: ['React Native', 'Flutter', 'iOS Development', 'Android Development', 'Cross-platform'],
      command: 'react-native run',
      description: 'Cross-platform mobile solutions'
    },
    {
      title: 'Tools & Technologies',
      icon: Zap,
      gradient: 'from-accent-tertiary to-accent-secondary',
      borderColor: 'border-accent-tertiary/30',
      skills: ['Git', 'VS Code', 'Postman', 'Figma', 'Jupyter Notebook', 'Linux'],
      command: 'git commit -m',
      description: 'Development workflow optimization'
    }
  ];

  const terminalCommands = [
    { command: 'whoami', output: 'Full Stack Developer & Software Engineer' },
    { command: 'cat skills.txt', output: 'React • Python • Node.js • AWS • Docker' },
    { command: 'ls experience/', output: '3+ years in software development' },
    { command: 'echo $EXPERTISE', output: 'Building scalable applications with modern tech' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTerminal((prev) => (prev + 1) % skillCategories.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSkillIndex((prev) => (prev + 1) % terminalCommands.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="skills" className="py-20 bg-surface-primary relative overflow-hidden">
      {/* Light Theme Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-surface-accent/20 via-surface-secondary/10 to-surface-accent/20"></div>
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-accent-primary/8 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-secondary/6 rounded-full blur-3xl animate-float delay-400"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="font-mono text-accent-primary">$ </span>
            <span className="bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">
              ls -la skills/
            </span>
          </h2>
          <p className="text-xl text-text-muted max-w-3xl mx-auto">
            <span className="font-mono text-accent-primary">{'// '}</span>
            A comprehensive toolkit for building modern, scalable,
            <br />
            <span className="font-mono text-accent-primary">{'// '}</span>
            and intelligent applications
          </p>
        </div>

        {/* Interactive Terminal Display */}
        <div className="mb-16 animate-fade-in-up delay-200">
          <div className="terminal-window max-w-4xl mx-auto">
            <div className="terminal-header">
              <div className="terminal-button red"></div>
              <div className="terminal-button yellow"></div>
              <div className="terminal-button green"></div>
              <span className="text-sm text-text-muted ml-4 font-mono">alex@dev: ~/skills</span>
            </div>
            <div className="terminal-content">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  {terminalCommands.map((cmd, index) => (
                    <div 
                      key={index} 
                      className={`mb-3 transition-all duration-300 ${
                        index === currentSkillIndex ? 'opacity-100' : 'opacity-50'
                      }`}
                    >
                      <div className="mb-1">
                        <span className="terminal-prompt">alex@dev:~/skills$ </span>
                        <span className="text-text-primary">{cmd.command}</span>
                      </div>
                      <div className="mb-2 text-text-secondary">
                        <span>{cmd.output}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="hidden md:block">
                  <div className="code-editor">
                    <div className="code-header">
                      <div className="code-tab active">
                        <Terminal className="w-3 h-3" />
                        <span>skills.json</span>
                      </div>
                    </div>
                    <div className="code-content text-sm">
                      <div className="code-line">
                        <span className="line-number">1</span>
                        <span className="line-content">
                          <span className="syntax-comment">// Current Tech Stack</span>
                        </span>
                      </div>
                      <div className="code-line">
                        <span className="line-number">2</span>
                        <span className="line-content">
                          <span className="syntax-keyword">const</span>
                          <span className="text-text-primary"> skills = {'{'}</span>
                        </span>
                      </div>
                      <div className="code-line">
                        <span className="line-number">3</span>
                        <span className="line-content">
                          <span className="ml-4 syntax-string">"frontend"</span>
                          <span className="text-text-primary">: </span>
                          <span className="syntax-string">"React + TypeScript"</span>
                        </span>
                      </div>
                      <div className="code-line">
                        <span className="line-number">4</span>
                        <span className="line-content">
                          <span className="ml-4 syntax-string">"backend"</span>
                          <span className="text-text-primary">: </span>
                          <span className="syntax-string">"Node.js + Python"</span>
                        </span>
                      </div>
                      <div className="code-line">
                        <span className="line-number">5</span>
                        <span className="line-content">
                          <span className="ml-4 syntax-string">"ai"</span>
                          <span className="text-text-primary">: </span>
                          <span className="syntax-string">"TensorFlow + OpenAI"</span>
                        </span>
                      </div>
                      <div className="code-line">
                        <span className="line-number">6</span>
                        <span className="line-content">
                          <span className="text-text-primary">{'};'}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className={`group code-editor hover:scale-105 transition-all duration-300 glow-hover ${
                index === activeTerminal ? 'border-accent-primary shadow-glow-orange' : ''
              } animate-fade-in-up`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Code Editor Header */}
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

              {/* Code Editor Content */}
              <div className="code-content">
                {/* Category Header */}
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

                {/* Skills as Code */}
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

                {/* Command Preview */}
                <div className="mt-4 bg-surface-accent rounded-lg p-3 border border-surface-border">
                  <div className="terminal-prompt text-xs">$ {category.command}</div>
                  <div className="text-text-secondary text-xs mt-1">
                    Installing {category.skills.length} packages...
                  </div>
                </div>

                {/* Proficiency Indicator */}
                <div className="mt-4 pt-4 border-t border-surface-border">
                  <div className="flex justify-between text-xs text-text-muted mb-2">
                    <span className="font-mono">Experience Level</span>
                    <span className="font-mono">Expert</span>
                  </div>
                  <div className="w-full bg-surface-secondary rounded-full h-2">
                    <div 
                      className={`bg-gradient-to-r ${category.gradient} h-2 rounded-full transition-all duration-1000 group-hover:w-full glow-orange`} 
                      style={{ width: '90%' }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Terminal-style Additional Skills */}
        <div className="mt-16 animate-fade-in-up delay-800">
          <div className="terminal-window max-w-4xl mx-auto">
            <div className="terminal-header">
              <div className="terminal-button red"></div>
              <div className="terminal-button yellow"></div>
              <div className="terminal-button green"></div>
              <span className="text-sm text-text-muted ml-4 font-mono">alex@dev: ~/additional-skills</span>
            </div>
            <div className="terminal-content">
              <div className="mb-4">
                <span className="terminal-prompt">alex@dev:~/additional-skills$ </span>
                <span className="text-text-primary">cat expertise.txt</span>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  'System Architecture', 'API Design', 'Database Optimization', 'Performance Tuning',
                  'Security Best Practices', 'Agile Methodologies', 'Team Leadership', 'Technical Writing'
                ].map((skill, index) => (
                  <div
                    key={index}
                    className="text-text-secondary hover:text-accent-primary transition-colors duration-300 cursor-pointer"
                    style={{ animationDelay: `${(index * 100) + 1000}ms` }}
                  >
                    <span className="text-accent-primary">{'>'} </span>
                    {skill}
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <span className="terminal-prompt">alex@dev:~/additional-skills$ </span>
                <span className="terminal-cursor">█</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
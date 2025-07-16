import React from 'react';
import { Code, Database, Brain, Cloud, Smartphone, Zap } from 'lucide-react';

const Skills: React.FC = () => {
  const skills = [
    { title: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'] },
    { title: 'Backend', items: ['Node.js', 'Express', 'Python', 'FastAPI'] },
    { title: 'Databases', items: ['PostgreSQL', 'MongoDB', 'Firebase'] },
    { title: 'Mobile', items: ['Flutter', 'React Native'] },
    { title: 'DevOps', items: ['Docker', 'AWS', 'Git'] },
    { title: 'Other', items: ['RESTful APIs', 'GraphQL', 'CI/CD'] },
  ];

  return (
    <section id="skills" className="py-20 bg-surface-secondary animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-text-primary">
            My Skills
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            A look at the technologies I use to build modern applications.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <div key={index} className="bg-surface-card rounded-2xl p-8 border border-surface-border shadow-card animate-fade-in-up" style={{ animationDelay: `${index * 0.2}s` }}>
              <h3 className="text-2xl font-semibold text-text-primary mb-4">{skill.title}</h3>
              <ul className="space-y-2">
                {skill.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-center text-text-secondary">
                    <div className="w-2 h-2 bg-accent-primary rounded-full mr-4"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
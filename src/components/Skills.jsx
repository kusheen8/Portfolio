import React from 'react';
import { motion } from 'framer-motion';
import {
  HiCode,
  HiServer,
  HiDatabase,
  HiCloud,
  HiLightningBolt,
  HiCog
} from 'react-icons/hi';
import './Skills.css';

const Skills = () => {
  const categories = [
    {
      title: 'Frontend',
      icon: HiCode,
      skills: ['React', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS', 'Vite']
    },
    {
      title: 'Backend',
      icon: HiServer,
      skills: ['Node.js', 'Express.js', 'REST APIs', 'Authentication']
    },
    {
      title: 'Database',
      icon: HiDatabase,
      skills: ['MongoDB']
    },
    {
      title: 'Cloud & DevOps',
      icon: HiCloud,
      skills: ['AWS EC2', 'Nginx', 'PM2', 'GitHub Actions']
    },
    {
      title: 'AI',
      icon: HiLightningBolt,
      skills: ['LLM APIs', 'AI Integrations', 'Prompt Engineering', 'Voice AI', 'Automation']
    },
    {
      title: 'Tools',
      icon: HiCog,
      skills: ['Git', 'GitHub', 'Postman', 'VS Code', 'Figma']
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45 }
    }
  };

  return (
    <section id="skills" className="skills-section" aria-label="Skills">
      <div className="skills-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Skills</h2>
          <p className="section-subtitle">Technologies and tools I work with</p>
        </motion.div>

        <motion.div
          className="skills-categories"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={index}
                className="skill-category glass-card"
                variants={cardVariants}
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="skill-category-header">
                  <div className="skill-category-icon">
                    <Icon aria-hidden="true" />
                  </div>
                  <h3 className="skill-category-title">{category.title}</h3>
                </div>
                <div className="skill-tags">
                  {category.skills.map((skill, skillIndex) => (
                    <span key={skillIndex} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;

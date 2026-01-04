import React from 'react';
import { motion } from 'framer-motion';
import { 
  HiCode, 
  HiDesktopComputer,
  HiDatabase
} from 'react-icons/hi';
import { 
  FaReact, 
  FaGithub,
  FaNode,
  FaJava,
  FaPython
} from 'react-icons/fa';
import { SiSpringboot } from 'react-icons/si';
import './Skills.css';

const Skills = () => {
  const skills = [
    { name: 'Java', icon: FaJava },
    { name: 'React', icon: FaReact },
    { name: 'NodeJS', icon: FaNode },
    { name: 'Python', icon: FaPython },
    { name: 'Full Dev', icon: HiCode },
    { name: 'Git & GitHub', icon: FaGithub },
    { name: 'UI/UX', icon: HiDesktopComputer },
    { name: 'DBMS', icon: HiDatabase },
    { name: 'SpringBoot', icon: SiSpringboot },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.4 }
    }
  };

  return (
    <section id="skills" className="skills-section">
      <div className="skills-container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Skills
        </motion.h2>

        <motion.div
          className="skills-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={index}
                className="skill-card"
                variants={cardVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="skill-icon">
                  <Icon />
                </div>
                <h3 className="skill-name">{skill.name}</h3>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;

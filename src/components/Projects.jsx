import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import { HiLightningBolt } from 'react-icons/hi';
import './Projects.css';

const Projects = () => {
  const projects = [
    {
      title: 'BookIt',
      description: 'Developed a MERN stack–based teacher-student appointment booking application to simplify scheduling and improve coordination.',
      role: 'Full-stack developer, implemented MERN stack components',
      technologies: ['Node.js', 'Express', 'MongoDB', 'React'],
      github: 'https://github.com/kusheen8/BookIt',
      demo: 'https://bookit-frontend-jyz6.onrender.com'
    },
    {
      title: 'WellNest',
      description: 'Developed a MERN stack–based wellness tracker platform with full CRUD operations to manage user activities, health data, and progress tracking.',
      role: 'Lead developer, implemented real-time status tracking',
      technologies: ['Node.js', 'Express', 'MongoDB', 'React'],
      github: 'https://github.com/kusheen8/WellNest',
      demo: ' https://wellnest-client.onrender.com'
    },
    {
      title: 'AccessIt',
      description: 'An AI-powered accessibility analyzer that scans web links to identify accessibility issues and provides AI-driven solutions to help debug and resolve errors efficiently.',
      role: 'Full-stack developer',
      technologies: ['JS', 'Node.js', 'Pa11y', 'HuggingFaceAPI'],
      github: 'https://github.com/kusheen8/Accessit',

    },
    {
      title: 'ChatX',
      description: 'A React Native real-time 1:1 chat application using the MERN stack and Socket.IO, featuring JWT authentication, online presence, typing indicators, and persistent message history.',
      role: 'React Native Developer',
      technologies: ['React', 'MongoDb', 'Socket.IO', 'JWT'],
      github: 'https://github.com/kusheen8/ChatX',
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Projects
        </motion.h2>

        <motion.div
          className="projects-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="project-card"
              variants={cardVariants}
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <p className="project-role">{project.role}</p>
              
              <div className="project-technologies">
                {project.technologies.map((tech, techIndex) => (
                  <span key={techIndex} className="tech-tag">{tech}</span>
                ))}
              </div>

              {(project.github || project.demo) && (
                <div className="project-actions">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-btn github-btn"
                    >
                      <FaGithub />
                      <span>View on GitHub</span>
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-btn demo-btn"
                    >
                      <HiLightningBolt />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;

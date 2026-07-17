import React from 'react';
import { motion } from 'framer-motion';
import { HiAcademicCap, HiBriefcase, HiCalendar } from 'react-icons/hi';
import './About.css';

const About = () => {
  const education = [
    {
      title: 'B.Tech in Computer Science',
      institution: 'Nitte Meenakshi Institute of Technology',
      period: '2023 – 2027',
      description: 'Pursuing Bachelor of Technology in Computer Science. Active member of technical clubs and coding communities.'
    },
    {
      title: 'Intermediate Education',
      institution: 'KC Public School',
      period: '2021 – 2023',
      description: 'Completed intermediate education in Physics, Chemistry and Maths (PCM) with 94%.'
    }
  ];

  const experience = [
    {
      role: 'Full Stack Developer & AI Integrator Intern',
      organization: 'Akonzio AI',
      period: 'May 2026 – Present',
      responsibilities: [
        'Develop and maintain full-stack web applications using React, Node.js, Express, and MongoDB.',
        'Deploy and manage production applications on AWS EC2 with Nginx, PM2, SSL, and custom domains.',
        'Integrate AI services including LLM APIs, voice agents, and intelligent automation.',
        'Build scalable REST APIs and authentication systems.',
        'Configure CI/CD workflows using GitHub Actions.',
        'Optimize application performance, security, and deployment pipelines.'
      ],
      technologies: ['React', 'Node.js', 'Express.js', 'MongoDB', 'AWS EC2', 'Nginx', 'PM2', 'GitHub Actions', 'JavaScript', 'AI APIs']
    },
    {
      role: 'Full Stack Developer Intern',
      organization: 'Jarurat Care Foundation',
      period: 'December 2025 – April 2026',
      responsibilities: [
        'Developed backend APIs and frontend features for healthcare-focused web solutions.',
        'Integrated external APIs and automated workflows.',
        'Worked with databases, authentication, and deployment.',
        'Collaborated with team members using Git.'
      ],
      technologies: ['React', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'Git']
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="about" className="about-section" aria-label="Education and Experience">
      <div className="about-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Journey So Far</h2>
          <p className="section-subtitle">Education and professional experience</p>
        </motion.div>

        <motion.div
          className="timeline-section"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <div className="timeline-header">
            <HiBriefcase className="section-icon" />
            <h3 className="subsection-title">Experience</h3>
          </div>

          <div className="timeline">
            {experience.map((exp, index) => (
              <motion.div
                key={index}
                className="timeline-item experience-item"
                variants={itemVariants}
              >
                <div className="timeline-marker">
                  <HiBriefcase />
                </div>
                <div className="timeline-content glass-card">
                  <div className="timeline-header-row">
                    <div>
                      <h4 className="timeline-title">{exp.role}</h4>
                      <p className="timeline-org">{exp.organization}</p>
                    </div>
                    <div className="timeline-period">
                      <HiCalendar aria-hidden="true" />
                      <span>{exp.period}</span>
                    </div>
                  </div>

                  <ul className="timeline-responsibilities">
                    {exp.responsibilities.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>

                  <div className="timeline-tech">
                    {exp.technologies.map((tech, i) => (
                      <span key={i} className="tech-badge">{tech}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="timeline-section"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <div className="timeline-header">
            <HiAcademicCap className="section-icon" />
            <h3 className="subsection-title">Education</h3>
          </div>

          <div className="timeline">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                className="timeline-item"
                variants={itemVariants}
              >
                <div className="timeline-marker">
                  <HiAcademicCap />
                </div>
                <div className="timeline-content glass-card">
                  <h4 className="timeline-title">{edu.title}</h4>
                  <p className="timeline-org">{edu.institution}</p>
                  <div className="timeline-period">
                    <HiCalendar aria-hidden="true" />
                    <span>{edu.period}</span>
                  </div>
                  <p className="timeline-description">{edu.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;

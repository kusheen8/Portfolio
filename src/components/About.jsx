import React from 'react';
import { motion } from 'framer-motion';
import { HiAcademicCap, HiBriefcase, HiCalendar } from 'react-icons/hi';
import './About.css';

const About = () => {
  const education = [
    {
      title: 'B.Tech in Computer Science',
      institution: 'Nitte Meenakshi Institute of Technology',
      period: '2023 - 2027',
      description: 'Pursuing Bachelor of Technology in Computer Science. Active member of technical clubs and coding communities.'
    },
    {
      title: 'Intermediate Education',
      institution: 'KC Public School',
      period: '2021 - 2023',
      description: 'Completed intermediate education of Physics, Chemistry and Maths (PCM) with 94% percentage.'
    }
  ];

  const experience = [
    {
      title: 'Full Stack Developer Intern',
      organization: 'Jarurat Care',
      period: '2025-2026',
      description: 'Developed Hopebot, a Java Spring Boot–based chat application, contributing to feature development, bug fixes, and collaborative team discussions to improve communication workflows.'
    },
    {
      title: 'Design Team Core Member',
      organization: 'NMIT Hacks Club',
      period: '2024 - Present',
      description: 'Contributed to both technical and non-technical activities, including organizing a 48-hour hackathon by managing event logistics, design requirements, and participant coordination.'
    },
    {
      title: 'Art Team Member',
      organization: 'Art Club',
      period: '2024 - Present',
      description: 'Assisted in organizing the Aanadyanta Club and led the planning and execution of multiple festivals throughout the year, managing creative initiatives and end-to-end event coordination.'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Journey So Far</h2>
        </motion.div>

        <motion.div
          className="timeline-section"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
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
                <div className="timeline-content">
                  <h4 className="timeline-title">{edu.title}</h4>
                  <p className="timeline-org">{edu.institution}</p>
                  <div className="timeline-period">
                    <HiCalendar />
                    <span>{edu.period}</span>
                  </div>
                  <p className="timeline-description">{edu.description}</p>
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
          viewport={{ once: true }}
        >
          <div className="timeline-header">
            <HiBriefcase className="section-icon" />
            <h3 className="subsection-title">Experience</h3>
          </div>

          <div className="timeline">
            {experience.map((exp, index) => (
              <motion.div
                key={index}
                className="timeline-item"
                variants={itemVariants}
              >
                <div className="timeline-marker">
                  <HiBriefcase />
                </div>
                <div className="timeline-content">
                  <h4 className="timeline-title">{exp.title}</h4>
                  <p className="timeline-org">{exp.organization}</p>
                  <div className="timeline-period">
                    <HiCalendar />
                    <span>{exp.period}</span>
                  </div>
                  <p className="timeline-description">{exp.description}</p>
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

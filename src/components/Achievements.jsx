import React from 'react';
import { motion } from 'framer-motion';
import {
  HiCode,
  HiLightningBolt,
  HiCloud,
  HiServer
} from 'react-icons/hi';
import './Achievements.css';

const Achievements = () => {
  const achievements = [
    {
      icon: HiCode,
      title: 'Full Stack Development',
      description: 'End-to-end web applications with React, Node.js, Express, and MongoDB — from API design to polished UI.'
    },
    {
      icon: HiLightningBolt,
      title: 'AI Integrations',
      description: 'Built production-ready AI features using LLM APIs, RAG pipelines, voice agents, and intelligent automation.'
    },
    {
      icon: HiCloud,
      title: 'Cloud Deployment',
      description: 'Deployed and managed applications on AWS EC2 with Nginx, PM2, SSL certificates, and custom domain configuration.'
    },
    {
      icon: HiServer,
      title: 'Production Deployments',
      description: 'Shipped multiple live products with CI/CD pipelines, performance optimization, and production-grade security.'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
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
    <section id="achievements" className="achievements-section" aria-label="Achievements">
      <div className="achievements-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Achievements</h2>
          <p className="section-subtitle">What I've shipped and mastered in production</p>
        </motion.div>

        <motion.div
          className="achievements-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <motion.div
                key={index}
                className="achievement-card glass-card"
                variants={cardVariants}
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="achievement-icon">
                  <Icon aria-hidden="true" />
                </div>
                <h3 className="achievement-title">{achievement.title}</h3>
                <p className="achievement-text">{achievement.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;

import React from 'react';
import { motion } from 'framer-motion';
import { HiCode, HiLightningBolt, HiCloud } from 'react-icons/hi';
import './Home.css';

const Home = () => {
  const highlights = [
    { icon: HiCode, label: 'Modern Web Development' },
    { icon: HiLightningBolt, label: 'AI Integrations' },
    { icon: HiCloud, label: 'Cloud Deployment' },
  ];

  return (
    <section id="home" className="home-section" aria-label="About">
      <div className="home-container">
        <motion.div
          className="home-card glass-card"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="home-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            About Me
          </motion.h2>

          <motion.p
            className="home-description"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            I'm a passionate Full Stack Developer who builds products end to end — from
            polished React interfaces to robust Node.js backends, MongoDB data layers, and
            production deployments on AWS. What excites me most is weaving AI into real
            applications: LLM APIs, voice agents, and automation that actually solve
            problems instead of sitting in a demo.
          </motion.p>

          <motion.p
            className="home-description"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            I care about clean architecture, thoughtful API design, and shipping code that
            holds up in production. Whether I'm configuring Nginx and PM2 on EC2, setting up
            CI/CD with GitHub Actions, or refining a user flow until it feels effortless —
            I approach every project with the same standard: scalable, secure, and built to
            last. I'm always learning, always building, and always looking for the next
            challenge that pushes my skills further.
          </motion.p>

          <motion.div
            className="home-highlights"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {highlights.map(({ icon: Icon, label }, index) => (
              <div key={index} className="home-highlight-item">
                <Icon className="home-highlight-icon" aria-hidden="true" />
                <span>{label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Home;

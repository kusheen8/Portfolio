import React from 'react';
import { motion } from 'framer-motion';
import { HiStar } from 'react-icons/hi';
import './Home.css';

const Home = () => {
  return (
    <section id="home" className="home-section">
      <div className="home-container">
        <motion.div
          className="home-card"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="home-icon"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
          >
            <HiStar />
          </motion.div>
          <h1 className="home-title">Dev. Coder. Designer. Me.</h1>
          <p className="home-description">
            I am a full-stack developer with a strong interest in building reliable and meaningful applications. 
            I enjoy working on user-friendly interfaces with React and developing dependable backend systems using 
            Node.js, Spring Boot, and databases. I am continuously learning and strive to improve my skills while 
            contributing thoughtfully to impactful solutions.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Home;

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';
import i1Image from './images/i1.jpeg';
import i2Image from './images/i2.jpeg';
import './Hero.css';

const Hero = () => {
  const roles = ['Full Stack Developer', 'Project Contributor', 'UI/UX Designer', 'Web Developer'];
  const [currentRole, setCurrentRole] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState(1); // Start with i1 (first image)

  // Image paths - Order: i1 first, then i2
  const images = {
    1: i1Image, // First image - shown initially
    2: i2Image  // Second image - shown after 4 seconds
  };

  useEffect(() => {
    const typeSpeed = isDeleting ? 50 : 100;
    const currentText = roles[roleIndex];

    const timer = setTimeout(() => {
      if (!isDeleting && charIndex < currentText.length) {
        setCurrentRole(currentText.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      } else if (!isDeleting && charIndex === currentText.length) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && charIndex > 0) {
        setCurrentRole(currentText.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setRoleIndex((roleIndex + 1) % roles.length);
      }
    }, typeSpeed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, roleIndex, roles]);

  // Image switching effect - starts with i1, then switches to i2 every 4 seconds
  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImage(prev => prev === 1 ? 2 : 1); // Switch: 1 (i1) -> 2 (i2) -> 1 (i1) -> ...
    }, 4000); // Switch every 4 seconds

    return () => clearInterval(imageInterval);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="hero" className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <motion.div
            className="hero-image-wrapper"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="hero-image-circle">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImage}
                  src={images[currentImage]}
                  alt="Kusheen Dhar"
                  className="hero-profile-image"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                />
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.div
            className="hero-text"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="hero-greeting">
              Holaa, I'm <span className="hero-name">Kusheen Dhar</span>
              <motion.span
                animate={{ rotate: [0, 14, -8, 14, -8, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                className="wave-icon"
              >
                👋
              </motion.span>
            </h1>

            <div className="hero-role">
              <span className="typing-text">{currentRole}</span>
              <span className="typing-cursor">|</span>
            </div>

            <div className="hero-buttons">
              <motion.button
                className="btn-primary"
                onClick={() => scrollToSection('contact')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Work With Me
              </motion.button>
              <motion.button
                className="btn-secondary"
                onClick={() => scrollToSection('projects')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore My Work
              </motion.button>
            </div>

            <div className="hero-social">
              <motion.a
                href="https://github.com/kusheen8"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -3 }}
                whileTap={{ scale: 0.9 }}
                className="social-icon"
                aria-label="GitHub"
              >
                <FaGithub />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/kusheen-dhar-129ab22b6/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -3 }}
                whileTap={{ scale: 0.9 }}
                className="social-icon"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </motion.a>
              <motion.a
                href="mailto:kusheendhar@gmail.com"
                whileHover={{ scale: 1.2, y: -3 }}
                whileTap={{ scale: 0.9 }}
                className="social-icon"
                aria-label="Email"
              >
                <HiMail />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

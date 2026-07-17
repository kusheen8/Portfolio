import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaArrowDown } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';
import i1Image from './images/i1.jpeg';
import i2Image from './images/i2.jpeg';
import ResumeButton from './ResumeButton';
import BackgroundBlobs from './BackgroundBlobs';
import ScrollIndicator from './ScrollIndicator';
import './Hero.css';

const Hero = () => {
  const roles = ['Full Stack Developer', 'AI Integrator', 'Cloud Enthusiast', 'Problem Solver'];
  const [currentRole, setCurrentRole] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState(1);

  const images = { 1: i1Image, 2: i2Image };

  useEffect(() => {
    const typeSpeed = isDeleting ? 45 : 90;
    const currentText = roles[roleIndex];

    const timer = setTimeout(() => {
      if (!isDeleting && charIndex < currentText.length) {
        setCurrentRole(currentText.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      } else if (!isDeleting && charIndex === currentText.length) {
        setTimeout(() => setIsDeleting(true), 2200);
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

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImage((prev) => (prev === 1 ? 2 : 1));
    }, 4000);
    return () => clearInterval(imageInterval);
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const textVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, delay: 0.15 + i * 0.08, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  return (
    <section id="hero" className="hero-section" aria-label="Introduction">
      <div className="hero-bg-gradient" aria-hidden="true" />
      <BackgroundBlobs variant="hero" />
      <div className="hero-radial-light" aria-hidden="true" />

      <div className="hero-container">
        <div className="hero-content">
          <motion.div
            className="hero-image-wrapper"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="hero-image-glow"
              aria-hidden="true"
              animate={{ scale: [1, 1.06, 1], opacity: [0.15, 0.22, 0.15] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="hero-image-circle"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImage}
                  src={images[currentImage]}
                  alt="Kusheen Dhar — Full Stack Developer"
                  className="hero-profile-image"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.55 }}
                />
              </AnimatePresence>
            </motion.div>
          </motion.div>

          <div className="hero-text">
            <motion.p className="hero-eyebrow" custom={0} variants={textVariants} initial="hidden" animate="visible">
              Hello, I'm
            </motion.p>

            <motion.h1 className="hero-greeting" custom={1} variants={textVariants} initial="hidden" animate="visible">
              <span className="hero-name">Kusheen Dhar</span>
            </motion.h1>

            <motion.h2 className="hero-headline" custom={2} variants={textVariants} initial="hidden" animate="visible">
              Full Stack Developer
              <span className="hero-headline-accent"> &amp; AI Integrator</span>
            </motion.h2>

            <motion.div className="hero-role" custom={3} variants={textVariants} initial="hidden" animate="visible" aria-live="polite">
              <span className="typing-text">{currentRole}</span>
              <span className="typing-cursor" aria-hidden="true">|</span>
            </motion.div>

            <motion.p className="hero-tagline" custom={4} variants={textVariants} initial="hidden" animate="visible">
              Building scalable web applications, AI-powered products, cloud deployments,
              and modern user experiences.
            </motion.p>

            <motion.div className="hero-buttons" custom={5} variants={textVariants} initial="hidden" animate="visible">
              <motion.button
                className="btn-primary btn-premium"
                onClick={() => scrollToSection('projects')}
                whileHover={{ scale: 1.04, y: -3 }}
                whileTap={{ scale: 0.97 }}
              >
                View My Work
                <FaArrowDown className="btn-icon" />
              </motion.button>
              <ResumeButton variant="hero" mode="download" />
              <motion.button
                className="btn-outline btn-premium"
                onClick={() => scrollToSection('contact')}
                whileHover={{ scale: 1.04, y: -3 }}
                whileTap={{ scale: 0.97 }}
              >
                Let's Connect
              </motion.button>
            </motion.div>

            <motion.div className="hero-social" custom={6} variants={textVariants} initial="hidden" animate="visible">
              {[
                { href: 'https://github.com/kusheen8', icon: FaGithub, label: 'GitHub profile' },
                { href: 'https://www.linkedin.com/in/kusheen-dhar-129ab22b6/', icon: FaLinkedin, label: 'LinkedIn profile' },
                { href: 'mailto:kusheendhar@gmail.com', icon: HiMail, label: 'Send email' },
              ].map(({ href, icon: Icon, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  whileHover={{ scale: 1.12, y: -5 }}
                  whileTap={{ scale: 0.92 }}
                  className="social-icon"
                  aria-label={label}
                >
                  <Icon />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      <ScrollIndicator targetId="home" />
    </section>
  );
};

export default Hero;

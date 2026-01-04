import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaHeart, FaCoffee } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-section">
      <div className="footer-container">
        <motion.div
          className="footer-card"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="footer-social">
            <motion.a
              href="https://github.com/kusheen8"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              whileHover={{ scale: 1.2, y: -3 }}
              whileTap={{ scale: 0.9 }}
              aria-label="GitHub"
            >
              <FaGithub />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/kusheen-dhar-129ab22b6/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              whileHover={{ scale: 1.2, y: -3 }}
              whileTap={{ scale: 0.9 }}
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </motion.a>
            <motion.a
              href="mailto:kusheendhar@gmail.com"
              className="social-link"
              whileHover={{ scale: 1.2, y: -3 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Email"
            >
              <HiMail />
            </motion.a>
          </div>

          <div className="footer-text">
            <span>© {currentYear} Kusheen Dhar | Built with</span>
            <motion.span
              className="footer-icon heart"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
            >
              <FaHeart />
            </motion.span>
            <span className="footer-icon">
              <FaCoffee />
            </span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;

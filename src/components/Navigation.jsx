import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import {
  HiHome,
  HiUser,
  HiFolder,
  HiStar,
  HiMoon,
  HiSun,
  HiMail
} from 'react-icons/hi';
import { FaWrench, FaTrophy, FaGithub } from 'react-icons/fa';
import ResumeButton from './ResumeButton';
import './Navigation.css';

const Navigation = ({ activeSection }) => {
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const navItems = [
    { id: 'hero', label: 'Home', icon: HiHome },
    { id: 'home', label: 'About', icon: HiUser },
    { id: 'skills', label: 'Skills', icon: FaWrench },
    { id: 'projects', label: 'Projects', icon: HiFolder },
    { id: 'github-stats', label: 'GitHub', icon: FaGithub },
    { id: 'certifications', label: 'Certs', icon: HiStar },
    { id: 'achievements', label: 'Achievements', icon: FaTrophy },
    { id: 'contact', label: 'Contact', icon: HiMail },
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`navigation glass-nav ${isScrolled ? 'navigation--scrolled' : ''}`}
      aria-label="Main navigation"
    >
      <div className="nav-glow" aria-hidden="true" />
      <div className="nav-container">
        <motion.button
          className="logo-btn"
          onClick={() => scrollToSection('hero')}
          aria-label="Go to top"
          whileHover={{ scale: 1.04, y: -1 }}
          whileTap={{ scale: 0.97 }}
        >
          <span>KD</span>
        </motion.button>

        <div className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                className={`nav-link ${isActive ? 'active' : ''}`}
                onClick={() => scrollToSection(item.id)}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon className="nav-icon" aria-hidden="true" />
                <span>{item.label}</span>
              </button>
            );
          })}
          <div className="nav-mobile-resume">
            <ResumeButton variant="nav" mode="download" />
          </div>
        </div>

        <div className="nav-actions">
          <ResumeButton variant="nav" mode="download" label="Resume" />
          <motion.button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
          >
            {theme === 'light' ? <HiMoon /> : <HiSun />}
          </motion.button>
        </div>

        <button
          className={`mobile-menu-toggle ${isMobileMenuOpen ? 'is-open' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileMenuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="nav-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;

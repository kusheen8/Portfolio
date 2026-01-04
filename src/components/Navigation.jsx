import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { 
  HiHome, 
  HiUser, 
  HiCode, 
  HiFolder, 
  HiStar, 
  HiMoon,
  HiSun
} from 'react-icons/hi';
import { FaWrench, FaTrophy } from 'react-icons/fa';
import './Navigation.css';

const Navigation = ({ activeSection }) => {
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'hero', label: 'Home', icon: HiHome },
    { id: 'about', label: 'About', icon: HiUser },
    { id: 'skills', label: 'Skills', icon: FaWrench },
    { id: 'projects', label: 'Projects', icon: HiFolder },
    { id: 'certifications', label: 'Certifications', icon: HiStar },
    { id: 'achievements', label: 'Achievements', icon: FaTrophy },
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        <button className="logo-btn" onClick={() => scrollToSection('hero')}>
          <span>IN</span>
        </button>

        <div className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                className={`nav-link ${isActive ? 'active' : ''}`}
                onClick={() => scrollToSection(item.id)}
              >
                <Icon className="nav-icon" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'light' ? <HiMoon /> : <HiSun />}
        </button>

        <button 
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={isMobileMenuOpen ? 'open' : ''}></span>
          <span className={isMobileMenuOpen ? 'open' : ''}></span>
          <span className={isMobileMenuOpen ? 'open' : ''}></span>
        </button>
      </div>
    </nav>
  );
};

export default Navigation;

import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Home from './components/Home';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import GitHubStats from './components/GitHubStats';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import SectionDivider from './components/SectionDivider';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const sections = [
      'hero', 'home', 'about', 'skills', 'projects',
      'certifications', 'github-stats', 'achievements', 'contact'
    ];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element && scrollPosition >= element.offsetTop) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <ThemeProvider>
      <div className="app">
        <Navigation activeSection={activeSection} />
        <main>
          <Hero />
          <SectionDivider />
          <Home />
          <SectionDivider flip />
          <About />
          <SectionDivider />
          <Skills />
          <SectionDivider flip />
          <Projects />
          <SectionDivider />
          <Certifications />
          <SectionDivider flip />
          <GitHubStats />
          <SectionDivider />
          <Achievements />
          <SectionDivider flip />
          <Contact />
          <Footer />
        </main>
        <ScrollToTop />
      </div>
    </ThemeProvider>
  );
}

export default App;

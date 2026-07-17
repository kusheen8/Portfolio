import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { HiCheckCircle } from 'react-icons/hi';
import { SiOpenai, SiReact, SiNodedotjs } from 'react-icons/si';
import './Projects.css';

const projects = [
  {
    title: 'DevAssist AI',
    description:
      'AI-powered developer assistant that helps developers understand codebases, generate documentation, debug applications, explain repositories, and improve developer productivity using modern LLMs.',
    features: [
      'RAG-based document Q&A with PDF uploads',
      'Semantic search via embeddings and vector database',
      'Context-aware answers powered by Llama 3.1',
      'Hallucination guardrails and chat history',
    ],
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'LLMs', 'AI', 'GitHub'],
    github: 'https://github.com/kusheen8/DevAssist-AI',
    demo: 'https://devassist-ai.streamlit.app/',
    previewClass: 'preview-devassist',
    previewIcon: SiOpenai,
  },
  {
    title: 'AccessScan',
    description:
      'AI-powered web accessibility analyzer that performs real accessibility audits, detects WCAG issues, and generates intelligent recommendations to improve accessibility and usability.',
    features: [
      'AI accessibility analysis with actionable insights',
      'Automated audits powered by Pa11y',
      'WCAG compliance recommendations',
      'Full-stack dashboard for scan results',
    ],
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Pa11y', 'Accessibility', 'AI', 'AWS'],
    github: 'https://github.com/kusheen8/AccessScan',
    demo: 'http://13.202.183.229/',
    previewClass: 'preview-accessscan',
    previewIcon: SiReact,
  },
  {
    title: 'ChatX 3',
    description:
      'Modern AI chat application with intelligent conversations, fast responses, authentication, responsive UI, and clean user experience.',
    features: [
      'Real-time AI-powered conversations',
      'JWT authentication and secure sessions',
      'Responsive, polished chat interface',
      'Persistent message history',
    ],
    technologies: ['React', 'Node.js', 'Socket.io', 'JavaScript'],
    github: 'https://github.com/kusheen8/ChatX',
    demo: null,
    previewClass: 'preview-chatx',
    previewIcon: SiNodedotjs,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const ProjectCard = ({ project }) => {
  const PreviewIcon = project.previewIcon;

  return (
    <motion.article
      className="project-card glass-card"
      variants={cardVariants}
      whileHover={{ y: -12 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
    >
      <div className="project-card-glow" aria-hidden="true" />

      <div className={`project-preview ${project.previewClass}`}>
        <div className="project-preview-overlay" aria-hidden="true" />
        <PreviewIcon className="project-preview-icon" aria-hidden="true" />
        <span className="project-preview-label">{project.title}</span>
      </div>

      <div className="project-body">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>

        <ul className="project-features">
          {project.features.map((feature, i) => (
            <li key={i}>
              <HiCheckCircle aria-hidden="true" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <div className="project-technologies" aria-label={`${project.title} tech stack`}>
          {project.technologies.map((tech) => (
            <span key={tech} className="tech-tag">
              {tech}
            </span>
          ))}
        </div>

        <div className="project-actions">
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="project-btn demo-btn"
              aria-label={`View ${project.title} Live Demo`}
            >
              <FaExternalLinkAlt aria-hidden="true" />
              <span>View Live Demo</span>
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`project-btn github-btn${!project.demo ? ' github-btn-full' : ''}`}
              aria-label={`View ${project.title} Source Code`}
            >
              <FaGithub aria-hidden="true" />
              <span>View Source Code</span>
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
};

const Projects = () => (
  <section id="projects" className="projects-section" aria-label="Projects">
    <div className="projects-container">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">Projects</h2>
        <p className="section-subtitle">
          AI-powered tools and full-stack applications I've built
        </p>
      </motion.div>

      <motion.div
        className="projects-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </motion.div>
    </div>
  </section>
);

export default Projects;

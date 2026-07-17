import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HiMail, HiFolder, HiLocationMarker } from 'react-icons/hi';
import { FaLinkedin, FaGithub, FaPaperPlane } from 'react-icons/fa';
import ResumeButton from './ResumeButton';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});

  const contactLinks = [
    {
      icon: HiMail,
      label: 'Email',
      value: 'kusheendhar@gmail.com',
      href: 'mailto:kusheendhar@gmail.com'
    },
    {
      icon: FaLinkedin,
      label: 'LinkedIn',
      value: 'kusheen-dhar',
      href: 'https://www.linkedin.com/in/kusheen-dhar-129ab22b6/'
    },
    {
      icon: FaGithub,
      label: 'GitHub',
      value: 'kusheen8',
      href: 'https://github.com/kusheen8'
    },
    {
      icon: HiLocationMarker,
      label: 'Location',
      value: 'Bangalore, India',
      href: null
    }
  ];

  const quickLinks = [
    {
      type: 'resume-download',
    },
    {
      type: 'resume-view',
    },
    {
      icon: HiFolder,
      label: 'View Projects',
      action: () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      window.location.href = `mailto:kusheendhar@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(`From: ${formData.email}\n\n${formData.message}`)}`;
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
    }
  };

  return (
    <section id="contact" className="contact-section" aria-label="Contact">
      <div className="contact-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Get in Touch</h2>
          <p className="section-subtitle">
            Open to full-time roles, internships, and collaborations. Let's build something great.
          </p>
        </motion.div>

        <div className="contact-content">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="info-card glass-card">
              <h3 className="info-title">Connect With Me</h3>
              <div className="info-items">
                {contactLinks.map(({ icon: Icon, label, value, href }, index) => (
                  href ? (
                    <a
                      key={index}
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="info-item"
                    >
                      <div className="info-icon-wrap">
                        <Icon className="info-icon" aria-hidden="true" />
                      </div>
                      <div className="info-text">
                        <span className="info-label">{label}</span>
                        <span className="info-value">{value}</span>
                      </div>
                    </a>
                  ) : (
                    <div key={index} className="info-item info-item-static">
                      <div className="info-icon-wrap">
                        <Icon className="info-icon" aria-hidden="true" />
                      </div>
                      <div className="info-text">
                        <span className="info-label">{label}</span>
                        <span className="info-value">{value}</span>
                      </div>
                    </div>
                  )
                ))}
              </div>
            </div>

            <div className="info-card glass-card">
              <h3 className="info-title">Quick Links</h3>
              <div className="info-items">
                {quickLinks.map((link, index) => {
                  if (link.type === 'resume-download') {
                    return (
                      <ResumeButton
                        key={index}
                        variant="contact"
                        mode="download"
                      />
                    );
                  }
                  if (link.type === 'resume-view') {
                    return (
                      <ResumeButton
                        key={index}
                        variant="contact"
                        mode="view"
                      />
                    );
                  }
                  const Icon = link.icon;
                  return (
                    <button key={index} className="info-item" onClick={link.action}>
                      <div className="info-icon-wrap">
                        <Icon className="info-icon" aria-hidden="true" />
                      </div>
                      <div className="info-text">
                        <span className="info-value">{link.label}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>

          <motion.form
            className="contact-form glass-card"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            noValidate
          >
            <h3 className="form-title">Send a Message</h3>

            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? 'error' : ''}
                placeholder="John Doe"
                autoComplete="name"
              />
              {errors.name && <span className="error-message" role="alert">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Your Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
                placeholder="john@example.com"
                autoComplete="email"
              />
              {errors.email && <span className="error-message" role="alert">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="message">Your Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className={errors.message ? 'error' : ''}
                placeholder="Tell me about the opportunity or project..."
                rows="5"
              />
              {errors.message && <span className="error-message" role="alert">{errors.message}</span>}
            </div>

            <motion.button
              type="submit"
              className="submit-btn"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaPaperPlane aria-hidden="true" />
              <span>Send Message</span>
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;

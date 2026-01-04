import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HiMail, HiDocument, HiFolder } from 'react-icons/hi';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import resumePdf from './images/Resume.pdf';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      alert('Thank you for your message! I\'ll get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Get in Touch
        </motion.h2>

        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Have a project in mind or want to collaborate? I'd love to hear from you!
        </motion.p>

        <div className="contact-content">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="info-card">
              <h3 className="info-title">Let's Connect</h3>
              <div className="info-items">
                <a href="mailto:kusheendhar@gmail.com" className="info-item">
                  <HiMail className="info-icon" />
                  <span>kusheendhar@gmail.com</span>
                </a>
                <a href="https://www.linkedin.com/in/kusheen-dhar-129ab22b6/" target="_blank" rel="noopener noreferrer" className="info-item">
                  <FaLinkedin className="info-icon" />
                  <span>LinkedIn</span>
                </a>
                <a href="https://github.com/kusheen8" target="_blank" rel="noopener noreferrer" className="info-item">
                  <FaGithub className="info-icon" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>

            <div className="info-card">
              <h3 className="info-title">Quick Links</h3>
              <div className="info-items">
                <a href={resumePdf} download="Kusheen_Dhar_Resume.pdf" className="info-item">
                  <HiDocument className="info-icon" />
                  <span>Download Resume</span>
                </a>
                <button 
                  className="info-item"
                  onClick={() => {
                    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <HiFolder className="info-icon" />
                  <span>View Projects</span>
                </button>
              </div>
            </div>
          </motion.div>

          <motion.form
            className="contact-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? 'error' : ''}
                placeholder="Enter your name"
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
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
                placeholder="Enter your email"
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="message">Your Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className={errors.message ? 'error' : ''}
                placeholder="Enter your message"
                rows="6"
              />
              {errors.message && <span className="error-message">{errors.message}</span>}
            </div>

            <button type="submit" className="submit-btn">
              <HiMail />
              <span>Send Message</span>
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;

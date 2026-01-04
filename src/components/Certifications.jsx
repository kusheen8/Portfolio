import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiCode, 
  HiShieldCheck, 
  HiDesktopComputer,
  HiX
} from 'react-icons/hi';
import { FaUserShield } from 'react-icons/fa';
import nptelCert from './images/Nptel Certficate.png';
import webDevCert from './images/Web dev.png';
import mongoDbCert from './images/MongoDb.png';
import javaInfosysCert from './images/java infosys.png';
import './Certifications.css';

const Certifications = () => {
  const [selectedCert, setSelectedCert] = useState(null);

  const certifications = [
    {
      title: 'Java Programming',
      issuer: 'NPTEL',
      icon: HiCode,
      image: nptelCert
    },
    {
      title: 'Web Development',
      issuer: 'Udemy',
      icon: HiShieldCheck,
      image: webDevCert
    },
    {
      title: 'MongoDB Java Devloper',
      issuer: 'MongoDB',
      icon: HiDesktopComputer,
      image: mongoDbCert
    },
    {
      title: 'Programming in Java',
      issuer: 'Infosys Springboard',
      icon: FaUserShield,
      image: javaInfosysCert
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.4 }
    }
  };

  return (
    <section id="certifications" className="certifications-section">
      <div className="certifications-container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Certified & Skilled
        </motion.h2>

        <motion.div
          className="certifications-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {certifications.map((cert, index) => {
            const Icon = cert.icon;
            return (
              <motion.div
                key={index}
                className="certification-card"
                variants={cardVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="cert-icon">
                  <Icon />
                </div>
                <h3 className="cert-title">{cert.title}</h3>
                <p className="cert-issuer">{cert.issuer}</p>
                <button 
                  className="cert-btn"
                  onClick={() => setSelectedCert(cert)}
                >
                  View Certificate
                </button>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Certificate Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            className="cert-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              className="cert-modal-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="cert-modal-close"
                onClick={() => setSelectedCert(null)}
                aria-label="Close"
              >
                <HiX />
              </button>
              <img
                src={selectedCert.image}
                alt={`${selectedCert.title} Certificate`}
                className="cert-modal-image"
              />
              <div className="cert-modal-info">
                <h3>{selectedCert.title}</h3>
                <p>{selectedCert.issuer}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certifications;

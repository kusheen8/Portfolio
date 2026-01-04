import React from 'react';
import { motion } from 'framer-motion';
import { 
  HiStar, 
  HiLightningBolt,
  HiShieldCheck,
  HiSpeakerphone,
  HiUserGroup,
  HiColorSwatch
} from 'react-icons/hi';
import { FaMedal, FaMapPin, FaTrophy, FaUsers } from 'react-icons/fa';
import './Achievements.css';

const Achievements = () => {
  const achievements = [
    {
      icon: FaTrophy,
      text: 'Runner Up in a Design Hackathon'
    },
    {
      icon: FaUsers,
      text: 'Design Core Member - NMIT Hacks Club'
    },
    {
      icon: HiColorSwatch,
      text: 'Art Club Member for AANADYANTA FEST'
    },
    {
      icon: HiUserGroup,
      text: 'Organised a 48 Hour College Hackathon'
    },
    {
      icon: HiLightningBolt,
      text: 'AR/VR Hackathon Participant - SRM Chennai'
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
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <section id="achievements" className="achievements-section">
      <div className="achievements-container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Milestones & Moments
        </motion.h2>

        <motion.div
          className="achievements-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <motion.div
                key={index}
                className="achievement-card"
                variants={cardVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="achievement-icon">
                  <Icon />
                </div>
                <p className="achievement-text">{achievement.text}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;

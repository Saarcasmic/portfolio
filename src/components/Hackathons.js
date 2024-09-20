// src/components/Hackathons.js

import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const HackathonsSection = styled.section`
  padding: 60px 20px;
  background: ${({ theme }) => theme.sectionBackground};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;

const HackathonCard = styled(motion.div)`
  background: ${({ theme }) => theme.cardBackground};
  padding: 20px;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.cardShadow};
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const HackathonImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: contain;
  border-radius: 5px;
`;

const HackathonTitle = styled.h3`
  margin: 15px 0 10px 0;
  font-size: 1.2rem;
`;

const HackathonDescription = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.secondaryText};
`;

const ModalBackground = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled(motion.div)`
  background: ${({ theme }) => theme.modalBackground};
  padding: 30px;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: ${({ theme }) => theme.text};
`;

const Hackathons = () => {
  const hackathons = [
    {
      name: 'Flipkart GRiD 5.0 - Software Development Track',
      logo: 'https://i.ibb.co/rsdtPXY/flipkart-icon.png',
      description: 'Developed a Personalized Fashion Recommendation System.',
      projectLink: 'https://github.com/Saarcasmic/FashionMatch',
      certificate: 'https://unstop.com/certificate-preview/7e7a6b9c-96ea-4170-907b-af4e3eeedc9e',
    },
    {
      name: 'HackOn With Amazon - Season 3',
      logo: 'https://i.ibb.co/d667xB2/6502c4544c083-image-9.png',
      description: 'Qualified for Level 2',
      certificate: '/certificates/hackathon2.pdf',
    },
    // Add more hackathons as needed
  ];

  const [selectedHackathon, setSelectedHackathon] = useState(null);

  const openModal = (hackathon) => {
    setSelectedHackathon(hackathon);
  };

  const closeModal = () => {
    setSelectedHackathon(null);
  };

  return (
    <HackathonsSection>
      <h2>Hackathons</h2>
      <Grid>
        {hackathons.map((hackathon, index) => (
          <HackathonCard
            key={index}
            onClick={() => openModal(hackathon)}
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <HackathonImage src={hackathon.logo} alt={hackathon.name} loading="lazy"  />
            <HackathonTitle>{hackathon.name}</HackathonTitle>
            <HackathonDescription>{hackathon.description}</HackathonDescription>
          </HackathonCard>
        ))}
      </Grid>

      <AnimatePresence>
        {selectedHackathon && (
          <ModalBackground
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <ModalContent
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <CloseButton onClick={closeModal}>&times;</CloseButton>
              <h3>{selectedHackathon.name}</h3>
              <p>{selectedHackathon.description}</p>
              
              <a href={selectedHackathon.projectLink} target="_blank" rel="noopener noreferrer">
                View Project
              </a>
              <br />
              <a href={selectedHackathon.certificate} target="_blank" rel="noopener noreferrer">
                View Certificate
              </a>
              <br />
            </ModalContent>
          </ModalBackground>
        )}
      </AnimatePresence>
    </HackathonsSection>
  );
};

export default Hackathons;

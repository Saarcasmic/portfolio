// src/components/About.js

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import profileImage from '../assets/images/profile.jpeg'; // Replace with your image path

const AboutSection = styled.section`
  padding: 60px 20px;
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.sectionBackground};

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Image = styled(motion.img)`
  width: 250px;
  height: 250px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 40px;

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 20px;
  }
`;

const Content = styled.div`
  flex: 1;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
`;

const Skills = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;

  li {
    background: ${({ theme }) => theme.skillBackground};
    color: ${({ theme }) => theme.skillText};
    padding: 5px 10px;
    border-radius: 15px;
    margin: 5px;
    font-size: 0.9rem;
  }
`;

const About = () => {
  return (
    <AboutSection>
      <Image
        src={profileImage}
        alt="Profile"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      />
      <Content>
        <Title>About Me</Title>
        <Description>
          Hi, I'm Saar Agrawal, a passionate developer specializing in React, frontend development, and UX design. I enjoy creating interactive and user-friendly applications that solve real-world problems.
        </Description>
        <Skills>
          <li>React</li>
          <li>JavaScript</li>
          <li>HTML5</li>
          <li>CSS3</li>
          <li>Styled Components</li>
          <li>Framer Motion</li>
          <li>Git</li>
          <li>Responsive Design</li>
        </Skills>
      </Content>
    </AboutSection>
  );
};

export default About;

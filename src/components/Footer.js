// src/components/Footer.js

import React from 'react';
import styled from 'styled-components';
import { FaLinkedin, FaGithub, FaTwitter, FaArrowUp } from 'react-icons/fa';
import { animateScroll as scroll } from 'react-scroll';

const FooterContainer = styled.footer`
  background: ${({ theme }) => theme.footerBackground};
  padding: 20px 0;
  text-align: center;
  color: ${({ theme }) => theme.text};
`;

const SocialLinks = styled.div`
  margin-bottom: 10px;

  a {
    margin: 0 10px;
    color: ${({ theme }) => theme.text};
    font-size: 1.5rem;
    transition: color 0.3s;

    &:hover {
      color: ${({ theme }) => theme.primary};
    }
  }
`;

const BackToTop = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  font-size: 1.2rem;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const Copyright = styled.p`
  font-size: 0.9rem;
  margin-top: 10px;
`;

const Footer = () => {
  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  return (
    <FooterContainer>
      <SocialLinks>
        <a href="https://linkedin.com/in/Saarcasmic" target="_blank" rel="noopener noreferrer">
          <FaLinkedin />
        </a>
        <a href="https://github.com/Saarcasmic" target="_blank" rel="noopener noreferrer">
          <FaGithub />
        </a>
        <a href="https://twitter.com/Saarcasmicc" target="_blank" rel="noopener noreferrer">
          <FaTwitter />
        </a>
      </SocialLinks>
      <BackToTop onClick={scrollToTop}>
        <FaArrowUp />
      </BackToTop>
      <Copyright>
        &copy; {new Date().getFullYear()} Saar Agrawal. All rights reserved.
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;

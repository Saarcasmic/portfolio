// src/pages/Home.js

import React, { useEffect } from 'react';
import About from '../components/About';
import ProjectsCarousel from '../components/ProjectsCarousel';
import ContactForm from '../components/ContactForm';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  return (
    <div>
      <About data-aos="fade-up" />
      <ProjectsCarousel data-aos="fade-up" />
      <ContactForm data-aos="fade-up" />
    </div>
  );
};

export default Home;

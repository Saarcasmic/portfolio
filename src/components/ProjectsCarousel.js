import React from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { motion } from 'framer-motion';

const CarouselContainer = styled.section`
  padding: 60px 20px;
  background: ${({ theme }) => theme.sectionBackground};
  max-width: 1200px;
  margin: 0 auto;

  .swiper-pagination {
    bottom: -30px; /* Move pagination dots below the slides */
    z-index: 10;
  }

  .swiper-button-next,
  .swiper-button-prev {
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    color: ${({ theme }) => theme.primary}; /* Ensure buttons are visible */
  }
`;

const Slide = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border-radius: 12px;
  padding: 15px; /* Adjust padding to reduce size */
  background: ${({ theme }) => theme.cardBackground};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s, transform 0.3s;
  border: 1px solid ${({ theme }) => theme.border};
  max-width: 260px; /* Reduced width */
  margin: 0 auto;
  margin-bottom: 30px; /* Ensure space between slide and container */
  margin-top: 30px; /* Ensure space between slide and container */

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2), 0 12px 40px rgba(0, 0, 0, 0.2);
    transform: translateY(-5px);
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 180px; /* Reduced height */
  object-fit: contain;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const ProjectTitle = styled.h3`
  margin: 15px 0 10px 0;
  font-size: 1.3rem; /* Slightly smaller font */
  border-bottom: 2px solid ${({ theme }) => theme.primary};
`;

const Description = styled.p`
  font-size: 0.9rem; /* Smaller font for descriptions */
  margin-bottom: 10px;
`;

const TechStack = styled.p`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.secondaryText};
  margin-bottom: 10px;
`;

const GitHubLink = styled.a`
  color: ${({ theme }) => theme.primary};
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

const ProjectsCarousel = () => {
  const projects = [
    {
      title: 'FashionMatch',
      image: 'https://i.ibb.co/C6QLnxV/fashionmatch.png',
      description: 'A brief description of Project One.',
      techStack: 'React, Node.js, MongoDB',
      githubLink: 'https://github.com/yourprofile/project-one',
    },
    {
      title: 'MoneyMinder',
      image: 'https://i.ibb.co/Pc9Yp5H/money.jpg',
      description: 'A brief description of Project Two.',
      techStack: 'React, Firebase',
      githubLink: 'https://github.com/yourprofile/project-two',
    },
    {
      title: 'FashionMatch',
      image: 'https://i.ibb.co/C6QLnxV/fashionmatch.png',
      description: 'A brief description of Project One.',
      techStack: 'React, Node.js, MongoDB',
      githubLink: 'https://github.com/yourprofile/project-one',
    },
    {
      title: 'MoneyMinder',
      image: 'https://i.ibb.co/Pc9Yp5H/money.jpg',
      description: 'A brief description of Project Two.',
      techStack: 'React, Firebase',
      githubLink: 'https://github.com/yourprofile/project-two',
    },
    {
      title: 'FashionMatch',
      image: 'https://i.ibb.co/C6QLnxV/fashionmatch.png',
      description: 'A brief description of Project One.',
      techStack: 'React, Node.js, MongoDB',
      githubLink: 'https://github.com/yourprofile/project-one',
    },
    {
      title: 'MoneyMinder',
      image: 'https://i.ibb.co/Pc9Yp5H/money.jpg',
      description: 'A brief description of Project Two.',
      techStack: 'React, Firebase',
      githubLink: 'https://github.com/yourprofile/project-two',
    },
    // Additional projects...
  ];

  return (
    <CarouselContainer>
      <h2>My Projects</h2>
      <Swiper
        spaceBetween={20} /* Added space between slides */
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination]}
        lazy
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {projects.map((project, index) => (
          <SwiperSlide key={index}>
            <Slide
              whileHover={{ scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 300 }}
              lazy="true"
            >
              <ProjectImage src={project.image} alt={project.title} loading="lazy" />
              <ProjectTitle>{project.title}</ProjectTitle>
              <Description>{project.description}</Description>
              <TechStack>{project.techStack}</TechStack>
              <GitHubLink href={project.githubLink} target="_blank" rel="noopener noreferrer">
                View on GitHub
              </GitHubLink>
            </Slide>
          </SwiperSlide>
        ))}
      </Swiper>
    </CarouselContainer>
  );
};

export default ProjectsCarousel;

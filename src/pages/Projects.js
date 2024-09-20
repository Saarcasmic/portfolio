import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';

const ProjectsSection = styled.section`
  padding: 60px 20px;
  background: ${({ theme }) => theme.sectionBackground};
`;

const SearchContainer = styled.div`
  max-width: 600px;
  margin: 0 auto 40px auto;
  display: flex;
  justify-content: center;
`;

const SearchInput = styled.input`
  width: 80%;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 20px 0 0 20px;
  outline: none;
`;

const SearchButton = styled.button`
  padding: 10px 20px;
  border: 1px solid ${({ theme }) => theme.border};
  border-left: none;
  border-radius: 0 20px 20px 0;
  background: ${({ theme }) => theme.primary};
  color: #fff;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.secondary};
  }
`;

const ProjectsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProjects, setFilteredProjects] = useState([]);

  // Memoize the projects array to prevent it from changing on every render
  const projects = useMemo(() => [
    {
      id: 1,
      title: 'FashionMatch',
      image: 'https://i.ibb.co/C6QLnxV/fashionmatch.png',
      description: 'A Personalized Fashion Recommendation System.',
      techStack: 'Python, Machine Learning',
      githubLink: 'https://github.com/Saarcasmic/FashionMatch',
    },
    {
      id: 2,
      title: 'MoneyMinder',
      image: 'https://i.ibb.co/Pc9Yp5H/money.jpg',
      description: 'An application to manage your finances and track expenses.',
      techStack: 'React, MongoDb, Express, Node.js',
      githubLink: 'https://github.com/Saarcasmic/finance-manager',
    },
    {
      id: 3,
      title: 'Ingredient-Insighter',
      image: 'https://github.com/DharmaWarrior/Food-Recipe/assets/97218268/55ee8049-4701-43d2-9b65-cf208a705bd7',
      description: 'A recipe search engine that provides recipes based on ingredients.',
      techStack: 'React, Tailwindcss, Css, JavaScript',
      githubLink: 'https://github.com/Saarcasmic/Food-Recipe',
    },
    {
      id: 4,
      title: 'VidVerse',
      image: 'https://i.ibb.co/MSKbbpD/Screenshot-2024-09-21-031448.png',
      description: 'A platform to stream and watch videos',
      techStack: 'React, Material-UI, Tailwindcss',
      githubLink: 'https://github.com/Saarcasmic/vidverse',
    },
  ], []); // Empty dependency array to ensure this is only created once

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredProjects(projects); // If there's no search query, show all projects
    } else {
      const filtered = projects.filter((project) =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.techStack.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProjects(filtered);
    }
  }, [searchQuery, projects]);

  const handleSearch = (e) => {
    e.preventDefault();
    // The filtering is handled by useEffect
  };

  return (
    <ProjectsSection>
      <h2>Projects</h2>
      <SearchContainer>
        <form onSubmit={handleSearch} style={{ display: 'flex', width: '100%' }}>
          <SearchInput
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <SearchButton type="submit">Search</SearchButton>
        </form>
      </SearchContainer>

      {/* Render filtered projects */}
      {filteredProjects.length > 0 ? (
        filteredProjects.map(project => (
          <div key={project.id}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <p>Tech Stack: {project.techStack}</p>
            <a href={project.githubLink} target="_blank" rel="noopener noreferrer">View on GitHub</a>
            <hr />
          </div>
        ))
      ) : (
        <p>No projects found.</p>
      )}

      {/* Pass filteredProjects to ProjectsCarousel if needed */}
      {/* <ProjectsCarousel projects={filteredProjects} /> */}
    </ProjectsSection>
  );
};

export default ProjectsPage;

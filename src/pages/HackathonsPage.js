import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import Hackathons from '../components/Hackathons';

const HackathonsSection = styled.section`
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

const HackathonsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredHackathons, setFilteredHackathons] = useState([]);

  // Memoize the hackathons array so it doesn't change on every render
  const hackathons = useMemo(() => [
    {
      id: 1,
      name: 'Hackathon One',
      logo: '/images/hackathon1.png',
      description: 'Developed a web application for task management.',
      projectLink: 'https://github.com/yourprofile/hackathon-one',
      certificate: '/certificates/hackathon1.pdf',
      media: 'https://mediaurl.com/hackathon1',
    },
    {
      id: 2,
      name: 'Hackathon Two',
      logo: '/images/hackathon2.png',
      description: 'Created a mobile app for real-time chat.',
      projectLink: 'https://github.com/yourprofile/hackathon-two',
      certificate: '/certificates/hackathon2.pdf',
      media: 'https://mediaurl.com/hackathon2',
    },
    {
      id: 3,
      name: 'Hackathon One',
      logo: '/images/hackathon1.png',
      description: 'Developed a web application for task management.',
      projectLink: 'https://github.com/yourprofile/hackathon-one',
      certificate: '/certificates/hackathon1.pdf',
      media: 'https://mediaurl.com/hackathon1',
    },
    {
      id: 4,
      name: 'Hackathon Two',
      logo: '/images/hackathon2.png',
      description: 'Created a mobile app for real-time chat.',
      projectLink: 'https://github.com/yourprofile/hackathon-two',
      certificate: '/certificates/hackathon2.pdf',
      media: 'https://mediaurl.com/hackathon2',
    },
    {
      id: 5,
      name: 'Hackathon One',
      logo: '/images/hackathon1.png',
      description: 'Developed a web application for task management.',
      projectLink: 'https://github.com/yourprofile/hackathon-one',
      certificate: '/certificates/hackathon1.pdf',
      media: 'https://mediaurl.com/hackathon1',
    },
    {
      id: 6,
      name: 'Hackathon Two',
      logo: '/images/hackathon2.png',
      description: 'Created a mobile app for real-time chat.',
      projectLink: 'https://github.com/yourprofile/hackathon-two',
      certificate: '/certificates/hackathon2.pdf',
      media: 'https://mediaurl.com/hackathon2',
    },
    // Add more hackathons as needed
  ], []); // Empty dependency array to ensure it's only created once

  // Filter hackathons when searchQuery changes
  useEffect(() => {
    if (searchQuery === '') {
      setFilteredHackathons(hackathons); // Show all hackathons if search is empty
    } else {
      const filtered = hackathons.filter((hackathon) =>
        hackathon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hackathon.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredHackathons(filtered);
    }
  }, [searchQuery, hackathons]); // hackathons is stable due to useMemo

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <HackathonsSection>
      {/* <h2>Hackathons</h2> */}
      <SearchContainer>
        <form onSubmit={handleSearch} style={{ display: 'flex', width: '100%' }}>
          <SearchInput
            type="text"
            placeholder="Search hackathons..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <SearchButton type="submit">Search</SearchButton>
        </form>
      </SearchContainer>
      
      {/* Render filtered hackathons */}
      {/* {filteredHackathons.length > 0 ? (
        filteredHackathons.map(hackathon => (
          <div key={hackathon.id}>
            <h3>{hackathon.name}</h3>
            <p>{hackathon.description}</p>
            <a href={hackathon.projectLink} target="_blank" rel="noopener noreferrer">View Project</a>
            <br />
            <a href={hackathon.certificate} target="_blank" rel="noopener noreferrer">View Certificate</a>
            <br />
            <a href={hackathon.media} target="_blank" rel="noopener noreferrer">View Media Coverage</a>
            <hr />
          </div>
        ))
      ) : (
        <p>No hackathons found.</p>
      )} */}
      
      {/* Passing filtered hackathons to the Hackathons component */}
      <Hackathons hackathons={filteredHackathons} />
    </HackathonsSection>
  );
};

export default HackathonsPage;

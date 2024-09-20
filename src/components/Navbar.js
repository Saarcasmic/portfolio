// src/components/Navbar.js

import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';
import { useState } from 'react';

const Nav = styled.nav`
  background: ${({ theme }) => theme.navBackground};
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  position: sticky;
  top: 0;
  z-index: 10;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const NavLinks = styled.ul`
  display: flex;
  list-style: none;

  @media (max-width: 768px) {
    display: ${({ open }) => (open ? 'flex' : 'none')};
    position: absolute;
    top: 60px;
    left: 0;
    flex-direction: column;
    width: 100%;
    background: ${({ theme }) => theme.navBackground};
  }
`;

const NavItem = styled.li`
  margin: 0 15px;

  @media (max-width: 768px) {
    margin: 20px 0;
    text-align: center;
  }
`;

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  font-size: 1rem;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  font-size: 1.2rem;
  margin-left: 15px;
`;




const Hamburger = styled.div`
  display: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${({ theme }) => theme.text};

  @media (max-width: 768px) {
    display: block;
  }
`;

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <Nav>
      <Logo>Saar's Portfolio</Logo>
      <Hamburger onClick={handleMenuToggle}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </Hamburger>
      <NavLinks open={menuOpen}>
        <NavItem>
          <NavLink to="/">Home</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/projects">Projects</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/hackathons">Hackathons</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/contact">Contact</NavLink>
        </NavItem>
        {/* <NavItem>
          <SearchContainer>
            <form onSubmit={handleSearch}>
              <SearchInput
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <SearchIcon />
            </form>
          </SearchContainer>
        </NavItem> */}
      </NavLinks>
      <ToggleButton onClick={toggleTheme}>
        {theme === 'light' ? <FaMoon /> : <FaSun />}
      </ToggleButton>
    </Nav>
  );
};

export default Navbar;

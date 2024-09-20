// src/App.js

import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import GlobalStyles from './styles/GlobalStyles';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProjectsPage from './pages/Projects';
import HackathonsPage from './pages/HackathonsPage';
import ContactPage from './pages/Contact';
import styled from 'styled-components';

// Lazy load pages for performance optimization
// const Home = lazy(() => import('./pages/Home'));
// const ProjectsPage = lazy(() => import('./pages/Projects'));
// const HackathonsPage = lazy(() => import('./pages/HackathonsPage'));
// const ContactPage = lazy(() => import('./pages/Contact'));

const Loading = styled.div`
  text-align: center;
  padding: 100px 0;
  font-size: 1.5rem;
`;

function App() {
  return (
    <ThemeProvider>
      
      <Router>
        <GlobalStyles />
        
        <Navbar />
        <Suspense fallback={<Loading>Loading...</Loading>}>
        
          <Routes>
            
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<Home />} /> {/* You can create a separate About page if needed */}
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/hackathons" element={<HackathonsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            {/* Add more routes as needed */}
          </Routes>
        </Suspense>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;

// src/styles/GlobalStyles.js

import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: ${({ theme }) => theme.sectionBackground};
    color: ${({ theme }) => theme.text};
    transition: background 0.3s, color 0.3s;
  }

  h1, h2, h3, h4, h5, h6 {
    color: ${({ theme }) => theme.text};
  }

  a {
    color: ${({ theme }) => theme.primary};
    text-decoration: none;
  }

  a:hover {
    color: ${({ theme }) => theme.secondary};
  }

  /* Scrollbar Styling */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.sectionBackground};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.primary};
    border-radius: 4px;
  }

  /* Responsive Images */
  img {
    max-width: 100%;
    height: auto;
  }
`;

export default GlobalStyles;

// src/context/ThemeContext.js

import React, { createContext, useState, useEffect } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../styles/themes';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Check local storage for theme preference
  const storedTheme = localStorage.getItem('theme');

  const [theme, setTheme] = useState(storedTheme || 'light');

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const themeStyle = theme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <StyledThemeProvider theme={themeStyle}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

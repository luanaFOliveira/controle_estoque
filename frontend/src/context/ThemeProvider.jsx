import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState('light');

  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
      <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
        {children}
      </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
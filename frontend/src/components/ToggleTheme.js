import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeProvider';
import { lightTheme, darkTheme } from '../theme';

const ToggleTheme = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button onClick={toggleTheme}>
      {theme === lightTheme ? 'Tema Escuro' : 'Tema Claro'}
    </button>
  );
};

export default ToggleTheme;

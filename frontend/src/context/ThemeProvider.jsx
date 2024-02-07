import React, {createContext, useContext, useEffect, useState} from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const storedThemeMode = localStorage.getItem("themeMode");
  const [themeMode, setThemeMode] = useState(storedThemeMode || "light");

  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    localStorage.setItem("themeMode", themeMode);
  }, [themeMode]);

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

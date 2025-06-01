import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") === "light" ? "light" : "dark"
  );

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      localStorage.setItem("theme", theme);
    } else {
      setTheme("light");
      localStorage.setItem("theme", theme);
    }
  };

  useEffect(() => {
    if (theme === "light") {
      localStorage.setItem("theme", "light");
      document.querySelector("html").setAttribute("data-theme", "emerald");
    } else {
      localStorage.setItem("theme", "dark");
      document.querySelector("html").setAttribute("data-theme", "forest");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  return useContext(ThemeContext);
};

export { useTheme, ThemeProvider };

import { createContext, useState } from "react";

// Survey answers provider
export const SurveyContext = createContext();

/**
 * Creates a SurveyProvider component that wraps its children components.
 *
 * @param {Object} children - The children components to be wrapped.
 * @return {JSX.Element} The wrapped children components.
 */
export const SurveyProvider = ({ children }) => {
  const [answers, setAnswers] = useState({});

  const saveAnswers = (newAnswers) => {
    setAnswers({ ...answers, ...newAnswers });
  };

  const clearAnswers = () => setAnswers({});

  return (
    <SurveyContext.Provider value={{ answers, saveAnswers, clearAnswers }}>
      {children}
    </SurveyContext.Provider>
  );
};

// Theme provider (light/dark modes)
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

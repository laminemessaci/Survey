import { createContext, useCallback, useState } from 'react';

// Survey answers provider
export const SurveyContext = createContext();

/**
 * SurveyProvider component that provides survey answers and functions to save and clear survey answers.
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components.
 * @returns {React.ReactNode} The rendered component.
 */
export const SurveyProvider = ({ children }) => {
  // State hook to store survey answers
  const [surveyAnswers, setSurveyAnswers] = useState({});

  /**
   * Function to save survey answers.
   * @param {Object} newAnswers - The new survey answers to be saved.
   */
  const saveSurveyAnswers = useCallback((newAnswers) => {
    setSurveyAnswers((prevAnswers) => ({ ...prevAnswers, ...newAnswers }));
  }, []);

  /**
   * Function to clear survey answers.
   */
  const clearSurveyAnswers = useCallback(() => setSurveyAnswers({}), []);

  return (
    <SurveyContext.Provider
      value={{ surveyAnswers, saveSurveyAnswers, clearSurveyAnswers }}
    >
      {children}
    </SurveyContext.Provider>
  );
};

// Theme provider (light/dark modes)
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

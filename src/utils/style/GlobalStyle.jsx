import { useContext } from 'react';
import { createGlobalStyle } from 'styled-components';

import { ThemeContext } from '../context/providers';
import { colors } from './colors';

/**
 * Renders the global style component based on the current theme.
 * @returns {React.Component} The rendered global style component.
 */
export function GlobalStyle() {
  // Get the current theme from the context
  const { theme } = useContext(ThemeContext) || {};

  // Determine if the theme is dark
  const isDarkTheme = theme === 'dark' ? true : false;

  // Render the themed global style component
  return <ThemedGlobalStyle isdarktheme={isDarkTheme} />;
}

const ThemedGlobalStyle = createGlobalStyle`
  html {
    color: ${colors.neutral900};
    font-family: "Trebuchet MS", Helvetica, sans-serif;
    font-weight: 400;

    transition: 500ms;

    scroll-behavior: smooth;
  }

  body {
    max-width: 1440px;
    margin: auto;
    padding: 0 4rem;
  }

  main {
    margin: 3rem 0;
    padding: 2rem 1rem;
  }

  ${(props) =>
    props.isdarktheme
      ? `
    html {
      color: white;

      background: ${colors.neutral900};
    }
    `
      : ``}
`;

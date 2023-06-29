import { useContext } from "react";
import { createGlobalStyle } from "styled-components";

import { ThemeContext } from "../context/providers";
import { colors } from "./colors";

/**
 * Renders the global style component based on the current theme.
 * @returns {React.Component} The rendered global style component.
 */
export function GlobalStyle() {
  const theme = useContext(ThemeContext)?.theme;
  return <ThemedGlobalStyle isDarkTheme={theme === "dark"} />;
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
    props.isDarkTheme
      ? `
    html {
      color: white;

      background: ${colors.neutral900};
    }
    `
      : ``}
`;

import { useContext } from "react";
import styled from "styled-components";

import { ThemeContext } from "../utils/context/providers";
import { colors } from "../utils/style/colors";

/**
 * Renders the footer component.
 *
 * @return {ReactNode} The rendered footer component.
 */
export function Footer() {
  // Get the theme and toggleTheme function from the ThemeContext
  const { theme, toggleTheme } = useContext(ThemeContext);
  
  // Check if the theme is dark
  const isDarkTheme = theme === "dark";
  
  // Set the message based on the theme
  const themeMessage = isDarkTheme ? "Passer en mode clair" : "Passer en mode sombre";

  // Render the footer component
  return (
    <FooterContainer isDarkTheme={isDarkTheme}>
      <ThemeSwitcher onClick={toggleTheme} isDarkTheme={isDarkTheme}>
        {themeMessage}
      </ThemeSwitcher>
    </FooterContainer>
  );
}

const FooterContainer = styled.footer`
  display: flex;
  justify-content: flex-end;
  padding: 2rem 4rem;

  background: ${colors.secondary500};

  ${(props) => (props.isDarkTheme ? `background: ${colors.neutral700};` : ``)}
`;

const ThemeSwitcher = styled.button`
  padding: 0.5rem 2rem;
  border-width: 0;
  border-radius: 2rem;

  color: ${colors.neutral900};
  font-size: 1rem;
  font-weight: 700;
  text-decoration: none;

  background: ${colors.neutral100};

  cursor: pointer;

  ${(props) =>
    props.isDarkTheme
      ? `
        color: white;
        background: ${colors.neutral900}`
      : ``}
`;

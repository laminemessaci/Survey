import { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { ThemeContext } from '../utils/context/providers';
import { colors } from '../utils/style/colors';
import Error404Illustration from '../assets/404-illustration.png';

/**
 * Renders the Error404 component.
 * @returns {ReactElement} The rendered component.
 */
export function Error404() {
  // Get the current theme from the ThemeContext
  const { theme } = useContext(ThemeContext);
  // Check if the theme is dark
  const isDarkTheme = theme === 'dark';

  return (
    // Render the Error404Container with the isdarktheme prop
    <Error404Container isdarktheme={isDarkTheme}>
      {/* Render the error message */}
      <ErrorText>Oups...</ErrorText>
      {/* Render the error illustration */}
      <ErrorIllustration src={Error404Illustration} alt="Erreur 404" />
      {/* Render the additional error message */}
      <ErrorText>Il semblerait qu'il y ait un problème</ErrorText>
      {/* Render the call to action link */}
      <CallToActionLink to="/">Revenir à l'accueil</CallToActionLink>
    </Error404Container>
  );
}

const Error404Container = styled.main`
  padding: 4rem;

  text-align: center;

  background: ${(props) =>
    props.isdarktheme ? `${colors.neutral700}` : `${colors.neutral100}`};
`;

const ErrorText = styled.p`
  margin: 1rem;

  font-size: 2rem;
  font-weight: 700;
`;

const ErrorIllustration = styled.img`
  margin: 3rem 0;
`;

const CallToActionLink = styled(Link)`
  display: inline-block;

  margin: 4rem 0 0 0;
  padding: 0.5rem 4rem;
  border-radius: 2rem;

  color: white;
  font-size: 1.1rem;
  font-weight: 700;
  text-decoration: none;

  background: ${colors.primary500};
`;

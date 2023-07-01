import { useCallback, useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { SurveyContext, ThemeContext } from '../utils/context/providers';
import { colors } from '../utils/style/colors';
import ShinyLogo from '../assets/logo-shiny.svg';
import ShinyTextLogo from '../assets/logo-text-shiny.svg';

import Moon from '../assets/moon.png';
import Sun from '../assets/sun.png';

/**
 * Renders the header component.
 *
 * @return {ReactElement} The rendered header component.
 */
export function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const isDarkMode = theme === 'dark';
  const { clearSurveyAnswers } = useContext(SurveyContext);

  const scrollToTop = useCallback(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleClick = useCallback(() => {
    scrollToTop();
    clearSurveyAnswers();
  }, [scrollToTop, clearSurveyAnswers]);

  return (
    <HeaderContainer>
      <LogoLink to="/">
        <Logo src={ShinyLogo} alt="Shiny logo" />
        <TextLogo
          src={ShinyTextLogo}
          alt="Agence Shiny"
          isdarktheme={theme === 'dark'}
        />
      </LogoLink>

      <nav>
        <MainNavList>
          <li>
            <StyledLink
              onClick={scrollToTop}
              to="/"
              isdarktheme={theme === 'dark'}
            >
              Accueil
            </StyledLink>
          </li>
          <li>
            <StyledLink
              onClick={scrollToTop}
              to="/freelances"
              isdarktheme={theme === 'dark'}
            >
              Nos freelances
            </StyledLink>
          </li>
          <li>
            <StyledLink
              onClick={handleClick}
              to="/faire-le-test/1"
              className="highlighted-link"
            >
              Faire le test
            </StyledLink>
          </li>
        </MainNavList>
      </nav>
      <Toggle light={isDarkMode ? true : false} onClick={toggleTheme}>
        <ThemeImage src={isDarkMode ? `${Sun}` : `${Moon}`} />
      </Toggle>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 1rem 0;
`;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;

  cursor: pointer;
`;

const Logo = styled.img`
  margin-right: 0.75rem;
`;

const TextLogo = styled.img`
  filter: ${(props) => (props.isdarktheme ? `` : `invert(100%)`)};
`;

const MainNavList = styled.ul`
  display: flex;

  margin: 0;
  padding: 0;

  list-style-type: none;
`;

const StyledLink = styled(Link)`
  display: inline-block;

  margin: 0 0 0 1rem;
  padding: 0.5rem 2rem;

  color: ${colors.secondary500};
  font-size: 1.25rem;
  font-weight: 700;
  text-decoration: none;

  transition: 200ms;

  &:hover {
    color: ${colors.primary500};
  }

  &.highlighted-link {
    border-radius: 2rem;

    color: white;

    background-color: ${colors.primary500};

    &:hover {
      color: ${colors.neutral100};
    }
  }
`;
const ThemeImage = styled.img`
  max-width: 40px;
`;

const Toggle = styled.button`
  padding: 1rem;
  border: none;
  outline: none;
  font-size: 2rem;
  cursor: pointer;
  transition: 0.2s all ease-in-out;
  background: none;
  color: ${(props) => (!props.light ? '#eee' : '#333')};
  top: 0;
  right: 0;

  &:hover {
    transition: 0.2s all ease-in-out;
  }
`;

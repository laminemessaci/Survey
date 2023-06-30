import { useContext } from 'react';
import styled, { keyframes } from 'styled-components';

import { Card } from '../components/Card';
import { ThemeContext } from '../utils/context/providers';
import { colors } from '../utils/style/colors';


/**
 * Renders a list of freelancer profiles.
 * 
 * @param {Object[]} freelances - The list of freelancer profiles to render.
 * @returns {JSX.Element} - The rendered list of freelancer profiles.
 */
export function Freelances({ freelances }) {
  // Get the current theme from the context
  const { theme } = useContext(ThemeContext);

  return (
    <FreelancesContainer>
      {/* Render the main title */}
      <MainTitle>Trouvez votre prestataire</MainTitle>

      {/* Render the subtitle with different styles based on the theme */}
      <SubTitle isdarktheme={theme === 'dark'}>
        Chez Shiny nous réunissons les meilleurs profils pour vous.
      </SubTitle>

      {/* Render the list of freelancer profiles if there are any */}
      {freelances.length ? (
        <CardsContainer>
          {/* Map over the freelancer profiles and render a card for each */}
          {freelances.map((profile, index) => (
            <Card
              key={`${profile.name}-${index}`}
              name={profile.name}
              picture={profile.picture}
              jobTitle={profile.jobTitle}
            />
          ))}
        </CardsContainer>
      ) : (
        // Render a loader if there are no freelancer profiles
        <Loader data-testid="loader"/>
      )}
    </FreelancesContainer>
  );
}

const FreelancesContainer = styled.main`
  display: flex-wrap;
  justify-content: center;
  align-items: center;
`;

const MainTitle = styled.h1`
  text-align: center;
`;

const SubTitle = styled.p`
  margin: 1rem 0;
  text-align: center;
  color: ${(props) =>
    props.isdarktheme ? `${colors.neutral200}` : `${colors.secondary500}`};
  font-size: 1.25rem;
`;

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;

  margin: 4rem 16rem 0 16rem;
`;

const rotate = keyframes`
  to {
    transform: rotate(360deg);
  }
`;
const Loader = styled.p`
  width: 0;
  margin: 12.5rem auto;
  padding: 1.5rem;
  border: 0.5rem solid ${colors.primary500};
  border-bottom-color: transparent;
  border-radius: 50%;

  animation: ${rotate} 500ms infinite linear;
`;

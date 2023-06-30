import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { ThemeContext } from '../utils/context/providers';
import { colors } from '../utils/style/colors';
import DefaultPicture from '../assets/profile.png';

/**
 * Render a Card component with name, job title, and picture.
 * @param {string} name - The name of the person.
 * @param {string} jobTitle - The job title of the person.
 * @param {string} picture - The URL of the person's picture.
 * @returns {JSX.Element} The rendered Card component.
 */
export function Card({ name, jobTitle, picture }) {
  // Get the theme from the ThemeContext
  const { theme } = useContext(ThemeContext);

  // Set up state for favorite status
  const [isFavorite, setIsFavorite] = useState(false);

  // Generate a unique test ID for the star icon
  const cardTestId = `star-icon-${name.replace(' ', '')}`;

  // Handle click event for favorite icon
  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <CardContainer isdarktheme={theme === 'dark'}>
      {/* Render the job title */}
      <CardJobTitle isdarktheme={theme === 'dark'}>{jobTitle}</CardJobTitle>

      {/* Render the picture */}
      <CardPicture src={picture} alt={`Portrait de ${name}`} />

      {/* Render the favorite icon */}
      <CardStar
        onClick={handleFavoriteClick}
        isFavorite={isFavorite}
        isdarktheme={theme === 'dark'}
        data-testid={cardTestId}
      ></CardStar>

      {/* Render the name */}
      <CardName>{name}</CardName>
    </CardContainer>
  );
}

Card.propTypes = {
  name: PropTypes.string.isRequired,
  jobTitle: PropTypes.string.isRequired,
  picture: PropTypes.string,
};

Card.defaultProps = {
  picture: DefaultPicture,
};

const CardContainer = styled.div`
  position: relative;
  width: 17rem;
  margin: 1.5rem 2rem;
  padding: 2rem 3rem;
  border: 0.125rem solid transparent;
  border-radius: 0.5rem;

  text-align: center;

  background: ${(props) =>
    props.isdarktheme ? `${colors.neutral700}` : `${colors.neutral100}`};

  cursor: pointer;
  transition: 200ms;

  &:hover {
    border-color: ${colors.primary500};
    border-color: ${(props) =>
      props.isdarktheme ? `${colors.neutral200}` : `${colors.primary500}`};
  }
`;

const CardStar = styled.span`
  position: absolute;
  top: 6rem;
  right: 5rem;

  filter: ${(props) => (props.isFavorite ? `grayscale(0)` : `grayscale(1)`)};

  cursor: pointer;

  &:before {
    display: inline-block;

    padding: 0.5rem;
    border: 0.25rem solid transparent;
    border-radius: 50%;
    border-color: ${(props) =>
      props.isdarktheme ? `${colors.neutral700}` : `${colors.neutral100}`};

    color: ${(props) =>
      props.isFavorite ? `${colors.primary500}` : `${colors.neutral300}`};
    font-family: 'Font Awesome 5 Free';
    font-size: 2rem;
    font-weight: 900;

    background: ${colors.primary100};

    content: '\f005';
  }
`;

const CardJobTitle = styled.h2`
  min-height: 3.5rem;
  margin: 0;

  color: ${(props) =>
    props.isdarktheme ? `${colors.neutral200}` : `${colors.primary500}`};
  line-height: 1.4;
  font-size: 1.25rem;
  font-weight: 700;
  text-align: left;
`;

const CardPicture = styled.img`
  width: 9rem;
  height: 9rem;
  margin: 1rem 0 2rem 0;
  border-radius: 50%;
`;

const CardName = styled.h3`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
`;

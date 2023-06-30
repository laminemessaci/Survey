import { render, screen, waitFor } from '@testing-library/react';
import { ThemeContext } from '../utils/context/providers.jsx';
import { Freelances } from '../pages/Freelances.jsx';
import { getRandomProfiles } from '../utils/data/randomFreelance.js';

const getFreelancers = async()=>{
const profileQuantity = 4 + Math.ceil(Math.random() * 4);
  const freelances = await getRandomProfiles(profileQuantity);
  return freelances
 }
 
const freelances =  getFreelancers();
// Test case: renders the main title correctly
test('renders the main title', () => {
  // Arrange
 

  // Act
  render(
    <ThemeContext.Provider value={{ theme: 'light' }}>
      <Freelances freelances={freelances} />
    </ThemeContext.Provider>
  );

  // Assert
  expect(screen.getByText('Trouvez votre prestataire')).toBeInTheDocument();
});

// Test case: renders the subtitle correctly when the theme is dark
test('renders the subtitle with dark theme', () => {
  // Arrange
  const freelances = [];

  // Act
  render(
    <ThemeContext.Provider value={{ theme: 'dark' }}>
      <Freelances freelances={freelances} />
    </ThemeContext.Provider>
  );

  // Assert
  expect(
    screen.getByText(
      'Chez Shiny nous réunissons les meilleurs profils pour vous.'
    )
  ).toBeInTheDocument();
});

// Test case: renders the subtitle correctly when the theme is light
test('renders the subtitle with light theme', () => {
  // Arrange
  const freelances = [];

  // Act
  render(
    <ThemeContext.Provider value={{ theme: 'light' }}>
      <Freelances freelances={freelances} />
    </ThemeContext.Provider>
  );

  // Assert
  expect(
    screen.getByText(
      'Chez Shiny nous réunissons les meilleurs profils pour vous.'
    )
  ).toBeInTheDocument();
});

// Test case: renders the loader when there are no freelancer profiles
test('renders the loader when there are no freelancer profiles', () => {
  // Arrange
  const freelances = [];

  // Act
  render(
    <ThemeContext.Provider value={{ theme: 'light' }}>
      <Freelances freelances={freelances} />
    </ThemeContext.Provider>
  );

  // Assert
  expect(screen.getByTestId('loader')).toBeInTheDocument();
});

// Test case: renders the list of freelancer profiles when there are freelancer profiles
test('renders the list of freelancer profiles', () => {
  // Arrange
  const freelances = [
    {
      name: 'John Doe',
      picture: 'path/to/john-doe.png',
      jobTitle: 'Web Developer',
    },
    {
      name: 'Jane Smith',
      picture: 'path/to/jane-smith.png',
      jobTitle: 'Graphic Designer',
    },
  ];

  // Act
  render(
    <ThemeContext.Provider value={{ theme: 'light' }}>
      <Freelances freelances={freelances} />
    </ThemeContext.Provider>
  );

  // Assert
  expect(screen.getByText('John Doe')).toBeInTheDocument();
  expect(screen.getByText('Jane Smith')).toBeInTheDocument();
});

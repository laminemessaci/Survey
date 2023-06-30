import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { SurveyContext, ThemeContext } from '../utils/context/providers.jsx';
import { Header } from '../components/Header.jsx';




describe('Header', () => {
  test('renders logo and text logo', () => {
    render(
      <ThemeContext.Provider value={{ theme: 'dark' }}>
        <Header />
      </ThemeContext.Provider>
    );

    expect(screen.getByAltText('Shiny logo')).toBeInTheDocument();
    expect(screen.getByAltText('Agence Shiny')).toBeInTheDocument();
  });

  test('renders navigation links', () => {
    render(
      <ThemeContext.Provider value={{ theme: 'dark' }}>
        <Header />
      </ThemeContext.Provider>
    );

    expect(screen.getByText('Accueil')).toBeInTheDocument();
    expect(screen.getByText('Nos freelances')).toBeInTheDocument();
    expect(screen.getByText('Faire le test')).toBeInTheDocument();
  });

  test('scrolls to top and clears survey answers when "Faire le test" link is clicked', () => {
    const scrollToMock = jest.fn();
    const clearSurveyAnswersMock = jest.fn();

    render(
      <ThemeContext.Provider value={{ theme: 'dark' }}>
        <SurveyContext.Provider
          value={{ clearSurveyAnswers: clearSurveyAnswersMock }}
        >
          <Header />
        </SurveyContext.Provider>
      </ThemeContext.Provider>
    );

    fireEvent.click(screen.getByText('Faire le test'));

    expect(scrollToMock).toHaveBeenCalledWith(0, 0);
    expect(clearSurveyAnswersMock).toHaveBeenCalled();
  });
});

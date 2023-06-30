import { useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

import { ErrorMain } from '../components/ErrorMain';
import { SurveyContext, ThemeContext } from '../utils/context/providers';
import { useFetch } from '../utils/hooks/useFetch';
import { colors } from '../utils/style/colors';


// This function represents a survey component that allows users to answer questions
export function Survey() {
  // Import necessary hooks and contexts
  const navigate = useNavigate(); // Navigation hook
  const { theme } = useContext(ThemeContext); // Theme context
  const { surveyAnswers, saveSurveyAnswers } = useContext(SurveyContext); // Survey context

  // Fetch survey data from a JSON file
  const { data, isDataLoading, error } = useFetch(
    `${process.env.PUBLIC_URL}/data/sample-survey.json`
  );

  // Get the current question number from the URL parameters
  const { questionId } = useParams();
  const questionNumber = parseInt(questionId);

  // Handle error if there is an issue fetching the survey data
  if (error) {
    return (
      <ErrorMain errorText="Oups, il y a eu un problème pour récupérer les questions du test" />
    );
  }

  // Extract survey data and calculate necessary variables
  const survey = data;
  const lastQuestionNumber = survey.questions
    ? Object.keys(survey.questions).length
    : 1;
  const prevQuestionNumber = Math.max(1, questionNumber - 1);
  const nextQuestionNumber = Math.min(questionNumber + 1, lastQuestionNumber);

// Save the user's answer and navigate to the next question or results page
function saveUserAnswer(answer) {
  saveSurveyAnswers({ [questionNumber]: answer });

  const destination = questionNumber === lastQuestionNumber ? "/results" : `/faire-le-test/${nextQuestionNumber}`;
  window.scrollTo(0, 0);
  navigate(destination);
}

  // Render the survey component
  return (
    <SurveyContainer>
      <QuestionNumber>Question {questionNumber}</QuestionNumber>

      {isDataLoading ? (
        <Loader />
      ) : (
        <Question>
          {survey ? survey.questions[questionNumber].question : ''}
        </Question>
      )}

      <AnswersButtonsWrapper>
        <AnswerButton
          onClick={() => saveUserAnswer(true)}
          isSelected={surveyAnswers[questionNumber] === true}
          isDarkTheme={theme === 'dark'}
        >
          Oui
        </AnswerButton>
        <AnswerButton
          onClick={() => saveUserAnswer(false)}
          isSelected={surveyAnswers[questionNumber] === false}
          isDarkTheme={theme === 'dark'}
        >
          Non
        </AnswerButton>
      </AnswersButtonsWrapper>
      <SurveyNav>
        <SurveyNavLink
          className={`previousNavLink${
            questionNumber === 1 ? ` disabled` : ``
          }`}
          to={`/faire-le-test/${prevQuestionNumber}`}
          isDarkTheme={theme === 'dark'}
        >
          Précédente
        </SurveyNavLink>
        <SurveyNavLink
          className={`${
            questionNumber === lastQuestionNumber ? `disabled` : ``
          }`}
          to={`/faire-le-test/${nextQuestionNumber}`}
          isDarkTheme={theme === 'dark'}
        >
          Suivante
        </SurveyNavLink>
      </SurveyNav>
    </SurveyContainer>
  );
}

const SurveyContainer = styled.main`
  text-align: center;
`;

const QuestionNumber = styled.p`
  width: fit-content;
  margin: auto;
  border: 0.125rem solid transparent;
  border-bottom-color: ${colors.primary500};

  font-size: 1.5rem;
  font-weight: 700;
`;

const rotate = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Loader = styled.p`
  width: 0;
  margin: 2.5rem auto;
  padding: 1.5rem;
  border: 0.5rem solid ${colors.primary500};
  border-bottom-color: transparent;
  border-radius: 50%;

  animation: ${rotate} 500ms infinite linear;
`;

const Question = styled.h1`
  margin: 4rem 8rem;
  font-size: 1.25rem;
  font-weight: 400;
`;

const AnswersButtonsWrapper = styled.div`
  margin: 2rem 12rem;
`;

const AnswerButton = styled.button`
  min-width: 16rem;
  margin: 0.5rem 1.5rem;
  padding: 2rem 4rem;
  border: 0.125rem solid transparent;
  border-radius: 2rem;

  color: ${(props) => {
    return props.isSelected
      ? `white`
      : props.isDarkTheme
      ? `white`
      : `${colors.neutral900}`;
  }};

  font-size: 1.5rem;
  font-weight: 700;

  background: ${(props) => {
    return props.isSelected
      ? `${colors.primary500}`
      : props.isDarkTheme
      ? `${colors.neutral700}`
      : `${colors.neutral100}`;
  }};

  cursor: pointer;
  transition: 200ms;

  &:hover {
    border-color: ${colors.primary500};
    border-color: ${(props) =>
      props.isDarkTheme ? `${colors.neutral200}` : `${colors.primary500}`};
  }
`;

const SurveyNav = styled.div`
  display: flex;
  justify-content: center;
`;

const SurveyNavLink = styled(Link)`
  min-width: 7rem;
  margin: 0 0.5rem;
  padding: 0.5rem;

  color: ${(props) => (props.isDarkTheme ? `white` : `${colors.neutral900}`)};
  font-size: 1.1rem;
  text-align: left;
  text-decoration: underline;

  cursor: pointer;

  &.previousNavLink {
    text-align: right;
  }

  &.disabled {
    color: ${colors.neutral300};
    text-decoration: none;
  }
`;

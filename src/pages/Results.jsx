import { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

import { ErrorMain } from '../components/ErrorMain';
import { SurveyContext, ThemeContext } from '../utils/context/providers';
import { useFetch } from '../utils/hooks/useFetch';
import { colors } from '../utils/style/colors';
import NoSkillNeededIllustration from '../assets/no-skill-needed.png';

/**
 * Returns an array of needed skills based on user answers to a survey.
 *
 * @param {Object} survey - The survey object containing the questions and associated skills.
 * @param {Object} userAnswers - The user's answers to the survey questions.
 * @returns {Array} - An array of needed skills.
 */
export function determineNeededSkills(survey, userAnswers) {
  // Create a Set to store the needed skills
  const neededSkills = new Set();

  // Iterate over each user answer
  Object.entries(userAnswers).forEach(([questionKey, answer]) => {
    // If the answer is true, add the associated skills to the neededSkills set
    if (answer) {
      neededSkills.add(...survey.questions[questionKey].associatedSkills);
    }
  });

  // Convert the Set to an array and return it
  return Array.from(neededSkills);
}

export function Results() {
  const { theme } = useContext(ThemeContext);
  const { surveyAnswers } = useContext(SurveyContext);
  const { data, isDataLoading, error } = useFetch('../data/sample-survey.json');
  const survey = data;

  if (error) {
    return (
      <ErrorMain errorText="Oups, il y a eu un problème dans le traitement de vos réponses." />
    );
  }
  if(isDataLoading) return <Loader />

  const neededSkills = isDataLoading
    ? []
    : determineNeededSkills(survey, surveyAnswers);

  if (neededSkills.length === 0) {
    return (
      <NoSkillContainer isdarktheme={theme === 'dark'}>
        <NoSkillHeadline>Dommage...</NoSkillHeadline>
        <NoSkillIllustration src={NoSkillNeededIllustration} alt="Erreur 404" />
        <NoSkillText>
          Il semblerait que vous n'ayez besoin d'aucune compétence
        </NoSkillText>
        <CallToActionLink to="/freelances">
          Découvrez nos talents
        </CallToActionLink>
      </NoSkillContainer>
    );
  }

  const skillsSummary = neededSkills.join(', ');
  const skillsDetails = neededSkills.map(skill => ({
    jobTitle: skill,
    jobDescription: survey.jobs[skill],
  }));

  return (
    <ResultsContainer isdarktheme={theme === 'dark'}>
      <ResultsTitle>
        Les compétences dont vous avez besoin&nbsp;:{' '}
        <NeededSkillsSpan isdarktheme={theme === 'dark'}>
          {skillsSummary}
        </NeededSkillsSpan>
      </ResultsTitle>
      <CallToActionContainer>
        <CallToActionLink to="/freelances">
          Découvrez nos talents
        </CallToActionLink>
      </CallToActionContainer>
      <JobsDetails>
        {skillsDetails.map(skill => (
          <div key={`job-detail-${skill.jobTitle}`}>
            <JobTitle isdarktheme={theme === 'dark'}>
              {skill.jobTitle}
            </JobTitle>
            <JobDescription>{skill.jobDescription}</JobDescription>
          </div>
        ))}
      </JobsDetails>
    </ResultsContainer>
  );
}

const NoSkillContainer = styled.main`
  padding: 4rem;

  text-align: center;

  background: ${(props) =>
    props.isdarktheme ? `${colors.neutral700}` : `${colors.neutral100}`};
`;

const NoSkillHeadline = styled.p`
  margin: 1rem;

  font-size: 2rem;
  font-weight: 700;
`;

const NoSkillIllustration = styled.img`
  margin: 3rem 0;
`;

const NoSkillText = styled.p`
  font-size: 1.3rem;
`;

const ResultsContainer = styled.main`
  padding: 9rem 6rem;

  background: ${(props) =>
    props.isdarktheme ? `${colors.neutral700}` : `${colors.neutral100}`};
`;

const ResultsTitle = styled.h1`
  max-width: 50rem;
  margin: auto;

  line-height: 1.5;
  text-align: center;
`;

const NeededSkillsSpan = styled.span`
  color: ${(props) =>
    props.isdarktheme ? `${colors.neutral300}` : `${colors.primary500}`};
`;

const CallToActionContainer = styled.div`
  text-align: center;
`;

const CallToActionLink = styled(Link)`
  display: inline-block;

  margin: 2rem;
  padding: 0.5rem 4rem;
  border-radius: 2rem;

  color: white;
  font-size: 1.1rem;
  font-weight: 700;
  text-decoration: none;

  background: ${colors.primary500};
`;

const JobsDetails = styled.div`
  max-width: 60rem;
  margin: auto;
`;

const JobTitle = styled.h2`
  margin: 2rem 0 0.5rem 0;

  color: ${(props) =>
    props.isdarktheme ? `${colors.neutral300}` : `${colors.primary500}`};
`;

const JobDescription = styled.p`
  margin: 0;
  font-size: 1.3rem;
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

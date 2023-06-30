// Replace with the actual module path

import { determineNeededSkills } from "../pages/Results.jsx";

describe('determineNeededSkills', () => {
  it('should return an empty array when both survey and userAnswers are empty', () => {
    const survey = {};
    const userAnswers = {};

    const result = determineNeededSkills(survey, userAnswers);

    expect(result).toEqual([]);
  });

  it('should return an empty array when userAnswers are empty', () => {
    const survey = {
      questions: {
        question1: {
          associatedSkills: ['skill1', 'skill2'],
        },
        question2: {
          associatedSkills: ['skill3', 'skill4'],
        },
      },
    };
    const userAnswers = {};

    const result = determineNeededSkills(survey, userAnswers);

    expect(result).toEqual([]);
  });

  it('should return an empty array when all userAnswers are false', () => {
    const survey = {
      questions: {
        question1: {
          associatedSkills: ['skill1', 'skill2'],
        },
        question2: {
          associatedSkills: ['skill3', 'skill4'],
        },
      },
    };
    const userAnswers = {
      question1: false,
      question2: false,
    };

    const result = determineNeededSkills(survey, userAnswers);

    expect(result).toEqual([]);
  });

  it('should return an array of associated skills when userAnswers are true', () => {
    const survey = {
      questions: {
        question1: {
          associatedSkills: ['skill1', 'skill2'],
        },
        question2: {
          associatedSkills: ['skill3', 'skill4'],
        },
        question3: {
          associatedSkills: ['skill5', 'skill6'],
        },
      },
    };
    const userAnswers = {
      question1: true,
      question2: false,
      question3: true,
    };

    const result = determineNeededSkills(survey, userAnswers);
    console.debug(result)

    expect(result).toEqual(['skill1', 'skill5',]);
  });
});

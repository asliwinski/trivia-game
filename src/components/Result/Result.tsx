import React from 'react';
import { Question } from '../../types';
import { StyledButton } from '../Button/StyledButton';
import styled from 'styled-components';

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export function getAnsweredCorrectly(
  results: boolean[],
  questions: Question[]
) {
  return results.reduce((acc: number, curr: boolean, index) => {
    if (typeof curr !== 'undefined' && questions[index].correct_answer === curr)
      acc++;

    return acc;
  }, 0);
}

export function getForm(answeredCorrectly: number) {
  return answeredCorrectly === 1 ? '' : 's';
}

type ResultProps = {
  results: boolean[];
  questions: Question[];
  setGameStarted: Function;
  setShowResult: Function;
  clearAnswers: Function;
};

export default function Result({
  results,
  questions,
  setGameStarted,
  setShowResult,
  clearAnswers,
}: ResultProps) {
  const answeredCorrectly = getAnsweredCorrectly(results, questions);

  const handleClick = () => {
    clearAnswers();
    setGameStarted(false);
    setShowResult(false);
  };

  return (
    <div>
      <h1>Results:</h1>
      <p>
        {`You answered correctly to ${answeredCorrectly} question${getForm(
          answeredCorrectly
        )}.`}
      </p>
      <ButtonContainer>
        <StyledButton onClick={handleClick}>Try again</StyledButton>
      </ButtonContainer>
    </div>
  );
}

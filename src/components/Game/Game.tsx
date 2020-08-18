import React, { useState } from 'react';
import { Question } from '../../types';
import styled from 'styled-components';
import Navigation from '../Navigation';
import { StyledButton } from '../Button/StyledButton';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: center;
`;

type GameProps = {
  questions: Question[];
  submitAnswer: Function;
  setShowResult: Function;
  results: boolean[];
};

export default function Game({
  questions,
  submitAnswer,
  setShowResult,
  results,
}: GameProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleClick = (answer: boolean) => () => {
    submitAnswer(currentQuestion, answer);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prevState) => prevState + 1);
    }
  };

  const handleClickFinish = () => setShowResult(true);

  const answer =
    typeof results[currentQuestion] !== 'undefined'
      ? results[currentQuestion]
      : null;

  return (
    <Navigation
      currentItem={currentQuestion}
      setCurrentItem={setCurrentQuestion}
      itemCount={10}
    >
      <Container>
        <h1>{`Question ${currentQuestion + 1}:`}</h1>
        <p>{questions[currentQuestion].question}</p>
        <Buttons>
          <StyledButton isSet={answer === true} onClick={handleClick(true)}>
            True
          </StyledButton>
          <StyledButton isSet={answer === false} onClick={handleClick(false)}>
            False
          </StyledButton>
        </Buttons>
        {currentQuestion === questions.length - 1 && (
          <StyledButton onClick={handleClickFinish}>Finish</StyledButton>
        )}
      </Container>
    </Navigation>
  );
}

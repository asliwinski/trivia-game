import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import Button from '../Button';
import { useQuestions } from './hooks/useQuestions';

const App = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StartButton = styled(Button)`
  border: none;
  width: 107px;
  height: 50px;
  font-size: 20px;
  border-radius: 10px;
  margin-top: 20px;

  :hover {
    ${({ disabled }: { disabled: boolean }) =>
      !disabled &&
      css`
        background-color: darkgray;
      `}
  }
  transition: background-color 0.3s cubic-bezier(0.3, 0, 0.4, 1);
`;

type LandingProps = {
  setGameStarted: Function;
  setQuestions: Function;
};

const ErrorMessage = styled.div`
  color: red;
  margin-top: 20px;
`;

export default function Home({ setGameStarted, setQuestions }: LandingProps) {
  const { isLoading, error, getQuestions, data } = useQuestions();

  const handleClick = () => {
    getQuestions();
  };

  useEffect(() => {
    if (!error && data) {
      setQuestions(data);
      setGameStarted(true);
    }
  });

  return (
    <App>
      <h1>Welcome to the Trivia Challenge!</h1>
      <p>You will be presented 10 True or False questions.</p>
      <p>Can you score 100%?</p>
      <StartButton onClick={handleClick} disabled={isLoading}>
        BEGIN
      </StartButton>
      {error && (
        <ErrorMessage>
          Problem loading questions. Please try again.
        </ErrorMessage>
      )}
    </App>
  );
}

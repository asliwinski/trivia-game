import React from 'react';
import styled from 'styled-components';
import Home from '../Home';
import Game from '../Game';
import Result from '../Result';
import { useAppState } from './hooks/useAppState';

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: auto;
  width: 50%;
  font-family: Arial, sans-serif;
`;

function App() {
  const {
    shouldShowResult,
    results,
    questions,
    isGameStarted,
    submitAnswer,
    setShowResult,
    setGameStarted,
    setQuestions,
    clearAnswers,
  } = useAppState();

  function render() {
    switch (true) {
      case shouldShowResult:
        return (
          <Result
            results={results}
            questions={questions}
            setGameStarted={setGameStarted}
            setShowResult={setShowResult}
            clearAnswers={clearAnswers}
          />
        );
      case isGameStarted:
        return (
          <Game
            questions={questions}
            submitAnswer={submitAnswer}
            setShowResult={setShowResult}
            results={results}
          />
        );
      default:
        return (
          <Home setGameStarted={setGameStarted} setQuestions={setQuestions} />
        );
    }
  }

  return <Container>{render()}</Container>;
}

export default App;

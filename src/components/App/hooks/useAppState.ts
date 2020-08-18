import { useReducer, useState } from 'react';
import { Question } from '../../../types';

type State = boolean[];

const ans = 'answer';
const clear = 'clear';

type AppState = {
  shouldShowResult: boolean;
  results: State;
  questions: Question[];
  isGameStarted: boolean;
  submitAnswer: Function;
  setShowResult: Function;
  setGameStarted: Function;
  setQuestions: Function;
  clearAnswers: Function;
};

type Action =
  | { type: 'answer'; questionId: number; answer: boolean }
  | { type: 'clear' };

const initialState: State = [];

export function useAppState(): AppState {
  const [isGameStarted, setGameStarted] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [results, dispatch] = useReducer(reducer, initialState);
  const [shouldShowResult, setShowResult] = useState(false);

  function reducer(state: State, action: Action): State {
    switch (action.type) {
      case ans:
        const { answer, questionId } = action;
        const stateCopy = [...state];
        stateCopy[questionId] = answer;
        return stateCopy;
      case clear:
        return initialState;
      default:
        throw new Error('unrecognized action');
    }
  }

  const submitAnswer = (questionId: number, answer: boolean) => {
    dispatch({ type: ans, questionId, answer });
  };

  const clearAnswers = () => {
    dispatch({ type: clear });
  };

  return {
    shouldShowResult,
    results,
    questions,
    isGameStarted,
    submitAnswer,
    setShowResult,
    setGameStarted,
    setQuestions,
    clearAnswers,
  };
}

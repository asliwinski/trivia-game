import { renderHook, act } from '@testing-library/react-hooks';
import { useAppState } from './hooks/useAppState';

const question = {
  category: 'Vehicles',
  correct_answer: true,
  difficulty: 'hard',
  incorrect_answers: [false],
  question:
    'In 1993 Swedish car manufacturer Saab experimented with replacing the steering wheel with a joystick in a Saab 9000.',
  type: 'boolean',
};

test('useAppState hook', () => {
  const { result } = renderHook(() => useAppState());

  // assert initial state
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
  } = result.current;
  expect(shouldShowResult).toBe(false);
  expect(results).toEqual([]);
  expect(questions).toEqual([]);
  expect(isGameStarted).toBe(false);
  expect(submitAnswer).toBeInstanceOf(Function);
  expect(setShowResult).toBeInstanceOf(Function);
  expect(setGameStarted).toBeInstanceOf(Function);
  expect(setQuestions).toBeInstanceOf(Function);
  expect(clearAnswers).toBeInstanceOf(Function);

  // set questions
  act(() => {
    setQuestions([question]);
  });

  // assert new state
  expect(result.current.questions).toEqual([question]);

  // start game
  act(() => {
    setGameStarted(true);
  });

  // assert new state
  expect(result.current.isGameStarted).toBe(true);

  // set show result
  act(() => {
    setShowResult(true);
  });

  // assert new state
  expect(result.current.shouldShowResult).toBe(true);

  // submit answer
  act(() => {
    submitAnswer(1, true);
  });

  // assert new state
  expect(result.current.results).toEqual([undefined, true]);

  // clear questions
  act(() => {
    clearAnswers();
  });

  // assert new state
  expect(result.current.results).toEqual([]);
});

import React from 'react';
import { render, waitFor, fireEvent, screen } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';
import Home from './Home';
import { useQuestions } from './hooks/useQuestions';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { QuestionFromApi } from '../../types';
import '@testing-library/jest-dom/extend-expect';

const question: QuestionFromApi = {
  category: 'Vehicles',
  correct_answer: 'True',
  difficulty: 'hard',
  incorrect_answers: ['False'],
  question:
    'In 1993 Swedish car manufacturer Saab experimented with replacing the steering wheel with a joystick in a Saab 9000.',
  type: 'boolean',
};

const server = setupServer(
  // Describe the requests to mock.
  rest.get(
    'https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean',
    (req, res, ctx) => {
      return res(ctx.json({ results: [question] }));
    }
  )
);

beforeAll(() => {
  // Establish requests interception layer before all tests.
  server.listen();
});

afterAll(() => {
  // Clean up after all tests are done, preventing this
  // interception layer from affecting irrelevant tests.
  server.close();
});

test('renders text elements correctly', () => {
  const { getByText } = render(
    <Home setGameStarted={() => {}} setQuestions={() => {}} />
  );
  let element = getByText(/Welcome to the Trivia Challenge!/);
  expect(element).toBeInTheDocument();
  element = getByText(/You will be presented 10 True or False questions./);
  expect(element).toBeInTheDocument();
  element = getByText(/Can you score 100%?/);
  expect(element).toBeInTheDocument();
});

test('renders start button correctly', () => {
  const { getByText } = render(
    <Home setGameStarted={() => {}} setQuestions={() => {}} />
  );
  let element = getByText(/BEGIN/);
  expect(element).toBeInTheDocument();
  expect(element).toBeInstanceOf(HTMLButtonElement);
});

test('useQuestions hook', async () => {
  const { result, waitForNextUpdate } = renderHook(() => useQuestions());

  // assert initial state
  const { isLoading, error, getQuestions, data } = result.current;
  expect(isLoading).toBe(false);
  expect(error).toBeUndefined();
  expect(data).toBeUndefined();
  expect(getQuestions).toBeInstanceOf(Function);

  // get questions
  act(() => {
    getQuestions();
  });

  await waitForNextUpdate();

  expect(result.current.data?.length).toEqual(1);
});

test('API failure', async () => {
  server.use(
    rest.get(
      'https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean',
      (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({ message: 'Internal Server Error' })
        );
      }
    )
  );
  render(<Home setGameStarted={() => {}} setQuestions={() => {}} />);

  fireEvent.click(screen.getByText('BEGIN'));

  let errorMessage;

  await waitFor(
    () =>
      (errorMessage = screen.getByText(
        'Problem loading questions. Please try again.'
      ))
  );

  expect(errorMessage).toBeInTheDocument();
  expect(errorMessage).toBeInstanceOf(HTMLDivElement);
});

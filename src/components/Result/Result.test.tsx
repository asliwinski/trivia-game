import React from 'react';
import {
  waitFor,
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import Result from './Result';
import { getAnsweredCorrectly, getForm } from './Result';
import { Question } from '../../types';

const questions: Question[] = [
  {
    category: 'Vehicles',
    type: 'boolean',
    difficulty: 'hard',
    question:
      'In 1993 Swedish car manufacturer Saab experimented with replacing the steering wheel with a joystick in a Saab 9000.',
    correct_answer: true,
    incorrect_answers: [false],
  },
  {
    category: 'History',
    type: 'boolean',
    difficulty: 'hard',
    question: 'The Kingdom of Prussia briefly held land in Estonia.',
    correct_answer: false,
    incorrect_answers: [true],
  },
  {
    category: 'Entertainment: Video Games',
    type: 'boolean',
    difficulty: 'hard',
    question:
      'In "Metal Gear Solid 2", you will see through the eyes of Psycho Mantis if you go first person during his boss fight.',
    correct_answer: true,
    incorrect_answers: [false],
  },
  {
    category: 'Science: Mathematics',
    type: 'boolean',
    difficulty: 'hard',
    question:
      "If you could fold a piece of paper in half 50 times, its' thickness will be 3/4th the distance from the Earth to the Sun.",
    correct_answer: true,
    incorrect_answers: [false],
  },
  {
    category: 'History',
    type: 'boolean',
    difficulty: 'hard',
    question: 'The USS Missouri (BB-63) last served in the Korean War.',
    correct_answer: false,
    incorrect_answers: [true],
  },
  {
    category: 'Politics',
    type: 'boolean',
    difficulty: 'hard',
    question:
      "Nazi Germany surrendered on Harry Truman's birthday while he was president.",
    correct_answer: true,
    incorrect_answers: [false],
  },
  {
    category: 'Science: Mathematics',
    type: 'boolean',
    difficulty: 'hard',
    question: 'In Topology, the complement of an open set is a closed set.',
    correct_answer: true,
    incorrect_answers: [false],
  },
  {
    category: 'History',
    type: 'boolean',
    difficulty: 'hard',
    question:
      "During the Winter War, the amount of Soviet Union soliders that died or went missing was five times more than Finland's.",
    correct_answer: true,
    incorrect_answers: [false],
  },
  {
    category: 'Entertainment: Film',
    type: 'boolean',
    difficulty: 'hard',
    question:
      'The weapon Clint Eastwood uses in "Dirty Harry" was a .44 Automag.',
    correct_answer: false,
    incorrect_answers: [true],
  },
  {
    category: 'Art',
    type: 'boolean',
    difficulty: 'hard',
    question:
      "The Statue of Liberty's official name is “Liberty Enlightening the World”.",
    correct_answer: true,
    incorrect_answers: [false],
  },
];
const results = [
  true,
  true,
  true,
  false,
  false,
  false,
  false,
  true,
  false,
  true,
];

test('calculates correctly the right answers', () => {
  const result = getAnsweredCorrectly(results, questions);
  expect(result).toEqual(6);
});

test('calculates correct word form (plural/singular)', () => {
  const result = getForm(1);
  expect(result).toEqual('');

  const result2 = getForm(2);
  expect(result2).toEqual('s');
});

test('renders the title as h1', () => {
  const testMessage = 'Results:';
  const { container } = render(
    <Result
      questions={questions}
      results={results}
      setGameStarted={() => {}}
      setShowResult={() => {}}
      clearAnswers={() => {}}
    />
  );
  const result = screen.queryByText(testMessage);
  expect(result).toBeInTheDocument();
  expect(result).toBeInstanceOf(HTMLHeadingElement);
  const element = container.querySelector('h1');
  expect(element).toBeInTheDocument();
});

test('renders the message as paragraph', () => {
  const testMessage = 'You answered correctly to 6 questions.';
  render(
    <Result
      questions={questions}
      results={results}
      setGameStarted={() => {}}
      setShowResult={() => {}}
      clearAnswers={() => {}}
    />
  );
  const result = screen.queryByText(testMessage);
  expect(result).toBeInTheDocument();
  expect(result).toBeInstanceOf(HTMLParagraphElement);
});

test('resets game', () => {
  const clearAnswers = jest.fn().mockName('clearAnswers');
  const setGameStarted = jest.fn().mockName('setGameStarted');
  const setShowResults = jest.fn().mockName('setShowResults');

  const { getByText } = render(
    <Result
      questions={questions}
      results={results}
      setGameStarted={setGameStarted}
      setShowResult={setShowResults}
      clearAnswers={clearAnswers}
    />
  );
  const button = getByText('Try again');

  button.click();

  expect(clearAnswers).toHaveBeenCalled();
  expect(setGameStarted).toHaveBeenCalledWith(false);
  expect(setShowResults).toHaveBeenCalledWith(false);
});

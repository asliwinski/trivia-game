import Game from './Game';
import { render } from '@testing-library/react';
import React from 'react';
import { Question } from '../../types';

const questions: Question[] = [
  {
    category: 'Vehicles',
    correct_answer: true,
    difficulty: 'hard',
    incorrect_answers: [false],
    question:
      'In 1993 Swedish car manufacturer Saab experimented with replacing the steering wheel with a joystick in a Saab 9000.',
    type: 'boolean',
  },
];

test('renders elements correctly', () => {
  const { getByText } = render(
    <Game
      questions={questions}
      showResult={() => {}}
      results={[]}
      submitAnswer={() => {}}
    />
  );
  let element = getByText(/Question 1:/);
  expect(element).toBeInTheDocument();
  expect(element).toBeInstanceOf(HTMLHeadingElement);

  element = getByText(
    /In 1993 Swedish car manufacturer Saab experimented with replacing the steering wheel with a joystick in a Saab 9000./
  );
  expect(element).toBeInTheDocument();
  expect(element).toBeInstanceOf(HTMLParagraphElement);

  element = getByText(/True/);
  expect(element).toBeInTheDocument();
  expect(element).toBeInstanceOf(HTMLButtonElement);

  element = getByText(/False/);
  expect(element).toBeInTheDocument();
  expect(element).toBeInstanceOf(HTMLButtonElement);
});

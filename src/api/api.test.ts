import api, { convertStringBooleans } from './api';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { QuestionFromApi, Question } from '../types';

const question: QuestionFromApi = {
  category: 'Vehicles',
  correct_answer: 'True',
  difficulty: 'hard',
  incorrect_answers: ['False'],
  question:
    'In 1993 Swedish car manufacturer Saab experimented with replacing the steering wheel with a joystick in a Saab 9000.',
  type: 'boolean',
};

const questionReturned: Question = {
  category: 'Vehicles',
  correct_answer: true,
  difficulty: 'hard',
  incorrect_answers: [false],
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

test('convertStringBooleans', () => {
  const yes = convertStringBooleans('True');

  expect(yes).toEqual(true);

  const no = convertStringBooleans('False');

  expect(no).toEqual(false);

  // @ts-ignore value intentionally incorrect
  expect(() => convertStringBooleans(5)).toThrow();
  // @ts-ignore value intentionally incorrect
  expect(() => convertStringBooleans('text')).toThrow();
});

test('fetchQuestions', async () => {
  const results = await api.fetchQuestions();

  expect(results).toEqual([questionReturned]);
});

test('fetchQuestions failure', async () => {
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

  await expect(api.fetchQuestions()).rejects.toThrow();
});

import he from 'he';
import { Question, QuestionFromApi, Answer } from '../types';

export function convertStringBooleans(value: Answer): boolean {
  switch (value) {
    case 'True':
      return true;
    case 'False':
      return false;
    default:
      throw new Error('invalid argument');
  }
}

export default {
  fetchQuestions: async function (): Promise<Question[]> {
    const res = await fetch(
      'https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean'
    );

    if (res?.ok) {
      const response = await res.json();
      const { results }: { results: QuestionFromApi[] } = response;

      return results.map((q) => ({
        ...q,
        question: he.decode(q.question),
        correct_answer: convertStringBooleans(q.correct_answer),
        incorrect_answers: q.incorrect_answers.map(convertStringBooleans),
      }));
    } else {
      throw new Error('problem retrieving data');
    }
  },
};

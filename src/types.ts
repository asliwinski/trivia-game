export type Answer = 'True' | 'False';

type AbstractQuestion = {
  category: string;
  type: string;
  difficulty: string;
  question: string;
};

export type QuestionFromApi = AbstractQuestion & {
  correct_answer: Answer;
  incorrect_answers: Answer[];
};

export type Question = AbstractQuestion & {
  correct_answer: boolean;
  incorrect_answers: boolean[];
};

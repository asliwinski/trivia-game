import { useReducer } from 'react';
import api from '../../../api/api';
import { Question } from '../../../types';

const loading = 'loading';
const success = 'success';
const failure = 'failure';

type State = {
  isLoading: boolean;
  error?: string | null;
  data?: Question[];
};

type QuestionsHook = State & { getQuestions: Function };

type Action =
  | { type: 'loading' }
  | { type: 'success'; data: Question[] }
  | { type: 'failure'; error: string };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case loading:
      return { ...state, isLoading: true };
    case failure:
      return { ...state, isLoading: false, error: action.error };
    case success:
      return { ...state, isLoading: false, error: null, data: action.data };
    default:
      throw new Error('unrecognized action');
  }
}

const initialState: State = { isLoading: false };

export function useQuestions(): QuestionsHook {
  const [state, dispatch] = useReducer(reducer, initialState);

  async function getQuestions() {
    dispatch({ type: loading });

    try {
      const data = await api.fetchQuestions();
      dispatch({ type: success, data });
    } catch (error) {
      dispatch({ type: failure, error });
    }
  }

  const { isLoading, error, data } = state;

  return { isLoading, error, getQuestions, data };
}

import { useReducer } from 'react';

import type { Action, FromLanguage, Language, State } from '../types';
import { AUTO_LANGUAGE } from '../constants';

const initialState: State = {
  fromLanguage: 'auto',
  toLanguage: 'en',
  fromText: '',
  result: '',
  loading: false,
};

function reducer(state: State, action: Action): State {
  const { type } = action;

  switch (type) {
    case 'INTERCHANGE_LANGUAGES':
      if (state.fromLanguage === AUTO_LANGUAGE) {
        return state;
      }

      return {
        ...state,
        fromLanguage: state.toLanguage,
        toLanguage: state.fromLanguage,
      };
    case 'SET_FROM_LANGUAGE':
      return {
        ...state,
        fromLanguage: action.payload,
      };
    case 'SET_TO_LANGUAGE':
      return {
        ...state,
        toLanguage: action.payload,
      };
    case 'SET_FROM_TEXT':
      return {
        ...state,
        loading: true,
        fromText: action.payload,
        result: '',
      };
    case 'SET_RESULT':
      return {
        ...state,
        loading: false,
        result: action.payload,
      };
    default:
      return state;
  }
}

export function useStore() {
  const [{ fromLanguage, toLanguage, fromText, result, loading }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  const interchangeLanguages = () => {
    dispatch({ type: 'INTERCHANGE_LANGUAGES' });
  };

  const setFromLanguage = (language: FromLanguage) => {
    dispatch({ type: 'SET_FROM_LANGUAGE', payload: language });
  };

  const setToLanguage = (language: Language) => {
    dispatch({ type: 'SET_TO_LANGUAGE', payload: language });
  };

  const setFromText = (text: string) => {
    dispatch({ type: 'SET_FROM_TEXT', payload: text });
  };

  const setResult = (result: string) => {
    dispatch({ type: 'SET_RESULT', payload: result });
  };

  return {
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading,
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult,
  };
}

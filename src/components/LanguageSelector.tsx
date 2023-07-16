import React from 'react';
import { Form } from 'react-bootstrap';

import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from '../constants';
import { type FromLanguage, type Language, SectionType } from '../types.d';

type Props =
  | {
      type: SectionType.From;
      value: FromLanguage;
      onChange: (language: FromLanguage) => void;
    }
  | { type: SectionType.To; value: Language; onChange: (language: Language) => void };

export const LanguageSelector: React.FC<Props> = ({ type, value, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as Language);
  };

  return (
    <Form.Select value={value} aria-label='Selecciona el idioma' onChange={handleChange}>
      {type === SectionType.From && (
        <option value={AUTO_LANGUAGE}>Detectar idioma</option>
      )}
      {Object.entries(SUPPORTED_LANGUAGES).map(([key, literal]) => (
        <option value={key} key={key}>
          {literal}
        </option>
      ))}
    </Form.Select>
  );
};

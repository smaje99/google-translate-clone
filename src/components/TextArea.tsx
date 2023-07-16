import { Form } from 'react-bootstrap';

import { SectionType } from '../types.d';
import React from 'react';

type Props = {
  type: SectionType;
  loading?: boolean;
  onChange: (value: string) => void;
  value: string;
};

const commonStyles = { height: '200px', border: 0, resize: undefined };

function getPlaceholder(type: SectionType, loading: boolean) {
  if (type === SectionType.From) {
    return 'Introducir texto';
  }

  if (loading) {
    return 'Traduciendo...';
  }

  return 'Traducir';
}

export const TextArea: React.FC<Props> = ({ type, loading = false, onChange, value }) => {
  const styles =
    type === SectionType.From
      ? commonStyles
      : { ...commonStyles, backgroundColor: '#f5f5f5' };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };

  return (
    <Form.Control
      as='textarea'
      value={value}
      onChange={handleChange}
      placeholder={getPlaceholder(type, loading)}
      autoFocus={type === SectionType.From}
      style={styles}
    />
  );
};

import { useEffect } from 'react';
import { Container, Row, Col, Button, Stack } from 'react-bootstrap';

import { AUTO_LANGUAGE } from './constants';
import { ArrowsIcon } from './components/Icons';
import { LanguageSelector } from './components/LanguageSelector';
import { TextArea } from './components/TextArea';
import { useStore } from './hooks/useStore';
import { SectionType } from './types.d';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { translate } from './services/translate';

function App() {
  const {
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
  } = useStore();

  useEffect(() => {
    if (fromText.length === 0) {
      return;
    }

    translate({ fromLanguage, toLanguage, text: fromText })
      .then((result) => {
        if (result == null) {
          return;
        }

        setResult(result);
      })
      .catch((error) => {
        setResult('Error');
        console.error({ error });
      });
  }, [fromText, fromLanguage, toLanguage]);

  return (
    <Container fluid>
      <h1 className='text-center pb-5'>Google Translate</h1>

      <Row>
        <Col>
          <Stack gap={2}>
            <LanguageSelector
              type={SectionType.From}
              value={fromLanguage}
              onChange={setFromLanguage}
            />
            <TextArea type={SectionType.From} value={fromText} onChange={setFromText} />
          </Stack>
        </Col>
        <Col xs='auto'>
          <Button
            variant='link'
            onClick={interchangeLanguages}
            disabled={fromLanguage === AUTO_LANGUAGE || toLanguage === fromLanguage}
          >
            <ArrowsIcon />
          </Button>
        </Col>
        <Col>
          <Stack gap={2}>
            <LanguageSelector
              type={SectionType.To}
              value={toLanguage}
              onChange={setToLanguage}
            />
            <TextArea
              type={SectionType.To}
              value={result}
              onChange={setResult}
              loading={loading}
            />
          </Stack>
        </Col>
      </Row>
    </Container>
  );
}

export default App;

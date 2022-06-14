import { AnswerPanel } from '@conjug8/client/components';
import { Container } from '@conjug8/client/shared';
import { Dictionary } from '@conjug8/server/dictionary';
import { useQuery } from 'react-query';
import styled from 'styled-components';

const Logo = styled.div`
  font-family: 'Italiana', serif;
  font-size: 40px;
  text-align: center;
  margin: 4rem 0;
`;

const Page = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const QuestionSection = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  .word {
    font-weight: 700;
  }

  .tense {
    font-weight: 300;
    margin-bottom: 10px;
  }
`;

const Control = styled.button`
  background: #13678a !important;
  border-radius: 15px;
  padding: 10px 30px;
  color: white;
  margin-top: 1rem;
`;

enum Tense {
  Conditional = 'Conditional',
  Conditional_Perfect = 'Conditional Perfect',
  Future = 'Future',
  Future_Perfect = 'Future Perfect',
  Imperfect = 'Imperfect',
  Past_Perfect = 'Past Perfect',
  Present = 'Present',
  Present_Perfect = 'Present Perfect',
  Preterite = 'Preterite',
  PreteriteA = 'Preterite (Archaic)',
}

enum Mood {
  Imperative_Affirmative = 'Imperative Affirmative',
  Imperative_Negative = 'Imperative Negative',
  Indicative = 'Indicative',
  Subjunctive = 'Subjunctive',
}

function randomEnum<T>(anEnum: T): T[keyof T] {
  const enumValues = Object.keys(anEnum).map((_, i) => i);

  const randomIndex = Math.floor(Math.random() * enumValues.length);
  return anEnum[Object.keys(anEnum)[randomIndex]];
}

export function Index() {
  const url = new URL('http://localhost:3333/api/dictionary/random');
  url.searchParams.append('mood', 'Indicative' /* randomEnum(Mood) */);
  url.searchParams.append('tense', 'Present' /* randomEnum(Tense) */);
  // console.log(url);

  const { isLoading, error, data, refetch } = useQuery<Dictionary>(
    'verbData',
    () => fetch(url).then((res) => res.json()),
    {
      refetchOnWindowFocus: false,
    }
  );

  return (
    <Container>
      <Logo>Conjug8</Logo>
      {!isLoading && (
        <div>
          <QuestionSection>
            <span className="word">{data.infinitive}</span>
            <span className="meaning">{data.infinitive_english}</span>
            <span className="tense">
              {data.tense_english}/{data.tense}
            </span>
          </QuestionSection>
          <Page>
            <AnswerPanel dictionary={data} />
            <Control
              className="bg-red-500"
              onClick={() => refetch()}
              type="button"
            >
              Next
            </Control>
          </Page>
        </div>
      )}
    </Container>
  );
}

export default Index;

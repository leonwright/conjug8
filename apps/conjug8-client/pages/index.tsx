import { AnswerPanel } from '@conjug8/client/components';
import { Container } from '@conjug8/client/shared';
import { Dictionary, TenseMood } from '@conjug8/server/dictionary';
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

  .meaning {
    margin-bottom: 20px;
  }

  .tense {
    font-weight: 300;
    margin-bottom: 2px;
  }

  .mood {
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

export function Index() {
  const { isLoading, data, refetch } = useQuery<Dictionary>(
    'verbData',
    async () => {
      const parametersUrl = new URL(
        'http://localhost:3333/api/dictionary/random/parameters'
      );
      const url = new URL('http://localhost:3333/api/dictionary/random');
      const paramsResult = await (await fetch(parametersUrl)).json();
      url.searchParams.append('mood', paramsResult.mood);
      url.searchParams.append('tense', paramsResult.tense);
      const res = fetch(url).then((res) => res.json());
      return res;
    },
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
              Tense:{' '}
              <b>
                {data.tense_english}/{data.tense}
              </b>
            </span>
            <span className="mood">
              Mood: <b>{data.mood_english}</b>
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

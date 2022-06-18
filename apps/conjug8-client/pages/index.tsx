import { AnswerPanel } from '@conjug8/client/components';
import { Container } from '@conjug8/client/shared';
import { Dictionary, TenseMood } from '@conjug8/server/dictionary';
import { useQuery } from 'react-query';
import styled from 'styled-components';

interface ButtonProps {
  color: string;
}

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

const ControlSection = styled.div``;

const Control = styled.button<ButtonProps>`
  background: ${(props) => props.color} !important;
  border-radius: 15px;
  padding: 10px 30px;
  color: white;
  margin-top: 1rem;
  margin-right: 1rem;

  &:last-child {
    margin-right: 1rem;
  }
`;

export function Index() {
  const { isLoading, data, refetch } = useQuery<Dictionary>(
    'verbData',
    async () => {
      const parametersUrl = new URL(
        `${process.env.NX_BASE_URL}${process.env.NX_GET_RANDOM_PARAMS_ENDPOINT}`
      );
      const url = new URL(
        `${process.env.NX_BASE_URL}${process.env.NX_GET_RANDOM_VERB_ENDPOINT}`
      );
      const paramsResult: TenseMood = await (await fetch(parametersUrl)).json();
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
              Mood:{' '}
              <b>
                {data.mood_english}/{data.mood}
              </b>
            </span>
          </QuestionSection>
          <Page>
            <AnswerPanel dictionary={data} />
            <ControlSection>
              <Control color="#13678a" onClick={() => refetch()} type="button">
                Next
              </Control>
              <Control color="#45C4B0" type="button">
                Settings
              </Control>
              <Control color="#9AEBA3" type="button">
                Help
              </Control>
            </ControlSection>
          </Page>
        </div>
      )}
    </Container>
  );
}

export default Index;

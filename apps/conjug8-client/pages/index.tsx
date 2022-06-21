import {
  helpDialogState,
  settingsDialogState,
  settingsState,
} from '@conjug8/client/atoms';
import {
  AnswerPanel,
  Blue,
  Button,
  Green,
  HelpDialog,
  SettingsDialog,
  Teal,
} from '@conjug8/client/components';
import { Container } from '@conjug8/client/shared';
import { Dictionary, TenseMood } from '@conjug8/server/dictionary';
import { useQuery } from 'react-query';
import { useSetRecoilState, useRecoilValue } from 'recoil';
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

const ControlSection = styled.div``;

export function Index() {
  const setHelpIsOpen = useSetRecoilState(helpDialogState);
  const setSettingIsOpen = useSetRecoilState(settingsDialogState);
  const applicationSettings = useRecoilValue(settingsState);
  const { isLoading, data, refetch } = useQuery<Dictionary>(
    'verbData',
    async () => {
      const parametersUrl = new URL(
        `${process.env.NX_BASE_URL}${process.env.NX_GET_RANDOM_PARAMS_ENDPOINT}`
      );
      const url = new URL(
        `${process.env.NX_BASE_URL}${process.env.NX_GET_RANDOM_VERB_ENDPOINT}`
      );

      let paramsResult: TenseMood;
      if (applicationSettings.params === null) {
        paramsResult = await (await fetch(parametersUrl)).json();
      }

      url.searchParams.append(
        'mood',
        applicationSettings.params.mood || paramsResult.mood
      );
      url.searchParams.append(
        'tense',
        applicationSettings.params.tense || paramsResult.tense
      );
      const res = fetch(url).then((res) => res.json());
      return res;
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  console.log(applicationSettings);

  return (
    <Container>
      <SettingsDialog />
      <Logo>Conjug8</Logo>
      {!isLoading && (
        <div>
          <HelpDialog dictionary={data} />
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
              <Button color={Blue} onClick={() => refetch()} type="button">
                Next
              </Button>
              <Button
                color={Teal}
                onClick={() => setSettingIsOpen(true)}
                type="button"
              >
                Settings
              </Button>
              <Button
                color={Green}
                onClick={() => setHelpIsOpen(true)}
                type="button"
              >
                Help
              </Button>
            </ControlSection>
          </Page>
        </div>
      )}
    </Container>
  );
}

export default Index;

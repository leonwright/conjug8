import styled from 'styled-components';
import { AnswerSection } from './answer-section';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { Dictionary } from '@conjug8/server/dictionary';

/* eslint-disable-next-line */
export interface AnswerPanelProps {}

const StyledAnswerPanel = styled.div`
  width: 650px;
  background: #dafdba;
  border: 2px solid #13678a;
  border-radius: 15px;
  height: fit-content;
`;

const PanelBody = styled.div``;

export function AnswerPanel(props: AnswerPanelProps) {
  return (
    <StyledAnswerPanel className="flex flex-col p-14">
      <PanelBody className="w-full h-full">
        <AnswerSection pronoun="yo" />
        <AnswerSection pronoun="tú" />
        <AnswerSection pronoun="él/ella/usted" />
        <AnswerSection pronoun="nosotros" />
        <AnswerSection pronoun="vosotros" />
        <AnswerSection pronoun="ellos/ellas/ustedes" />
      </PanelBody>
    </StyledAnswerPanel>
  );
}

export default AnswerPanel;

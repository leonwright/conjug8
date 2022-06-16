import styled from 'styled-components';
import { AnswerSection } from './answer-section';
import { Dictionary } from '@conjug8/server/dictionary';

/* eslint-disable-next-line */
export interface AnswerPanelProps {
  dictionary: Dictionary;
}

const StyledAnswerPanel = styled.div`
  width: 650px;
  background: #f2fdba;
  border: 2px solid #13678a;
  border-radius: 15px;
  height: fit-content;
`;

const PanelBody = styled.div``;

export function AnswerPanel(props: AnswerPanelProps) {
  const { dictionary } = props;
  return (
    <StyledAnswerPanel className="flex flex-col p-14">
      <PanelBody className="w-full h-full">
        <AnswerSection correctAnswer={dictionary.form_1s} pronoun="yo" />
        <AnswerSection correctAnswer={dictionary.form_2s} pronoun="tú" />
        <AnswerSection
          correctAnswer={dictionary.form_3s}
          pronoun="él/ella/usted"
        />
        <AnswerSection correctAnswer={dictionary.form_1p} pronoun="nosotros" />
        <AnswerSection correctAnswer={dictionary.form_2p} pronoun="vosotros" />
        <AnswerSection
          correctAnswer={dictionary.form_3p}
          pronoun="ellos/ellas/ustedes"
        />
      </PanelBody>
    </StyledAnswerPanel>
  );
}

export default AnswerPanel;

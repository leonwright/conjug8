import styled from 'styled-components';
import tw from 'twin.macro';

interface AnswerSectionProps {
  pronoun:
    | 'yo'
    | 'tú'
    | 'él/ella/usted'
    | 'nosotros'
    | 'vosotros'
    | 'ellos/ellas/ustedes';
}

const Section = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  &:last-child {
    margin-bottom: 0;
  }
`;

const AnswerInput = styled.input`
  background-color: #f6f5f5;
  border-radius: 5px;
  padding-left: 10px;
  font-size: 0.875rem; /* 14px */
  line-height: 1.25rem; /* 20px */
`;

export function AnswerSection(props: AnswerSectionProps) {
  return (
    <Section>
      {props.pronoun} <AnswerInput className="bg-gray-200" type="text" />
    </Section>
  );
}

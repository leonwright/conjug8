import styled from 'styled-components';
import React, { ChangeEventHandler, useState } from 'react';

interface AnswerSectionProps {
  pronoun:
    | 'yo'
    | 'tú'
    | 'él/ella/usted'
    | 'nosotros'
    | 'vosotros'
    | 'ellos/ellas/ustedes';
  correctAnswer: string;
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

interface AnswerInputProps {
  correct: boolean;
}

const AnswerInput = styled.input`
  background-color: #f6f5f5;
  border-radius: 5px;
  padding-left: 10px;
  font-size: 0.875rem; /* 14px */
  line-height: 1.25rem; /* 20px */
  background-color: rgb(229 231 235);
  border: ${(props: AnswerInputProps) =>
    props.correct ? '1px solid green' : 'none'};

  &:focus-visible {
    outline: none;
  }
`;

// TODO: Update event type
function checkAnswer(event: any, correctAnswer: string): boolean {
  if (event.target.value === correctAnswer) {
    return true;
  }
  return false;
}

export function AnswerSection(props: AnswerSectionProps) {
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const { correctAnswer } = props;

  return (
    <Section>
      {props.pronoun}{' '}
      <AnswerInput
        correct={isCorrect}
        type="text"
        onChange={(e) => {
          setIsCorrect(checkAnswer(e, correctAnswer));
        }}
      />
    </Section>
  );
}

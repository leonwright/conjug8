import styled from 'styled-components';

interface ButtonProps {
  color: string;
}

export const Button = styled.button<ButtonProps>`
  background: ${(props) => props.color} !important;
  border-radius: 15px;
  padding: 10px 30px;
  color: white;
  margin-top: 1rem;
  margin-right: 1rem;

  &:last-child {
    margin-right: 0;
  }
`;

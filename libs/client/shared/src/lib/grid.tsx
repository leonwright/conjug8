import styled from 'styled-components';

interface GridProps {
  children: any;
  columns: number;
  gap: number;
}

const ContainerDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(
    ${(props: GridProps) => props.columns},
    minmax(0, 1fr)
  );
  gap: ${(props: GridProps) => props.gap.toString()}rem;
`;

// grid-cols-2
// gap-1
// mx-28
export const Grid = (props: GridProps) => {
  return <ContainerDiv {...props}>{props.children}</ContainerDiv>;
};

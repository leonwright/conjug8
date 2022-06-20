import { useEffect, useRef } from 'react';
import styled from 'styled-components';

/* eslint-disable-next-line */
export interface HelpDialogProps {
  isOpen: boolean;
}

const Container: any = styled.dialog`
  width: 400px;
  border-radius: 8px;
  border: 1px solid #888;

  ::backdrop {
    background: rgba(0, 0, 0, 0.3);
  }
`;

export function HelpDialog({ isOpen }: HelpDialogProps) {
  const ref: any = useRef(null);
  const preventAutoClose = (e: React.MouseEvent) => e.stopPropagation();

  useEffect(() => {
    if (isOpen) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [isOpen]);

  const onClose = () => {
    ref.current?.close();
  };

  return (
    <Container ref={ref} onCancel={onClose} onClick={onClose}>
      <div onClick={preventAutoClose}></div>
      <h1>Welcome to HelpDialog!</h1>
    </Container>
  );
}

export default HelpDialog;

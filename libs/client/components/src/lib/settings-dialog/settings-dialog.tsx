import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { settingsDialogState } from '@conjug8/client/atoms';
import { useRecoilState } from 'recoil';
import { Dictionary } from '@conjug8/server/dictionary';
import { databaseConfig } from '@conjug8/server/shared';

/* eslint-disable-next-line */
export interface SettingsDialogProps {}

const Container: any = styled.dialog`
  width: 400px;
  border-radius: 8px;
  border: 1px solid #888;

  ::backdrop {
    background: rgba(0, 0, 0, 0.9);
  }
`;

const SingleAnswer = styled.div`
  & > span {
    font-weight: 700;
  }
`;

const ModalHeading = styled.div`
  & > h3 {
    font-size: 2rem;
  }
  margin-bottom: 2rem;

  font-size: 0.75rem;
  text-align: center;
`;

const AnswersTable = styled.table`
  width: 100%;
  border: 1px solid;

  & > th,
  td {
    border: 1px solid;
    padding-left: 0.5rem;
  }

  & > tr > th {
    text-align: left;
    padding-left: 0.5rem;
  }
`;

export function SettingsDialog(props: SettingsDialogProps) {
  const [isOpen, setIsOpen] = useRecoilState(settingsDialogState);
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
    setIsOpen(false);
  };

  return (
    <Container ref={ref} onCancel={onClose} onClick={onClose}>
      <div onClick={preventAutoClose}>
        <ModalHeading>
          <h3>Settings</h3>
          (click anywhere outside this modal to close)
        </ModalHeading>
      </div>
    </Container>
  );
}

export default SettingsDialog;

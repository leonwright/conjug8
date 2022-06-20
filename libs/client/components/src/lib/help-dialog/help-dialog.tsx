import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { helpDialogState } from '@conjug8/client/atoms';
import { useRecoilState } from 'recoil';
import { Dictionary } from '@conjug8/server/dictionary';
import { databaseConfig } from '@conjug8/server/shared';

/* eslint-disable-next-line */
export interface HelpDialogProps {
  dictionary: Dictionary;
}

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

export function HelpDialog({ dictionary }: HelpDialogProps) {
  const [isOpen, setIsOpen] = useRecoilState(helpDialogState);
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
          <h3>Help</h3>
          (click anywhere outside this modal to close)
        </ModalHeading>

        <AnswersTable>
          <tr>
            <th>Company</th>
            <th>Contact</th>
          </tr>
          <tr>
            <td>yo</td>
            <td>{dictionary.form_1s}</td>
          </tr>
          <tr>
            <td>tú</td>
            <td>{dictionary.form_2s}</td>
          </tr>
          <tr>
            <td>él/ella/usted:</td>
            <td>{dictionary.form_3s}</td>
          </tr>
          <tr>
            <td>nosotros</td>
            <td>{dictionary.form_1p}</td>
          </tr>
          <tr>
            <td>vosotros</td>
            <td>{dictionary.form_2p}</td>
          </tr>
          <tr>
            <td>ellos/ellas/ustedes</td>
            <td>{dictionary.form_3p}</td>
          </tr>
        </AnswersTable>
      </div>
    </Container>
  );
}

export default HelpDialog;

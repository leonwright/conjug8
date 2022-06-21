import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { settingsDialogState, settingsState } from '@conjug8/client/atoms';
import { useRecoilState } from 'recoil';
import { Dictionary } from '@conjug8/server/dictionary';
import { databaseConfig } from '@conjug8/server/shared';
import { useQuery } from 'react-query';
import { Mood, Tense, TenseMood } from '@conjug8/shared/models';

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

const ModalHeading = styled.div`
  & > h3 {
    font-size: 2rem;
  }
  margin-bottom: 2rem;

  font-size: 0.75rem;
  text-align: center;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const FormLabel = styled.label`
  font-size: 0.75rem;
  margin-bottom: 0.5rem;
`;

const SelectBoxWithRoundedCorners = styled.select`
  border-radius: 8px;
  border: 1px solid #888;
  padding: 0.5rem;
  margin-bottom: 1rem;
  width: 100%;
  height: 2rem;
  font-size: 0.75rem;
  &:focus {
    outline: none;
  }
`;

export function SettingsDialog(props: SettingsDialogProps) {
  const [isOpen, setIsOpen] = useRecoilState(settingsDialogState);
  const ref: any = useRef(null);
  const preventAutoClose = (e: React.MouseEvent) => e.stopPropagation();
  const [settings, setSettings] = useRecoilState(settingsState);

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

  // updated tense and mood state when user changes them in the settings dialog
  const onChangeTense = (e: any) => {
    setSettings({
      ...settings,
      params: {
        tense: e.target.value.split('-')[0] as Tense,
        mood: e.target.value.split('-')[1] as Mood,
      },
    });
    console.log(settings);
  };

  // react-query to get all possible tenses and moods
  const { data: tensesAndMoods, isLoading: tensesAndMoodLoading } = useQuery<
    TenseMood[]
  >(
    'tensesAndMoods',
    async () => {
      const res = await fetch(
        `${process.env['NX_BASE_URL']}${process.env['NX_GET_ALL_TENSES_AND_MOODS_ENDPOINT']}` // eslint-disable-line
      ).then((res) => res.json());
      console.log(res);
      return res;
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  return (
    <Container ref={ref} onCancel={onClose} onClick={onClose}>
      {/* HTML form for configuring settings */}
      <form onClick={preventAutoClose}>
        <div>
          <ModalHeading>
            <h3>Settings</h3>
            (click anywhere outside this modal to close)
          </ModalHeading>
        </div>
        {/* Tense and mood selection */}
        <FormGroup>
          <FormLabel>Tense and Mood</FormLabel>
          {tensesAndMoodLoading ? (
            <p>Loading...</p>
          ) : (
            <SelectBoxWithRoundedCorners
              name="tenseMood"
              id="tenseMood"
              onChange={onChangeTense}
              defaultValue={`${settings.params.tense}-${settings.params.mood}`}
            >
              {tensesAndMoods?.map((tenseMood) => (
                <option
                  key={`${tenseMood.tense}-${tenseMood.mood}`}
                  value={`${tenseMood.tense}-${tenseMood.mood}`}
                >
                  {tenseMood.tense} - {tenseMood.mood}
                </option>
              ))}
            </SelectBoxWithRoundedCorners>
          )}
        </FormGroup>
      </form>
    </Container>
  );
}

export default SettingsDialog;

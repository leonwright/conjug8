import { atom } from 'recoil';
import { Mood, Tense, TenseMood } from '@conjug8/shared/models';

export interface ApplicationSettings {
  params: TenseMood;
}

export const settingsState = atom<ApplicationSettings>({
  key: 'settingsState', // unique ID (with respect to other atoms/selectors)
  default: {
    params: {
      mood: Mood.Indicative,
      tense: Tense.Present,
    },
  }, // default value (aka initial value)
});

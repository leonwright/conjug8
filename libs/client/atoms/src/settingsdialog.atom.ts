import { atom } from 'recoil';

export const settingsDialogState = atom<boolean>({
  key: 'settingsDialogState', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

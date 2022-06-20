import { atom } from 'recoil';

export const helpDialogState = atom<boolean>({
  key: 'helpDialogState', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

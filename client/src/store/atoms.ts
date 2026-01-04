import { atom } from 'recoil';

export const selectedCountryNameState = atom<string>({
  key: 'selectedCountryNameState',
  default: '',
});
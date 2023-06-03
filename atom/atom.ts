import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const localStorage =
  typeof window !== 'undefined' ? window.localStorage : undefined;

const { persistAtom } = recoilPersist({
  key: 'userSession',
  storage: localStorage,
});

interface IUserData {
  nickname: string;
  username: string;
  email: string;
  accessToken: string;
}

export const userState = atom<IUserData>({
  key: 'user',
  default: {
    nickname: '',
    username: '',
    email: '',
    accessToken: '',
  },
  effects_UNSTABLE: [persistAtom],
});

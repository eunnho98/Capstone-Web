import { atom, selector } from 'recoil';

interface IUserData {
  nickname: string;
  username: string;
  email: string;
  accessToken: string;
}

export const userState = atom<IUserData>({
  key: 'AuserState',
  default: {
    nickname: '',
    username: '',
    email: '',
    accessToken: '',
  },
});

export const getAccessToken = selector({
  key: 'AaccessToken',
  get: ({ get }) => {
    const copy = get(userState);
    return copy.accessToken;
  },
});

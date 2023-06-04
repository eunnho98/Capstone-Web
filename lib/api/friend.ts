import axios from 'axios';

export const addFriendAPI = (email: string, token: string) =>
  axios.post('/follow', null, {
    headers: {
      Authorization: token,
    },
    params: {
      email: email,
    },
  });

export const getFriendAPI = (token: string) =>
  axios.get('/follow/following', {
    headers: {
      Authorization: token,
    },
  });

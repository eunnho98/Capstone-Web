import axios from 'axios';

export const addFriendAPI = (email: string, token: string) =>
  axios.post(`/follow/${email}`, null, {
    headers: {
      Authorization: token,
    },
  });

export const getFriendAPI = (token: string) =>
  axios.get('/follow/following', {
    headers: {
      Authorization: token,
    },
  });

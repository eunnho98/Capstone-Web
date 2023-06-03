import axios from 'axios';

export const addFriendAPI = (email: string) => axios.post(`/follow/${email}`);

export const getFriendAPI = (token: string) =>
  axios.get('/follow/following', {
    headers: {
      Authorization: token,
    },
  });

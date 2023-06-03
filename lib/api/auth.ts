import axios from 'axios';

export const loginAPI = (code: string) =>
  axios.get('/login/oauth2/code/google', {
    params: { code: code },
  });

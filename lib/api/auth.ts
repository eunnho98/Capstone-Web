import axios from '.';

export const loginAPI = () => axios.get('/login/oauth2/code/google');

export const getCodeAPI = () =>
  axios.get('https://capstone-web-zeta.vercel.app/api/auth/getCode');

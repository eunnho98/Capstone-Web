import axios from '.';

export const loginAPI = () => axios.get('/login/oauth2/code/google');

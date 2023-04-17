import Axios from 'axios';

export const busAxios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BUS_API_URL,
});

export const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

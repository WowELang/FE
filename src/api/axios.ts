import axios from 'axios';

export const axiosApiInstance = axios.create({
  baseURL: 'https://wowelang.com/',
  withCredentials: true,
});

export const axiosChatInstance = axios.create({
  baseURL: 'http://3.39.215.81:8080/',
  withCredentials: true,
});

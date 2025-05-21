import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://52.78.115.221/',
  withCredentials: true,
});

import axios from 'axios';
import { baseUrl } from '@devugur/utilities';

export const axiosObj = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

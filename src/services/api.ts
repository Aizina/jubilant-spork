// services/api.ts
import axios from 'axios';
import { BalanceResponse, AccountInfoResponse } from '../helpers/types';

const API_URL = 'https://gateway.scan-interfax.ru/api/v1';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Add request interceptor for auth token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const accountAPI = {
  login: (credentials: { login: string; password: string }) =>
    api.post<{ accessToken: string; expire: string }>('/account/login', credentials),
  
  getInfo: () =>
    api.get<AccountInfoResponse>('/account/info'),
  
  getBalance: () =>
    api.get<BalanceResponse>('/account/balance'),
};


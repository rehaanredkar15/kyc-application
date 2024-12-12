import axios from 'axios';

const KycAPI = axios.create({ baseURL: 'http://localhost:5500/v1/'});

export const login = (orderDetails) => KycAPI.post(`/auth/login`, orderDetails);

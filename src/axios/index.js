import axios from 'axios';
import store from '../store';

import {apiEndpoint} from '../config';
import {authHeader} from '../helpers/auth-header';
import {logoutUser} from '../actions/auth';

const axiosInstance = axios.create({
  baseURL: apiEndpoint,
});

axiosInstance.interceptors.request.use(
  config => {
    config.headers.Authorization = authHeader();
    return config;
  },
  error => {
    return error;
  },
);
axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    console.log('ERROR RESP', error);
    if (error.response.status !== 401) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
    const config = error.config;
    try {
      const refresh_token = localStorage.getItem('refresh_token');
      console.log('REFRESH TOKEN', refresh_token);
      let response = await axios.post(apiEndpoint + '/token/refresh/', {
        refresh: refresh_token,
      });
      localStorage.setItem('access_token', response.data.access);
      config.headers['Authorization'] = `Bearer ${response.data.access}`;
      return axios.request(config);
    } catch (error) {
      store.dispatch(logoutUser());
    }
  },
);
export default axiosInstance;

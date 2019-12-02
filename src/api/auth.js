import axios from '../axios';

export const login = async data => {
  return axios.post('/token/', data).then(response => {
    let {access, refresh} = response.data;
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
    return response;
  });
};

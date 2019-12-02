import axios from '../axios';

export const getLands = () => {
  return axios.get('/lands');
};

export const addLand = data => {
  return axios.post('/lands/', data);
};

export const updateLand = data => {
  let {id, ...rest} = data;
  return axios.put('/lands/' + id + '/', rest);
};

export const deleteLand = id => {
  return axios.delete('/lands/' + id);
};

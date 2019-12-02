import axios from 'axios';
import {apiEndpoint} from '../config';

export const authHeader = () => {
  let access_token = localStorage.getItem('access_token');
  return 'Bearer ' + access_token;
};

import * as constants from '../constants';
import {login} from '../api/auth';
import history from '../history';

const userFetching = () => {
  return {type: constants.USER_REQUEST_FETCHING};
};

export const userSuccess = token => {
  return {type: constants.USER_REQUEST_SUCCESS, token};
};

const userFailure = errors => {
  return {type: constants.USER_REQUEST_FAILURE, errors};
};

export const loginUser = data => {
  return async dispatch => {
    dispatch(userFetching());
    try {
      let response = await login(data);
      console.log('LOGIN RESPONSE', response);
      let token = response && response.data ? response.data.access : '';
      dispatch(userSuccess(token));
    } catch (error) {
      dispatch(userFailure(error.response.data));
    }
  };
};

export const logoutUser = () => {
  return async dispatch => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    dispatch(userSuccess(''));
    history.push('/login');
  };
};

import * as constants from '../constants';
import {getLands, addLand, updateLand, deleteLand} from '../api/lands';

const landFetching = () => {
  return {type: constants.LANDS_REQUEST_FETCHING};
};

export const landSuccess = lands => {
  return {type: constants.LANDS_REQUEST_SUCCESS, lands};
};

const landFailure = error => {
  return {type: constants.LANDS_REQUEST_FAILURE, error};
};

export const getLandsFromAPI = () => {
  return async dispatch => {
    dispatch(landFetching());
    try {
      let response = await getLands();
      console.log('LANDS RESPONSE', response);
      dispatch(landSuccess(response.data));
    } catch (error) {
      console.log('ERROR GET LANDS', error);
      dispatch(landFailure(error.response.data));
    }
  };
};

const addLandFetching = () => {
  return {type: constants.ADD_LAND_FETCHING};
};

export const addLandSuccess = land => {
  return {type: constants.ADD_LAND_SUCCESS, land};
};

export const deleteLandSuccess = id => {
  return {type: constants.DELETE_LAND_SUCCESS, id};
};

const addLandFailure = error => {
  return {type: constants.ADD_LAND_FAILURE, error};
};

export const addLandOnAPI = data => {
  return async dispatch => {
    dispatch(addLandFetching);
    try {
      let response = await addLand(data);
      dispatch(addLandSuccess(response));
    } catch (error) {
      dispatch(addLandFailure(error.response.data));
      throw error;
    }
  };
};

export const updateLandOnAPI = data => {
  return async dispatch => {
    dispatch(addLandFetching);
    try {
      let response = await updateLand(data);
      dispatch(addLandSuccess(response));
    } catch (error) {
      dispatch(addLandFailure(error.response.data));
      throw error;
    }
  };
};

export const deleteLandOnAPI = id => {
  return async dispatch => {
    dispatch(addLandFetching);
    try {
      await deleteLand(id);
      dispatch(deleteLandSuccess(id));
    } catch (error) {
      dispatch(addLandFailure(error.response.data));
      throw error;
    }
  };
};

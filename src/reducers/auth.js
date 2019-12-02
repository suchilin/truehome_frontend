import * as constants from '../constants';

const initialState = {
  token: '',
  fetching: false,
  errors: null,
};

const userReducer = (state = initialState, action) => {
  console.log('ACTION REDUCER', action);
  switch (action.type) {
    case constants.USER_REQUEST_FETCHING:
      return {
        ...state,
        fetching: true,
      };
    case constants.USER_REQUEST_SUCCESS:
      return {
        ...state,
        fetching: false,
        token: action.token,
      };
    case constants.USER_REQUEST_FAILURE:
      return {
        ...state,
        fetching: false,
        errors: action.errors,
      };
    default:
      return state;
  }
};

export default userReducer;

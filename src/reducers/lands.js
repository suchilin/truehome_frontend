import * as constants from '../constants';

const initialState = {
  lands: [],
  fetching: false,
  error: null,
};

const landReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.LANDS_REQUEST_FETCHING:
      return {
        ...state,
        fetching: true,
      };
    case constants.ADD_LAND_FETCHING:
      return {
        ...state,
        fetching: true,
      };
    case constants.LANDS_REQUEST_SUCCESS:
      return {
        ...state,
        fetching: false,
        lands: action.lands,
      };
    case constants.ADD_LAND_SUCCESS:
      let landsWO = state.lands.filter(land => land.id != action.land.id);
      let lands = [{...action.land}, ...landsWO];
      return {
        ...state,
        fetching: false,
        lands,
      };
    case constants.DELETE_LAND_SUCCESS:
      let lands_ = state.lands.filter(land => land.id != action.id);
      return {
        ...state,
        fetching: false,
        lands: lands_,
      };
    case constants.LANDS_REQUEST_FAILURE:
      return {
        ...state,
        fetching: false,
        error: action.error,
      };
    case constants.ADD_LAND_FAILURE:
      return {
        ...state,
        fetching: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default landReducer;

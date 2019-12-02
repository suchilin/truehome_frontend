import {combineReducers} from 'redux';

import userReducer from './auth';
import landReducer from './lands';

export default combineReducers({user: userReducer, lands: landReducer});

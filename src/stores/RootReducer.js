import {combineReducers} from 'redux';
import LoginReducer from './login/LoginReducer';
import LoadingReducer from './loading/LoadingReducer';

export default combineReducers({LoginReducer, LoadingReducer})
import {loginActionType} from './LoginAction';

const initialState = {
  userInfo: {},
};

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case loginActionType.setUserInfo:
      return {...state, userInfo: action.payload.userInfo};

    default:
      return state;
  }
};

export default LoginReducer;

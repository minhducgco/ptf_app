import {
  SET_USER_LOGIN,
  SET_USER_LOGOUT,
  REVOKE,
  SET_SIGN_UP,
  CHECK_MODAL,
  CHECK_SCREEN,
} from '../actions/type';

const initialState = {
  user: {},
  accessToken: '',
  isLoading: true,
  isLogin: false,
  isSignUp: false,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case REVOKE:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
        isLogin: true,
        accessToken: action.accessToken,
      };
    case SET_USER_LOGIN:
      return {
        ...state,
        isLogin: true,
        user: action.payload,
        accessToken: action.accessToken,
      };
    case SET_USER_LOGOUT:
      return {
        ...state,
        isLogin: false,
        user: {},
        accessToken: null,
      };
    case SET_SIGN_UP:
      return {
        ...state,
        isSignUp: action.isSignUp,
      };
    case CHECK_MODAL:
      return {
        ...state,
        isOpen: action.isOpen,
      };
    case CHECK_SCREEN:
      return {
        ...state,
        screen: action.screen,
      };
    default:
      return state;
  }
}

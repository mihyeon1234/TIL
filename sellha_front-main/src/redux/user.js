import { removeCookie, setCookie } from 'components/cookie';

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const SET_USER_INFO = 'SET_USER_INFO';
const DELETE_USER_INFO = 'DELETE_USER_INFO';
const SET_SAVE_BUCKET = 'SET_SAVE_BUCKET';
const SAVE_SIGNUP_DATA = 'SAVE_SIGNUP_DATA';
const AUTH_EVENT_CHECK = 'AUTH_EVENT_CHECK';
const RESET_TEAM = 'RESET_TEAM';

export const login = ({ accessToken, refreshToken, email }) => {
  setCookie('AC', accessToken);
  setCookie('RF', refreshToken);
  localStorage.setItem('saveEmail', email);
  localStorage.setItem('expire', false);
  localStorage.setItem('loginAlert', false);

  return { type: LOGIN };
};

export const logout = () => {
  removeCookie('AC');
  removeCookie('RF');
  localStorage.setItem('expire', true);
  localStorage.setItem('loginAlert', false);

  return { type: LOGOUT };
};

export const setUserInfo = (info) => ({ type: SET_USER_INFO, payload: info });

export const deleteUserInfo = () => ({ type: DELETE_USER_INFO });

export const setSaveBucket = (keywords, categorys) => ({
  type: SET_SAVE_BUCKET,
  list: { keywords, categorys },
});

export const saveSignupData = (value) => ({
  type: SAVE_SIGNUP_DATA,
  payload: value,
});

export const authEventCheck = (value) => ({
  type: AUTH_EVENT_CHECK,
  paylod: value,
});

export const resetTeam = () => ({ type: RESET_TEAM });

const initialState = {
  isAdmin: 0,
  saveBucket: [],
};

const userReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...prevState,
      };
    case LOGOUT:
      return {
        ...initialState,
      };
    case SET_USER_INFO:
      return {
        ...prevState,
        ...action.payload,
      };
    case DELETE_USER_INFO:
      return {
        token: prevState.token,
      };
    case SET_SAVE_BUCKET:
      return {
        ...prevState,
        saveBucket: action.list,
      };
    case SAVE_SIGNUP_DATA:
      return {
        ...prevState,
        signup: action.payload,
      };
    case AUTH_EVENT_CHECK:
      return {
        ...prevState,
        authEvent: action.payload,
      };
    case RESET_TEAM:
      return {
        ...prevState,
        teamId: null,
        teamName: null,
      };
    default:
      return prevState;
  }
};

export default userReducer;

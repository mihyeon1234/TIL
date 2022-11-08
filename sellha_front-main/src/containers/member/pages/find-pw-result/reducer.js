const SET_PASSWORD_DATA = 'SET_PASSWORD_DATA';
const SET_CAPSLOCK = 'SET_CAPSLOCK';
const SET_CONDITION = 'SET_CONDITION';

export const setPasswordData = (value) => ({
  type: SET_PASSWORD_DATA,
  payload: value,
});

export const setCapsLock = (value) => ({
  type: SET_CAPSLOCK,
  payload: value,
});

export const setCondition = (value) => ({
  type: SET_CONDITION,
  payload: value,
});

const initialState = {
  input: {
    password: '',
    confirm: '',
  },
  capslock: { password: false, confirm: false },
  condition: {
    eng: false,
    num: false,
    len: false,
    same: false,
  },
};

const findPasswordResultReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case SET_PASSWORD_DATA:
      return {
        ...prevState,
        input: {
          ...prevState.input,
          ...action.payload,
        },
      };
    case SET_CAPSLOCK:
      return {
        ...prevState,
        capslock: {
          ...prevState.capslock,
          ...action.payload,
        },
      };
    case SET_CONDITION:
      return {
        ...prevState,
        condition: {
          ...prevState.condition,
          ...action.payload,
        },
      };
    default:
      return prevState;
  }
};

export default findPasswordResultReducer;

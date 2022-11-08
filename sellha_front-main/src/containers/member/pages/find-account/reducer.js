const RESET_DATA = 'RESET_DATA';
const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE';

export const setErrorMsg = (value) => ({ type: SET_ERROR_MESSAGE, value });
export const resetData = () => ({ type: RESET_DATA });

export const initialState = {
  message: '',
};

const findAccountReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case SET_ERROR_MESSAGE:
      return {
        ...prevState,
        message: action.value,
      };
    case RESET_DATA:
      return initialState;
    default:
      return prevState;
  }
};

export default findAccountReducer;

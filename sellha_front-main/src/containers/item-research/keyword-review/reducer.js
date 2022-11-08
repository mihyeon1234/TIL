const FETCH_DATA = 'PROJECT_FETCH_DATA';
const SUCCESS_TEAM_DATA = 'PROJECT_SUCCESS_TEAM_DATA';
const SUCCESS_USER_DATA = 'PROJECT_SUCCESS_USER_DATA';
const FAIL_DATA = 'PROJECT_FAIL_DATA';

// actions
export const fetchData = () => ({
  type: FETCH_DATA,
});
export const successTeamData = (data) => ({
  type: SUCCESS_TEAM_DATA,
  payload: data,
});
export const successUserData = (data) => ({
  type: SUCCESS_USER_DATA,
  payload: data,
});
export const failData = () => ({ type: FAIL_DATA });

const initialState = {
  loading: false,
  success: false,
  pagination: {
    current: 1,
    pageSize: 10,
    total: 0,
  },
  teamName: '',
  teamData: [],
  userData: [],
};

const keywordProjectReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA:
      return {
        ...prevState,
        loading: true,
      };
    case SUCCESS_TEAM_DATA:
      return {
        ...prevState,
        loading: false,
        success: true,
        teamData: action.payload,
        userData: action.payload,
      };
    case SUCCESS_USER_DATA:
      return {
        ...prevState,
        loading: false,
        success: true,
        userData: action.payload,
      };
    case FAIL_DATA:
      return { ...initialState };
    default:
      return prevState;
  }
};

export default keywordProjectReducer;

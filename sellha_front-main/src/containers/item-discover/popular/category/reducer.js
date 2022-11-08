const FETCH_DATA = 'SUB_FETCH_DATA';
const SET_DATA = 'SUB_SET_DATA';
const SET_VIEW = 'SUB_SET_VIEW';
const UNSET_DATA = 'SUB_UNSET_DATA';
const FAIL_DATA = 'SUB_FAIL_DATA';
const SET_FILTER = 'SUB_SET_FILTER';
const UNSET_FILTER = 'SUB_UNSET_FILTER';

// actions
export const fetchData = () => ({
  type: FETCH_DATA,
});
export const setData = (data) => ({
  type: SET_DATA,
  payload: data,
});
export const setView = (data) => ({
  type: SET_VIEW,
  payload: data,
});
export const unsetData = () => ({ type: UNSET_DATA });
export const failData = () => ({ type: FAIL_DATA });
export const setFilter = (filterOne) => ({
  type: SET_FILTER,
  payload: filterOne,
});
export const unsetFilter = () => ({ type: UNSET_FILTER });

const initialState = {
  loading: false,
  success: false,
  firstData: [],
  data: [],
  lastUpdated: '',
  filtering: {
    minCompete: 0,
    maxCompete: Infinity,
    minClickSum: 0,
    maxClickSum: Infinity,
    minProductAmount: 0,
    maxProductAmount: Infinity,
    minBrandful: 0,
    maxBrandful: Infinity,
  },
};

const categorySubReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA:
      return {
        ...prevState,
        loading: true,
      };
    case SET_DATA:
      return {
        ...prevState,
        loading: false,
        success: true,
        ...action.payload,
        firstData: action.payload.data,
      };
    case SET_VIEW:
      return {
        ...prevState,
        loading: false,
        success: true,
        ...action.payload,
      };
    case UNSET_DATA:
      return {
        ...prevState,
      };
    case FAIL_DATA:
      return {
        ...prevState,
        loading: false,
        success: false,
      };
    case SET_FILTER:
      return {
        ...prevState,
        filtering: {
          ...prevState.filtering,
          ...action.payload,
        },
      };
    default:
      return prevState;
  }
};

export default categorySubReducer;

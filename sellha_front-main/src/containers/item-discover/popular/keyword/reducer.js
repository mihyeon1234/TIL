const FETCH_DATA = 'CHART_FETCH_DATA';
const SET_DATA = 'CHART_SET_DATA';
const UNSET_DATA = 'CHART_UNSET_DATA';
const FAIL_DATA = 'CHART_FAIL_DATA';
const SET_FILTER = 'CHART_SET_FILTER';
const UNSET_FILTER = 'CHART_UNSET_FILTER';
const SET_PROGRESS = 'CHART_SET_PROGRESS';

// actions
export const fetchData = () => ({
  type: FETCH_DATA,
});
export const setData = (data) => ({
  type: SET_DATA,
  payload: data,
});
export const unsetData = () => ({ type: UNSET_DATA });
export const failData = () => ({ type: FAIL_DATA });
export const setFilter = (filterOne) => ({
  type: SET_FILTER,
  payload: filterOne,
});
export const unsetFilter = () => ({ type: UNSET_FILTER });
export const setProgress = (progress) => ({
  type: SET_PROGRESS,
  payload: progress,
});

const initialState = {
  loading: false,
  success: false,
  pagination: {
    current: 1,
    pageSize: 40,
    total: 0,
  },
  data: [],
  lastUpdated: '',
  filtering: {
    minAttract: null,
    maxAttract: null,
    minCompete: null,
    maxCompete: null,
    minSearchAmount: null,
    maxSearchAmount: null,
    minProductAmount: null,
    maxProductAmount: null,
    minTopSales: null,
    maxTopSales: null,
    minBrandShare: null,
    maxBrandShare: null,
  },
  keyword: '',
  progress: 0,
};

const keywordChartReducer = (prevState = initialState, action) => {
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
      };
    case UNSET_DATA:
      return {
        ...prevState,
        data: [],
        pagination: {
          current: 1,
          pageSize: 40,
        },
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
    case UNSET_FILTER:
      return {
        ...prevState,
        filtering: initialState.filtering,
      };
    case SET_PROGRESS:
      return {
        ...prevState,
        progress: action.payload,
      };
    default:
      return prevState;
  }
};

export default keywordChartReducer;

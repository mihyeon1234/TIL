const FETCH_CHART = 'REVIEW_FETCH_CHART';
const SET_CHART = 'REVIEW_SET_CHART';
const FAIL_CHART = 'REVIEW_FAIL_CHART';
const FETCH_RECENT = 'REVIEW_FETCH_RECENT';
const SET_RECENT = 'REVIEW_SET_RECENT';
const FETCH_CONTENT = 'REVIEW_FETCH_CONTENT';
const SET_CONTENT = 'REVIEW_SET_CONTENT';
const UNSET_CONTENT = 'REVIEW_UNSET_CONTENT';
const SET_SORT = 'REVIEW_SET_SORT';
const SET_VIEW = 'REVIEW_SET_VIEW';
const SET_PAGE = 'REVIEW_SET_PAGE';
const FETCH_EXCEL = 'REVIEW_FETCH_EXCEL';
const SET_EXCEL = 'REVIEW_SET_EXCEL';
const INIT_DATA = 'REVIEW_INIT_DATA';

export const fetchChart = () => ({ type: FETCH_CHART });

export const setChart = (data) => ({
  type: SET_CHART,
  payload: data,
});

export const failChart = () => ({ type: FAIL_CHART });

export const fetchRecentReview = () => ({ type: FETCH_RECENT });

export const setRecentReview = (data) => ({
  type: SET_RECENT,
  payload: data,
});

export const fetchContent = () => ({ type: FETCH_CONTENT });

export const setContent = (data) => ({
  type: SET_CONTENT,
  payload: data,
});

export const unsetContent = () => ({ type: UNSET_CONTENT });

export const setSort = (data) => ({
  type: SET_SORT,
  payload: data,
});

export const setView = (data) => ({
  type: SET_VIEW,
  payload: data,
});

export const setPage = (data) => ({
  type: SET_PAGE,
  payload: data,
});

export const fetchExcel = () => ({ type: FETCH_EXCEL });

export const setExcel = (data) => ({
  type: SET_EXCEL,
  payload: data,
});

export const initData = () => ({
  type: INIT_DATA,
});

export const initialState = {
  loading: false,
  success: false,
  pagination: {
    current: 1,
    pageSize: 10,
    maxSize: 5,
    total: 0,
  },
  chart: [],
  content: [],
  recentContent: [],
  successRecent: false,
  contentPage: 1,
  sortType: 'REVIEW_CREATE_DATE_DESC',
  viewType: '',
  successExcel: false,
  excel: [],
};

const reviewMonitoringReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case FETCH_CHART:
      return {
        ...prevState,
        loading: true,
      };
    case SET_CHART:
      return {
        ...prevState,
        loading: false,
        success: true,
        chart: action.payload,
      };
    case FAIL_CHART:
      return {
        ...prevState,
        loading: false,
        success: false,
      };
    case FETCH_RECENT:
      return {
        ...prevState,
        successRecent: false,
      };
    case SET_RECENT:
      return {
        ...prevState,
        successRecent: true,
        recentContent: action.payload,
      };
    case FETCH_CONTENT:
      return {
        ...prevState,
        loading: true,
      };
    case SET_CONTENT:
      return {
        ...prevState,
        loading: false,
        success: true,
        ...action.payload,
      };
    case UNSET_CONTENT:
      return {
        ...prevState,
        pagination: {
          current: 1,
        },
      };
    case SET_SORT:
      return {
        ...prevState,
        sortType: action.payload,
      };
    case SET_VIEW:
      return {
        ...prevState,
        viewType: action.payload,
      };
    case SET_PAGE:
      return {
        ...prevState,
        ...action.payload,
      };
    case FETCH_EXCEL:
      return {
        ...prevState,
        successExcel: false,
      };
    case SET_EXCEL:
      return {
        ...prevState,
        successExcel: true,
        excel: action.payload,
      };
    case INIT_DATA:
      return {
        ...prevState,
        sortType: 'REVIEW_CREATE_DATE_DESC',
        viewType: '',
        chart: [],
      };
    default:
      return prevState;
  }
};

export default reviewMonitoringReducer;

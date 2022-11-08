const FETCH_MONITOR_DATA = 'REALTIME_FETCH_MONITOR_DATA';
const SET_MONITOR_DATA = 'REALTIME_SET_MONITOR_DATA';
const FAIL_MONITOR_DATA = 'REALTIME_FAIL_DATA';

const SET_PAGE = 'REALTIME_SET_PAGE';
const SET_INPUT_STORE = 'REALTIME_SET_INPUT_STORE';
const SET_INPUT_KEYWORD = 'REALTIME_SET_INPUT_KEYWORD';
const SET_ROW_KEYS = 'REALTIME_SET_ROW_KEYS';

export const fetchData = () => ({
  type: FETCH_MONITOR_DATA,
});

export const setData = (data) => ({
  type: SET_MONITOR_DATA,
  data,
});

export const failData = () => ({ type: FAIL_MONITOR_DATA });

export const setPagination = (page) => ({
  type: SET_PAGE,
  page,
});

export const setInputStore = (store) => ({
  type: SET_INPUT_STORE,
  store,
});

export const setInputKeyword = (keyword) => ({
  type: SET_INPUT_KEYWORD,
  keyword,
});

export const setRowKeys = (rowKeys) => ({
  type: SET_ROW_KEYS,
  rowKeys,
});

const initialState = {
  loading: false,
  pagination: {
    current: 1,
    pageSize: 100,
  },
  search: {
    store: '',
    keyword: '',
  },
  rowKeys: [],
  data: [],
};

const realtimeMonitoringReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case FETCH_MONITOR_DATA:
      return {
        ...prevState,
        loading: true,
      };
    case SET_MONITOR_DATA:
      return {
        ...prevState,
        loading: false,
        data: action.data,
      };
    case FAIL_MONITOR_DATA:
      return {
        ...prevState,
        loading: false,
      };
    case SET_PAGE:
      return {
        ...prevState,
        pagination: {
          ...prevState.pagination,
          current: action.page,
        },
      };
    case SET_INPUT_STORE:
      return {
        ...prevState,
        search: {
          ...prevState.search,
          store: action.store,
        },
      };
    case SET_INPUT_KEYWORD:
      return {
        ...prevState,
        search: {
          ...prevState.search,
          keyword: action.keyword,
        },
      };
    case SET_ROW_KEYS:
      return {
        ...prevState,
        rowKeys: action.rowKeys,
      };

    default:
      return prevState;
  }
};

export default realtimeMonitoringReducer;

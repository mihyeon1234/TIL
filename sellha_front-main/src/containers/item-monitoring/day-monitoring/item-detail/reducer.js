const FETCH_DETAIL = 'MONITORING_FETCH_DETAIL';
const SET_DETAIL = 'MONITORING_SET_DETAIL';
const FAIL_DETAIL = 'MONITORING_FAIL_DETAIL';
const SET_SELECT = 'MONITORING_SET_SELECT';
const UNSET_SELECT = 'MONITORING_UNSET_SELECT';
const SET_SELECTKEYWORDS = 'MONITORING_SET_SELECTKEYWORDS';

export const fetchDetail = () => ({
  type: FETCH_DETAIL,
});

export const setDetail = (item) => ({
  type: SET_DETAIL,
  payload: item,
});

export const setSelectKeywords = (item) => ({
  type: SET_SELECTKEYWORDS,
  payload: item,
});

export const failDetail = () => ({ type: FAIL_DETAIL });

export const setSelect = (item) => ({
  type: SET_SELECT,
  payload: item,
});

export const unsetSelect = () => ({ type: UNSET_SELECT });

export const initialState = {
  loading: false,
  success: false,
  detailInfo: [],
  selectItem: [],
};

const monitoringDetailReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case FETCH_DETAIL:
      return {
        ...prevState,
        loading: true,
        success: false,
      };
    case SET_DETAIL:
      return {
        ...prevState,
        loading: false,
        success: true,
        detailInfo: action.payload,
      };
    case FAIL_DETAIL:
      return {
        ...prevState,
        loading: false,
        success: false,
      };
    case SET_SELECT:
      return {
        ...prevState,
        selectItem: action.payload,
      };
    case UNSET_SELECT:
      return {
        ...prevState,
        selectItem: [],
      };
    case SET_SELECTKEYWORDS:
      return {
        ...prevState,
        detailInfo: { ...prevState.detailInfo, selectKeywords: action.payload },
      };
    default:
      return prevState;
  }
};

export default monitoringDetailReducer;

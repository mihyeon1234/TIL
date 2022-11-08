const FETCH_DATA = 'SEARCH_FETCH_DATA';
const SET_DATA = 'SEARCH_SET_DATA';
const UNSET_DATA = 'SEARCH_UNSET_DATA';
const FAIL_DATA = 'SEARCH_FAIL_DATA';

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

const initialState = {
  loading: false,
  success: false,
  keyword: '',
  attract: 0.0,
  compete: 0.0,
  searchAmount: 0,
  productAmount: 0,
  avgPrice: 0,
  highPrice: 0,
  lowPrice: 0,
  topSales: 0,
  targetSales: 0,
  categoryShare: [{ share: 100, fullPath: 'a > b > c' }],
  brandShare: 0,
  isShopping: false,
  inProject: false,
  relKeywords: [],
  products: [{ imageUrl: '' }],
  growth: '',
  season: '',
  dataChart: {},
  selectTabKey: '1',
};

const keywordSearchReducer = (prevState = initialState, action) => {
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
        ...initialState,
      };
    case FAIL_DATA:
      return {
        ...prevState,
        loading: false,
        success: false,
      };
    default:
      return prevState;
  }
};

export default keywordSearchReducer;

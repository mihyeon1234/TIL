const FETCH_DATA = 'CONTENT_FETCH_DATA';
const SET_DATA = 'CONTENT_SET_DATA';
const UNSET_DATA = 'CONTENT_UNSET_DATA';

export const fetchData = () => ({
  type: FETCH_DATA,
});

export const setData = ({
  compete,
  contentRate,
  keyword,
  keywordAmount,
  list,
}) => ({
  type: SET_DATA,
  compete,
  contentRate,
  keyword,
  keywordAmount,
  list,
});

export const unsetData = () => ({
  type: UNSET_DATA,
});

const initialState = {
  loading: false,
  keyword: '',
  keywordAmount: 0,
  contentCompete: '',
  contentRate: {},
  contentList: [],
};

const contentResearchReducer = (prevState = initialState, action) => {
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
        keyword: action.keyword,
        keywordAmount: action.keywordAmount,
        contentCompete: action.compete,
        contentRate: action.contentRate,
        contentList: action.list,
      };
    case UNSET_DATA:
      return {
        ...initialState,
      };

    default:
      return prevState;
  }
};

export default contentResearchReducer;

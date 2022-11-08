const CATEGORY_TOGGLE_SEARCH = 'CATEGORY_TOGGLE_SEARCH';
const CATEGORY_SEARCH = 'CATEGORY_SEARCH';
const CATEGORY_SET = 'CATEGORY_SET';
const CATEGORY_SELECT = 'CATEGORY_SELECT';
const CATEGORY_INPUT = 'CATEGORY_INPUT';
const CATEGORY_UNSET = 'CATEGORY_UNSET';

// actions
export const toggleSearchMode = () => ({ type: CATEGORY_TOGGLE_SEARCH });
export const inputCategory = (search) => ({
  type: CATEGORY_INPUT,
  payload: search,
});
export const searchCategory = (categories) => ({
  type: CATEGORY_SEARCH,
  payload: categories,
});
export const setCategory = (level, categories) => ({
  type: CATEGORY_SET,
  payload: { level, categories },
});
export const selectCategory = (category) => ({
  type: CATEGORY_SELECT,
  payload: category,
});
export const unsetCategory = () => ({ type: CATEGORY_UNSET });

const initialState = {
  searchMode: false,
  searchName: '',
  searchResults: [],
  category1List: [],
  category2List: [],
  category3List: [],
  category4List: [],
  select: {
    level: 0,
  },
  selectReal: {
    level: 0,
  },
};

const discoverReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case CATEGORY_TOGGLE_SEARCH:
      return {
        ...prevState,
        searchMode: !prevState.searchMode,
      };
    case CATEGORY_INPUT:
      return {
        ...prevState,
        searchName: action.payload,
      };
    case CATEGORY_SEARCH:
      return {
        ...prevState,
        searchResults: action.payload,
      };
    case CATEGORY_SET:
      switch (action.payload.level) {
        case 1:
          return {
            ...prevState,
            category1List: action.payload.categories,
            category2List: [],
            category3List: [],
            category4List: [],
          };
        case 2:
          return {
            ...prevState,
            category2List: action.payload.categories,
            category3List: [],
            category4List: [],
          };
        case 3:
          return {
            ...prevState,
            category3List: action.payload.categories,
            category4List: [],
          };
        case 4:
          return {
            ...prevState,
            category4List: action.payload.categories,
          };
        default:
          return prevState;
      }
    case CATEGORY_SELECT:
      return {
        ...prevState,
        select: action.payload,
        searchName: action.payload.fullPath,
      };
    case 'CATEGORY_SELECT_COPY':
      return {
        ...prevState,
        selectReal: prevState.select,
      };
    case CATEGORY_UNSET:
      return {
        ...initialState,
      };
    default:
      return prevState;
  }
};

export default discoverReducer;

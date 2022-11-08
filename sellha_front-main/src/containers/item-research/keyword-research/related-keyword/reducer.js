const FETCH_RELATED_DATA = 'RELATED_FETCH_DATA';
const SET_RELATED_DATA = 'RELATED_SET_DATA';
const SET_CATEGORY_DATA = 'RELATED_CATEGORY_DATA';
const SET_RELATED_ROW_DATA = 'RELATED_SET_ROW_DATA';
const UNSET_RELATED_ROW_DATA = 'RELATED_UNSET_ROW_DATA';
const SET_PAGE = 'RELATED_SET_PAGE';
const FAIL_RELATED_DATA = 'RELATED_FAIL_DATA';

export const fetchRelatedData = () => ({
  type: FETCH_RELATED_DATA,
});

export const setRelatedData = (list) => ({
  type: SET_RELATED_DATA,
  payload: list,
});

export const setCategoryData = (category) => ({
  type: SET_CATEGORY_DATA,
  payload: category,
});

export const setRowData = (data, rowIndex) => ({
  type: SET_RELATED_ROW_DATA,
  payload: { data, rowIndex },
});

export const unsetRowData = (rowIndex) => ({
  type: UNSET_RELATED_ROW_DATA,
  payload: rowIndex,
});

export const setPagination = (page, filters, currentData) => ({
  type: SET_PAGE,
  payload: { page, filters, currentData },
});

export const failRelatedData = () => ({ type: FAIL_RELATED_DATA });

const initialState = {
  loading: false,
  loadingRow: false,
  pagination: {
    current: 1,
    pageSize: 100,
  },
  category: [],
  relatedData: [],
  originData: [],
  filter: [{ text: '', value: '' }],
  filteredInfo: {
    source: null,
    categoryName: null,
  },
  rowSelect: 0,
};

const relatedKeywordReducer = (prevState = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_RELATED_DATA:
      return {
        ...prevState,
        loading: true,
      };
    case SET_RELATED_DATA: {
      const filterNames = [];
      const filters = [];
      payload.forEach(({ categoryName }) => {
        if (!filterNames.includes(categoryName) && categoryName !== '-') {
          filterNames.push(categoryName);
        }
      });
      filterNames.sort().forEach((element) => {
        filters.push({ text: element, value: element });
      });

      return {
        ...prevState,
        loading: false,
        relatedData: payload,
        originData: payload,
        filter: filters,
      };
    }
    case SET_CATEGORY_DATA: {
      const category = payload.split('>');
      return {
        ...prevState,
        category,
      };
    }
    case SET_RELATED_ROW_DATA: {
      const { data, rowIndex } = payload;
      const index = (prevState.pagination.current - 1) * 100 + rowIndex;
      prevState.relatedData.splice(index, 1, data);
      return {
        ...prevState,
        loadingRow: false,
        relatedData: [...prevState.relatedData],
      };
    }
    case UNSET_RELATED_ROW_DATA:
      return {
        ...prevState,
        loadingRow: true,
        rowSelect: payload,
      };
    case SET_PAGE: {
      const { page, filters, currentData } = payload;

      return {
        ...prevState,
        pagination: page,
        relatedData: currentData,
        filteredInfo: filters,
      };
    }
    case FAIL_RELATED_DATA:
      return {
        ...initialState,
      };
    default:
      return prevState;
  }
};

export default relatedKeywordReducer;

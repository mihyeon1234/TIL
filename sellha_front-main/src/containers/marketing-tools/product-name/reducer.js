const SET_VISIBLE_TOOL = 'NAMING_SET_VISIBLE_TOOL';

const SET_SELECT_KEYWORD = 'NAMING_SET_SELECT_KEYWORD';
const SET_DESELECT_KEYWORD = 'NAMING_SET_DESELECT_KEYWORD';
const UNSET_SELECT_KEYWORD = 'NAMING_UNSET_SELECT_KEYWORD';

const SET_MEMO_KEYWORD = 'NAMING_SET_MEMO_KEYWORD';
const EDIT_MEMO_KEYWORD = 'NAMING_EDIT_MEMO_KEYWORD';

const SET_SAVE_MEMO = 'NAMING_SET_SAVE_MEMO';
const DELETE_SAVE_MEMO = 'NAMING_DELETE_SAVE_MEMO';

const RESET_NAMING_TOOL = 'NAMING_RESET_NAMING_TOOL';

const SET_COMBINATION_KEYWORD = 'NAMING_SET_COMBINATION_KEYWORD';
const SET_COMBINATION_RESULT = 'NAMING_SET_COMBINATION_RESULT';

const SET_SYNONYM_KEYWORD = 'NAMING_SET_SYNONYM_KEYWORD';
const DELETE_SYNONYM_KEYWORD = 'NAMING_DELETE_SYNONYM_KEYWORD';
const RESET_SYNONYM_KEYWORD = 'NAMING_RESET_SYNONYM_KEYWORD';
const SET_SYNONYM_RESULT = 'NAMING_SET_SYNONYM_RESULT';

export const setVisibleTool = () => ({
  type: SET_VISIBLE_TOOL,
});

export const setSelectKeyword = (selectRow) => ({
  type: SET_SELECT_KEYWORD,
  selectRow,
});

export const setDeselectKeyword = (keyword) => ({
  type: SET_DESELECT_KEYWORD,
  keywords: keyword,
});

export const unsetSelectKeyword = () => ({
  type: UNSET_SELECT_KEYWORD,
});

export const setMemoKeyword = (memo) => ({
  type: SET_MEMO_KEYWORD,
  payload: memo,
});

export const editMemoKeyword = (memo) => ({
  type: EDIT_MEMO_KEYWORD,
  payload: memo,
});

export const setSaveMemo = (item) => ({
  type: SET_SAVE_MEMO,
  payload: item,
});

export const deleteSaveMemo = (index) => ({
  type: DELETE_SAVE_MEMO,
  payload: index,
});

export const resetNamingTool = () => ({
  type: RESET_NAMING_TOOL,
});

export const setCombinationKeyword = (keywords) => ({
  type: SET_COMBINATION_KEYWORD,
  payload: keywords,
});

export const setCombinationResult = (result) => ({
  type: SET_COMBINATION_RESULT,
  payload: result,
});

export const setSynonymKeyword = (keywords) => ({
  type: SET_SYNONYM_KEYWORD,
  payload: keywords,
});

export const deleteSynonymKeyword = (keyword) => ({
  type: DELETE_SYNONYM_KEYWORD,
  payload: keyword,
});

export const resetSynonymKeyword = () => ({
  type: RESET_SYNONYM_KEYWORD,
});

export const setSynonymResult = (result) => ({
  type: SET_SYNONYM_RESULT,
  payload: result,
});

const initialState = {
  visibleBox: false,
  visibleTool: false,
  selectKeywords: [],
  memoKeywords: '',
  saveMemos: [],
  combiKeywords: [],
  combiResult: [],
  synoKeywords: [],
  synoResult: ['default'],
};

const productNamingReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case SET_VISIBLE_TOOL:
      return {
        ...prevState,
        visibleTool: !prevState.visibleTool,
      };
    case SET_SELECT_KEYWORD:
      return {
        ...prevState,
        visibleBox: true,
        visibleTool: true,
        selectKeywords: action.selectRow,
      };
    case SET_DESELECT_KEYWORD: {
      const filterKeywords = prevState.selectKeywords.filter(
        (row) => row.relKeyword !== action.keywords,
      );
      return {
        ...prevState,
        selectKeywords: filterKeywords,
      };
    }
    case UNSET_SELECT_KEYWORD:
      return {
        ...prevState,
        selectKeywords: [],
      };
    case SET_MEMO_KEYWORD: {
      const checkSelected = prevState.selectKeywords.filter(
        (keyword) => keyword === action.payload,
      );
      const lastMemo = prevState.memoKeywords;

      const lastMemos = lastMemo.split(' ');
      const check =
        checkSelected.length > 0 || lastMemos.includes(action.payload);

      if (check) {
        return {
          ...prevState,
          memoKeywords: lastMemo,
        };
      }
      return {
        ...prevState,
        memoKeywords:
          lastMemo === '' ? action.payload : `${lastMemo} ${action.payload}`,
      };
    }
    case EDIT_MEMO_KEYWORD:
      return {
        ...prevState,
        memoKeywords: action.payload,
      };
    case SET_SAVE_MEMO: {
      const checkSameMemo = prevState.saveMemos.includes(action.payload);
      return {
        ...prevState,
        memoKeywords: '',
        saveMemos: checkSameMemo
          ? [...prevState.saveMemos]
          : [...prevState.saveMemos, action.payload],
      };
    }
    case DELETE_SAVE_MEMO: {
      prevState.saveMemos.splice(action.payload, 1);
      return {
        ...prevState,
      };
    }
    case RESET_NAMING_TOOL:
      return {
        ...initialState,
      };
    case SET_COMBINATION_KEYWORD:
      return {
        ...prevState,
        combiKeywords: action.payload,
      };
    case SET_COMBINATION_RESULT:
      return {
        ...prevState,
        combiResult: action.payload,
      };
    case SET_SYNONYM_KEYWORD: {
      const checkList = prevState.synoKeywords.indexOf(action.payload) < 0;

      return {
        ...prevState,
        synoResult: ['default'],
        synoKeywords:
          action.payload && checkList
            ? [...prevState.synoKeywords, action.payload]
            : [...prevState.synoKeywords],
      };
    }
    case DELETE_SYNONYM_KEYWORD: {
      const filterKeywords = prevState.synoKeywords.filter(
        (keyword) => keyword !== action.payload,
      );
      return {
        ...prevState,
        synoKeywords: filterKeywords,
      };
    }
    case RESET_SYNONYM_KEYWORD:
      return {
        ...prevState,
        synoKeywords: [],
        synoResult: ['default'],
      };
    case SET_SYNONYM_RESULT:
      return {
        ...prevState,
        synoResult: action.payload,
      };
    default:
      return prevState;
  }
};

export default productNamingReducer;

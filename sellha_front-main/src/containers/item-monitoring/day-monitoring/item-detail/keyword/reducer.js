const FETCH_TABLE = 'KEYWORD_FETCH_TABLE';
const SET_TABLE = 'KEYWORD_SET_TABLE';
const UNSET_TABLE = 'KEYWORD_UNSET_TABLE';
const FETCH_EXCEL = 'KEYWORD_FETCH_EXCEL';
const SET_EXCEL = 'KEYWORD_SET_EXCEL';
const SET_SORT = 'KEYWORD_SET_SORT';
const SET_RANK_SORT = 'KEYWORD_SET_RANK_SORT';
const SET_SORT_TABLE = 'KEYWORD_SET_SORT_TABLE';
// 키워드 추가 및 편집
const SET_VISIBLE_EDIT = 'KEYWORD_SET_VISIBLE_DRAW';
const SET_KEYWORD_LIST = 'KEYWORD_SET_TOTAL';
const SET_TEAM_KEYWORD = 'KEYWORD_SET_TEAM';
const ADD_KEYWORD_LIST = 'KEYWORD_ADD_LIST';
const DEL_KEYWORD_LIST = 'KEYWORD_DEL_LIST';
const RESET_KEYWORD_LIST = 'KEYWORD_RESET_LIST';
const UNSET_KEYWORD_LIST = 'KEYWORD_UNSET_LIST';

// 순위 알림
const SET_VISIBLE_ALARM = 'KEYWORD_SET_VISIBLE_ALARM';

export const fetchTable = () => ({ type: FETCH_TABLE });

export const setSortTable = (data) => ({
  type: SET_SORT_TABLE,
  payload: data,
});
export const setTable = (item) => ({
  type: SET_TABLE,
  payload: item,
});

export const unsetTable = () => ({ type: UNSET_TABLE });

export const fetchExcel = () => ({
  type: FETCH_EXCEL,
});

export const setExcel = (item) => ({
  type: SET_EXCEL,
  payload: item,
});

export const setSort = (data) => ({
  type: SET_SORT,
  payload: data,
});

export const setRankSort = (data) => ({
  type: SET_RANK_SORT,
  payload: data,
});

export const setVisibleEdit = () => ({ type: SET_VISIBLE_EDIT });

export const setKeywordList = (saved, total, title, tag) => ({
  type: SET_KEYWORD_LIST,
  payload: { saved, total, title, tag },
});

export const setTeamKeyword = (keyword) => ({
  type: SET_TEAM_KEYWORD,
  payload: keyword,
});

export const addKeywordList = (keyword) => ({
  type: ADD_KEYWORD_LIST,
  payload: keyword,
});

export const delKeywordList = (keyword) => ({
  type: DEL_KEYWORD_LIST,
  payload: keyword,
});

export const resetKeywordList = (keyword) => ({
  type: RESET_KEYWORD_LIST,
  payload: keyword,
});

export const unsetKeywordList = () => ({
  type: UNSET_KEYWORD_LIST,
});

export const setVisibleAlarm = (isOpen) => ({
  type: SET_VISIBLE_ALARM,
  payload: isOpen,
});

export const initialState = {
  loading: false,
  success: false,
  visibleEdit: false,
  visibleAlarm: false,
  table: [],
  excel: [],
  successExcel: false,
  sortType: 'custom',
  rankSort: 'default',
  keywordList: {
    savedList: [],
    addList: [],
    delList: [],
    totalList: [],
    recommendList: { title: [], tag: [], team: [] },
  },
};

const keywordMonitoringReducer = (
  prevState = initialState,
  { type, payload },
) => {
  switch (type) {
    case SET_SORT_TABLE:
      return {
        ...prevState,
        table: {
          ...prevState.table,
          list: payload,
        },
      };
    case FETCH_TABLE:
      return {
        ...prevState,
        loading: true,
        success: false,
      };
    case SET_TABLE:
      return {
        ...prevState,
        loading: false,
        success: true,
        table: payload,
        rankSort: 'default',
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
        excel: payload,
      };
    case UNSET_TABLE:
      return {
        ...initialState,
      };
    case SET_SORT:
      return {
        ...prevState,
        sortType: payload,
      };
    case SET_RANK_SORT:
      return {
        ...prevState,
        rankSort: payload,
      };
    case SET_VISIBLE_EDIT:
      return {
        ...prevState,
        visibleEdit: !prevState.visibleEdit,
      };
    // 저장 키워드 + 토탈 키워드 + 상품명 키워드 + 태그 키워드
    case SET_KEYWORD_LIST: {
      return {
        ...prevState,
        keywordList: {
          ...prevState.keywordList,
          savedList: payload.saved,
          totalList: payload.total,
          recommendList: {
            ...prevState.keywordList.recommendList,
            tag: payload.tag,
            title: payload.title,
          },
        },
      };
    }
    // 팀 키워드
    case SET_TEAM_KEYWORD: {
      return {
        ...prevState,
        keywordList: {
          ...prevState.keywordList,
          recommendList: {
            ...prevState.keywordList.recommendList,
            team: payload,
          },
        },
      };
    }
    // 새로 담는 키워드 && 기존에 저장된 키워드 && 삭제 키워드 중복 체크
    case ADD_KEYWORD_LIST: {
      const {
        keywordList: { totalList, addList, delList },
      } = prevState;
      const checkList =
        totalList.indexOf(payload) < 0 && addList.indexOf(payload) < 0;
      const filterDelList = delList.filter((keyword) => keyword !== payload);

      return {
        ...prevState,
        keywordList: {
          ...prevState.keywordList,
          addList: payload && checkList ? [...addList, payload] : [...addList],
          delList: filterDelList,
        },
      };
    }
    // 새로 담은 키워드 && 기존 키워드 && 삭제 키워드 중복 체크
    case DEL_KEYWORD_LIST: {
      const {
        keywordList: { totalList, addList, delList },
      } = prevState;

      const filterSavedList = totalList.filter(
        (keyword) => keyword !== payload,
      );
      const filterAddList = addList.filter((keyword) => keyword !== payload);
      const checkList = delList.indexOf(payload) < 0;

      return {
        ...prevState,
        keywordList: {
          ...prevState.keywordList,
          totalList: filterSavedList,
          addList: filterAddList,
          delList: checkList ? [...delList, payload] : [...delList],
        },
      };
    }
    // 담은 키워드 목록 초기화
    case RESET_KEYWORD_LIST: {
      const {
        keywordList: { totalList },
      } = prevState;

      const filterDelList = totalList.filter((keyword) => keyword !== payload);

      return {
        ...prevState,
        keywordList: {
          ...prevState.keywordList,
          delList: filterDelList,
          addList: [],
          totalList: [payload],
        },
      };
    }
    case UNSET_KEYWORD_LIST: {
      return {
        ...prevState,
        keywordList: {
          ...prevState.keywordList,
          addList: [],
          delList: [],
          totalList: [
            ...prevState.keywordList.totalList,
            ...prevState.keywordList.addList,
          ],
        },
      };
    }
    case SET_VISIBLE_ALARM:
      return {
        ...prevState,
        visibleAlarm: payload || !prevState.visibleAlarm,
      };
    default:
      return prevState;
  }
};

export default keywordMonitoringReducer;

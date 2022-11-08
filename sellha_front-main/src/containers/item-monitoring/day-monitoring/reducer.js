const FETCH_DATA = 'MONITORING_FETCH_DATA';

const SET_DATA = 'MONITORING_SET_DATA';
const ADD_DATA = 'MONITORING_ADD_DATA';
const SET_FAVORITE = 'MONITORING_SET_FAVORITE';
const SET_SELECTED_DELETE_ITEMS = 'MONITORING_SET_SELECTED_DELETE_ITEMS';
const SET_SELECTED_FOLDER_ITEMS = 'MONITORING_SET_SELECTED_FOLDER_ITEMS';
const SET_SELECTED_ALL_ITEMS = 'MONITORING_SET_SELECTED_ALL_ITEMS';
const CANCLE_SELECTED_ITEMS = 'MONITORING_CANCLE_SELECTED_ITEMS';
const SET_DELETE_ITEMS = 'MONITORING_SET_DELETE_ITEMS';
const SET_FOLDERS_DATA = 'MONITORING_SET_FOLDERS_DATA';
const UNSET_DATA = 'MONITORING_UNSET_DATA';
const FAIL_DATA = 'MONITORING_FAIL_DATA';

// FOLDER
const SET_FOLDER_ID = 'MONITORING_SET_FOLDER_ID';
const ADD_NEW_FOLDER = 'MONITORING_ADD_NEW_FOLDER';
const MOVE_FOLDER = 'MONITORING_MOVE_FOLDER';
const EDIT_FOLDER = 'MONITORING_EDIT_FOLDER';
const DELETE_FOLDER = 'MONITORING_DELETE_FOLDER';
const CLICK_FOLDER_BUTTON = 'MONITORING_CLICK_FOLDER_BUTTON';
const CLICK_OUTSIDE_BUTTON = 'MONITORING_CLICK_OUTSIDE_BUTTON';

export const fetchData = () => ({ type: FETCH_DATA });

export const setData = (items) => ({
  type: SET_DATA,
  payload: items,
});

export const addData = (code, productId) => ({
  type: ADD_DATA,
  payload: { code, productId },
});

export const setFavorite = (id, type) => ({
  type: SET_FAVORITE,
  payload: { id, type },
});

export const setSelectedDeleteItems = (productId) => ({
  type: SET_SELECTED_DELETE_ITEMS,
  productId,
});

export const setSelectedFolderItems = (productId) => ({
  type: SET_SELECTED_FOLDER_ITEMS,
  productId,
});

export const setSelectedAllItems = (isSelectedAll, buttonType, folderId) => ({
  type: SET_SELECTED_ALL_ITEMS,
  isSelectedAll,
  buttonType,
  folderId,
});

export const cancleSelectedItems = () => ({
  type: CANCLE_SELECTED_ITEMS,
});

export const setDeleteItems = (items) => ({
  type: SET_DELETE_ITEMS,
  items,
});

export const setFoldersData = (folders) => ({
  type: SET_FOLDERS_DATA,
  payload: folders,
});

export const unsetData = () => ({ type: UNSET_DATA });

export const failData = () => ({ type: FAIL_DATA });

// FOLDER

export const setFolderId = (folderId) => ({
  type: SET_FOLDER_ID,
  folderId,
});

export const addNewFolder = (productIds, folderInfo) => ({
  type: ADD_NEW_FOLDER,
  productIds,
  folder: {
    id: folderInfo.id,
    name: folderInfo.name,
  },
});

export const moveFolder = (data) => ({
  type: MOVE_FOLDER,
  data,
});

export const editFolder = (folderId, newItems) => ({
  type: EDIT_FOLDER,
  folderId,
  newItems,
});

export const deleteFolder = (folderId) => ({
  type: DELETE_FOLDER,
  folderId,
});

export const clickFolderButton = (buttonType) => ({
  type: CLICK_FOLDER_BUTTON,
  buttonType,
});

export const clickOutsideButton = () => ({
  type: CLICK_OUTSIDE_BUTTON,
});

export const initialState = {
  loading: false,
  success: false,
  message: {
    code: 0,
    productId: '',
  },
  items: [],
  folderId: 0,
  folders: [],
  isClickedButton: {
    folderPage: false,
    folderMove: false,
  },
};

const monitoringReducer = (prevState = initialState, action) => {
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
        items: action.payload,
      };
    case SET_FOLDERS_DATA:
      return {
        ...prevState,
        folders: action.payload,
      };
    case SET_FAVORITE:
      return {
        ...prevState,
        items: prevState.items.map((item) =>
          item.product_id === action.payload.id
            ? { ...item, favorite: action.payload.type }
            : item,
        ),
      };
    case UNSET_DATA:
      return {
        ...prevState,
        message: {
          code: 0,
          productId: '',
        },
      };
    case FAIL_DATA:
      return {
        ...prevState,
        loading: false,
        items: [],
      };
    case ADD_DATA:
      return {
        ...prevState,
        message: {
          code: action.payload.code,
          productId: action.payload.productId,
        },
      };
    case MOVE_FOLDER: {
      const { productId, folderId } = action.data;

      const newItems = prevState.items.map((item) => {
        if (productId.includes(item.product_id)) {
          return {
            ...item,
            clickedTrash: false,
            clickedFolder: false,
            folder_id: folderId ?? 0,
          };
        }
        return item;
      });

      return {
        ...prevState,
        loading: false,
        items: newItems,
      };
    }
    case SET_FOLDER_ID:
      return {
        ...prevState,
        folderId: action.folderId,
      };
    case ADD_NEW_FOLDER: {
      const newItems = prevState.items.map((item) => {
        if (action.productIds.includes(item.product_id)) {
          return {
            ...item,
            clickedTrash: false,
            clickedFolder: false,
            folder_id: action.folder.id,
          };
        }
        return item;
      });
      return {
        ...prevState,
        folders: [...prevState.folders, action.folder],
        items: newItems,
      };
    }
    case EDIT_FOLDER:
      return {
        ...prevState,
        folders: prevState.folders.map((folder) => {
          if (folder.id === action.folderId) {
            return { ...folder, name: action.newItems };
          }
          return folder;
        }),
      };
    case DELETE_FOLDER:
      return {
        ...prevState,
        folders: prevState.folders.filter(
          (folder) => folder.id !== action.folderId,
        ),
        items: prevState.items.map((item) => {
          if (item.folder_id === action.folderId) {
            return { ...item, folder_id: 0 };
          }
          return item;
        }),
      };
    case SET_SELECTED_DELETE_ITEMS:
      return {
        ...prevState,
        items: prevState.items.map((item) =>
          item.product_id === action.productId
            ? {
                ...item,
                clickedTrash: !item.clickedTrash,
              }
            : item,
        ),
      };
    case SET_SELECTED_FOLDER_ITEMS:
      return {
        ...prevState,
        items: prevState.items.map((item) =>
          item.product_id === action.productId
            ? {
                ...item,
                clickedFolder: !item.clickedFolder,
              }
            : item,
        ),
      };
    case SET_SELECTED_ALL_ITEMS:
      return {
        ...prevState,
        items: prevState.items.map((item) =>
          item.folder_id === action.folderId
            ? {
                ...item,
                [action.buttonType]: action.isSelectedAll,
              }
            : item,
        ),
      };
    case CANCLE_SELECTED_ITEMS:
      return {
        ...prevState,
        items: prevState.items.map((item) => ({
          ...item,
          clickedTrash: false,
          clickedFolder: false,
        })),
      };
    case SET_DELETE_ITEMS: {
      const filterItems = prevState.items.filter(
        (item) => !action.items.includes(item.product_id),
      );

      return {
        ...prevState,
        items: filterItems,
      };
    }
    case CLICK_FOLDER_BUTTON: {
      const button = action.buttonType;
      return {
        ...prevState,
        isClickedButton: {
          ...prevState.isClickedButton,
          [button]: !prevState.isClickedButton[button],
        },
      };
    }
    case CLICK_OUTSIDE_BUTTON:
      return {
        ...prevState,
        isClickedButton: {
          folderPage: false,
          folderMove: false,
        },
      };
    default:
      return prevState;
  }
};

export default monitoringReducer;

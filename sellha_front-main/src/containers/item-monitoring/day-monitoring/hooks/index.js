import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ReactGA from 'react-ga';
import Swal from 'sweetalert2';

import { addItem, deleteItem, getItems, moveItem } from 'http-api';
import {
  setDeleteItems,
  setFolderId,
  setSelectedDeleteItems,
  setSelectedAllItems,
  setSelectedFolderItems,
  cancleSelectedItems,
  clickFolderButton,
  failData,
  fetchData,
  setData,
  addData,
  unsetData,
  setFoldersData,
  moveFolder,
} from '../reducer';

export const useItemCard = () => {
  const dispatch = useDispatch();

  const { message } = useSelector((state) => state.dayMonitoring);

  const [visibleAddModal, setVisibleAddModal] = useState(false);
  const [urlValue, setUrlValue] = useState('');

  const fetchItemList = async () => {
    dispatch(fetchData());
    try {
      const { results } = await getItems();

      dispatch(setData(results.products));
      dispatch(setFoldersData(results.folders));
    } catch (error) {
      dispatch(failData());
    }
  };

  const fetchNewItemList = async (success) => {
    await fetchItemList();

    dispatch(addData(0, success));
    setVisibleAddModal(false);
    setUrlValue('');
  };

  const onClickAddButton = () => {
    setVisibleAddModal((prev) => !prev);
  };

  const onCancelModal = () => {
    setVisibleAddModal((prev) => !prev);
    setUrlValue('');
    dispatch(unsetData());
  };

  const onChangeInput = (e) => setUrlValue(e.target.value);

  const onClickSubmitAdd = async () => {
    try {
      const result = await addItem({
        productUrl: urlValue,
      });

      if (result?.message === 'error') {
        dispatch(addData(2));
      } else {
        const { success } = result;

        if (success) {
          setTimeout(() => fetchNewItemList(success), 500);
        }
        if (!success) {
          dispatch(addData(1));
        }
      }
    } catch (error) {
      dispatch(addData(2));
    }
  };

  const onCloseNoti = () => dispatch(unsetData());

  useEffect(
    () => () => {
      dispatch(unsetData());
      setVisibleAddModal(false);
      setUrlValue('');
    },
    [],
  );

  return {
    message,
    visibleAddModal,
    urlValue,
    onClickAddButton,
    onCancelModal,
    onChangeInput,
    onClickSubmitAdd,
    onCloseNoti,
  };
};

export const useItemList = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { items, folders, folderId, loading } = useSelector(
    (state) => state.dayMonitoring,
  );

  const [list, setList] = useState([]);

  const fetchItemList = async () => {
    dispatch(fetchData());
    try {
      const { results } = await getItems();

      dispatch(setData(results.products));
      dispatch(setFoldersData(results.folders));
    } catch (error) {
      dispatch(failData());
    }
  };

  useEffect(() => {
    if (!folderId) {
      setList(items?.filter((item) => item?.folder_id === 0));
    } else {
      setList(items?.filter((item) => folderId === item.folder_id));
    }
  }, [items, folderId]);

  useEffect(() => {
    document.title = `셀링하니`;
    ReactGA.initialize('UA-208504722-1');
    ReactGA.pageview(window.location.pathname + window.location.search);

    dispatch(setFolderId(location.state?.id));
    fetchItemList();

    return () => {
      dispatch(failData());
    };
  }, []);

  return { list, folders, loading, fetchItemList };
};

export const useSelectItemCard = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { items, folderId } = useSelector((state) => state.dayMonitoring);

  const [isAllCheck, setIsAllCheck] = useState(false);
  const [locationState, setLocationState] = useState({
    back: '',
    now: '',
  });

  const hasClickedTrash = items.some((item) => item.clickedTrash);
  const hasClickedFolder = items.some((item) => item.clickedFolder);
  const deleteItems = items.filter(({ clickedTrash }) => clickedTrash);
  const moveItems = items.filter(({ clickedFolder }) => clickedFolder);

  const onClickIcon = (type, productId) => {
    if (type === 'trash') {
      dispatch(setSelectedDeleteItems(productId));
    } else {
      dispatch(setSelectedFolderItems(productId));
    }
  };

  const onClickAllCheck = (textType, buttonType, folderIds) => {
    dispatch(setSelectedAllItems(textType === 'select', buttonType, folderIds));
  };

  const showAlert = () =>
    Swal.fire({
      text: '상품을 삭제하시겠습니까?',
      showDenyButton: true,
      confirmButtonText: `확인`,
      denyButtonText: `닫기`,
      showClass: {
        popup: 'animate__animated animate__fadeIn animate__faster',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOut animate__faster',
      },
      confirmButtonColor: '#FFC83A',
      denyButtonColor: '#D9D9D9',
      allowEnterKey: false,
    });

  const onClickCancle = () => {
    dispatch(cancleSelectedItems());
  };

  const onClickDelete = () => {
    const hasUnclicked = items.every((item) => !item.clickedTrash);
    if (hasUnclicked) return;

    showAlert().then(async ({ isConfirmed }) => {
      if (isConfirmed) {
        const deleteItemIds = items
          .filter((item) => item.clickedTrash)
          .map((item) => item.product_id);
        try {
          await deleteItem({
            pid: deleteItemIds,
          });
          dispatch(setDeleteItems(deleteItemIds));
        } catch (error) {
          Swal.fire('삭제를 실패했습니다.', '', 'error');
        }
      }
    });
  };

  const fetchMoveItems = async (productId, moveFolderId) => {
    const isChecked = items
      .filter((item) => item.clickedFolder)
      .map((item) => item.product_id);
    const productIds = productId || isChecked;

    try {
      const { message } = await moveItem({
        pid: productIds,
        folderId: moveFolderId,
      });

      if (message === 'ok') {
        dispatch(
          moveFolder({
            productId: productIds,
            folderId: moveFolderId,
          }),
        );
      }
    } catch (error) {
      Swal.alert('잠시 후 다시 시도해 주세요.');
    }
  };

  const onClickFolderLink = (folder) => {
    if (hasClickedFolder) {
      fetchMoveItems(undefined, folder.id);
    } else {
      dispatch(setFolderId(folder.id));
    }
  };

  const onClickFolderButton = (type) => {
    dispatch(clickFolderButton(type));
  };

  useEffect(() => {
    if (items.length > 0) {
      const filterItems = items.filter(
        (item) => item.folder_id === (folderId || 0),
      );
      const result = filterItems.every(
        (item) => item.clickedTrash || item.clickedFolder,
      );
      setIsAllCheck(result);
    }
  }, [items, folderId]);

  useEffect(() => {
    // 선택 바 활성화 되어있는 상태에서 이동 시 리셋하기 위함
    setLocationState((prev) => ({
      ...prev,
      back: prev.now,
      now: location.pathname,
    }));

    return () => {
      if (locationState.now !== locationState.back) {
        dispatch(cancleSelectedItems());
      }
    };
  }, [location]);

  useEffect(
    () => () => {
      if (!locationState.now && !locationState.back && !hasClickedFolder) {
        dispatch(cancleSelectedItems());
      }
      setLocationState({
        back: '',
        now: '',
      });
    },
    [],
  );

  return {
    isAllCheck,
    hasClickedTrash,
    hasClickedFolder,
    deleteItems,
    moveItems,
    setIsAllCheck,
    onClickIcon,
    onClickAllCheck,
    onClickCancle,
    onClickDelete,
    onClickMoveItems: fetchMoveItems,
    onClickFolderLink,
    onClickFolderButton,
  };
};

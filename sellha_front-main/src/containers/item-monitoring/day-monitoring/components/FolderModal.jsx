import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Input, Modal } from 'antd';
import Swal from 'sweetalert2';

import { createFolder, editFolderName } from 'http-api';
import {
  addNewFolder,
  editFolder,
} from 'containers/item-monitoring/day-monitoring/reducer';

const useFolderModal = (setVisibleModal) => {
  const dispatch = useDispatch();

  const { items, folders, visibleFolderModal } = useSelector(
    (state) => state.dayMonitoring,
  );

  const [inputText, setInputText] = useState('');
  const [errorFlag, setErrorFlag] = useState({
    blank: false,
    duplication: false,
  });

  const onChangeFolderName = ({ target: { value } }) => {
    const regValue = value.replace(/\s/g, '');

    setInputText(regValue);
  };

  const onCancelModal = () => {
    setVisibleModal(false);
    setInputText('');
    setErrorFlag({
      blank: false,
      duplication: false,
    });
  };

  const checkInput = () => {
    const checkDuplication = folders.filter(
      (folder) => folder.name === inputText.trim(),
    );

    if (!inputText) {
      // 빈 값
      setErrorFlag((prev) => ({
        ...prev,
        blank: true,
        duplication: false,
      }));
      return true;
    }
    if (checkDuplication.length) {
      // 중복 폴더명 입력 시
      setErrorFlag((prev) => ({
        ...prev,
        duplication: true,
        blank: false,
      }));
      return true;
    }
    return false;
  };

  const changeNewFolder = async (folder) => {
    try {
      const result = await editFolderName({
        folderId: folder.id,
        folderName: inputText,
      });

      if (result) dispatch(editFolder(folder.id, inputText));
    } catch (error) {
      Swal.fire('다시 한번 시도해주세요.', '', 'error');
    }
  };

  const AddNewFolder = async (dndData) => {
    const dragDropProducts = [
      dndData?.drag?.product_id,
      dndData?.drop?.product_id,
    ];
    const clickedProducts = items
      .filter(({ clickedFolder }) => clickedFolder)
      .map((item) => item.product_id);

    const productIds = dndData ? dragDropProducts : clickedProducts;

    try {
      const newFolder = await createFolder({
        pid: productIds,
        folderName: inputText,
      });

      dispatch(
        addNewFolder(productIds, {
          id: newFolder.id,
          name: inputText,
        }),
      );
    } catch (error) {
      Swal.fire('다시 한번 시도해주세요.', '', 'error');
    }
  };

  const onPressSubmit = (type, folder, dndData) => {
    if (checkInput()) return;

    if (type === 'change') {
      // 폴더명 변경
      changeNewFolder(folder);
    } else {
      // 폴더 생성
      AddNewFolder(dndData);
    }

    setVisibleModal(false);
    setInputText('');
    setErrorFlag({
      blank: false,
      duplication: false,
    });
  };

  return {
    visibleFolderModal,
    inputText,
    errorFlag,
    onCancelModal,
    onChangeFolderName,
    onPressSubmit,
  };
};

const MainModal = ({
  visibleModal,
  setVisibleModal,
  type,
  dndData,
  folder,
}) => {
  const {
    inputText,
    errorFlag,
    onCancelModal,
    onChangeFolderName,
    onPressSubmit,
  } = useFolderModal(setVisibleModal);

  return (
    <FolderModalContainer
      visible={visibleModal}
      onCancel={onCancelModal}
      onOk={() => onPressSubmit(type, folder, dndData)}
      centered
      width={400}
      okText={type === 'change' ? '변경하기' : '만들기'}
      cancelText="취소하기"
    >
      <FolderModalTitle>
        {type === 'change' ? '폴더 이름 변경하기' : '폴더 만들기'}
      </FolderModalTitle>
      <FolderModalInput
        type="text"
        placeholder="폴더 이름"
        value={inputText}
        onChange={onChangeFolderName}
        onPressEnter={() => onPressSubmit(type, folder, dndData)}
      />
      {errorFlag.duplication && (
        <ErrorMessage>🚨 이미 사용하고 있는 폴더명입니다.</ErrorMessage>
      )}
      {errorFlag.blank && (
        <ErrorMessage>🚨 폴더 이름을 입력해 주세요.</ErrorMessage>
      )}
    </FolderModalContainer>
  );
};

export default MainModal;

const FolderModalContainer = styled(Modal)`
  .ant-modal-content {
    border-radius: 10px;
    padding: 10px;
  }
  .ant-modal-footer {
    display: flex;
    justify-content: center;
    padding-top: 1rem;
  }
  .ant-btn {
    text-shadow: none;
    border-radius: 8px;
    height: 38px;
    padding: 4px 22px;
    font-size: 0.85rem;
    border: 1px solid ${({ theme }) => theme.colors.lineGray};
    :hover {
      font-weight: 600;
    }
  }
`;

const FolderModalTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 1.2rem;
`;

const FolderModalInput = styled(Input)`
  border: 1px solid ${({ theme }) => theme.colors.lineGray};
  border-radius: 5px;
  padding: 8px 20px;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const ErrorMessage = styled.div`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.danger};
  padding: 0 0.5rem;
  animation: fadein 0.8s;
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-webkit-keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

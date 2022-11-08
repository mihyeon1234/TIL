import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';

import { useDrop } from 'react-dnd';
import { MoreOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';

import { deleteItem, removeFolder } from 'http-api';

import {
  setFolderId,
  deleteFolder,
  setDeleteItems,
} from 'containers/item-monitoring/day-monitoring/reducer';

import FolderModal from '../../components/FolderModal';
import Preview from './Preview';

const useSettingFolerItem = (folder) => {
  const dispatch = useDispatch();
  const modalRef = useRef();

  const { items } = useSelector((state) => state.dayMonitoring);
  const [folderItems, setFolderItems] = useState([]);
  const [visibleOption, setVisibleOption] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);

  const onClickLinkFolder = () => {
    dispatch(setFolderId(folder.id));
  };

  const onClickMoreIcon = () => {
    setVisibleOption((prev) => !prev);
  };

  const onClickFolderName = () => {
    setVisibleModal(true);
    setVisibleOption(false);
  };

  const onClickClearFolder = () => {
    setVisibleOption(false);

    Swal.fire({
      html: `폴더를 해제하시겠습니까? <br/> <span style="font-size: 14px;">* 폴더만 삭제되며, 담긴 상품 카드들은 전체 리스트로 담깁니다.</span>`,
      showDenyButton: true,
      confirmButtonText: `확인`,
      denyButtonText: `취소`,
      showClass: {
        popup: 'animate__animated animate__fadeIn animate__faster',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOut animate__faster',
      },
      confirmButtonColor: '#FFC83A',
      denyButtonColor: '#D9D9D9',
      allowEnterKey: false,
    }).then(async (res) => {
      if (res.isConfirmed)
        try {
          await removeFolder({ folderId: folder.id });
          dispatch(deleteFolder(folder.id));
        } catch (error) {
          Swal.fire('다시 한번 시도해주세요.', '', 'error');
        }
    });
  };

  const onClickDeleteFolder = () => {
    setVisibleOption(false);

    Swal.fire({
      html: `폴더를 삭제하시겠습니까? <br/> <span style="font-size: 14px;">* 담긴 상품 카드들도 모두 삭제됩니다.</span>`,
      showDenyButton: true,
      confirmButtonText: `확인`,
      denyButtonText: `취소`,
      showClass: {
        popup: 'animate__animated animate__fadeIn animate__faster',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOut animate__faster',
      },
      confirmButtonColor: '#FFC83A',
      denyButtonColor: '#D9D9D9',
      allowEnterKey: false,
    }).then(async (res) => {
      if (res.isConfirmed) {
        const deleteProductIds = folderItems.map((item) => item.product_id);
        try {
          await deleteItem({
            pid: deleteProductIds,
          });
          await removeFolder({ folderId: folder.id });
          dispatch(setDeleteItems(deleteProductIds));
          dispatch(deleteFolder(folder.id));
        } catch (error) {
          Swal.fire('다시 한번 시도해주세요.', '', 'error');
        }
      }
    });
  };

  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: ['card', 'preview'],
    drop: (item) => ({
      data: item.item,
      folderId: folder.id,
    }),
    collect: (card) => ({
      isOver: card.isOver(),
      canDrop: card.canDrop(),
    }),
  }));

  useEffect(() => {
    setFolderItems(items.filter((item) => item.folder_id === folder.id));
  }, [items]);

  useEffect(() => {
    document.addEventListener(
      'mousedown',
      ({ target }) =>
        !modalRef.current?.contains(target) && setVisibleOption(false),
    );
    return () => {
      setVisibleModal(false);
      setVisibleOption(false);
    };
  }, []);

  return {
    modalRef,
    folderItems,
    visibleOption,
    visibleModal,
    isOver,
    canDrop,
    drop,
    onClickLinkFolder,
    onClickMoreIcon,
    setVisibleModal,
    onClickFolderName,
    onClickClearFolder,
    onClickDeleteFolder,
  };
};

const FolderCard = ({ folder, match }) => {
  const {
    modalRef,
    folderItems,
    visibleOption,
    visibleModal,
    isOver,
    canDrop,
    drop,
    setVisibleModal,
    onClickLinkFolder,
    onClickMoreIcon,
    onClickFolderName,
    onClickClearFolder,
    onClickDeleteFolder,
  } = useSettingFolerItem(folder);

  return (
    <FolderContainer ref={drop} dropBoxArea={isOver && canDrop}>
      <FolderHead>
        <FolderLink
          to={{
            pathname: `${match.url}/folder/${folder.id}`,
            state: folder,
          }}
          onClick={onClickLinkFolder}
        >
          <FolderTitle>
            <FolderName>{folder.name}</FolderName>
            <FolderCount>상품 {folderItems.length}개</FolderCount>
          </FolderTitle>
        </FolderLink>
        <div ref={modalRef}>
          <MoreOutlined onClick={onClickMoreIcon} />
          {visibleOption && (
            <OptionBarContainer>
              <OptionText onClick={onClickFolderName}>폴더명 변경</OptionText>
              <OptionText onClick={onClickClearFolder}>폴더 해제</OptionText>
              <OptionText onClick={onClickDeleteFolder}>폴더 삭제</OptionText>
            </OptionBarContainer>
          )}
        </div>
      </FolderHead>
      <FolderBody>
        {folderItems.map((item) => (
          <Preview key={item.product_id} item={item} folder={folder} />
        ))}
      </FolderBody>
      {visibleModal && (
        <FolderModal
          type="change"
          visibleModal={visibleModal}
          setVisibleModal={setVisibleModal}
          folder={folder}
        />
      )}
    </FolderContainer>
  );
};

export default FolderCard;

const OptionBarContainer = styled.div`
  position: absolute;
  background: ${({ theme }) => theme.colors.white};
  box-shadow: rgb(0 0 0 / 10%) 0px 0px 8px;
  right: 12px;
  top: 40px;
  padding: 4px 2px;
`;

const OptionText = styled.div`
  cursor: pointer;
  padding: 2px 10px;
  font-size: 0.8rem;
  font-weight: 300;
  &:hover {
    font-weight: 500;
    background: ${({ theme }) => theme.colors.lineGray};
  }
`;

const FolderBody = styled.div`
  height: 240px;
  max-height: 185px;

  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.lightGray};
    border-radius: 10px;
  }
  ::-webkit-scrollbar-track {
    display: none;
  }
`;

const FolderName = styled.span`
  margin: 0 5px;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 1px;
  color: ${({ theme }) => theme.colors.darkGray};

  ::after {
    content: '|';
    color: ${({ theme }) => theme.colors.lightGray};
    padding-left: 6px;
  }
`;

const FolderContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  background-color: #fafbff;
  width: 30%;
  height: 200px;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  border-radius: 1.25em;
  box-shadow: ${({ dropBoxArea }) =>
    dropBoxArea
      ? '1px 1px 8px 3px rgba(190, 203, 255, 0.63)'
      : '1px 1px 8px 0 rgba(215, 223, 255, 0.63)'};
  min-height: 18em;
  padding: 1.2em 0.8em;
  justify-content: space-between;
  box-sizing: border-box;

  ${({ dropBoxArea }) =>
    dropBoxArea &&
    css`
      ${FolderName} {
        color: ${({ theme }) => theme.colors.blue};
      }
    `}

  @media ${(props) => props.theme.mobile} {
    width: 100%;
  }
`;

const FolderHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FolderCount = styled.span`
  font-size: 0.8rem;
  letter-spacing: 0.8px;
`;

const FolderLink = styled(Link)`
  width: 90%;
  :hover {
    ${FolderName} {
      color: ${({ theme }) => theme.colors.black};
    }
    ${FolderCount} {
      color: ${({ theme }) => theme.colors.black};
    }
  }
`;

const FolderTitle = styled.div`
  display: flex;
  align-items: center;
`;

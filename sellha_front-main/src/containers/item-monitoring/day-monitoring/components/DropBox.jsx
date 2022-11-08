import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelectItemCard } from '../hooks';
import { clickOutsideButton } from '../reducer';

const TabDropdown = ({ buttonRef }) => {
  const dispatch = useDispatch();
  const { folderId, folders } = useSelector((state) => state.dayMonitoring);

  const { onClickFolderLink } = useSelectItemCard();

  const filterFolder = folders.filter((folder) => folder.name !== folderId);

  const getLinkPath = (folder) => {
    if (folderId) {
      return {
        pathname: `/monitoring/folder/${folder.id}`,
        state: folder,
      };
    }
    return '/monitoring';
  };

  const onClickOutside = ({ target }) => {
    if (!buttonRef.contains(target)) {
      dispatch(clickOutsideButton());
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', onClickOutside);

    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [buttonRef]);

  return (
    <DropdownContainer>
      {filterFolder.map((folder) => (
        <Link
          key={folder.id}
          to={getLinkPath(folder)}
          onClick={() => onClickFolderLink(folder)}
        >
          <FolderList>{folder.name}</FolderList>
        </Link>
      ))}
    </DropdownContainer>
  );
};

export default TabDropdown;

const DropdownContainer = styled.div`
  width: 100%;
  max-height: 300px;
  overflow-y: auto;
  background: ${({ theme }) => theme.colors.white};
  position: absolute;
  top: 32px;
  left: 3px;
  box-shadow: rgb(0 0 0 / 10%) 0px 0px 8px;
  z-index: 2;

  /* IE and Edge */
  -ms-overflow-style: none;
  /* Firefox */
  scrollbar-width: none;
  ::-webkit-scrollbar {
    bottom: 0;
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
    border-radius: 6px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 6px;
    background-color: transparent;
    background-clip: padding-box;
    border: 1px solid transparent;
  }
  &:hover::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.089);
  }
  ::-webkit-scrollbar-button {
    width: 0;
    height: 0;
    display: none;
  }
`;

const FolderList = styled.div`
  padding: 8px 10px;
  min-width: 90px;
  font-weight: 300;
  font-size: 0.85rem;

  &:hover {
    background-color: #f6f6f6;
    color: ${({ theme }) => theme.colors.black};
    font-weight: 500;
  }
`;

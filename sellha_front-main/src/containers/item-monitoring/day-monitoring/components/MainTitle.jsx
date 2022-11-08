import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';

import { RightOutlined, CaretDownOutlined } from '@ant-design/icons';

import DropBox from './DropBox';
import FolderModal from './FolderModal';
import { useSelectItemCard } from '../hooks';

const Title = () => {
  const { folders, folderId, isClickedButton } = useSelector(
    (state) => state.dayMonitoring,
  );

  const buttonRef = useRef([]);
  const [visibleModal, setVisibleModal] = useState(false);

  const {
    isAllCheck,
    hasClickedTrash,
    hasClickedFolder,
    deleteItems,
    moveItems,
    onClickAllCheck,
    onClickDelete,
    onClickFolderButton,
    onClickCancle,
  } = useSelectItemCard();

  const CommonButton = ({ onClick, children }) => (
    <ButtonSpan
      onClick={onClick}
      onKeyPress={onClick}
      role="button"
      tabIndex={0}
    >
      {children}
    </ButtonSpan>
  );

  return (
    <Container clicked={hasClickedTrash || hasClickedFolder}>
      <TitleBox>
        <Link to="/monitoring">
          <TitleSpan move>일간 모니터링</TitleSpan>
        </Link>
        {!!folderId && (
          <>
            <RightIcon />
            <FolderContainer
              ref={(element) => {
                buttonRef.current[0] = element;
              }}
              onClick={() => onClickFolderButton('folderPage')}
            >
              <TitleSpan move>
                {folders.find((folder) => folder.id === folderId)?.name}
                <DropIcon />
              </TitleSpan>
              {isClickedButton.folderPage && (
                <DropBox buttonRef={buttonRef.current[0]} />
              )}
            </FolderContainer>
          </>
        )}
      </TitleBox>
      <ControlBox>
        {(hasClickedTrash || hasClickedFolder) && (
          <>
            <CommonButton
              onClick={() =>
                onClickAllCheck(
                  isAllCheck ? 'deselect' : 'select',
                  hasClickedTrash ? 'clickedTrash' : 'clickedFolder',
                  folderId || 0,
                )
              }
            >
              {isAllCheck ? (
                <ButtonText>전체 해제</ButtonText>
              ) : (
                <ButtonText>전체 선택</ButtonText>
              )}
            </CommonButton>
            <CommonButton onClick={onClickCancle}>
              <ButtonText>취소</ButtonText>
            </CommonButton>
          </>
        )}
        {hasClickedTrash && (
          <CommonButton onClick={onClickDelete}>
            <ButtonText>선택 삭제</ButtonText>
            <CountText>{deleteItems.length}</CountText>
          </CommonButton>
        )}
        {hasClickedFolder && folders.length > 0 && (
          <FolderMoveButton
            ref={(element) => {
              buttonRef.current[1] = element;
            }}
            onClick={() => onClickFolderButton('folderMove')}
          >
            <ButtonText>폴더로 이동</ButtonText>
            <CountText>{moveItems.length}</CountText>
            {isClickedButton.folderMove && (
              <DropBox buttonRef={buttonRef.current[1]} />
            )}
          </FolderMoveButton>
        )}
        {hasClickedFolder && !folderId && (
          <FolderMoveButton onClick={() => setVisibleModal(true)}>
            <ButtonText>새 폴더 생성</ButtonText>
            <CountText>{moveItems.length}</CountText>
          </FolderMoveButton>
        )}
        {visibleModal && (
          <FolderModal
            visibleModal={visibleModal}
            setVisibleModal={setVisibleModal}
          />
        )}
      </ControlBox>
    </Container>
  );
};

export default Title;

const Container = styled.div`
  margin: 0rem 5.5rem 0.5rem 5.5rem;
  padding: 1.437rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${({ clicked }) =>
    clicked &&
    css`
      position: sticky;
      padding: 1rem 0;
      top: 0;
      z-index: 2;
      margin-bottom: 2rem;
      background-color: ${({ theme }) => theme.colors.white};
      border-bottom: 1px solid ${({ theme }) => theme.colors.lineGray};
      box-shadow: 0 8px 6px -4px rgb(0 0 0 / 4%);
    `}
`;

const TitleBox = styled.div``;

const TitleSpan = styled.span`
  padding: 0.9rem;
  font-weight: 600;
  font-size: 1rem;
  &:hover {
    ${(props) =>
      props.move &&
      css`
        cursor: pointer;
        padding: 0.2rem 0.9rem;
        background: ${({ theme }) => theme.colors.lineGray};
        border-radius: 0.75rem;
        color: ${({ theme }) => theme.colors.black};
      `}
  }
`;

const FolderContainer = styled.span`
  position: relative;
`;

const RightIcon = styled(RightOutlined)`
  color: ${({ theme }) => theme.colors.darkGray};
`;

const ControlBox = styled.div`
  display: flex;
`;

const ButtonText = styled.span`
  font-size: 0.85rem;
  margin-right: 0.25rem;
  letter-spacing: 1.2px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.darkGray};
`;

const ButtonStyle = styled.span`
  border-radius: 0.5rem;
  padding: 0.5rem 1.2rem;
  cursor: pointer;
  margin-right: 7px;

  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  transition: border-color 0.5s, background-color 0.5s, color 0.5s;

  :hover,
  :active {
    background-color: transparent;
    border-color: ${({ theme }) => theme.colors.darkGray};
    ${ButtonText} {
      color: ${({ theme }) => theme.colors.black};
    }
  }
`;

const ButtonSpan = styled(ButtonStyle)`
  display: flex;
  align-items: center;
`;

const CountText = styled.span`
  background-color: ${({ theme }) => theme.colors.orange};
  border-radius: 50%;
  width: 18px;
  height: 18px;
  line-height: 18px;
  font-size: 0.55rem;
  font-weight: 600;
  text-align: center;
  color: ${({ theme }) => theme.colors.white};
`;

const FolderMoveButton = styled(ButtonStyle)`
  display: flex;
  align-items: center;
  position: relative;
`;

const DropIcon = styled(CaretDownOutlined)`
  margin-left: 10px;
  color: ${({ theme }) => theme.colors.darkGray};
`;

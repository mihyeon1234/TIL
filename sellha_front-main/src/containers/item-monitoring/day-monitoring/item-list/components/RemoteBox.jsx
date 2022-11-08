/* eslint-disable camelcase */
import React from 'react';
import { useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';

import Swal from 'sweetalert2';
import { BsBell, BsFillStarFill, BsStar } from 'react-icons/bs';
import { BiTrash, BiTrashAlt } from 'react-icons/bi';
import { VscBellDot } from 'react-icons/vsc';

import { fetchFavoriteItem } from 'http-api';
import { AiOutlineFolder, AiOutlineFolderOpen } from 'react-icons/ai';
import { setFavorite } from '../../reducer';

export const RemoteBox = ({
  item,
  onClickIcon,
  hasClickedTrash,
  hasClickedFolder,
}) => {
  const dispatch = useDispatch();

  const alarmCheck =
    item.alert ||
    item.score1_alert ||
    item.score2_alert ||
    item.score3_alert ||
    item.score4_alert ||
    item.score5_alert;

  const asyncFavoriteItem = async (productId, setValue) => {
    try {
      const result = await fetchFavoriteItem({
        pid: productId,
        set: setValue,
      });
      if (result.message === 'ok') dispatch(setFavorite(productId, setValue));
    } catch (error) {
      Swal.fire('다시 한번 시도해주세요.', '', 'error');
    }
  };

  return (
    <FixedRemoteContainer>
      {item.member_id === -111 && <ExampleTag>예시상품</ExampleTag>}
      {item.favorite === 1 && (
        <StarFillIcon onClick={() => asyncFavoriteItem(item.product_id, 0)} />
      )}
      {item.favorite === 0 && (
        <StarIcon onClick={() => asyncFavoriteItem(item.product_id, 1)} />
      )}
      {!!alarmCheck && (
        <BellOnIcon data-tip data-for={item.product_id + item.alert} />
      )}
      {!alarmCheck && (
        <BellIcon data-tip data-for={item.product_id + item.product_title} />
      )}
      {item.member_id !== -111 && item.clickedTrash && !hasClickedFolder && (
        <TrashOnIcon onClick={() => onClickIcon('trash', item.product_id)} />
      )}
      {item.member_id !== -111 && !item.clickedTrash && !hasClickedFolder && (
        <TrashIcon onClick={() => onClickIcon('trash', item.product_id)} />
      )}
      {item.member_id !== -111 && item.clickedFolder && !hasClickedTrash && (
        <FolderOnIcon onClick={() => onClickIcon('folder', item.product_id)} />
      )}
      {item.member_id !== -111 && !item.clickedFolder && !hasClickedTrash && (
        <FolderIcon onClick={() => onClickIcon('folder', item.product_id)} />
      )}
    </FixedRemoteContainer>
  );
};

const FixedRemoteContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  svg {
    margin-bottom: 0.35em;
    :hover {
      fill: ${(props) => props.theme.primary};
    }
  }
  @media ${(props) => props.theme.mobile} {
    svg {
      margin-bottom: 0.35em;
    }
  }
  .alarmTooltip {
    border-radius: 1em;
    padding: 0.75em;
    box-shadow: 0 1px 3px 2px ${(props) => props.theme.colors.lightGray};
  }
`;

const IconStyle = css`
  font-size: 1.2rem;
  cursor: pointer;
`;

const StarFillIcon = styled(BsFillStarFill)`
  ${IconStyle}
  color: ${(props) => props.theme.colors.primary};
`;

const StarIcon = styled(BsStar)`
  ${IconStyle}
  color: ${(props) => props.theme.colors.gray};
`;

const BellOnIcon = styled(VscBellDot)`
  ${IconStyle}
  color: ${(props) => props.theme.colors.primary};
`;

const BellIcon = styled(BsBell)`
  ${IconStyle}
  color: ${(props) => props.theme.colors.gray};
`;

export const TrashIcon = styled(BiTrashAlt)`
  display: none;

  ${IconStyle}
  color: ${({ theme }) => theme.colors.gray};
`;

const TrashOnIcon = styled(BiTrash)`
  ${IconStyle}
  color: ${({ theme }) => theme.colors.primary};
`;

export const FolderIcon = styled(AiOutlineFolder)`
  display: none;

  ${IconStyle}
  color: ${({ theme }) => theme.colors.gray};
`;

const FolderOnIcon = styled(AiOutlineFolderOpen)`
  ${IconStyle}
  color: ${({ theme }) => theme.colors.primary};
`;

const ExampleTag = styled.span`
  font-size: 0.65rem;
  width: 26px;
  height: 33px;
  color: ${(props) => props.theme.colors.orange};
  margin-bottom: 0.35em;
  border: 0.15em dashed ${(props) => props.theme.colors.primary};
  border-radius: 0.25em;
  line-height: 1.25;
  padding: 0.15em;
`;

/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import styled, { css, keyframes } from 'styled-components';
import ReactTooltip from 'react-tooltip';

import FolderModal from '../../components/FolderModal';
import { RemoteBox, FolderIcon, TrashIcon } from './RemoteBox';
import { useSelectItemCard } from '../../hooks';

const ItemCard = ({ item, folders, onClickIcon }) => {
  const [VisibleKeywordAlarm, setVisibleKeywordAlarm] = useState(false);
  const [VisibleReviewAlarm, setVisibleReviewAlarm] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [dndData, setDndData] = useState({
    drag: [],
    drop: [],
  });

  const { folderId } = useSelector((state) => state.dayMonitoring);

  const { onClickMoveItems, hasClickedTrash, hasClickedFolder } =
    useSelectItemCard();

  useEffect(() => {
    if (item.alert) {
      setVisibleKeywordAlarm(true);
    }
    if (
      item.score1_alert ||
      item.score2_alert ||
      item.score3_alert ||
      item.score4_alert ||
      item.score5_alert
    ) {
      setVisibleReviewAlarm(true);
    }
    return () => {
      setVisibleKeywordAlarm(false);
      setVisibleReviewAlarm(false);
      setVisibleModal(false);
      setDndData({
        drag: [],
        drop: [],
      });
    };
  }, []);

  const endDrag = async (card, monitor) => {
    // 폴더 페이지 내에서는 드래그 불가능
    const dropData = monitor.getDropResult();
    const checkSameProduct =
      dropData?.dropCard?.product_id === dropData?.dragCard?.item?.product_id;

    if (folderId) return;

    if (dropData?.folderId) {
      // 존재하는 폴더 안에 상품 카드 넣기
      onClickMoveItems(card.item.product_id, dropData.folderId);
    }

    if (!dropData?.folderId && !checkSameProduct) {
      // 상품 카드가 겹쳤을 때, 같은 카드가 아니라면 폴더 만들기 모달 동작
      setVisibleModal(true);
      setDndData((prev) => ({
        ...prev,
        drag: dropData?.dragCard?.item,
        drop: dropData?.dropCard,
      }));
    }
  };

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'card',
    item: { item },
    collect: (card) => ({
      isDragging: card.isDragging(),
    }),
    end: endDrag,
  }));

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'card',
    drop: (dragCard) => ({
      dragCard,
      dropCard: item,
    }),
    collect: (card) => ({
      isOver: card.isOver(),
      canDrop: card.canDrop(),
    }),
  });

  return (
    <>
      <CardContainer
        ref={!folderId ? (node) => drag(drop(node)) : null}
        clicked={item.clickedTrash || item.clickedFolder}
        isDragging={isDragging}
        isOver={isOver}
        canDrop={canDrop}
        folderId={folderId}
      >
        <ItemInfoSection
          data-tip
          data-for={folders.length === 0 ? 'tooltip-alert' : null}
        >
          <ImageDiv>
            {item?.keywords.some((value) => value.is_set === 1) && (
              <SetLabel>묶음</SetLabel>
            )}
            <Image src={item?.image_url} alt="item-image" />
          </ImageDiv>
          <DetailInfo>
            <TitleBox>
              <ItemTitle>
                <Link
                  to={{
                    pathname: `/monitoring/${item.product_id}`,
                    state: item.product_id,
                  }}
                >
                  {item?.product_title}
                </Link>
              </ItemTitle>
            </TitleBox>
            <ItemPrice>가격 {item?.price.toLocaleString()}원</ItemPrice>
            <ItemReviewCount>
              리뷰{' '}
              {item?.total_review_count
                ? item.total_review_count.toLocaleString()
                : 0}
              개
            </ItemReviewCount>
          </DetailInfo>
          {/* TODO: 고정 컨트롤 바 */}
          <RemoteBox
            item={item}
            onClickIcon={onClickIcon}
            hasClickedTrash={hasClickedTrash}
            hasClickedFolder={hasClickedFolder}
          />
        </ItemInfoSection>
        <KeywordSection>
          {item.keywords.length === 0 && (
            <KeywordMessage>
              <Link
                to={{
                  pathname: `/monitoring/${item.product_id}`,
                  state: item.product_id,
                }}
              >
                모니터링하고 싶은 키워드를 추가해보세요.
              </Link>
            </KeywordMessage>
          )}
          <KeywordList keywords={item.keywords} />
          {item.keywords.length > 7 && (
            <MoreContainer>
              <MoreKeywords data-tip data-for={item.product_id}>
                더보기
              </MoreKeywords>
            </MoreContainer>
          )}
        </KeywordSection>
        <ReviewInfoSection>
          <ReviewRating>
            지금의 리뷰 평점은
            {item.average_review_score
              ? ` ${item.average_review_score.toFixed(1)}점`
              : ` 0점`}
            {item.average_review_change > 0 && (
              <RankingUp>▲{item.average_review_change.toFixed(2)}</RankingUp>
            )}
            {item.average_review_change < 0 && (
              <RankingDown>
                ▼{item.average_review_change.toFixed(2) * -1}
              </RankingDown>
            )}
          </ReviewRating>
          {!!item.new_review_count && (
            <ReviewAnimate>
              <ReviewUpdate>
                새로운 리뷰 {item.new_review_count}개!
              </ReviewUpdate>
            </ReviewAnimate>
          )}
        </ReviewInfoSection>
        {/* TODO: 옆으로 펼쳐지는 컨트롤바 */}
        {/* <OpenRemoteBox item={item} onClickCheck={onClickCheck} /> */}
      </CardContainer>

      {/* NOTE: 카드 컴포넌트 바깥에 툴팁 컴포넌트 두기 : 드래그 앤 드롭 기능 겹침 */}
      <ReactTooltip
        className="alarmTooltip"
        id={item.product_id + item.product_title}
        place="right"
        effect="solid"
        backgroundColor="white"
      >
        <TooltipAlarmOff>등록된 알림이 없어요.</TooltipAlarmOff>
      </ReactTooltip>

      <ReactTooltip
        className="alarmTooltip"
        id={item.product_id + item.alert}
        place="right"
        effect="solid"
        backgroundColor="white"
      >
        <TooltipKeywordAlarm visible={VisibleKeywordAlarm.toString()}>
          키워드 알림
        </TooltipKeywordAlarm>
        <TooltipReviewAlarm visible={VisibleReviewAlarm.toString()}>
          리뷰 알림
        </TooltipReviewAlarm>
      </ReactTooltip>

      <ReactTooltip
        id={item.product_id}
        place="top"
        effect="solid"
        backgroundColor="black"
        textColor="#FFFFFF"
      >
        <KeywordListDiv>
          {item.keywords.map(({ keyword, rank, rank_change }) => (
            <TooltipKeyword key={keyword + rank}>
              <TooltipKeywordTitle>{keyword}</TooltipKeywordTitle>
              <KeywordRanking>
                {rank ? `${rank}위` : `1600위 밖`}
              </KeywordRanking>
              {rank_change === '0' && <RankingDash> - </RankingDash>}
              {rank_change === 'IN' && <RankingUp>▲{rank_change}</RankingUp>}
              {rank_change === 'OUT' && (
                <RankingDown>▼{rank_change}</RankingDown>
              )}
              {rank_change > 0 && <RankingUp>▲{rank_change}</RankingUp>}
              {rank_change < 0 && (
                <RankingDown>▼{rank_change * -1}</RankingDown>
              )}
            </TooltipKeyword>
          ))}
        </KeywordListDiv>
      </ReactTooltip>

      <ReactTooltip
        className="tooltipCSS"
        id="tooltip-alert"
        place="top"
        effect="solid"
      >
        <span>
          <NewTag>NEW</NewTag> 폴더 기능이 업데이트 되었어요!
        </span>
        <span>
          폴더로 분류하고 싶은 상품 카드를 드래그해서 다른 상품과 합쳐보세요.
        </span>
      </ReactTooltip>

      {visibleModal && (
        <FolderModal
          visibleModal={visibleModal}
          setVisibleModal={setVisibleModal}
          dndData={dndData}
        />
      )}
    </>
  );
};

export default ItemCard;

const CardContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 30%;
  height: 200px;
  border: 1px solid
    ${({ theme, clicked }) =>
      clicked ? theme.colors.primary : theme.colors.lightGray};
  border-radius: 1.25em;
  box-shadow: ${({ clicked }) =>
    clicked
      ? '1px 1px 8px 0 rgba(255, 224, 123, 0.533)'
      : '1px 1px 8px 0 rgba(0, 0, 0, 0.1)'};
  min-height: 18em;
  padding: 1.5rem;
  justify-content: space-between;
  box-sizing: border-box;
  opacity: ${({ isDragging }) => (isDragging ? 0.3 : 1)};
  background-color: ${({ theme, isOver, canDrop, folderId }) =>
    isOver && canDrop && !folderId && theme.colors.lineGray};
  cursor: ${({ folderId }) => !folderId && 'grab'};

  &:hover {
    ${({ clicked }) =>
      !clicked &&
      css`
        box-shadow: 1px 1px 8px 3px rgba(0, 0, 0, 0.1);
      `}

    ${TrashIcon} {
      display: block;
    }

    ${FolderIcon} {
      display: block;
    }
  }

  @media ${(props) => props.theme.mobile} {
    width: 100%;
  }
`;

// const Remote = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   svg {
//     margin-bottom: 0.35em;
//     :hover {
//       fill: ${(props) => props.theme.primary};
//     }
//   }
//   @media ${(props) => props.theme.mobile} {
//     svg {
//       margin-bottom: 0.35em;
//     }
//   }
//   .alarmTooltip {
//     border-radius: 1em;
//     padding: 0.75em;
//     box-shadow: 0 1px 3px 2px ${(props) => props.theme.colors.lightGray};
//   }
// `;

const ItemInfoSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.25em;
  height: 105px;
`;

const ImageDiv = styled.div`
  position: relative;
`;

const SetLabel = styled.span`
  position: absolute;
  top: 58px;
  left: 48px;
  font-size: 0.65rem;
  background-color: #00000063;
  color: ${(props) => props.theme.colors.white};
  padding: 0.1em 0.3em;
  border-radius: 0.25em;
`;

const Image = styled.img`
  width: 5.35em;
  height: 5.65em;
  border-radius: 0.25em;
`;

const DetailInfo = styled.div`
  width: 70%;
  margin: 0 0.5em;
`;

const TitleBox = styled.div`
  height: 4em;
  margin: -0.1em 0.075em 0.35em 0;
  white-space: normal;
  line-height: 1.3;
  word-wrap: break-word;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;

  @media ${(props) => props.theme.mobile} {
    width: 85%;
    height: 3.8em;
    margin-left: 0.5em;
    white-space: normal;
    line-height: 1.3;
    word-wrap: break-word;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
`;

const ItemTitle = styled.span`
  font-size: 1em;
  width: fit-content;
  cursor: pointer;

  &:hover {
    background: linear-gradient(to top, #ffd94f84 38%, transparent 35%);
  }
  a:hover {
    color: black;
  }
  @media ${(props) => props.theme.mobile} {
    font-size: 0.9em;
  }
`;

const ItemPrice = styled.span`
  font-size: 0.8em;
  margin-top: 0.3em;
  padding-right: 0.75em;
  @media ${(props) => props.theme.mobile} {
    font-size: 0.75em;
    margin-left: 0.5em;
  }
`;

const ItemReviewCount = styled.span`
  font-size: 0.8em;
  margin-top: 0.3em;
  @media ${(props) => props.theme.mobile} {
    font-size: 0.75em;
  }
`;

// const IconStyle = css`
//   font-size: 1.1rem;
//   cursor: pointer;
// `;

const TooltipKeywordAlarm = styled.div`
  font-size: 0.8em;
  color: ${(props) =>
    props.visible === 'false'
      ? props.theme.colors.gray
      : props.theme.colors.orange};
  border: 1px solid
    ${(props) =>
      props.visible === 'false'
        ? props.theme.colors.gray
        : props.theme.colors.primary};
  padding: 1px 3px;
  border-radius: 0.5em;
  margin-bottom: 0.25em;
`;

const TooltipReviewAlarm = styled.div`
  font-size: 0.8em;
  color: ${(props) =>
    props.visible === 'false'
      ? props.theme.colors.gray
      : props.theme.colors.orange};
  border: 1px solid
    ${(props) =>
      props.visible === 'false'
        ? props.theme.colors.gray
        : props.theme.colors.primary};
  padding: 1px 3px;
  border-radius: 0.5em;
`;

const TooltipAlarmOff = styled.span`
  color: ${(props) => props.theme.colors.darkGray};
  font-size: 0.85em;
`;

// const ExampleTag = styled.span`
//   font-size: 0.65rem;
//   width: 26px;
//   height: 33px;
//   color: ${(props) => props.theme.colors.orange};
//   margin-bottom: 0.35em;
//   border: 0.15em dashed ${(props) => props.theme.colors.primary};
//   border-radius: 0.25em;
//   line-height: 1.25;
//   padding: 0.15em;
// `;

const KeywordSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  @media ${(props) => props.theme.mobile} {
    margin: 0.8em 0;
  }
`;

const KeywordMessage = styled.div`
  display: flex;
  width: fit-content;
  font-size: 0.8em;
  justify-content: center;
  align-items: center;
  border: 1px solid #d4d4d4;
  border-radius: 1.25em;
  padding: 0.2em 0.6em;
  a:hover {
    color: black;
  }
`;

const ReviewInfoSection = styled.div`
  display: flex;
  margin-left: 0.35em;
  justify-content: space-between;
  align-items: center;
`;

const shake = keyframes`
    0% {
      position: relative;
      left: -8px;
    }
    50% {
      position: relative;
      left: 0px;
    }
    100% {
      position: relative;
      left: -4px;
    }
  `;

const ReviewAnimate = styled.div`
  animation: ${shake} 0.7s infinite linear;
  animation-direction: alternate-reverse;
`;

const ReviewUpdate = styled.span`
  font-size: 0.85em;
  margin-right: 1em;
  ::before {
    content: '';
    position: absolute;
    top: 3px;
    left: -8px;
    width: 0.5em;
    height: 0.5em;
    border-radius: 1em;
    background: ${(props) => props.theme.colors.primary};
  }
  :hover {
    font-weight: 500;
    color: ${(props) => props.theme.colors.primary};
    cursor: default;
  }
`;

const RankingUp = styled.span`
  font-size: 0.75em;
  padding-left: 0.25em;
  color: #4bab6e;
`;

const RankingDown = styled.span`
  font-size: 0.75em;
  padding-left: 0.25em;
  color: #ed5978;
`;

const ReviewRating = styled.div`
  font-size: 0.85em;
`;

const KeywordList = ({ keywords }) =>
  keywords.slice(0, 5).map(({ keyword, rank, rank_change }) => (
    <KeywordContainer key={keyword + rank + rank_change}>
      <KeywordTitle>{keyword}</KeywordTitle>
      <KeywordRanking>{rank ? `${rank}위` : `1600위 밖`}</KeywordRanking>
      {rank_change === '0' && ' - '}
      {rank_change === 'IN' && <RankingUp>▲{rank_change}</RankingUp>}
      {rank_change === 'OUT' && <RankingDown>▼{rank_change}</RankingDown>}
      {rank_change > 0 && <RankingUp>▲{rank_change}</RankingUp>}
      {rank_change < 0 && <RankingDown>▼{rank_change * -1}</RankingDown>}
    </KeywordContainer>
  ));

const KeywordContainer = styled.div`
  margin: 0.25em;
  margin-right: 0.2em;
  padding: 0.2em 0.6em;
  height: 2.25em;
  border: 1px solid #d4d4d4;
  border-radius: 1.25em;
  width: fit-content;
  font-size: 0.75em;
`;

const KeywordTitle = styled.span`
  font-weight: 400;
`;

const MoreContainer = styled.div`
  display: flex;
  align-items: center;
`;

const MoreKeywords = styled.span`
  font-size: 0.8em;
  text-decoration: underline;
  margin-left: 0.5em;
  cursor: pointer;
  color: ${(props) => props.theme.colors.gray};
`;

const KeywordListDiv = styled.div`
  width: 200px;
`;

const TooltipKeyword = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 1fr 0.3fr;
  align-items: center;
  font-size: 0.85em;
  border-bottom: 1px dotted ${(props) => props.theme.colors.lightGray};
  &:last-child {
    border-bottom: none;
  }
`;

const TooltipKeywordTitle = styled.span`
  margin-right: 1.25em;
  line-height: 1.25;
`;

const RankingDash = styled.span`
  margin-left: 1em;
`;

const KeywordRanking = styled.span`
  font-weight: 300;
  margin-left: 0.25em;
`;

const NewTag = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.orange};
`;

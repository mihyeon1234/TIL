import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import ReactTooltip from 'react-tooltip';

const index = () => {
  const { selectItem, detailInfo } = useSelector(
    (state) => state.monitoringDetail,
  );
  return (
    <DetailCardSection>
      <ImageSection>
        <Image
          src={selectItem.image_url}
          alt="item-image"
          onClick={() => window.open(`${selectItem.product_url}`, '_blank')}
          data-tip
          data-for="tooltipImage"
        />
        <ReactTooltip
          className="imgTooltip"
          id="tooltipImage"
          place="top"
          effect="solid"
          backgroundColor="black"
          textColor="#FFFFFF"
        >
          상품 페이지로 이동하기
        </ReactTooltip>
      </ImageSection>
      <InfoSection>
        <TitleBox>
          <ItemTitle flag={selectItem.is_delete}>
            {selectItem.product_title}
          </ItemTitle>
          {selectItem.is_delete === 1 && (
            <DeletedItemText>삭제된 상품</DeletedItemText>
          )}
        </TitleBox>
        <ItemPrice>
          가격{' '}
          <Value>
            {selectItem.price ? selectItem.price.toLocaleString() : 0}원
          </Value>
        </ItemPrice>
        <ItemReviewCount>
          리뷰
          <Value>
            {selectItem.total_review_count
              ? selectItem.total_review_count.toLocaleString()
              : 0}
            개
          </Value>
        </ItemReviewCount>
        <ItemCategory>
          카테고리 <Category>{selectItem.category_fullpath}</Category>
        </ItemCategory>
        <ItemTag>
          <TagTitle>태그 키워드</TagTitle>
          {detailInfo.tags.map((tag) => (
            <Tag key={tag.tag_keyword}># {tag.tag_keyword}</Tag>
          ))}
        </ItemTag>
      </InfoSection>
    </DetailCardSection>
  );
};

export default index;

const DetailCardSection = styled.div`
  width: 100%;
  border-radius: 2em;
  background-color: ${(props) => props.theme.colors.white};
  box-shadow: 0 3px 6px 1px ${(props) => props.theme.colors.lightGray};
  border: 1px solid ${(props) => props.theme.colors.lightGray};
  padding: 1em;
  display: flex;
  flex-direction: row;
  margin-bottom: 2%;
  @media ${(props) => props.theme.mobile} {
    /* display: block; */
  }
`;

const ImageSection = styled.div`
  .imgTooltip {
    border-radius: 1.25em;
    font-size: 0.8em;
    padding: 0.6em 1.2em;
  }
  @media ${(props) => props.theme.mobile} {
    height: fit-content;
  }
`;

const Image = styled.img`
  width: 7.5em;
  height: 7.5em;
  border-radius: 1.15em;
  cursor: pointer;
  @media ${(props) => props.theme.mobile} {
    width: 4em;
    height: auto;
  }
`;

const InfoSection = styled.div`
  margin-left: 1.25em;
`;

const TitleBox = styled.div`
  font-size: 1.25em;
  font-weight: 500;
`;

const ItemTitle = styled.span`
  text-decoration: ${({ flag }) => flag === 1 && 'line-through'};
`;

const DeletedItemText = styled.span`
  margin: 0 5px;
  color: ${({ theme }) => theme.colors.danger};
`;

const ItemPrice = styled.span`
  font-size: 1em;
  margin-top: 0.3em;
  padding-right: 0.75em;
  ::after {
    content: '|';
    margin-left: 10px;
    color: ${(props) => props.theme.colors.gray};
  }
`;

const ItemReviewCount = styled.span`
  font-size: 1em;
  margin-top: 0.3em;
`;

const Value = styled.span`
  font-size: 0.95em;
  padding-left: 0.8em;
  font-weight: 500;
`;

const ItemCategory = styled.div`
  display: flex;
  align-items: center;
  font-size: 1em;
  font-weight: 500;
  margin-top: 0.3em;
`;

const Category = styled.span`
  font-size: 0.75em;
  border-radius: 1em;
  padding: 3px 10px 3px 10px;
  /* box-shadow: 1px 1px 2px 0 #00000019; */
  background-color: ${(props) => props.theme.colors.white};
`;

const ItemTag = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 0.3em;
`;

const TagTitle = styled.span`
  font-size: 1em;
  font-weight: 500;
  margin-right: 0.5em;
`;

const Tag = styled.span`
  font-size: 0.75em;
  padding: 0px 5px;
  margin-right: 0.45em;
  font-size: 0.75em;
  background-color: ${(props) => props.theme.colors.lightGray};
  color: ${(props) => props.theme.colors.darkGray};
  border-radius: 0.35em;

  @media ${(props) => props.theme.mobile} {
    margin: 0.2em;
  }
`;

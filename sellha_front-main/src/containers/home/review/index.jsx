import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';
import StarRatings from 'react-star-ratings';
import { Pagination } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

function index() {
  const homeReview = useSelector((state) => state.homeReview);
  const { loading, favoriteList, current } = homeReview;

  if (loading) {
    return <>로딩중입니다.</>;
  }

  const {
    productTitle,
    totalReviewCount,
    productUrl,
    averageReviewScore,
    imageUrl,
    keywords,
    reviews,
    averageReviewChange,
  } = favoriteList[current];

  return (
    <Container>
      <ReviewDiv>
        <ArrowButton>
          <LeftOutlined />
        </ArrowButton>
        <BoxDiv>
          <ItemTitle>
            <a
              href={productUrl}
              data-tip
              data-for="tooltip-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              {productTitle}
            </a>

            <ReactTooltip
              className="tooltip-link"
              id="tooltip-link"
              place="top"
              effect="solid"
            >
              상품 페이지로 이동하기
            </ReactTooltip>
          </ItemTitle>

          <ReviewCountDiv>
            <LeftDiv>
              <a
                href={productUrl}
                data-tip
                data-for="tooltip-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={imageUrl} alt="img" width="90%" height="auto" />
              </a>
              <KeywordDiv>
                {keywords.map((value) => (
                  <Keyword>
                    {value.keyword}&nbsp;
                    {value.rank}위&nbsp;
                    {value.rankChange === 0 && <>-</>}
                    {value.rankChange > 0 && (
                      <Greenspan>▲{value.rankChange}</Greenspan>
                    )}
                    {value.rankChange < 0 && (
                      <Redspan>▼{value.rankChange * -1}</Redspan>
                    )}
                  </Keyword>
                ))}
              </KeywordDiv>
            </LeftDiv>
            <RightDiv>
              <TopDiv>
                <ReviewCount>리뷰 {totalReviewCount}건 </ReviewCount>
                <ReviewScore>
                  리뷰 평점 : {averageReviewScore}점 &nbsp;
                  {!averageReviewChange && null}
                  {averageReviewChange > 0 && (
                    <Greenspan>▲{averageReviewChange}</Greenspan>
                  )}
                  {averageReviewChange < 0 && (
                    <Redspan>▼{averageReviewChange * -1}</Redspan>
                  )}
                </ReviewScore>
              </TopDiv>
              {reviews.map((value) => (
                <DetailDiv>
                  <TextReview>
                    <Score>
                      <StarRatings
                        rating={value.reviewScore}
                        starRatedColor="#ffcc44"
                        numberOfStars={5}
                        name="rating"
                        starDimension="15px"
                        starSpacing="0"
                      />
                      {value.reviewScore}
                    </Score>
                    <IdDateItem>
                      {value.writerMemberId} &nbsp;
                      {value.createDate} &nbsp;
                      {value.productOptionContent}
                    </IdDateItem>
                    <ReviewList>{value.reviewContent}</ReviewList>
                  </TextReview>
                  <SubReviewImg>
                    <img
                      src={value.writerMemberProfileImageUrl}
                      alt="img"
                      width="100px"
                      data-tip
                      data-for="ImgLink"
                    />
                    <ReactTooltip
                      id="ImgLink"
                      place="bottom"
                      effect="solid"
                      type="light"
                    >
                      <img
                        className="origin-image"
                        src={value.writerMemberProfileImageUrl}
                        alt="img"
                      />
                    </ReactTooltip>
                  </SubReviewImg>
                </DetailDiv>
              ))}
            </RightDiv>
          </ReviewCountDiv>
          <ReviewNum>
            <Pagination
              simple
              pageSize={5}
              defaultCurrent={1}
              total={totalReviewCount}
            />
          </ReviewNum>
        </BoxDiv>
        <ArrowButton>
          <RightOutlined />
        </ArrowButton>
      </ReviewDiv>
    </Container>
  );
}

export default index;

const Container = styled.div``;

const ReviewDiv = styled.div`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
  justify-content: center;
`;

const ArrowButton = styled.button`
  font-size: 54px;
  background-color: white;
  cursor: pointer;
  margin: 50px;
  &:hover {
    background: #ffde87;
  }
  &:focus {
    background: #ffde87;
  }
`;

const BoxDiv = styled.div`
  border: 1px solid #ebebeb;
  border-radius: 10px;
  box-shadow: 10px 10px 30px #ebebeb;
  margin-top: 280px;
  margin-bottom: 50px;
  width: 70%;
  height: 720px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
`;

const ItemTitle = styled.div`
  height: 55px;
  margin-right: 10px;
  padding-top: 15px;
  font-size: 25px;
  width: fit-content;
  cursor: pointer;
  margin: 0 auto;
  &:hover {
    background: linear-gradient(to top, #ffde87 15%, transparent 25%);
  }
`;

const LeftDiv = styled.div`
  text-align: left;
  margin-top: 30px;
  margin-left: 30px;
`;

const KeywordDiv = styled.div`
  width: 200px;
  align-items: center;
  height: 300px;
  overflow: auto;
  ::-webkit-scrollbar {
    bottom: 0;
    height: 5px; // 8px
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
    background-color: rgba(0, 0, 0, 0.05);
  }
  ::-webkit-scrollbar-button {
    width: 0;
    height: 0;
    display: none;
  }
`;
const Keyword = styled.div`
  margin: 3px;
  margin-right: 2px;
  padding: 0px 4px;
  height: 24px;
  border: 1px solid #d4d4d4;
  border-radius: 20px;
  width: fit-content;
  font-size: 13px;
`;
const RightDiv = styled.div`
  overflow: auto;
  height: 570px;
  margin-top: 1em;
`;
const TopDiv = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 1.5em;
`;
const Greenspan = styled.span`
  font-size: 12px;
  padding-left: 3px;
  color: #4bab6e;
`;
const Redspan = styled.span`
  font-size: 12px;
  padding-left: 5px;
  color: #ed5978;
`;

const DetailDiv = styled.div`
  text-align: left;
  width: 100%;
  display: grid;
  grid-template-columns: 6fr 1fr;
`;
const TextReview = styled.div`
  border-top: 1px solid lightgray;
`;
const Score = styled.div`
  margin-top: 1em;
  font-weight: bolder;
`;
const IdDateItem = styled.div`
  width: 550px;
  display: flex;
  font-size: 13px;
  color: #999999;
`;

const ReviewCountDiv = styled.div`
  height: 600px;
  display: grid;
  grid-template-columns: 1fr 4fr;
`;

const ReviewList = styled.div`
  display: grid;
  grid-template-columns: 6fr 1fr;
  margin-bottom: 1em;
`;

const SubReviewImg = styled.div`
  cursor: pointer;
  width: 90px;
  height: auto;
  margin: auto;
  .origin-image {
    width: 300px;
    height: auto;
    margin: 0;
  }
`;

const ReviewCount = styled.div`
  font-size: 1.1em;
  font-weight: bolder;
`;
const ReviewScore = styled.div`
  font-size: 0.9em;
  padding-top: 3px;
  margin-left: 1em;
`;

const ReviewNum = styled.div`
  .ant-pagination-simple .ant-pagination-simple-pager {
    display: inline-flex;
  }
  .ant-pagination-simple .ant-pagination-simple-pager input {
    border: none;
    text-align: left;
    align-items: left;
    width: 20px;
    padding-bottom: 3px;
    font-weight: 700;
    color: #ffcc44;
  }
`;

import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Image } from 'antd';
import ReactTooltip from 'react-tooltip';

function index() {
  const history = useHistory();
  const keywordSearch = useSelector((state) => state.keywordSearch);

  return (
    <DataKeywordDiv>
      <ImgDiv>
        {keywordSearch.imageUrl && (
          <DataImg src={keywordSearch.imageUrl} alt="이미지" />
        )}
        {!keywordSearch.imageUrl && (
          <Image
            width="8rem"
            height="8rem"
            style={{ borderRadius: '1em' }}
            src="error"
            fallback="data:image/png;base64,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"
          />
        )}
      </ImgDiv>
      <DetailDiv>
        <KeywordButtonDiv>
          <DataKeyword data-tip data-for={keywordSearch.keyword}>
            {keywordSearch.keyword}
            {keywordSearch.keyword.length > 9 && (
              <ReactTooltip id={keywordSearch.keyword} place="right">
                {keywordSearch.keyword}
              </ReactTooltip>
            )}
          </DataKeyword>
          <RowDiv>
            <IsShopping
              isShopping={(keywordSearch.isShopping || false).toString()}
            >
              쇼핑 키워드
            </IsShopping>
            {/* <IsBrand isBrand={keywordSearch.isBrand.toString()}>
                  브랜드
                </IsBrand> */}
            <IsReview
              data-tip
              data-for="keyword"
              isReview={(keywordSearch.isReview || false).toString()}
              onClick={() => {
                if (keywordSearch.isReview) {
                  history.push({
                    pathname: '/review',
                    state: { keyword: keywordSearch.keyword },
                  });
                }
              }}
            >
              키워드 리뷰
              <ReactTooltip
                id="keyword"
                place="top"
                effect="solid"
                className="tooltipResult"
              >
                {keywordSearch.isReview &&
                  `'${keywordSearch.keyword}'` +
                    ' 관련 프로젝트 내역으로 이동합니다'}
                {!keywordSearch.isReview &&
                  `'${keywordSearch.keyword}'` +
                    ' 관련 프로젝트 내역이 없습니다'}
              </ReactTooltip>
            </IsReview>
          </RowDiv>
        </KeywordButtonDiv>
        <CategoryShareDiv>
          <CategoryShareTitle>이 상품의 카테고리 비율</CategoryShareTitle>
          {(!keywordSearch.categoryShare ||
            keywordSearch.categoryShare.length === 0) && (
            <CategoryShareContent>
              <SharePercent>0.0%</SharePercent>
            </CategoryShareContent>
          )}
          {keywordSearch.categoryShare.slice(0, 4).map((category) => (
            <CategoryShareContent key={category.fullPath}>
              {category.share > 10 && (
                <SharePercent>
                  {category.share.toFixed(1).toLocaleString()}% &nbsp;
                </SharePercent>
              )}
              {category.share <= 10 && (
                <>{category.share.toFixed(1).toLocaleString()}% &nbsp;</>
              )}
              <ShareFullPath data-tip data-for={category.fullPath}>
                {category.fullPath}
              </ShareFullPath>
              {category.fullPath.length > 29 && (
                <ReactTooltip
                  id={category.fullPath}
                  className="tooltipResult"
                  place="bottom"
                  effect="solid"
                >
                  {category.fullPath}
                </ReactTooltip>
              )}
            </CategoryShareContent>
          ))}
        </CategoryShareDiv>
      </DetailDiv>
    </DataKeywordDiv>
  );
}

export default index;

const RowDiv = styled.div`
  display: flex;
  width: fit-content;
  margin-left: 0.5em;
  @media ${(props) => props.theme.mobile} {
    padding: 0;
    margin: 0;
  }
`;

const DataKeywordDiv = styled.div`
  display: flex;
  width: 40%;
  height: 9em;
  @media ${(props) => props.theme.mobile} {
    width: 100%;
    height: 85px;
    overflow-y: hidden;
    padding: 0.35em;
  }
`;
const ImgDiv = styled.div`
  width: fit-content;

  @media ${(props) => props.theme.mobile} {
    img {
      border-radius: 10px;
      width: 80px;
      height: 80px;
    }
  }
`;

const DataImg = styled.img`
  width: 8rem;
  height: 8rem;
  border-radius: 1em;
  @media ${(props) => props.theme.mobile} {
  }
`;

const DetailDiv = styled.div`
  width: 60%;
  margin-left: 1.2em;
  @media ${(props) => props.theme.mobile} {
    margin-left: 1em;
    width: 100%;
    overflow: hidden;
  }
`;
const DataKeyword = styled.div`
  font-size: 1.3em;
  font-weight: 600;

  @media ${(props) => props.theme.mobile} {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-right: 10px;
    font-size: 16px;
  }
`;
const KeywordButtonDiv = styled.div`
  display: flex;
  align-items: center;
  @media ${(props) => props.theme.tablet} {
    justify-content: flex-start;
  }
`;

const ResearchTag = styled.div`
  border-radius: 2px;
  height: 20px;
  width: 6.5em;
  line-height: 20px;
  color: #fff;
  font-size: 0.7em;
  text-align: center;
  @media ${(props) => props.theme.mobile} {
    font-size: 10px;
    width: 100%;
    padding: 0.1em 0.5em;
  }
`;

const IsShopping = styled(ResearchTag)`
  margin-right: 0.5em;
  background-color: ${(props) =>
    props.isShopping === 'true' ? '#4689db' : '#ebebeb'};
  @media ${(props) => props.theme.mobile} {
    width: 100%;
  }
`;

const IsReview = styled(ResearchTag)`
  background-color: ${(props) =>
    props.isReview === 'true' ? '#ff7e7e' : '#ebebeb'};
  cursor: ${(props) => (props.isReview === 'true' ? 'pointer' : 'default')};

  @media ${(props) => props.theme.mobile} {
    width: 100%;
  }
`;

// const IsBrand = styled(ResearchTag)`
//   background-color: ${(props) =>
//     props.isBrand === 'true' ? '#19ce60' : '#ebebeb'};
// `;

const CategoryShareDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1em;
  width: 100%;

  @media ${(props) => props.theme.mobile} {
    width: 100%;
  }
`;

const CategoryShareTitle = styled.div`
  width: fit-content;
  border-bottom: 1px solid ${(props) => props.theme.colors.lightGray};
  font-weight: 600;
  font-size: 0.8em;
  margin-bottom: 0.35em;
  @media ${(props) => props.theme.mobile} {
    font-size: 11px;
  }
`;

const CategoryShareContent = styled.div`
  width: 100%;
  display: flex;
  font-size: 0.7em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: default;
  @media ${(props) => props.theme.mobile} {
    font-size: 11px;
  }
`;

const SharePercent = styled.div`
  color: ${(props) => props.theme.colors.green};
  font-weight: 600;
`;

const ShareFullPath = styled.div`
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 90%;
  margin-bottom: 0.2em;
  @media ${(props) => props.theme.mobile} {
    font-weight: 300;
    width: 100%;
  }
`;

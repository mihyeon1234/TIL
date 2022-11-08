import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { LoadingOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import ReactTooltip from 'react-tooltip';

import { dummyProducts } from '../dummy';

const TagCard = ({ tagData, loadingTag, setProductData }) => {
  const [topTags, setTopTags] = useState([]);
  const [hasClicked, setHasClicked] = useState('');

  const onClickTagKeyword = (tagKeyword) => {
    const productData = JSON.parse(localStorage.getItem('productnameData'));

    if (!tagKeyword) {
      setHasClicked('전체');
      if (!productData) {
        setProductData(dummyProducts);
      } else setProductData(productData);
    }

    if (tagKeyword) {
      const filterTag = tagData.filter(
        ({ tag }) => tag.indexOf(tagKeyword) >= 0,
      );

      setHasClicked(tagKeyword);

      if (productData) {
        setProductData(
          productData.filter(({ id }) =>
            filterTag.map((value) => value.id).includes(id),
          ),
        );
      } else {
        setProductData(
          dummyProducts.filter(({ id }) =>
            filterTag.map((value) => value.id).includes(id),
          ),
        );
      }
    }
  };

  const checkDuplicatedTag = () => {
    const allTags = [];
    const dupTags = {};

    tagData.forEach(({ tag }) => allTags.push(...tag));

    allTags.forEach((tag) => {
      dupTags[tag] = (dupTags[tag] || 0) + 1;
    });

    setTopTags(
      Object.entries(dupTags)
        .filter((value) => value[1] > 4)
        .sort((a, b) => b[1] - a[1]),
    );
  };

  useEffect(() => {
    if (Array.isArray(tagData) && tagData.length > 0) {
      checkDuplicatedTag();
      setHasClicked('전체');
    }
    if (!Array.isArray(tagData)) {
      setTopTags([]);
    }
  }, [tagData]);

  return (
    <Container>
      <TitleBox>
        상위 노출 태그
        <QuestionCircle data-tip data-for="tooltipTopTags" />
      </TitleBox>
      <TagBox>
        {loadingTag && <LoadingIcon />}
        {!loadingTag && topTags.length > 0 && (
          <ResultBox>
            <TagDiv
              onClick={() => onClickTagKeyword()}
              hasClicked={hasClicked}
              tagKeyword="전체"
            >
              <TagKeyword hasClicked={hasClicked} tagKeyword="전체">
                전체 보기
              </TagKeyword>
            </TagDiv>
            {topTags.map((value) => (
              <TagDiv
                key={value[0]}
                onClick={() => onClickTagKeyword(value[0])}
                hasClicked={hasClicked}
                tagKeyword={value[0]}
              >
                <TagKeyword hasClicked={hasClicked} tagKeyword={value[0]}>
                  {value[0]}
                </TagKeyword>
                <TagTimes hasClicked={hasClicked} tagKeyword={value[0]}>
                  ({value[1]})
                </TagTimes>
              </TagDiv>
            ))}
          </ResultBox>
        )}
        {!loadingTag && topTags.length === 0 && <span>없음</span>}
      </TagBox>
      <ReactTooltip
        id="tooltipTopTags"
        className="tooltipCSS"
        place="top"
        effect="solid"
        arrowColor="transparent"
      >
        Top 40 상품에서 노출되고 있는 태그 키워드로, <br />몇 개의 상품에서 쓰고
        있는 태그인지 확인할 수 있습니다.
      </ReactTooltip>
    </Container>
  );
};

export default TagCard;

const Container = styled.div`
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1;
  margin: 1.8rem 0;
  padding: 20px 10px;
  background-color: ${({ theme }) => theme.colors.white};
  border-bottom: 0.8px solid ${({ theme }) => theme.colors.lineGray};
  .tooltipCSS {
    display: flex;
    flex-direction: column;
    max-width: 20rem;
    font-size: 0.65rem;
    font-weight: 300;
    border-radius: 1em;
    padding: 10px;
    pointer-events: auto !important;
    &:hover {
      visibility: visible !important;
    }
    opacity: 1 !important;
  }
`;

const TitleBox = styled.div`
  font-size: 0.9rem;
  font-weight: 500;
  flex: 1.2;
`;

const QuestionCircle = styled(QuestionCircleOutlined)`
  color: ${(props) => props.theme.colors.darkGray};
  margin-left: 0.35em;
  cursor: pointer;
`;

const TagBox = styled.div`
  flex: 8.8;
`;

const ResultBox = styled.div`
  display: flex;
  flex-wrap: wrap;

  animation: fadein 2s;
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

const TagDiv = styled.div`
  display: flex;
  align-items: center;

  border: 1px solid
    ${({ theme, hasClicked, tagKeyword }) =>
      hasClicked === tagKeyword ? theme.colors.primary : theme.colors.lineGray};
  font-size: 0.85rem;
  margin: 3px;
  padding: 2px 10px;
  border-radius: 5px;

  cursor: pointer;
`;

const TagKeyword = styled.span`
  font-weight: ${({ hasClicked, tagKeyword }) =>
    hasClicked === tagKeyword ? 500 : 300};
`;

const TagTimes = styled.span`
  font-size: 0.75rem;
  margin-left: 2px;
  font-weight: ${({ hasClicked, tagKeyword }) =>
    hasClicked === tagKeyword ? 500 : 300};
`;

const LoadingIcon = styled(LoadingOutlined)`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.orange};
`;

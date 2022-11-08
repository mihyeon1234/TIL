import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { LoadingOutlined } from '@ant-design/icons';

import platinum from 'assets/icon/platinum.png';
import premium from 'assets/icon/premium.png';
import bpower from 'assets/icon/bpower.png';
import power from 'assets/icon/power.png';

const ContentCard = ({
  data,
  tagData,
  loadingProduct,
  loadingTag,
  inputText,
}) => {
  const {
    id,
    url,
    imageUrl,
    productTitle,
    category,
    mallGrade,
    mallName,
    property,
    rank,
  } = data;

  const [titleKeyword, setTitleKeyword] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    setTitleKeyword(productTitle.split(' '));
    if (Array.isArray(tagData)) {
      setTags(tagData.find((tagItem) => tagItem.id === id)?.tag);
    }
  }, [data, tagData]);

  if (loadingProduct) {
    return (
      <SkeletonContainer>
        <ImageSkeleton />
        <SkeletonSubContainer>
          <TitleSkeleton />
          <CategorySkeleton />
          <ContentSkeleton />
          <ContentSkeleton />
        </SkeletonSubContainer>
      </SkeletonContainer>
    );
  }

  return (
    <Container>
      <ContentBox>
        <ImageDiv>
          <RankingLabel>{rank}위</RankingLabel>
          <Image
            src={imageUrl}
            alt="product"
            urlCheck={url || 'false'}
            onClick={() => url && window.open(`${url}`, '_blank')}
          />
        </ImageDiv>
        <ContentDiv>
          <ProductTitle
            urlCheck={url || 'false'}
            onClick={() => url && window.open(`${url}`, '_blank')}
          >
            {titleKeyword.map((keyword, index) => (
              <TitleKeyword
                // eslint-disable-next-line react/no-array-index-key
                key={keyword + index}
                isSameKeyword={keyword === inputText ? 'true' : 'false'}
              >
                {keyword}
              </TitleKeyword>
            ))}
          </ProductTitle>
          <ProductCategory>{category}</ProductCategory>
          <ProductContent>
            <PropertyDiv>
              <SubTitle>상품 속성</SubTitle>
              {Object.keys(property).map((value, index) =>
                value ? (
                  <PropertyTag key={value} tagIndex={index}>
                    {value}
                    {` : `}
                    {property[value].map((keyword) => keyword).join(', ')}
                  </PropertyTag>
                ) : (
                  <SetTag key={value}>없음</SetTag>
                ),
              )}
            </PropertyDiv>
            <SubDiv>
              <SubTitle>상품 태그</SubTitle>
              {!mallName && <SetTag>묶음</SetTag>}
              {mallName && loadingTag && (
                <LoadingSpan>
                  <LoadingIcon spin />
                  <LoadingText>최대 10초가 소요될 수 있습니다.</LoadingText>
                </LoadingSpan>
              )}
              {mallName &&
                !loadingTag &&
                tags?.length > 0 &&
                tags.map((tag) => (
                  <ContentTag
                    key={tag}
                    isSameKeyword={tag === inputText ? 'true' : 'false'}
                  >
                    {tag}
                  </ContentTag>
                ))}
              {!loadingTag && tags?.length === 0 && <SetTag>없음</SetTag>}
            </SubDiv>
          </ProductContent>
        </ContentDiv>
      </ContentBox>
      <SellerBox>
        <SellerName>{mallName || '묶음'}</SellerName>
        <SellerGrade>
          {mallGrade === '파워' && <GradeBadge url={power} />}
          {mallGrade === '빅파워' && <GradeBadge url={bpower} />}
          {mallGrade === '프리미엄' && <GradeBadge url={premium} />}
          {mallGrade === '플래티넘' && <GradeBadge url={platinum} />}
          <GradeText>{mallGrade}</GradeText>
        </SellerGrade>
      </SellerBox>
    </Container>
  );
};

export default ContentCard;

const SkeletonStyle = styled.div`
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.lightGray};
  margin: 3px;
`;

const ImageSkeleton = styled(SkeletonStyle)`
  width: 8.5rem;
  height: 7.5rem;
`;

const TitleSkeleton = styled(SkeletonStyle)`
  width: 40%;
  height: 23px;
`;

const CategorySkeleton = styled(SkeletonStyle)`
  width: 30%;
  height: 20px;
`;

const ContentSkeleton = styled(SkeletonStyle)`
  width: 75%;
  height: 18px;
`;

const SkeletonContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: 20px;
  padding-bottom: 20px;
  border-bottom: 0.8px solid ${({ theme }) => theme.colors.lineGray};
`;

const SkeletonSubContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 0.8px solid ${({ theme }) => theme.colors.lineGray};
`;

const ContentBox = styled.div`
  display: flex;
  flex: 2.5;
`;

const ImageDiv = styled.div``;

const Image = styled.img`
  width: 8rem;
  height: 8rem;
  border: 1px solid ${({ theme }) => theme.colors.lineGray};
  border-radius: 0.2rem;
  cursor: ${({ urlCheck }) => urlCheck !== 'false' && 'pointer'};
`;

const ContentDiv = styled.div`
  margin-left: 1rem;
`;

const ProductTitle = styled.div`
  font-size: 0.85rem;
  font-weight: 500;
  cursor: ${({ urlCheck }) => urlCheck !== 'false' && 'pointer'};
`;

const TitleKeyword = styled.span`
  margin-right: 5px;
  background-color: ${({ theme, isSameKeyword }) =>
    isSameKeyword === 'true' ? theme.colors.lightYellow : theme.colors.white};
`;

const ProductCategory = styled.div`
  font-size: 0.8rem;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.darkGray};
`;

const ProductContent = styled.div`
  margin-top: 1rem;
`;

const PropertyDiv = styled.div`
  margin-top: 5px;
  line-height: 1.4;
`;

const SubDiv = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 5px;
`;

const SubTitle = styled.span`
  font-size: 0.75rem;
  ::after {
    content: '|';
    padding-left: 3px;
    color: ${({ theme }) => theme.colors.lightGray};
  }
`;

const SubContent = styled.span`
  font-size: 0.75rem;
  margin: 2px 3px;
  padding: 0 5px;
`;

const PropertyTag = styled(SubContent)`
  word-break: keep-all;
  margin: 0 2px;
  padding: 0;

  :nth-child(n + 3)::before {
    content: '∙';
    padding-right: 3px;
    color: ${({ theme }) => theme.colors.darkGray};
  }
`;

const ContentTag = styled(SubContent)`
  background-color: ${({ theme, isSameKeyword }) =>
    isSameKeyword === 'true'
      ? theme.colors.lightYellow
      : theme.colors.lineGray};
  border-radius: 0.35em;
  word-break: keep-all;
`;

const SetTag = styled(SubContent)``;

const SellerBox = styled.div`
  flex: 0.5;
  border-left: 0.8px solid ${({ theme }) => theme.colors.lineGray};
  padding-left: 1rem;
`;

const SellerName = styled.div`
  font-size: 0.8rem;
  font-weight: 500;
`;

const SellerGrade = styled.div`
  margin-top: 3px;
`;

const GradeBadge = styled.span`
  display: inline-block;
  width: 14px;
  height: 17px;
  vertical-align: bottom;
  margin-right: 4px;
  flex-shrink: 0;
  background: url('${(props) => props.url}') no-repeat 50%;
  background-size: 14px 17px;
`;

const GradeText = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.darkGray};
`;

const LoadingSpan = styled(SubContent)``;

const LoadingIcon = styled(LoadingOutlined)`
  font-size: 0.9rem;
  margin-right: 8px;
  color: ${({ theme }) => theme.colors.orange};
`;

const LoadingText = styled.span`
  color: ${({ theme }) => theme.colors.darkGray};
`;

const RankingLabel = styled.span`
  position: absolute;
  font-size: 0.65rem;
  background-color: #00000063;
  color: ${(props) => props.theme.colors.white};
  padding: 0.1em 0.3em;
  margin: 1px;
  border-radius: 0.25em;
`;

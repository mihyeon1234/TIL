import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { QuestionCircleOutlined } from '@ant-design/icons'; //  LoadingOutlined
import ReactTooltip from 'react-tooltip';
import { getRelatedData } from 'http-api';
import KeywordSave from 'components/KeywordSaveBtn';
import RelatedTable from './components/Table';
import RecommendCategory from './components/Category';
import {
  failRelatedData,
  fetchRelatedData,
  setCategoryData,
  setRelatedData,
} from './reducer';

export default function TitleResearch() {
  const dispatch = useDispatch();

  const { keyword } = useSelector((state) => state.keywordSearch);
  const { relatedData } = useSelector((state) => state.relatedKeyword);

  const getRelatedKeyword = async () => {
    dispatch(fetchRelatedData());
    try {
      const { bestCategory, list } = await getRelatedData(keyword);
      dispatch(setRelatedData(list));
      dispatch(setCategoryData(bestCategory));
    } catch (error) {
      dispatch(failRelatedData());
    }
  };

  useEffect(() => {
    if (keyword) {
      getRelatedKeyword();
    }
    return () => {
      dispatch(failRelatedData());
    };
  }, [keyword]);

  const relatedColumn = [
    {
      title: <CStitle>저장</CStitle>,
      width: 80,
      align: 'center',
      responsive: ['lg'],
      render: (row) => <KeywordSave item={row} />,
    },
  ];

  return (
    <Container>
      <RecommendDiv>
        <STitle>추천 카테고리</STitle>
        <RecommendCategory />
      </RecommendDiv>
      <SerchTitle id="result">
        {keyword} 검색 결과 {relatedData?.length}개
      </SerchTitle>
      <TableSection>
        <SubTitleDiv>
          추천 키워드
          <QuestionCircle data-tip data-for="tooltip-keyword" />
        </SubTitleDiv>
        <ReactTooltip id="tooltip-keyword" place="right" effect="solid">
          네이버 쇼핑에서 가져온 인기, 통합, 쇼핑, 광고성 키워드 입니다.
        </ReactTooltip>
        <RelatedTable customColumn={relatedColumn} keyword={keyword} />
      </TableSection>
    </Container>
  );
}

const Container = styled.div`
  margin-top: 2%;
  min-height: 73vh;
`;

const RecommendDiv = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  box-shadow: 0 3px 6px 1px ${(props) => props.theme.colors.lightGray};
  border-radius: 2em;
  padding: 2em 1em;
  margin-bottom: 1.5em;

  @media ${(props) => props.theme.mobile} {
    justify-content: center;
    padding: 1em;
    border: 0;
    box-shadow: none;
  }
`;

const STitle = styled.div`
  font-size: 1em;
  font-weight: 600;
  margin-left: 1.5em;
  @media ${(props) => props.theme.mobile} {
    font-size: 14px;
    width: 40%;
  }
`;

const QuestionCircle = styled(QuestionCircleOutlined)`
  color: ${(props) => props.theme.colors.darkGray};
  font-size: 1em;
  cursor: pointer;
  margin-left: 0.35em;
  @media ${(props) => props.theme.mobile} {
    display: none;
  }
`;

const SerchTitle = styled.div`
  font-size: 1.2em;
  font-weight: 600;
  margin: 2em 0 1em 1.5em;
  @media ${(props) => props.theme.mobile} {
    display: none;
  }
`;

const TableSection = styled.section`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  box-shadow: 0 3px 6px 1px ${(props) => props.theme.colors.lightGray};
  border-radius: 2em;
  padding: 2em 2.5em;
  @media ${(props) => props.theme.mobile} {
    padding: 1em;
    border: 0;
    box-shadow: none;
  }
`;

const SubTitleDiv = styled.div`
  font-size: 1em;
  font-weight: 600;
  /* margin-left: 1.5em; */
  @media ${(props) => props.theme.mobile} {
    /* border: 0; */
    font-size: 14px;
    margin: 0;
  }
`;

const CStitle = styled.div`
  font-weight: 700;
  text-align: center;
  @media ${(props) => props.theme.mobile} {
    font-size: 12px;
  }
`;

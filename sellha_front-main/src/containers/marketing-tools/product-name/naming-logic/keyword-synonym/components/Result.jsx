import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const colors = [
  '#5EBF64',
  '#F28705',
  '#F29F05',
  '#D96704',
  '#F2CCC9',
  '#A63F03',
];

const Result = () => {
  const { synoKeywords, synoResult } = useSelector(
    (state) => state.productNaming,
  );

  return (
    <ResultContainer>
      <TitleText>동의어 분석 결과</TitleText>
      {synoResult.map((synony, index) => (
        <ResultBox key={synony}>
          <MainKeyword style={{ borderColor: colors[index.toString()] }}>
            {synony[0]}
          </MainKeyword>
          <SubKeyword>
            {synony[1] &&
              synony.map((key) => (
                <SubKeywords key={key}>
                  <SubColor style={{ background: colors[index.toString()] }} />
                  {key}
                </SubKeywords>
              ))}
          </SubKeyword>
        </ResultBox>
      ))}

      {synoKeywords.filter((keyword) => !synoResult.flat().includes(keyword))
        .length > 0 && (
        <FilterDiv>
          키워드
          <FilterKeywordBox>
            <LeftOutlined style={{ color: '#D9D9D9', fontSize: '15px' }} />
            {synoKeywords
              .filter((keyword) => !synoResult.flat().includes(keyword))
              .join(', ')}
            <RightOutlined style={{ color: '#D9D9D9', fontSize: '15px' }} />
          </FilterKeywordBox>
          는 동의어 결과가 없습니다.
        </FilterDiv>
      )}
    </ResultContainer>
  );
};

export default Result;

const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  animation: fadein 3s;
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

const TitleText = styled.div`
  display: flex;
  font-weight: 600;
  font-size: 0.95rem;
  margin: 0.8rem 0;

  ::after {
    content: '';
    flex-grow: 1;
    margin: 12px 0 12px 8px;
    height: 1px;
    background: ${({ theme }) => theme.colors.lightGray};
    font-size: 0px;
    line-height: 0px;
  }
`;

const ResultBox = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;
`;

const MainKeyword = styled.div`
  width: 80px;
  height: 80px;
  line-height: 80px;
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.black};
  border: 1px solid ${({ theme }) => theme.colors.darkGray};
  text-align: center;
  font-size: 0.8rem;
`;

const SubKeyword = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto 0;
  font-size: 0.83rem;
`;

const SubKeywords = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0.15rem 1rem;
`;

const SubColor = styled.div`
  border-radius: 50%;
  width: 9px;
  height: 9px;
  margin: 0.4rem 0.5rem;
`;

const FilterDiv = styled.div`
  font-size: 0.85rem;
`;

const FilterKeywordBox = styled.span`
  padding: 0 5px;
`;

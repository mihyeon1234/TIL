import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { CloseOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import ReactTooltip from 'react-tooltip';

const Result = () => {
  const { combiResult } = useSelector((state) => state.productNaming);

  const [combinationWord, setCombinationWord] = useState([]);
  const [oneWord, setOneWord] = useState([]);

  useEffect(() => {
    if (combiResult.length > 0) {
      setCombinationWord(combiResult.filter((keyword) => keyword.isSynonymous));
      setOneWord(combiResult.filter((keyword) => !keyword.isSynonymous));
    }
  }, [combiResult]);

  if (combiResult?.length === 0) return null;

  return (
    <Container>
      <TitleText>분석 결과</TitleText>
      <ResultDiv>
        <ResultTable>
          <thead>
            <ResultTr>
              <ResultTh colSpan="3" data-tip data-for="tooltipCombiTitle">
                조합형 키워드
                <QuestionCircle />
              </ResultTh>
              <ResultTh data-tip data-for="tooltipOneTitle">
                독립형 키워드
                <QuestionCircle />
              </ResultTh>
            </ResultTr>
          </thead>
          <ResultTbody>
            <ResultTr>
              <ResultTd>메인</ResultTd>
              <ResultTd>세부</ResultTd>
              <ResultTd>메인</ResultTd>
              <ResultTd>세부 + 메인</ResultTd>
            </ResultTr>
            <ResultTr className="tr1">
              <ResultTd className="col1">
                {combinationWord[0] ? (
                  combinationWord[0].mainKeyword
                ) : (
                  <CloseIcon />
                )}
              </ResultTd>
              <ResultTd className="col2">
                {combinationWord.length === 0 && <CloseIcon />}
                {combinationWord?.map(({ subKeyword }) => (
                  <KeywordText key={subKeyword}>{subKeyword}</KeywordText>
                ))}
              </ResultTd>
              <ResultTd className="col3">
                {combinationWord[0] ? (
                  combinationWord[0].mainKeyword
                ) : (
                  <CloseIcon />
                )}
              </ResultTd>
              <ResultTd>
                {oneWord.length === 0 && <CloseIcon />}
                {oneWord?.map(({ mainKeyword, subKeyword }) => (
                  <KeywordText key={subKeyword + mainKeyword}>
                    {subKeyword + mainKeyword}
                  </KeywordText>
                ))}
              </ResultTd>
            </ResultTr>
          </ResultTbody>
          <tfoot>
            <ResultTr>
              <ResultFootTd colSpan="3">
                메인 키워드 {`'${combiResult[0]?.mainKeyword}'`}는 한 번만
                사용하셔도 <br />
                키워드 순서와 상관없이 모든 키워드와 조합되어 <br />
                노출 가능합니다.
              </ResultFootTd>
              <ResultFootTd>
                메인 키워드 {`'${combiResult[0]?.mainKeyword}'`}가 상품명에 이미
                있더라도 <br />
                별도로 키워드 자체를 등록하셔야 <br />
                노출 가능합니다.
              </ResultFootTd>
            </ResultTr>
          </tfoot>
        </ResultTable>
        <ReactTooltip
          id="tooltipCombiTitle"
          className="tooltipCSS"
          place="top"
          effect="solid"
          arrowColor="transparent"
        >
          조합형 키워드는 메인 키워드와 세부 키워드 사이에 띄어쓰기를 넣어
          작성하면 각각의 키워드가 조합되어 검색에 노출되는 키워드입니다.
          <br />
          <br />
          {`예) 검색에 노출할 키워드가 '${'돼지고기'}', '${'양고기'}' 일 때 '${'돼지 양 고기'}'로 작성하여도 '${'돼지고기, 양고기'}'로 모두 조합되어 노출됩니다.`}
        </ReactTooltip>
        <ReactTooltip
          id="tooltipOneTitle"
          className="tooltipCSS"
          place="top"
          effect="solid"
          arrowColor="transparent"
          clickable
        >
          독립형 키워드는 메인 키워드와 세부 키워드 사이에 띄어쓰기로 작성해도
          키워드가 조합되지 않고, 단일 키워드 자체로 노출되는 키워드입니다.
          따라서, 반드시 노출하고 싶은 한 키워드를 띄어쓰기없이 입력해 주셔야
          합니다.
          <br />
          <br />
          {`예) 검색에 노출할 키워드가 '${'닭고기'}'일 때 '${'닭 고기'}'로 작성하면 '${'닭고기'}' 키워드로 노출되지 않습니다. 조합형 키워드를 상품명에 같이 넣을 때는, '${'돼지 양 고기 닭고기'}'로 작성하여야 '${'돼지고기, 양고기, 닭고기'}' 키워드에 노출이 됩니다.`}
        </ReactTooltip>
      </ResultDiv>
    </Container>
  );
};

export default Result;

const Container = styled.div`
  margin: 1rem 0 0.5rem 0;
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

const ResultDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1em;
  justify-content: center;
`;

const ResultTable = styled.table`
  width: 100%;
  height: 100%;
  border-collapse: collapse;
  border-radius: 0.25rem;
  border-style: hidden;
  box-shadow: 0 0 0 0.08rem ${(props) => props.theme.colors.lightGray};
  text-align: center;
`;

const ResultTr = styled.tr`
  border: 1px solid ${(props) => props.theme.colors.lightGray};
`;

const ResultTh = styled.th`
  font-size: 0.85rem;
  border: 1px solid ${(props) => props.theme.colors.lightGray};
  padding: 8px;
  cursor: pointer;
`;

const ResultTbody = styled.tbody`
  .tr1 > .col1:hover {
    background-color: #fffae8;
    font-weight: 500;
    ~ .col2 {
      background-color: #fffae8;
    }
  }
  .tr1 > .col2:hover {
    background-color: #fffae8;
    ~ .col3 {
      background-color: #fffae8;
      font-weight: 500;
    }
  }
`;

const ResultTd = styled.td`
  font-size: 0.8rem;
  border: 1px solid ${(props) => props.theme.colors.lightGray};
  padding: 8px;
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

const QuestionCircle = styled(QuestionCircleOutlined)`
  color: ${(props) => props.theme.colors.darkGray};
  margin-left: 0.35em;
`;

const KeywordText = styled.div`
  margin: 5px 0;
`;

const ResultFootTd = styled.td`
  font-size: 0.75rem;
  border: 1px solid ${(props) => props.theme.colors.lightGray};
  padding: 15px;
`;

const CloseIcon = styled(CloseOutlined)`
  color: ${(props) => props.theme.colors.darkGray};
  font-size: 0.7rem;
`;

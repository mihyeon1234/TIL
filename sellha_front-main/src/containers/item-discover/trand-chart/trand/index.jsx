import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Col, Row } from 'antd';
import ReactTooltip from 'react-tooltip';
import { QuestionCircleOutlined } from '@ant-design/icons';

const data = [
  {
    key: 1,
  },
  {
    key: 2,
  },
  {
    key: 3,
  },
];

function Index() {
  const [renderData, setRenderData] = useState(
    data.map((rel) => ({ ...rel, isFold: false })),
  );
  const handlerFold = (rel) => {
    setRenderData(
      renderData.map((reldata) => {
        if (reldata.key === rel.key) return { ...reldata, isFold: !rel.isFold };
        return { ...reldata };
      }),
    );
  };
  const allFold = () => {
    setRenderData(renderData.map((rel) => ({ ...rel, isFold: true })));
  };
  const allFoldOpen = () => {
    setRenderData(renderData.map((rel) => ({ ...rel, isFold: false })));
  };
  return (
    <Container>
      <STitle className="hidden">
        주간 급상승 키워드
        <QuestionCircleIcon data-tip data-for="tooltip-search" />
      </STitle>
      <ReactTooltip
        id="tooltip-search"
        place="right"
        effect="solid"
        className="hidden"
      >
        지난 일주일 동안 검색량이 급상승한 키워드의 순위를 알려줍니다.
      </ReactTooltip>
      <ButtonDiv>
        <SubmitButton onClick={() => allFold()}>모두접기</SubmitButton>
        <SubmitButton onClick={() => allFoldOpen()}>모두 펼치기</SubmitButton>
      </ButtonDiv>
      <ContentDiv>
        <BoxListDiv>
          <BoxHeaderDiv>1위 ~ 50위</BoxHeaderDiv>
          <ScrollDiv>
            {renderData.map((rel) => (
              <Boxdiv>
                <MainText onClick={() => handlerFold(rel)}>
                  <SRank>{rel.key}</SRank>
                  <SKeyword>샤넬로퍼</SKeyword>
                  <SPercentage>
                    +1706%
                    <SubPercent>10000000</SubPercent>
                  </SPercentage>
                </MainText>
                <HiddenBoxDiv visible={rel.isFold}>
                  <SFullPath>식품농산물과일키위/참다래</SFullPath>
                  <DetailData>
                    <DetailText>
                      상품수<DetailNum>1101</DetailNum>
                    </DetailText>
                    <DetailText>
                      검색량<DetailNum>1101</DetailNum>
                    </DetailText>
                    <DetailText>
                      경쟁률<DetailTag>1101</DetailTag>
                    </DetailText>
                  </DetailData>
                </HiddenBoxDiv>
              </Boxdiv>
            ))}
          </ScrollDiv>
        </BoxListDiv>
      </ContentDiv>
    </Container>
  );
}
export default Index;

const Container = styled.div`
  margin: 1.2em;

  @media ${(props) => props.theme.mobile} {
  }
`;

const STitle = styled.div`
  font-size: 1.2em;
  font-weight: 600;
`;
const QuestionCircleIcon = styled(QuestionCircleOutlined)`
  color: ${(props) => props.theme.colors.darkGray};
  font-size: 1em;
  cursor: pointer;
  margin-left: 0.35em;
`;

const ButtonDiv = styled.div`
  display: flex;
  flex-direction: row;
  width: fit-content;
`;
const SubmitButton = styled(Button)`
  width: fit-content;
  margin: 1em 0.5em;
  border-radius: 5px;
`;

const ContentDiv = styled.div``;
const BoxListDiv = styled(Row)`
  display: flex;
  flex-direction: column;
  width: 300px;
`;
const ScrollDiv = styled.div`
  height: 800px;
  white-space: nowrap;
  overflow-x: auto;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    bottom: 0;
    height: 5px;
    width: 5px;
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
    background-color: rgba(0, 0, 0, 0.089);
  }
`;
const BoxHeaderDiv = styled(Col)`
  width: 295px;
  background-color: lightgray;
  height: 45px;
  line-height: 45px;
  font-size: 1.1em;
  text-align: center;
  border-radius: 5px 5px 0 0;
`;
const MainText = styled.div`
  display: flex;
  flex-direction: row;
  height: 50px;
  line-height: 50px;
`;
const Boxdiv = styled.div`
  width: 295px;
  border-left: 1px solid lightgray;
  border-right: 1px solid lightgray;
  border-bottom: 1px solid lightgray;
`;
const SRank = styled.div`
  width: 30px;
  margin: 0 0.5em;
  text-align: center;
`;
const SKeyword = styled.div`
  margin: 0 0.5em;
  width: 170px;
`;
const SPercentage = styled.div`
  margin-top: -0.3em;
`;
const SubPercent = styled.div`
  margin-top: -3em;
  font-size: 0.8em;
  color: darkgray;
`;
const HiddenBoxDiv = styled.div`
  display: ${(props) => (props.visible ? 'none' : 'flex')};
  flex-direction: column;
  padding: 0.5em;
  margin: 0 0.5em 0.5em 0.5em;
  border-radius: 5px;
  border: 1px solid #f7f4f4;
  background-color: rgba(247, 244, 244, 0.993);
`;
const SFullPath = styled.div``;
const DetailData = styled.div`
  display: flex;
  flex-direction: row;
`;
const DetailText = styled.div`
  width: 33%;
  text-align: center;
  margin: 0.5em 0;
`;
const DetailNum = styled.div``;
const DetailTag = styled.div``;

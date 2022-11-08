import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { Input, Select } from 'antd';
import {
  CloseOutlined,
  ExpandAltOutlined,
  QuestionCircleOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import ReactTooltip from 'react-tooltip';
import Swal from 'sweetalert2';
import 'chartjs-plugin-datalabels';

import { keywordContent } from 'http-api';
import { fetchData, setData } from './reducer';
import ResultTable from './components/Table';
import PlatFormChart from './components/Chart';

function Index() {
  const { Option } = Select;

  const dispatch = useDispatch();

  const { loading, keyword, keywordAmount, contentCompete, contentRate } =
    useSelector((state) => state.contentResearch);

  const [inputValue, setInputValue] = useState();
  const [iframeLink, setIframeLink] = useState('');
  const [sortType, setSortType] = useState('');

  const checkInput = () => {
    if (!inputValue) {
      Swal.fire({
        text: '분석할 키워드를 입력해 주세요',
        showConfirmButton: false,
        timer: 1000,
        width: 400,
      });
      return false;
    }
    return true;
  };

  const getContentResults = async () => {
    dispatch(fetchData());

    try {
      const result = await keywordContent({ keyword: inputValue, sortType });
      dispatch(setData(result));
    } catch (error) {
      Swal.fire('다시 한번 시도해주세요.', '', 'error');
    }
  };

  const onClickSearch = () => {
    const passInput = checkInput();

    if (passInput) {
      getContentResults();
    }
  };

  useEffect(() => {
    if (sortType && inputValue) {
      getContentResults();
    }
  }, [sortType]);

  useEffect(() => {
    setSortType('date');
  }, []);

  return (
    <Container>
      <TitleDiv>
        <STitle>
          키워드 검색
          <QuestionCircleIcon data-tip data-for="tooltipSearch" />
        </STitle>
        <ReactTooltip
          id="tooltipSearch"
          className="tooltipCSS"
          place="right"
          effect="solid"
        >
          포털 사이트에 등록된 콘텐츠들을 한 눈에 확인하면서 <br />
          콘텐츠 제작에 대한 인사이트를 얻을 수 있습니다.
        </ReactTooltip>
        <SearchDiv>
          <SInput
            disabled={loading}
            allowClear
            placeholder="분석할 키워드를 입력하세요"
            value={inputValue}
            onChange={({ target: { value } }) => setInputValue(value)}
            suffix={<SearchOutlined onClick={() => onClickSearch()} />}
            onPressEnter={() => onClickSearch()}
          />
        </SearchDiv>
      </TitleDiv>
      <ResultDiv>
        <STitleResult>
          {keyword && `'${keyword}'`} 분석 결과
          <QuestionCircleIcon data-tip data-for="tooltipResearch" />
        </STitleResult>
        <ReactTooltip
          id="tooltipResearch"
          className="tooltipCSS"
          place="right"
          effect="solid"
        >
          <span>◽ 월 검색량 : 한 달간 플랫폼에서 검색된 수 (네이버 기준)</span>
          <span>
            ◽ 콘텐츠 경쟁률 : 등록된 포스팅 대비 검색량 (네이버 기준)
          </span>
          <span>◽ 플랫폼 비율 : 플랫폼별 콘텐츠 수의 비율</span>
        </ReactTooltip>
        {keyword && (
          <ResearchBox>
            <ResearchDiv>
              <SText>월 검색량</SText>
              <SubText>
                {keywordAmount ? keywordAmount.toLocaleString() : '0'}
              </SubText>
              <SText> 회</SText>
            </ResearchDiv>
            <ResearchDiv>
              <SText>콘텐츠 경쟁률</SText>
              <SubText>{contentCompete || '0'}</SubText>
              <SText> %</SText>
            </ResearchDiv>
            {keyword && (
              <ResearchDiv>
                <SText>플랫폼 비율</SText>
                <ChartDiv>
                  <PlatFormChart data={contentRate} />
                </ChartDiv>
              </ResearchDiv>
            )}
          </ResearchBox>
        )}
        <ContentBox>
          <TableBox openIframe={iframeLink}>
            <ButtonBox>
              <SortingButton>
                <SortingSelect
                  defaultValue="date"
                  onSelect={(type) => setSortType(type)}
                  showArrow
                >
                  <Option value="date">최근 콘텐츠 보기</Option>
                  <Option value="sim">관련있는 콘텐츠 보기</Option>
                </SortingSelect>
              </SortingButton>
            </ButtonBox>
            <ResultTable setIframeLink={setIframeLink} />
          </TableBox>
          {iframeLink && (
            <IframeBox>
              <IframeControlBox>
                <ExpandIcon onClick={() => window.open(`${iframeLink}`)} />
                <CloseIcon onClick={() => setIframeLink('')} />
              </IframeControlBox>
              <IframeContainer
                src={iframeLink}
                width="100%"
                height="100%"
                style={{ border: '0' }}
              />
            </IframeBox>
          )}
        </ContentBox>
      </ResultDiv>
    </Container>
  );
}

export default Index;

const Container = styled.div`
  margin: 1.2em 6.5em;

  .tooltipCSS {
    display: flex;
    flex-direction: column;
    font-size: 0.7rem;
    font-weight: 300;
    min-width: 5rem;
    max-width: 25rem;
    border-radius: 1em;
    padding: 10px;
    pointer-events: auto !important;
    &:hover {
      visibility: visible !important;
    }
  }

  @media ${(props) => props.theme.mobile} {
    margin: 7px;
  }
`;

const TitleDiv = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  border-radius: 1.5em;
  border: 1px solid ${(props) => props.theme.colors.lightGray};
  box-shadow: 0 3px 6px 1px ${(props) => props.theme.colors.lightGray}; // 0 5px 5px lightgray;
  padding: 1.8em 2.5em;
  margin-bottom: 2rem;
  @media ${(props) => props.theme.mobile} {
    margin: 0;
    padding: 0;
    border: none;
    box-shadow: none;
  }
`;

const STitle = styled.div`
  min-width: 6.5em;
  font-size: 1rem;
  font-weight: 600;

  @media ${(props) => props.theme.mobile} {
    display: none;
  }
`;

const STitleResult = styled.div`
  min-width: 6.5em;
  font-size: 1rem;
  font-weight: 600;
`;

const QuestionCircleIcon = styled(QuestionCircleOutlined)`
  color: ${(props) => props.theme.colors.darkGray};
  font-size: 1em;
  cursor: pointer;
  margin-left: 0.35em;
`;

const SearchDiv = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.85rem;
  min-width: 400px;
  margin-left: 2em;

  @media ${(props) => props.theme.mobile} {
    min-width: 0;
    width: 90%;
    margin: 0em 2em 2em;
  }
`;

const SInput = styled(Input)`
  border: none;
  border-bottom: 2px solid ${({ theme }) => theme.colors.black};
  padding: 0 0 5px 0;
  box-shadow: none;
  border-radius: none;

  :hover {
    border: none;
    box-shadow: none;
    border-bottom: 2px solid ${({ theme }) => theme.colors.black};
  }

  &:focus {
    border: none;
    box-shadow: none;
    border-bottom: 2px solid ${({ theme }) => theme.colors.black};
  }
`;

const SubText = styled.div`
  font-size: 0.95rem;
  font-weight: 600;
`;

const SText = styled.div`
  font-size: 0.85rem;
  margin-right: 0.5rem;
`;

const ResultDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 1.5em;
  border: 1px solid ${(props) => props.theme.colors.lightGray};
  box-shadow: 0 3px 6px 1px ${(props) => props.theme.colors.lightGray};
  padding: 1.7rem 2.4rem 2rem 2.4rem;
  min-height: 62vh;

  @media ${(props) => props.theme.mobile} {
    padding: 1rem;
  }
`;

const ContentBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  gap: 10px;
`;

const TableBox = styled.div`
  margin-top: 1rem;
  width: ${({ openIframe }) => (openIframe ? '65%' : '100%')};
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);

  @media ${(props) => props.theme.mobile} {
    width: 100%;
  }
`;

const ButtonBox = styled.div`
  display: flex;
  margin: 1rem 0 1.3rem 0;
`;

const SortingButton = styled.div`
  .ant-select:not(.ant-select-customize-input) .ant-select-selector {
    height: 2.75em;
    border-radius: 1em;
  }
  .ant-select-single .ant-select-selector .ant-select-selection-item {
    line-height: 3;
    padding-left: 0.5em;
    font-size: 0.8rem;
  }
  > div:nth-child(1) span.ant-select-arrow {
    color: ${(props) => props.theme.colors.blue};
  }
  > div:nth-child(1).ant-select:not(.ant-select-customize-input)
    .ant-select-selector {
    border: 1px solid ${(props) => props.theme.colors.blue};
    color: ${(props) => props.theme.colors.blue};
  }
  > div:nth-child(1).ant-select-focused:not(.ant-select-disabled).ant-select:not(.ant-select-customize-input)
    .ant-select-selector {
    color: ${(props) => props.theme.colors.blue};
    border-color: ${(props) => props.theme.colors.blue};
    box-shadow: none;
  }
  > div:nth-child(2) span.ant-select-arrow {
    color: ${(props) => props.theme.colors.lightOrange};
  }
  > div:nth-child(2).ant-select:not(.ant-select-customize-input)
    .ant-select-selector {
    border: 1px solid ${(props) => props.theme.colors.lightOrange};
    color: ${(props) => props.theme.colors.lightOrange};
  }
  > div:nth-child(2).ant-select-focused:not(.ant-select-disabled).ant-select:not(.ant-select-customize-input)
    .ant-select-selector {
    color: ${(props) => props.theme.colors.lightOrange};
    border-color: ${(props) => props.theme.colors.lightOrange};
    box-shadow: none;
  }
`;

const SortingSelect = styled(Select)`
  min-width: 10rem;
  margin-right: 0.8rem;
`;

const IframeBox = styled.div`
  width: 35%;
  height: 100%;
  position: sticky;
  top: 0;
  margin-top: 5rem;
  border-radius: 10px;
  border: 0.5px solid ${({ theme }) => theme.colors.lineGray};
  box-shadow: inset 0 1px 5px ${({ theme }) => theme.colors.lineGray};
  /* padding: 1.5rem 0; */

  @media ${(props) => props.theme.mobile} {
    display: none;
  }
`;

const IframeControlBox = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 6px 12px 6px 0;
  border-bottom: 0.5px solid ${({ theme }) => theme.colors.lightGray};
`;

const IframeContainer = styled.iframe`
  height: 100vh;
`;

const ExpandIcon = styled(ExpandAltOutlined)`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.darkGray};
  margin-right: 5px;
  cursor: pointer;
`;

const CloseIcon = styled(CloseOutlined)`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.darkGray};
  cursor: pointer;
`;

const ResearchBox = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0;

  @media ${(props) => props.theme.tablet} {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const ResearchDiv = styled.div`
  display: flex;
  align-items: center;
  :nth-child(-n + 2)::after {
    content: '|';
    margin: 0 20px;
    color: ${(props) => props.theme.colors.gray};
  }

  @media ${(props) => props.theme.tablet} {
    margin: 4px 0;
    width: 100%;
    border-bottom: 1px solid ${(props) => props.theme.colors.lightGray};
    :nth-child(-n + 2)::after {
      display: none;
    }

    :nth-child(3) {
      flex-direction: column;
      align-items: flex-start;
    }
  }
`;

const ChartDiv = styled.div`
  position: relative;
  top: 4px;
  left: 5px;

  @media ${(props) => props.theme.mobile} {
    left: -10px;
  }
`;

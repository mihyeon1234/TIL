import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Spin } from 'antd';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';
import { getRelKeywordData } from 'http-api';

function index({ param }) {
  const history = useHistory();
  const [relKeyword, setRelKeyword] = useState([]);
  const [loading, setLoading] = useState(false);
  const keywordSearch = useSelector((state) => state.keywordSearch);

  const asyncRelKeyword = async () => {
    setLoading(true);
    try {
      const searchKeyword = await getRelKeywordData(keywordSearch.keyword);
      setRelKeyword(searchKeyword);
      setLoading(false);
    } catch (error) {
      setRelKeyword([]);
    }
  };

  useEffect(() => {
    if (keywordSearch?.keyword) asyncRelKeyword();
    return () => {
      setRelKeyword([]);
    };
  }, [keywordSearch]);

  return (
    <RelatedDiv>
      <RelatedTable>
        <RelatedThead>
          <RelatedTr>
            <TableTh colSpan={3}>연관 키워드</TableTh>
          </RelatedTr>
          <RelatedTr>
            <RelatedTh style={{ textAlign: 'left' }}>키워드</RelatedTh>
            <RelatedTd style={{ textAlign: 'center' }}>카테고리</RelatedTd>
            <RelatedTd style={{ textAlign: 'right' }}>검색량</RelatedTd>
            <RelatedTd style={{ textAlign: 'right' }}>상품수</RelatedTd>
          </RelatedTr>
        </RelatedThead>
        {loading && (
          <RelatedTbody>
            <RelatedTr>
              <td style={{ width: '100%' }}>
                <Spin
                  style={{
                    marginTop: '12em',
                    width: '100%',
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                  size="large"
                />
              </td>
            </RelatedTr>
          </RelatedTbody>
        )}
        {!loading && relKeyword && (
          <RelatedTbody>
            {relKeyword.length < 1 && (
              <RelatedTr className="noData">
                <td>데이터 없음</td>
              </RelatedTr>
            )}
            {relKeyword.slice(0, 14).map((rel) => (
              <RelatedTr key={keywordSearch.keyword + rel.key}>
                <RelatedTh>
                  <KeywordLink
                    data-tip
                    data-for={rel.key}
                    onClick={() => {
                      localStorage.setItem('searchKeyword', rel.key);
                      window.open(`/keyword?keyword=${rel.key}&tab=1`);
                    }}
                  >
                    <RelKeyword>{rel.key}</RelKeyword>
                  </KeywordLink>
                  <ReactTooltip
                    id={rel.key}
                    place="right"
                    effect="solid"
                    className="tooltipResult"
                    delayShow={200}
                  >
                    <SearchTooltip>바로 검색하기</SearchTooltip>
                  </ReactTooltip>
                </RelatedTh>
                <RelatedTd style={{ textAlign: 'center' }}>
                  {rel.categoryName || '-'}
                </RelatedTd>
                <RelatedTd>
                  {rel.searchAmount.toLocaleString() || '-'}
                </RelatedTd>
                <RelatedTd>
                  {rel.productAmount > 0 && rel.productAmount.toLocaleString()}
                  {rel.productAmount === 0 && '-'}
                </RelatedTd>
              </RelatedTr>
            ))}
            {relKeyword.length > 0 && (
              <RelatedMoreTr>
                <td>
                  <RelatedTail
                    onClick={() => {
                      param.set('tab', 3);
                      history.push(`/keyword?${param.toString()}`);
                    }}
                  >
                    더보기
                  </RelatedTail>
                </td>
              </RelatedMoreTr>
            )}
          </RelatedTbody>
        )}
      </RelatedTable>
    </RelatedDiv>
  );
}

export default index;

const RelatedDiv = styled.div`
  border: 1px solid ${(props) => props.theme.colors.lightGray};
  border-radius: 1em;
  margin-left: 0.8em;
  width: 30%;
  @media ${(props) => props.theme.mobile} {
    border: none;
    width: 100%;
    height: 250px;
    margin: 60px 0 30px 0;
    /* font-size: 16px; */
  }
`;

const RelatedTable = styled.table`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media ${(props) => props.theme.mobile} {
    height: 250px;
  }
`;

const RelatedThead = styled.thead`
  width: 90%;
  align-items: flex-start;
  border-bottom: 1px solid ${(props) => props.theme.colors.lightGray};
  margin-bottom: 1em;
  @media ${(props) => props.theme.mobile} {
    margin-bottom: 0;
    padding-top: 1em;
  }
`;

const TableTh = styled.th`
  margin: 1em auto;
  border-bottom: 1px solid;
  font-weight: bold;
  font-size: 1em;
  color: black;
`;

const KeywordLink = styled.div`
  width: fit-content;
  :hover {
    cursor: pointer;
  }
`;

const RelKeyword = styled.span`
  :hover {
    background: linear-gradient(
      to top,
      rgba(255, 221, 135, 0.74) 38%,
      transparent 38%
    );
  }
`;
const RelatedTr = styled.tr`
  display: flex;
  width: 100%;
  margin-bottom: 0.75em;
  text-align: left;
  color: #646464;

  &[class~='noData'] {
    align-items: center;
    justify-content: center;
    height: 28em;
    color: ${(props) => props.theme.colors.gray};
    font-size: 1.3em;
  }
  @media ${(props) => props.theme.mobile} {
  }
`;

const RelatedTh = styled.td`
  text-align: left;
  width: 30%;
  font-size: 0.85em;
  > a {
    color: ${(props) => props.theme.colors.black};
  }
  @media ${(props) => props.theme.mobile} {
    text-align: right;
    font-size: 11px;
  }
`;

const SearchTooltip = styled.span`
  font-size: 0.9em;
`;
const RelatedTbody = styled.tbody`
  font-size: 0.95em;
  width: 90%;
  min-height: 35em;
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
  @media ${(props) => props.theme.mobile} {
    padding-left: 5px;
    min-height: 250px;
    overflow: scroll;
    /* overflow: hidden; */
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 13px;
    width: 90%;
  }
`;

const RelatedTail = styled.div`
  width: 100%;
  font-size: 0.95em;
  text-decoration: underline;
  color: #cfcfcf; //${(props) => props.theme.colors.gray};
  cursor: pointer;
  @media ${(props) => props.theme.mobile} {
    display: none;
  }
`;

const RelatedTd = styled.td`
  text-align: right;
  font-size: 0.8em;
  width: 26%;
  @media ${(props) => props.theme.mobile} {
    font-size: 11px;
  }
`;
const RelatedMoreTr = styled.tr`
  display: flex;
  width: 100%;
  justify-content: center;
  margin: 2em 0;
`;

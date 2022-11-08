/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactGA from 'react-ga';
import styled from 'styled-components';

import { Button } from 'antd';
import { LoadingOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import ReactTooltip from 'react-tooltip';
import Swal from 'sweetalert2';

import {
  failData,
  fetchData,
  setData,
  setInputKeyword,
  setInputStore,
  setPagination,
  setRowKeys,
} from './reducer';
import ResultTable from './components/Table';

export default function RealTimeMonitoring() {
  const dispatch = useDispatch();

  const { loading, search, rowKeys, data } = useSelector(
    (state) => state.realtimeMonitoring,
  );

  const [isNoData, setIsNoData] = useState(false);
  const [isError, setIsError] = useState(false);
  const [extensionFlag, setExtensionFlag] = useState(false);

  useEffect(() => {
    ReactGA.initialize('UA-208504722-1');
    ReactGA.pageview(window.location.pathname + window.location.search);

    localStorage.removeItem('confirmedExtension');
    const realStorageData = JSON.parse(localStorage.getItem('realTime'));
    // 형태 안맞는 최초 1번 realTime데이터 삭제
    if (!realStorageData?.list) {
      localStorage.removeItem('realTime');
    }
    dispatch(setData(realStorageData?.list));

    chrome.runtime?.sendMessage(
      'mglkfkclbnnnfepnmgeeggfmpllkjjga',
      { message: 'test' },
      ({ test }) => {
        if (!chrome.runtime.lastError) {
          if (test) {
            setExtensionFlag(true);
          } else {
            setExtensionFlag(false);
          }
        }
        if (chrome.runtime.lastError) {
          setExtensionFlag(false);
        }
      },
    );

    return () => failData();
  }, []);

  const checkInput = () => {
    if (!search.store || !search.keyword) {
      Swal.fire({
        text: '🚨 스토어명 또는 키워드를 입력하세요',
        showConfirmButton: false,
        timer: 1200,
        width: 500,
      });
    } else {
      return true;
    }
    return false;
  };

  const checkExtension = (flag) => {
    if (!flag) {
      Swal.fire({
        text: '서비스 이용을 위해서는 크롬 익스텐션 설치가 필요합니다.',
        showDenyButton: true,
        confirmButtonText: `설치하기`,
        denyButtonText: `취소`,
        showClass: {
          popup: 'animate__animated animate__fadeIn animate__faster',
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOut animate__faster',
        },
        confirmButtonColor: '#FFC83A',
        denyButtonColor: '#D9D9D9',
        allowEnterKey: false,
      }).then(async (res) => {
        if (res.isConfirmed) {
          window.open(
            'https://chrome.google.com/webstore/detail/sellha/mglkfkclbnnnfepnmgeeggfmpllkjjga?hl=ko',
          );
          localStorage.setItem('confirmedExtension', true);
          dispatch(setInputStore(''));
          dispatch(setInputKeyword(''));
        }
      });
    } else {
      return true;
    }
    return false;
  };

  const onClickSearch = () => {
    const passInput = checkInput();
    const passExtension = checkExtension(extensionFlag);

    if (passInput && passExtension) {
      dispatch(fetchData());

      const keyword = search.keyword.trim();
      const store = search.store.trim();
      // 앞 뒤 띄어쓰기 제거한 텍스트로 다시 셋팅
      dispatch(setInputStore(store));
      dispatch(setInputKeyword(keyword));

      chrome.runtime.sendMessage(
        'mglkfkclbnnnfepnmgeeggfmpllkjjga',
        {
          message: 'realTimeData',
          data: { keyword, store },
        },
        (response) => {
          const state = response.status;
          const realTime = response.list;

          localStorage.setItem('realTime', JSON.stringify(response));

          if (state === 'error') {
            setIsError(true);
            dispatch(failData());
          } else if (state === 'noData') {
            setIsNoData(true);
            dispatch(setData(realTime));
          } else {
            setIsError(false);
            setIsNoData(false);
            dispatch(setData(realTime));
          }
        },
      );
    }
  };

  const onKeyPressEnter = ({ code }) => {
    if (code === 'Enter') {
      onClickSearch();
      dispatch(setPagination(1));
    }
  };

  const onClickDelete = () => {
    const filterData = data.filter((item) => !rowKeys.includes(item.id));

    dispatch(setData(filterData));
    dispatch(setRowKeys([]));

    const setFilterData = {
      status: false,
      list: filterData,
    };
    localStorage.setItem('realTime', JSON.stringify(setFilterData));
  };

  return (
    <Container>
      <STitle id="result">
        실시간 랭킹 확인하기
        <QuestionCircleIcon data-tip data-for="tooltip-rank" />
        <MobileStandardDisplay>
          모바일 쇼핑 순위 기준입니다.
        </MobileStandardDisplay>
      </STitle>
      <TitleDiv>
        <ReactTooltip
          id="tooltip-rank"
          place="right"
          effect="solid"
          className="hidden"
        >
          스토어명과 키워드를 입력하면 해당 스토어 제품의 순위를 실시간으로 볼
          수 있습니다.
        </ReactTooltip>

        <SinputDiv>
          <SInput
            id="real-store"
            type="text"
            disabled={loading}
            placeholder="스토어명을 입력하세요"
            value={search.store}
            onChange={({ target: { value } }) => {
              dispatch(setInputStore(value));
            }}
            onKeyPress={onKeyPressEnter}
          />
          <SInput
            id="real-keyword"
            type="text"
            disabled={loading}
            placeholder="키워드를 입력하세요"
            value={search.keyword}
            onChange={({ target: { value } }) => {
              dispatch(setInputKeyword(value));
            }}
            onKeyPress={onKeyPressEnter}
          />
          <SearchButton
            id="real-submit"
            onClick={onClickSearch}
            disabled={loading}
          >
            {loading ? <LoadingOutlined /> : <span>조회하기</span>}
          </SearchButton>
        </SinputDiv>
      </TitleDiv>
      {isNoData && (
        <AlertText>
          검색 결과가 없습니다. 최대 1600위까지만 검색합니다.
        </AlertText>
      )}
      {isError && <AlertText>잠시 후 다시 한 번 시도해 주세요.</AlertText>}
      {!!localStorage.getItem('confirmedExtension') && (
        <AlertText>⚠️ 익스텐션 설치 후에 새로고침 해주세요.</AlertText>
      )}
      <ResultDiv>
        <STitle>검색 결과</STitle>
        {rowKeys.length > 0 && (
          <DeleteButton onClick={() => onClickDelete(rowKeys)}>
            선택 삭제
          </DeleteButton>
        )}
        <TableBox>
          <ResultTable />
        </TableBox>
      </ResultDiv>
    </Container>
  );
}
const Container = styled.div`
  min-height: 64vh;
  margin: 1.2em 6.5em;
  .ant-input-affix-wrapper > input.ant-input {
    padding: 0;
    border: none;
    outline: none;
    background: #f6f6f6;
  }
`;

const TitleDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media ${(props) => props.theme.mobile} {
  }
`;

const STitle = styled.div`
  font-size: 1.1em;
  font-weight: 600;
  display: flex;
  align-items: center;
  @media ${(props) => props.theme.mobile} {
  }
`;

const QuestionCircleIcon = styled(QuestionCircleOutlined)`
  color: ${(props) => props.theme.colors.darkGray};
  font-size: 1em;
  cursor: pointer;
  margin-left: 0.35em;
`;

const SinputDiv = styled.div`
  display: flex;
  margin-top: 1rem;
  width: 80%;
`;

const SInput = styled.input`
  border: 1px solid ${(props) => props.theme.colors.lightGray};
  font-size: 0.8rem;
  padding: 8px 10px;
  margin-right: 0.8rem;
  border-radius: 0.25rem;
`;

const SearchButton = styled(Button)`
  width: 180px;
  height: 2.3rem;
  border-radius: 0.25rem;
  font-size: 0.8rem;
  font-weight: 500;
  background-color: ${(props) => props.theme.colors.orange};
  color: ${(props) => props.theme.colors.white};
  border: none;
  :hover {
    background-color: #ffdd63;
    transition: all 0.3s ease-in-out;
    color: ${(props) => props.theme.colors.white};
  }
  :focus {
    background-color: ${(props) => props.theme.colors.orange};
    color: ${(props) => props.theme.colors.white};
  }
`;

const AlertText = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.danger};
  margin-left: 0.25rem;
`;

const ResultDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 4em;
`;

const DeleteButton = styled(Button)`
  width: 90px;
  border-radius: 5px;
  font-size: 0.8rem;
  margin: 0.8rem 0 0.5rem 0;
`;

const TableBox = styled.div`
  margin: 1rem 0;
  width: 100%;
`;

const MobileStandardDisplay = styled.span`
  font-size: 0.5rem;
  color: ${(props) => props.theme.colors.darkGray};
  font-weight: 300;
  margin-left: 1em;
`;

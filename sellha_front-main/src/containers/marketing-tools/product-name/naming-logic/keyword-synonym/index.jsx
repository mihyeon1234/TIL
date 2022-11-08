import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import Swal from 'sweetalert2';

import { synonymCheck } from 'http-api';

import Search from './components/Search';
import Result from './components/Result';
import { setSynonymResult } from '../../reducer';
import { setArrayData } from '../components/RecentSearchHistory';

export default function Index() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { synoResult } = useSelector((state) => state.productNaming);

  const [synoKeywordHistory, setSynoKeywordHistory] = useState(
    JSON.parse(localStorage.getItem('synoKeyword')),
  );

  const getSynonymResult = async (keywords) => {
    setLoading(true);
    try {
      const result = await synonymCheck({ keywords });
      dispatch(setSynonymResult(result));
      setArrayData(
        synoKeywordHistory,
        keywords,
        setSynoKeywordHistory,
        'synoKeyword',
      );
      setLoading(false);
    } catch (error) {
      Swal.fire({ text: '다시 한 번 시도해 주세요.' });
    }
  };

  return (
    <Container>
      <TitleDiv>키워드 동의어 분석하기</TitleDiv>
      <Search
        loading={loading}
        getSynonymResult={getSynonymResult}
        synoKeywordHistory={synoKeywordHistory}
        setSynoKeywordHistory={setSynoKeywordHistory}
      />
      {synoResult.indexOf('default') < 0 && <Result />}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: fit-content;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  border-radius: 2em;
  padding: 1.5rem;
  box-shadow: 0 3px 6px 1px ${(props) => props.theme.colors.lightGray};
`;

const TitleDiv = styled.div`
  font-size: 1rem;
  font-weight: 600;
`;

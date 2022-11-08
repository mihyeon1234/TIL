import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import Swal from 'sweetalert2';

import { combinationCheck } from 'http-api';

import Search from './components/Search';
import { setCombinationResult } from '../../reducer';
import Result from './components/Result';

export default function Index() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const { combiKeywords } = useSelector((state) => state.productNaming);

  const getCombiResult = async () => {
    setLoading(true);
    try {
      const result = await combinationCheck({
        mainKeyword: combiKeywords.mainKeyword,
        subKeyword: combiKeywords.subKeyword,
      });
      dispatch(setCombinationResult(result));
      setLoading(false);
    } catch (error) {
      Swal.fire({ text: '다시 한 번 시도해 주세요.' });
    }
  };

  useEffect(() => {
    if (combiKeywords.mainKeyword && combiKeywords.subKeyword.length > 0)
      getCombiResult();
  }, [combiKeywords]);

  return (
    <Container>
      <TitleDiv>키워드 형태 분석하기</TitleDiv>
      <Search loading={loading} />
      {!loading && <Result />}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: fit-content;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  padding: 1.5rem;
  border-radius: 2em;
  box-shadow: 0 3px 6px 1px ${(props) => props.theme.colors.lightGray};
`;

const TitleDiv = styled.div`
  font-size: 1rem;
  font-weight: 600;
`;

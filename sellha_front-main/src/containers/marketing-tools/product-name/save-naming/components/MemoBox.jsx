import React from 'react';
import { useSelector, useDispatch } from 'react-redux'; // useDispatch
import styled from 'styled-components';

import { Input } from 'antd';
import Swal from 'sweetalert2';
import { editMemoKeyword, setSaveMemo } from '../../reducer';

const MemoBox = () => {
  const dispatch = useDispatch();
  const { memoKeywords, saveMemos } = useSelector(
    (state) => state.productNaming,
  );

  const onClickSave = () => {
    if (!memoKeywords) return null;
    if (saveMemos.length > 4) {
      return Swal.fire({
        text: '메모 저장은 최대 5개까지 가능합니다.',
        showConfirmButton: false,
        timer: 1500,
        width: 450,
      });
    }
    if (saveMemos.length < 5) {
      return dispatch(setSaveMemo(memoKeywords));
    }
    return '';
  };

  return (
    <Container>
      <TitleBox>
        <Title>상품명 메모장</Title>
        <Savebutton onClick={onClickSave}>저장하기</Savebutton>
      </TitleBox>
      <InputArea
        allowClear
        maxLength={100}
        showCount
        placeholder="선택한 키워드를 수정하세요"
        value={memoKeywords}
        autoSize={{ minRows: 3, maxRows: 5 }}
        onChange={(e) => {
          dispatch(editMemoKeyword(e.target.value));
        }}
      />
      {memoKeywords.length >= 50 && memoKeywords.length < 100 && (
        <AlertText>🚨 50자 초과 시 검색 품질이 낮아집니다</AlertText>
      )}
      {memoKeywords.length >= 100 && (
        <AlertText>🚨 상품명은 100자 이내로 작성할 수 있습니다</AlertText>
      )}
    </Container>
  );
};

export default MemoBox;

const Container = styled.div`
  width: 40%;
  border-right: 2px solid ${({ theme }) => theme.colors.lineGray};
  padding-right: 8px;
  .ant-input-textarea-show-count::after {
    font-size: 0.7rem;
  }
`;

const TitleBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.div`
  font-size: 0.85rem;
  font-weight: 600;
`;

const Savebutton = styled.span`
  border-radius: 5px;
  font-size: 0.8rem;
  border: 1px solid ${({ theme }) => theme.colors.blue};
  padding: 1px 8px;
  cursor: pointer;
  color: ${(props) => props.theme.colors.blue};
  :hover {
    border: 1px solid ${({ theme }) => theme.colors.blue};
    color: ${(props) => props.theme.colors.blue};
  }
`;

const InputArea = styled(Input.TextArea)`
  margin: 8px 0;
  span > textarea {
    padding-right: 15px;
    font-size: 0.82rem;
  }
`;

const AlertText = styled.div`
  font-size: 0.78rem;
  color: ${({ theme }) => theme.colors.danger};
`;
